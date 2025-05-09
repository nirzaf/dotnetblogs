import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/mdxUtils';
import { MDXContent } from '@/components/MDXContent';


// @ts-expect-error: Next.js app directory route handler params are not typed
export async function generateMetadata({ params }) {
  // Ensure params is properly awaited
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Your Name'],
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// @ts-expect-error: Next.js app directory route handler params are not typed
export default async function BlogPostPage({ params }) {
  // Ensure params is properly awaited
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <span>{post.readingTime} min read</span>
        </div>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        {post.description && (
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {post.description}
          </p>
        )}

        {post.image && (
          <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags?.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MDXContent source={post.content} />
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-bold mb-4">Share this post</h2>
        <div className="flex space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Twitter
          </button>
          <button className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded">
            Facebook
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            LinkedIn
          </button>
        </div>
      </div>
    </article>
  );
}
