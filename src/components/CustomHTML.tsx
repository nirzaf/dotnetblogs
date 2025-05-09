'use client';

import React from 'react';
import DOMPurify from 'isomorphic-dompurify';

interface CustomHTMLProps {
  html: string;
}

export function CustomHTML({ html }: CustomHTMLProps) {
  // Function to sanitize and fix HTML attributes
  const sanitizeAndFixHTML = (htmlContent: string): string => {
    // Fix common React attribute issues in iframes
    const fixedHTML = htmlContent
      // Fix frameborder attribute
      .replace(/frameborder=["']([^"']*)["']/g, 'frameBorder="$1"')
      // Fix allowfullscreen attribute
      .replace(/allowfullscreen(=["']([^"']*)["'])?/g, 'allowFullScreen="true"')
      // Fix marginheight and marginwidth attributes
      .replace(/marginheight=["']([^"']*)["']/g, 'marginHeight="$1"')
      .replace(/marginwidth=["']([^"']*)["']/g, 'marginWidth="$1"')
      // Fix scrolling attribute
      .replace(/scrolling=["']([^"']*)["']/g, 'scrolling="$1"');

    // Sanitize the HTML to prevent XSS attacks
    return DOMPurify.sanitize(fixedHTML, {
      ADD_ATTR: ['target', 'frameBorder', 'allowFullScreen', 'marginHeight', 'marginWidth', 'scrolling'],
    });
  };

  // Sanitize and fix the HTML
  const sanitizedHTML = sanitizeAndFixHTML(html);

  return (
    <div
      className="custom-html-content"
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
}
