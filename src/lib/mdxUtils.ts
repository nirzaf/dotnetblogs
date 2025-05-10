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

        // Extract a content preview (first 300 characters of the content)
        const contentPreview = content
          .replace(/---[\s\S]*?---/, '') // Remove frontmatter
          .replace(/import.*?;/g, '') // Remove import statements
          .replace(/<.*?>/g, '') // Remove HTML tags
          .replace(/```[\s\S]*?```/g, '') // Remove code blocks
          .replace(/\n+/g, ' ') // Replace multiple newlines with a single space
          .trim()
          .slice(0, 500); // Get first 500 characters

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
  // Sort posts by date
  return publishedPosts.sort((a, b) => {
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

    // Extract a content preview (first 500 characters of the content)
    const contentPreview = content
      .replace(/---[\s\S]*?---/, '') // Remove frontmatter
      .replace(/import.*?;/g, '') // Remove import statements
      .replace(/<.*?>/g, '') // Remove HTML tags
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .replace(/\n+/g, ' ') // Replace multiple newlines with a single space
      .trim()
      .slice(0, 500); // Get first 500 characters

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
