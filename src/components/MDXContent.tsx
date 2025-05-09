import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';

// Define custom components for MDX
const components = {
  h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
  h4: (props: any) => <h4 className="text-lg font-bold mt-4 mb-2" {...props} />,
  p: (props: any) => <p className="mb-4" {...props} />,
  a: (props: any) => (
    <a 
      className="text-blue-600 dark:text-blue-400 hover:underline" 
      target={props.href.startsWith('http') ? '_blank' : undefined}
      rel={props.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props} 
    />
  ),
  ul: (props: any) => <ul className="list-disc pl-6 mb-4" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 mb-4" {...props} />,
  li: (props: any) => <li className="mb-1" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4" {...props} />
  ),
  hr: () => <hr className="my-8 border-gray-300 dark:border-gray-700" />,
  img: (props: any) => (
    <div className="my-6">
      <img
        alt={props.alt || 'Blog image'}
        className="rounded-lg mx-auto"
        {...props}
      />
      {props.alt && <p className="text-center text-sm text-gray-500 mt-2">{props.alt}</p>}
    </div>
  ),
  code: (props: any) => {
    if (typeof props.children === 'string') {
      return (
        <code
          className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 font-mono text-sm"
          {...props}
        />
      );
    }
    return <code {...props} />;
  },
  pre: (props: any) => (
    <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto mb-6 font-mono text-sm" {...props} />
  ),
  table: (props: any) => (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="px-4 py-3 text-left text-sm font-semibold bg-gray-100 dark:bg-gray-800" {...props} />
  ),
  td: (props: any) => <td className="px-4 py-3 text-sm border-t" {...props} />,
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
  return <MDXRemote source={source} components={components} />;
}
