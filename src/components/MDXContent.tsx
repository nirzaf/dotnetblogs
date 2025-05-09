'use client';
import { MDXRemote } from 'next-mdx-remote';
import Prism from 'prismjs';
import Image from 'next/image';
import '../styles/prism.css';
import React, { useEffect } from 'react';

// Define custom components for MDX
const components = {
  h1: (props: React.HTMLAttributes<HTMLElement>) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: React.HTMLAttributes<HTMLElement>) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLElement>) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
  h4: (props: React.HTMLAttributes<HTMLElement>) => <h4 className="text-lg font-bold mt-4 mb-2" {...props} />,
  p: (props: React.HTMLAttributes<HTMLElement>) => <p className="mb-4" {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-blue-600 dark:text-blue-400 hover:underline"
      target={props.href && props.href.startsWith('http') ? '_blank' : undefined}
      rel={props.href && props.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLElement>) => <ul className="list-disc pl-6 mb-4" {...props} />,
  ol: (props: React.HTMLAttributes<HTMLElement>) => <ol className="list-decimal pl-6 mb-4" {...props} />,
  li: (props: React.HTMLAttributes<HTMLElement>) => <li className="mb-1" {...props} />,
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4" {...props} />
  ),
  hr: () => <hr className="my-8 border-gray-300 dark:border-gray-700" />,
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <div className="my-6">
      <img
        alt={props.alt || 'Blog image'}
        className="rounded-lg shadow-md mx-auto"
        {...props}
      />
      {props.alt && <p className="text-center text-sm text-gray-500 mt-2">{props.alt}</p>}
    </div>
  ),
  Image: (props: React.ComponentProps<typeof Image>) => (
    <span className="my-6 block">
      <Image {...props} />
      {props.alt && (
        <p className="text-center text-sm text-gray-500 mt-2">{props.alt}</p>
      )}
    </span>
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    const { className = '', children, ...rest } = props;
    const isBlock = className.startsWith('language-');
    const language = className.replace('language-', '') || 'javascript';
    const code = typeof children === 'string' ? children.trim() : '';
    if (isBlock) {
      const highlighted = Prism.highlight(code, Prism.languages[language] || Prism.languages.javascript, language);
      return (
        <code
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlighted }}
          {...rest}
        />
      );
    }
    // Inline code
    return (
      <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 font-mono text-sm" {...props} />
    );
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto mb-6 font-mono text-sm" {...props} />
  ),
  table: (props: React.HTMLAttributes<HTMLElement>) => (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700" {...props} />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLElement>) => (
    <th className="px-4 py-3 text-left text-sm font-semibold bg-gray-100 dark:bg-gray-800" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLElement>) => <td className="px-4 py-3 text-sm border-t" {...props} />,
  // Custom components
  Tweet: ({ id }: { id: string }) => (
    <div className="my-6 mx-auto max-w-xl">
      <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
        <p className="text-center text-gray-500">Twitter embed placeholder for tweet ID: {id}</p>
      </div>
    </div>
  ),
  YouTubeVideo: ({ id }: { id: string }) => (
    <div className="my-6 aspect-video">
      <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 h-full flex items-center justify-center">
        <p className="text-center text-gray-500">YouTube embed placeholder for video ID: {id}</p>
      </div>
    </div>
  ),
};

interface MDXContentProps {
  source: string;
}

export function MDXContent({ source }: MDXContentProps) {
  useEffect(() => {
    // Initialize Prism.js syntax highlighting when component mounts
    if (typeof window !== 'undefined') {
      Prism.highlightAll();
    }
  }, [source]);

  // Parse the JSON string back to an object
  const mdxSource = JSON.parse(source);

  return <MDXRemote
    {...mdxSource}
    components={components}
  />;
}
