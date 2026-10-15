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
    return <div className="text-slate-500 px-4 py-12 max-w-3xl mx-auto">Loading article...</div>;
  }

  if (!post) {
    return (
      <div className="px-4 py-16 text-center bg-white">
        <h2 className="text-2xl font-bold mb-4 text-slate-900">Post Not Found</h2>
        <Link to="/posts" className="text-[#005EFF] underline">Return to all posts</Link>
      </div>
    );
  }

  return (
    <article className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white min-h-[70vh]">
      <div className="max-w-3xl mx-auto">
        <Link 
          to="/posts" 
          className="inline-flex items-center gap-2 py-1 text-xs font-semibold text-slate-500 hover:text-[#005EFF] mb-6 sm:mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dispatches
        </Link>

        <header className="mb-8 sm:mb-10">
          {post.category && (
            <span className="inline-block mb-4 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-[11px] font-bold uppercase tracking-wider text-[#F40260]">
              {post.category}
            </span>
          )}
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-slate-900 mb-4 sm:mb-5 leading-tight break-words">
            {post.title}
          </h1>
          {post.excerpt && <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">{post.excerpt}</p>}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#005EFF]" />
              {post.authorName || 'Summit Editorial'}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#F40260]" />
              {new Date(post.publishedAt || post.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            {post.readingMinutes && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#005EFF]" />
                {post.readingMinutes} min read
              </span>
            )}
          </div>
        </header>

        {post.featuredImageUrl && (
          <img
            src={post.featuredImageUrl}
            alt={post.title}
            className="w-full aspect-[16/9] object-cover rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm mb-8 sm:mb-10"
          />
        )}

        <PostContent html={post.contentHtml} />

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700 font-medium">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
