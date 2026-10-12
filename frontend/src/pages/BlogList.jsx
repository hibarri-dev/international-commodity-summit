import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Calendar, Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import { BACKEND_URL } from '../lib/api';

function formatDate(value) {
  return new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    document.title = 'News & Insights | International Commodity Summit';
    fetch(`${BACKEND_URL}/api/summit/posts`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setPosts(res.data);
        else setFailed(true);
      })
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#090a12] text-slate-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Summit Home
        </Link>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#e01377] mb-3">
            <Newspaper className="w-3.5 h-3.5" /> News & Insights
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-5xl text-white mb-4">
            Commodity Market Dispatches & Articles
          </h1>
          <p className="text-slate-400 text-base max-w-2xl">
            Market analysis, speaker insights and announcements from the International Commodity Summit.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-[#121526] rounded-2xl border border-white/10 overflow-hidden animate-pulse">
                <div className="aspect-[16/9] bg-white/5" />
                <div className="p-6 space-y-3">
                  <div className="h-3 w-24 bg-white/5 rounded" />
                  <div className="h-5 w-full bg-white/5 rounded" />
                  <div className="h-3 w-5/6 bg-white/5 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : failed ? (
          <div className="text-slate-400 py-12">Articles could not be loaded right now. Please try again shortly.</div>
        ) : posts.length === 0 ? (
          <div className="text-slate-400 py-12">No articles published yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post._id}
                to={`/post/${post.slug}`}
                className="group bg-[#121526] rounded-2xl border border-white/10 hover:border-[#7a2fd6]/50 transition-all flex flex-col overflow-hidden"
              >
                <div className="aspect-[16/9] overflow-hidden bg-[linear-gradient(135deg,rgba(24,99,220,0.35),rgba(122,47,214,0.35),rgba(224,19,119,0.35))]">
                  {post.featuredImageUrl ? (
                    <img
                      src={post.featuredImageUrl}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Newspaper className="w-10 h-10 text-white/30" />
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mb-3">
                    {post.category && (
                      <span className="font-bold uppercase tracking-wider text-[10px] text-[#e01377]">{post.category}</span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(post.publishedAt || post.createdAt)}
                    </span>
                    {post.readingMinutes && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {post.readingMinutes} min read
                      </span>
                    )}
                  </div>
                  <h2 className="font-heading font-bold text-xl text-white mb-3 line-clamp-2 leading-snug group-hover:text-[#c9a7f5] transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && <p className="text-sm text-slate-400 line-clamp-3 mb-6">{post.excerpt}</p>}
                  <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-[#1863dc] group-hover:text-white transition-colors">
                    Read Full Dispatch <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
