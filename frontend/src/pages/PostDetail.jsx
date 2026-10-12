import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import PostContent from '../components/PostContent';
import { BACKEND_URL } from '../lib/api';

function setMetaDescription(content) {
  let tag = document.querySelector('meta[name="description"]');
  if (!tag) {
    tag = document.createElement('meta');
    tag.name = 'description';
    document.head.appendChild(tag);
  }
  tag.content = content;
}

export default function PostDetail() {
  const { slug } = useParams();
  const [result, setResult] = useState({ slug: null, post: null });
  const loading = result.slug !== slug;
  const post = loading ? null : result.post;

  useEffect(() => {
    let cancelled = false;
    fetch(`${BACKEND_URL}/api/summit/posts/${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((res) => {
        if (!cancelled) setResult({ slug, post: res.success ? res.data : null });
      })
      .catch(() => {
        if (!cancelled) setResult({ slug, post: null });
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} | International Commodity Summit`;
    if (post.excerpt) setMetaDescription(post.excerpt);
    window.scrollTo(0, 0);
  }, [post]);

  if (loading) {
    return <div className="text-slate-400 px-4 py-12 max-w-3xl mx-auto">Loading article...</div>;
  }

  if (!post) {
    return (
      <div className="px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
        <Link to="/posts" className="text-[#1863dc] underline">Return to all posts</Link>
      </div>
    );
  }

  return (
    <article className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link 
          to="/posts" 
          className="inline-flex items-center gap-2 py-1 text-xs font-semibold text-slate-400 hover:text-white mb-6 sm:mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dispatches
        </Link>

        <header className="mb-8 sm:mb-10">
          {post.category && (
            <span className="inline-block mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold uppercase tracking-wider text-[#e01377]">
              {post.category}
            </span>
          )}
          <h1 className="font-heading font-black text-[1.75rem] min-[400px]:text-3xl sm:text-5xl text-white mb-4 sm:mb-5 leading-tight break-words">
            {post.title}
          </h1>
          {post.excerpt && <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-6">{post.excerpt}</p>}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#7a2fd6]" />
              {post.authorName || 'Summit Editorial'}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#e01377]" />
              {new Date(post.publishedAt || post.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            {post.readingMinutes && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#1863dc]" />
                {post.readingMinutes} min read
              </span>
            )}
          </div>
        </header>

        {post.featuredImageUrl && (
          <img
            src={post.featuredImageUrl}
            alt={post.title}
            className="w-full aspect-[16/9] object-cover rounded-xl sm:rounded-2xl border border-white/10 mb-8 sm:mb-10"
          />
        )}

        <PostContent html={post.contentHtml} />

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
