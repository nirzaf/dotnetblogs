import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'A modern blog built with Next.js and MDX',
};

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Blog</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          A modern blogging platform built with Next.js and MDX
        </p>
      </div>

      <div className="flex justify-center">
        <Link
          href="/blog"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          View All Posts
        </Link>
      </div>
    </div>
  );
}
