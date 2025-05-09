import { Metadata } from 'next';
import Link from 'next/link';
import { getPostsByTag, getAllTags } from '@/lib/mdxUtils';

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  return {
    title: `#${params.tag}`,
    description: `Blog posts tagged with #${params.tag}`,
  };
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  
  return Object.keys(tags).map((tag) => ({
    tag,
  }));
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = params;
  const posts = await getPostsByTag(tag);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/tags" className="text-blue-600 dark:text-blue-400 hover:underline">
          ← All Tags
        </Link>
        <h1 className="text-3xl font-bold mt-4">
          Posts tagged with <span className="text-blue-600 dark:text-blue-400">#{tag}</span>
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.slug} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {post.image && (
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readingTime} min read</span>
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags?.map((postTag) => (
                    <Link 
                      key={postTag} 
                      href={`/tags/${postTag}`}
                      className={`text-xs px-2 py-1 rounded-full ${
                        postTag === tag 
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      #{postTag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 mb-4">No posts found with this tag.</p>
            <Link 
              href="/blog" 
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
