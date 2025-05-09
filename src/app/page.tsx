import Link from 'next/link';
import { Metadata } from 'next';
import { getAllPosts } from '@/lib/mdxUtils';
import { PostCard } from '@/components/PostCard';
import { SearchBar } from '@/components/SearchBar';

export const metadata: Metadata = {
  title: 'The .NET Evangelist',
  description: 'Exploring modern software development with .NET, web technologies, and cloud solutions',
};

export default async function Home() {
  const allPosts = await getAllPosts();
  const recentPosts = allPosts.slice(0, 9); // Get the 9 most recent posts
  const featuredPost = recentPosts[0]; // The most recent post as featured

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">The .NET Evangelist</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          Exploring modern software development with .NET, web technologies, and cloud solutions
        </p>
        <SearchBar />
      </div>

      {featuredPost && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Post</h2>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="md:flex">
              {featuredPost.image && (
                <div className="md:w-1/2 h-64 md:h-auto relative">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6 md:w-1/2">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <span>{featuredPost.date}</span>
                  <span className="mx-2">•</span>
                  <span>{featuredPost.readingTime} min read</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  <Link href={`/blog/${featuredPost.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                    {featuredPost.title}
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {featuredPost.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredPost.tags?.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag}`}
                      className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Posts</h2>
          <Link
            href="/blog"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            View All Posts →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.length > 1 ? (
            // Skip the first post (featured) and show the next 8
            recentPosts.slice(1).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 dark:text-gray-300 mb-4">No blog posts found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
