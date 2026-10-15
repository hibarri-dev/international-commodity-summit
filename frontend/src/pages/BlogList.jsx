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
    <div className="py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white min-h-[70vh]">
      <div className="max-w-6xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 py-1 text-xs font-semibold text-slate-500 hover:text-[#005EFF] mb-6 sm:mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Summit Home
        </Link>

        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#005EFF] mb-3">
            <Newspaper className="w-3.5 h-3.5" /> News & Insights
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-slate-900 mb-3 sm:mb-4 leading-tight">
            Commodity Market Dispatches & Articles
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
            Market analysis, plenary insights, and official announcements from the International Commodity Summit.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
                <div className="aspect-[16/9] bg-slate-200" />
                <div className="p-6 space-y-3">
                  <div className="h-3 w-24 bg-slate-200 rounded" />
                  <div className="h-5 w-full bg-slate-200 rounded" />
                  <div className="h-3 w-5/6 bg-slate-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : failed ? (
          <div className="text-slate-500 py-12">Articles could not be loaded right now. Please try again shortly.</div>
        ) : posts.length === 0 ? (
          <div className="text-slate-500 py-12">No articles published yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {posts.map((post) => (
              <Link
                key={post._id}
                to={`/post/${post.slug}`}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-[#005EFF]/50 shadow-xs hover:shadow-lg transition-all flex flex-col overflow-hidden"
              >
                <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                  {post.featuredImageUrl ? (
                    <img
                      src={post.featuredImageUrl}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100">
                      <Newspaper className="w-10 h-10 text-slate-300" />
                    </div>
                  )}
                </div>
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mb-3">
                    {post.category && (
                      <span className="font-bold uppercase tracking-wider text-[10px] text-[#F40260]">{post.category}</span>
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
                  <h3 className="font-heading font-black text-lg text-slate-900 group-hover:text-[#005EFF] transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-xs text-slate-600 line-clamp-3 mb-4 flex-1">
                      {post.excerpt}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#005EFF] mt-auto">
                    Read Dispatch <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
