import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';

export const ARTICLE_CLASSES =
  'article-body prose prose-invert prose-lg max-w-none prose-headings:font-heading prose-headings:font-black prose-a:font-semibold';

DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A' && node.getAttribute('target') === '_blank') {
    node.setAttribute('rel', 'noopener noreferrer');
  }
  if (node.tagName === 'IMG') node.setAttribute('loading', 'lazy');
});

export default function PostContent({ html, className = '' }) {
  const safeHtml = useMemo(
    () => DOMPurify.sanitize(html || '', { ADD_ATTR: ['target'], FORBID_TAGS: ['style', 'form', 'input'] }),
    [html]
  );

  return <div className={`${ARTICLE_CLASSES} ${className}`} dangerouslySetInnerHTML={{ __html: safeHtml }} />;
}
