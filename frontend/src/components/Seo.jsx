import { useEffect } from 'react';

export const SITE_URL = 'https://internationalcommoditysummit.com';

function upsertHeadTag(selector, create) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = create();
    document.head.appendChild(tag);
  }
  return tag;
}

function setMeta(attr, key, content) {
  const tag = upsertHeadTag(`meta[${attr}="${key}"]`, () => {
    const el = document.createElement('meta');
    el.setAttribute(attr, key);
    return el;
  });
  tag.setAttribute('content', content);
}

/**
 * Per-page title, description, canonical URL and robots directive. index.html already has static
 * defaults, so these tags are updated in place rather than added alongside them.
 */
export default function Seo({ title, description, path, noindex = false }) {
  useEffect(() => {
    if (title) {
      document.title = title;
      setMeta('property', 'og:title', title);
    }
    if (description) {
      setMeta('name', 'description', description);
      setMeta('property', 'og:description', description);
    }

    const canonical = upsertHeadTag('link[rel="canonical"]', () => {
      const el = document.createElement('link');
      el.rel = 'canonical';
      return el;
    });
    if (path !== undefined) {
      canonical.href = `${SITE_URL}${path}`;
      setMeta('property', 'og:url', canonical.href);
    } else {
      canonical.remove();
    }

    const robots = document.head.querySelector('meta[name="robots"]');
    if (noindex) setMeta('name', 'robots', 'noindex, nofollow');
    else robots?.remove();
  }, [title, description, path, noindex]);

  return null;
}
