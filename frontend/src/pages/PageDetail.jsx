import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText } from 'lucide-react';
import PostContent from '../components/PostContent';
import { BACKEND_URL } from '../lib/api';

export default function PageDetail() {
  const { slug } = useParams();
  const [result, setResult] = useState({ slug: null, page: null });
  const loading = result.slug !== slug;
  const page = loading ? null : result.page;

  useEffect(() => {
    let cancelled = false;
    fetch(`${BACKEND_URL}/api/summit/pages/${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((res) => {
        if (!cancelled) setResult({ slug, page: res.success ? res.data : null });
      })
      .catch(() => {
        if (!cancelled) setResult({ slug, page: null });
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (page) document.title = `${page.title} | International Commodity Summit`;
  }, [page]);

  if (loading) {
    return <div className="text-slate-500 px-4 py-12 max-w-3xl mx-auto">Loading page...</div>;
  }

  if (!page) {
    return (
      <div className="px-4 py-16 text-center bg-white">
        <h2 className="font-heading text-2xl font-bold mb-4 text-slate-900">Page Not Found</h2>
        <Link to="/" className="text-[#005EFF] underline">Return to Home</Link>
      </div>
    );
  }

  const html = (page.content || []).map((block) => block.value || '').join('\n');

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white min-h-[70vh]">
      <div className="max-w-3xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 py-1 text-xs font-semibold text-slate-500 hover:text-[#005EFF] mb-6 sm:mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Summit Home
        </Link>

        <header className="mb-8 sm:mb-10 pb-6 border-b border-slate-200">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#005EFF] font-bold uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5" /> Summit Official Document
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-slate-900 mb-3 leading-tight break-words">
            {page.title}
          </h1>
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#F40260]" />
            <span>Updated: {new Date(page.updatedAt || page.publishedAt).toLocaleDateString()}</span>
          </div>
        </header>

        {html.trim() ? (
          <PostContent html={html} />
        ) : (
          <p className="text-slate-500">Content currently being updated by the summit secretariat.</p>
        )}
      </div>
    </div>
  );
}
