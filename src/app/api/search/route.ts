import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/mdxUtils';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const posts = await getAllPosts();
    
    // Simple search implementation - searches in title, description, and tags
    const results = posts.filter(post => {
      const titleMatch = post.title.toLowerCase().includes(query.toLowerCase());
      const descriptionMatch = post.description.toLowerCase().includes(query.toLowerCase());
      const tagMatch = post.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
      
      return titleMatch || descriptionMatch || tagMatch;
    });

    // Return only the necessary fields for search results
    return NextResponse.json(
      results.map(post => ({
        slug: post.slug,
        title: post.title,
        description: post.description,
        tags: post.tags,
        date: post.date,
      }))
    );
  } catch (error) {
    console.error('Error searching posts:', error);
    return NextResponse.json({ error: 'Failed to search posts' }, { status: 500 });
  }
}
