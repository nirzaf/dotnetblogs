import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about My Blog',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">About</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          Welcome to My Blog, a modern blogging platform built with Next.js and MDX.
          This blog is designed to showcase the power of modern web technologies
          while providing a clean, distraction-free reading experience.
        </p>
        
        <h2>Our Mission</h2>
        <p>
          Our mission is to share valuable content in a beautiful, accessible format.
          We believe in the power of well-crafted content and strive to create
          an enjoyable reading experience for all our visitors.
        </p>
        
        <h2>Technologies</h2>
        <p>
          This blog is built with the following technologies:
        </p>
        <ul>
          <li>Next.js - A React framework for production</li>
          <li>MDX - Markdown for the component era</li>
          <li>Tailwind CSS - A utility-first CSS framework</li>
          <li>TypeScript - JavaScript that scales</li>
        </ul>
        
        <h2>Contact</h2>
        <p>
          Have questions or suggestions? Feel free to reach out to us at
          <a href="mailto:contact@myblog.com" className="ml-1 text-blue-600 dark:text-blue-400 hover:underline">
            contact@myblog.com
          </a>
        </p>
      </div>
    </div>
  );
}
