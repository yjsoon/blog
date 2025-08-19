// Redirect from /feed.xml to /rss.xml
export function GET() {
  return new Response(null, {
    status: 301,
    headers: {
      Location: "/rss.xml"
    }
  });
}