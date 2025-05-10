'use client';

import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useEffect, useState } from 'react';

interface MarkdownPreviewProps {
  content: string;
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  const [mdxSource, setMdxSource] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const prepareMarkdown = async () => {
      try {
        // Serialize the markdown content
        const serialized = await serialize(content, {
          mdxOptions: {
            development: process.env.NODE_ENV === 'development',
          },
        });
        setMdxSource(serialized);
      } catch (error) {
        console.error('Error serializing markdown preview:', error);
      } finally {
        setIsLoading(false);
      }
    };

    prepareMarkdown();
  }, [content]);

  if (isLoading) {
    return <p className="text-gray-500 dark:text-gray-400">Loading preview...</p>;
  }

  // Simple components for the preview
  const components = {
    h1: (props: React.HTMLAttributes<HTMLElement>) => <span className="font-bold text-lg" {...props} />,
    h2: (props: React.HTMLAttributes<HTMLElement>) => <span className="font-bold text-base" {...props} />,
    h3: (props: React.HTMLAttributes<HTMLElement>) => <span className="font-bold" {...props} />,
    p: (props: React.HTMLAttributes<HTMLElement>) => <span {...props} />,
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <span className="text-blue-600 dark:text-blue-400" {...props} />
    ),
    ul: (props: React.HTMLAttributes<HTMLElement>) => <span {...props} />,
    ol: (props: React.HTMLAttributes<HTMLElement>) => <span {...props} />,
    li: (props: React.HTMLAttributes<HTMLElement>) => <span {...props} />,
    blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
      <span className="italic" {...props} />
    ),
    code: (props: React.HTMLAttributes<HTMLElement>) => (
      <span className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-1 rounded" {...props} />
    ),
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => <span {...props} />,
    img: () => <span>[image]</span>, // Just show a placeholder for images
  };

  return (
    <div className="text-gray-600 dark:text-gray-300 text-sm">
      {mdxSource ? (
        <MDXRemote {...mdxSource} components={components} />
      ) : (
        <span>{content}</span>
      )}
      <span className="text-blue-600 dark:text-blue-400 ml-1">...</span>
    </div>
  );
}
