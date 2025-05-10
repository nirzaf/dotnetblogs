import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import readingTime from 'reading-time';
import { fixHtmlAttributes } from './fixHtmlAttributes';
import { rehypeFixAttributes } from './rehypeFixAttributes';

const postsDirectory = path.join(process.cwd(), 'data/posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  tags?: string[];
  readingTime: string;
  content: string;
  contentPreview?: string;
  draft?: boolean;
}

export async function getAllPosts(): Promise<Post[]> {
  // Create the directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }

  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsRaw = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(async fileName => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const readingTimeResult = readingTime(content);

        // Extract a content preview for markdown rendering
        const contentPreview = content
          .replace(/---[\s\S]*?---/, '') // Remove frontmatter
          .replace(/import.*?;/g, '') // Remove import statements
          .replace(/<div.*?>[\s\S]*?<\/div>/g, '') // Remove div blocks
          .replace(/<Image.*?\/>|<img.*?\/>/g, '[image]') // Replace image tags with placeholder
          .trim()
          .split('\n\n') // Split by paragraphs
          .slice(0, 3) // Take first 3 paragraphs
          .join('\n\n') // Join back with paragraph breaks
          .slice(0, 600); // Limit to 600 characters

        return {
          slug,
          title: data.title,
          date: data.date,
          description: data.description || '',
          image: data.image || '',
          tags: data.tags || [],
          readingTime: Math.ceil(readingTimeResult.minutes).toString(),
          content: '', // We don't need the full content for the list view
          contentPreview: contentPreview, // Add content preview
          draft: data.draft === true,
        };
      })
  );
  // Filter out drafts using the raw frontmatter
  const publishedPosts = allPostsRaw.filter((post) => !post.draft);
  // Remove duplicate posts (based on slug)
  const uniquePosts = Array.from(new Map(publishedPosts.map(post => [post.slug, post])).values());

  // Convert dates to consistent format for comparison
  const parseDate = (dateStr: string): Date => {
    if (!dateStr) return new Date(0);
    
    // Try direct parsing first
    let date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date;
    }
    
    // Handle month name formats like 'May 10 2025' or 'Oct 12 2024'
    const monthNamePattern = /^([A-Za-z]{3,}) (\d{1,2}) (\d{4})$/;
    const monthNameMatch = dateStr.match(monthNamePattern);
    if (monthNameMatch) {
      const [_, month, day, year] = monthNameMatch;
      const monthMap: {[key: string]: number} = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11,
        'January': 0, 'February': 1, 'March': 2, 'April': 3, 'June': 5,
        'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
      };
      
      if (monthMap[month] !== undefined) {
        return new Date(parseInt(year), monthMap[month], parseInt(day));
      }
    }
    
    // Handle ISO-like formats (YYYY-MM-DD)
    const isoPattern = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
    const isoMatch = dateStr.match(isoPattern);
    if (isoMatch) {
      const [_, year, month, day] = isoMatch;
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }
    
    // Handle numeric formats like MM/DD/YYYY
    const numericPattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const numericMatch = dateStr.match(numericPattern);
    if (numericMatch) {
      const [_, month, day, year] = numericMatch;
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }
    
    // If all parsing attempts fail, return a far past date
    console.warn(`Failed to parse date: ${dateStr}`);
    return new Date(0);
  };

  // Sort posts by date (newest first) and then by title (alphabetically descending) for same dates
  return uniquePosts.sort((a, b) => {
    // Compare dates first
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    
    if (dateA < dateB) {
      return 1;
    } else if (dateA > dateB) {
      return -1;
    } 
    // If dates are equal, sort by title in descending order
    else {
      return b.title.localeCompare(a.title);
    }
  });
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Calculate reading time
    const readingTimeResult = readingTime(content);

    // Extract a content preview for markdown rendering
    const contentPreview = content
      .replace(/---[\s\S]*?---/, '') // Remove frontmatter
      .replace(/import.*?;/g, '') // Remove import statements
      .replace(/<div.*?>[\s\S]*?<\/div>/g, '') // Remove div blocks
      .replace(/<Image.*?\/>|<img.*?\/>/g, '[image]') // Replace image tags with placeholder
      .trim()
      .split('\n\n') // Split by paragraphs
      .slice(0, 3) // Take first 3 paragraphs
      .join('\n\n') // Join back with paragraph breaks
      .slice(0, 600); // Limit to 600 characters

    // Fix HTML attributes in the content
    const fixedContent = fixHtmlAttributes(content);

    // Serialize the MDX content for client-side rendering
    const mdxSource = await serialize(fixedContent, {
      // Add MDX options for better HTML handling
      parseFrontmatter: true,
      mdxOptions: {
        development: process.env.NODE_ENV === 'development',
        rehypePlugins: [rehypeFixAttributes],
      },
    });

    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.description || '',
      image: data.image || '',
      tags: data.tags || [],
      readingTime: Math.ceil(readingTimeResult.minutes).toString(),
      content: JSON.stringify(mdxSource),
      contentPreview: contentPreview,
    };
  } catch (error) {
    console.error(`Error getting post by slug: ${slug}`, error);
    return null;
  }
}

export async function getAllTags(): Promise<Record<string, number>> {
  const posts = await getAllPosts();

  const tags: Record<string, number> = {};

  posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => {
        if (tags[tag]) {
          tags[tag]++;
        } else {
          tags[tag] = 1;
        }
      });
    }
  });

  return tags;
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();

  return posts.filter(post => post.tags?.includes(tag));
}
