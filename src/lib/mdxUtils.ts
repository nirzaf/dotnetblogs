import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import readingTime from 'reading-time';

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
}

export async function getAllPosts(): Promise<Post[]> {
  // Create the directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }

  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(async fileName => {
        // Remove ".mdx" from file name to get slug
        const slug = fileName.replace(/\.mdx$/, '');
        
        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        // Use gray-matter to parse the post metadata section
        const { data, content } = matter(fileContents);
        
        // Calculate reading time
        const readingTimeResult = readingTime(content);
        
        // Combine the data with the slug
        return {
          slug,
          title: data.title,
          date: data.date,
          description: data.description || '',
          image: data.image || '',
          tags: data.tags || [],
          readingTime: Math.ceil(readingTimeResult.minutes).toString(),
          content,
        };
      })
  );
  
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
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
    
    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.description || '',
      image: data.image || '',
      tags: data.tags || [],
      readingTime: Math.ceil(readingTimeResult.minutes).toString(),
      content,
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
