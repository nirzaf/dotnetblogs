"use client";

// No need to import Metadata anymore
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata is defined in metadata.ts

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Use state to track if the component has mounted
  const [mounted, setMounted] = useState(false);

  // After mounting, we can safely use client-side features
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <header className="bg-white dark:bg-gray-900 shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">My Blog</Link>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400">Blog</Link>
                </li>
                <li>
                  <Link href="/tags" className="hover:text-blue-600 dark:hover:text-blue-400">Tags</Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400">About</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="bg-white dark:bg-gray-900 py-6 mt-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-600 dark:text-gray-300">
                  © 2025 My Blog. All rights reserved.
                </p>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Twitter
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  GitHub
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
