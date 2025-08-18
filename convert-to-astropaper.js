import fs from 'fs';
import path from 'path';

// Convert frontmatter from WordPress format to AstroPaper format
function convertFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!frontmatterMatch) return content;
  
  const [, frontmatter, body] = frontmatterMatch;
  const lines = frontmatter.split('\n');
  
  let newFrontmatter = {};
  
  lines.forEach(line => {
    const match = line.match(/^(\w+):\s*(.*)$/);
    if (!match) return;
    
    const [, key, value] = match;
    let cleanValue = value.trim();
    
    // Remove quotes if present
    if (cleanValue.startsWith('"') && cleanValue.endsWith('"')) {
      cleanValue = cleanValue.slice(1, -1);
    }
    
    switch (key) {
      case 'pubDate':
        newFrontmatter.pubDatetime = new Date(`${cleanValue}T00:00:00.000Z`);
        break;
      case 'title':
        // Escape quotes in title
        newFrontmatter.title = cleanValue.replace(/"/g, '\\"');
        break;
      case 'description':
        // Escape quotes in description
        newFrontmatter.description = cleanValue.replace(/"/g, '\\"');
        break;
      case 'author':
        newFrontmatter.author = cleanValue;
        break;
      case 'categories':
        // Convert array string to tags
        const cats = cleanValue.replace(/[\[\]]/g, '').split(',').map(c => c.trim().replace(/"/g, ''));
        newFrontmatter.tags = cats.filter(c => c.length > 0);
        break;
      case 'tags':
        // Add to existing tags
        const tags = cleanValue.replace(/[\[\]]/g, '').split(',').map(t => t.trim().replace(/"/g, ''));
        if (newFrontmatter.tags) {
          newFrontmatter.tags = [...newFrontmatter.tags, ...tags.filter(t => t.length > 0)];
        } else {
          newFrontmatter.tags = tags.filter(t => t.length > 0);
        }
        break;
    }
  });
  
  // Set defaults
  if (!newFrontmatter.tags || newFrontmatter.tags.length === 0) {
    newFrontmatter.tags = ['blog'];
  }
  
  // Generate new frontmatter using pipe notation for long descriptions
  const pubDatetimeStr = newFrontmatter.pubDatetime ? newFrontmatter.pubDatetime.toISOString() : new Date().toISOString();
  const newFrontmatterStr = [
    'author: "yjsoon"',
    `pubDatetime: ${pubDatetimeStr}`,
    `title: "${newFrontmatter.title}"`,
    'description: >',
    `  ${newFrontmatter.description}`,
    `tags: [${newFrontmatter.tags.map(t => `"${t}"`).join(', ')}]`
  ].join('\n');
  
  return `---\n${newFrontmatterStr}\n---\n\n${body}`;
}

// Process all blog files
const blogDir = './src/data/blog';
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

console.log(`Converting ${files.length} blog posts to AstroPaper format...`);

let converted = 0;

files.forEach(file => {
  const filePath = path.join(blogDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const convertedContent = convertFrontmatter(content);
  
  if (content !== convertedContent) {
    fs.writeFileSync(filePath, convertedContent);
    converted++;
    console.log(`✅ Converted: ${file}`);
  }
});

console.log(`\n🎉 Conversion complete! ${converted} files converted to AstroPaper format.`);