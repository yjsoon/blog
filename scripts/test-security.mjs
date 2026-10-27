import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { constants } from "node:fs";
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { get } from "node:http";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { dev } from "astro";

const root = fileURLToPath(new URL("../", import.meta.url));

test("production artifacts respect publication time and draft status", async () => {
  const workspace = await mkdtemp(path.join(tmpdir(), "blog-publication-"));
  try {
    for (const name of [
      "src",
      "public",
      "astro.config.ts",
      "tsconfig.json",
      "package.json",
      "node_modules",
    ]) {
      await cp(path.join(root, name), path.join(workspace, name), {
        recursive: true,
        mode: constants.COPYFILE_FICLONE,
        filter: source =>
          source !== path.join(root, "src/data/blog") &&
          source !== path.join(root, "public/pagefind") &&
          source !== path.join(root, "node_modules/.astro") &&
          source !== path.join(root, "node_modules/.vite"),
      });
    }
    const blog = path.join(workspace, "src/data/blog");
    await mkdir(blog, { recursive: true });
    const now = Date.now();
    const fixtures = [
      { slug: "published-control", offset: -86400000, visible: true },
      { slug: "inside-margin", offset: 5 * 60000, visible: true },
      { slug: "outside-margin", offset: 60 * 60000, visible: false },
      {
        slug: "future-custom-og",
        offset: 86400000,
        visible: false,
        customOg: true,
      },
      { slug: "draft-control", offset: -86400000, visible: false, draft: true },
    ];
    for (const fixture of fixtures) {
      await writeFile(
        path.join(blog, `${fixture.slug}.md`),
        `---\ntitle: ${fixture.slug}\npubDatetime: ${new Date(now + fixture.offset).toISOString()}\ndescription: ${fixture.slug} description\ndraft: ${!!fixture.draft}\n${fixture.customOg ? 'ogImage: "https://yjsoon.com/yjsoon-og.jpg"\n' : ""}---\n\n${fixture.slug} private body marker.\n`
      );
    }
    execFileSync(
      process.execPath,
      [path.join(workspace, "node_modules/astro/bin/astro.mjs"), "build"],
      {
        cwd: workspace,
        stdio: "pipe",
        timeout: 120000,
      }
    );
    const dist = path.join(workspace, "dist");
    const archive = await readFile(
      path.join(dist, "archives/index.html"),
      "utf8"
    );
    for (const fixture of fixtures) {
      for (const suffix of ["/index.html", "/index.png", ".md"]) {
        const artifact = path.join(dist, `posts/${fixture.slug}${suffix}`);
        if (fixture.visible) {
          assert.ok((await readFile(artifact)).length, `missing ${artifact}`);
        } else {
          await assert.rejects(
            readFile(artifact),
            { code: "ENOENT" },
            `leaked ${artifact}`
          );
        }
      }
      assert.equal(
        archive.includes(fixture.slug),
        fixture.visible,
        `archive: ${fixture.slug}`
      );
    }
    // Check the discoverable exports as well as direct article/image routes.
    for (const name of [
      "index.html",
      "posts/index.html",
      "rss.xml",
      "sitemap-0.xml",
      "schema/blog.json",
      "llms.txt",
      "agent-routes.json",
    ]) {
      const body = await readFile(path.join(dist, name), "utf8");
      for (const fixture of fixtures.filter(fixture => !fixture.visible)) {
        assert.ok(
          !body.includes(fixture.slug),
          `${name} leaked ${fixture.slug}`
        );
      }
    }
  } finally {
    await rm(workspace, { recursive: true, force: true });
  }
});

test("development rejects untrusted hosts while allowing localhost", async () => {
  const server = await dev({
    root,
    server: { host: "127.0.0.1", port: 0 },
  });
  try {
    const url = `http://127.0.0.1:${server.address.port}/src/config.ts`;
    const local = await fetch(url);
    assert.equal(local.status, 200);
    assert.match(await local.text(), /export const SITE/);
    // Node fetch may normalize Host; use HTTP directly to test the wire header.
    const untrusted = await new Promise((resolve, reject) => {
      get(url, { headers: { Host: "attacker.invalid" } }, resolve).on(
        "error",
        reject
      );
    });
    let body = "";
    for await (const chunk of untrusted) body += chunk;
    assert.equal(untrusted.statusCode, 403);
    assert.doesNotMatch(body, /export const SITE/);
  } finally {
    await server.stop();
  }
});
