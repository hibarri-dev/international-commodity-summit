import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';

export default function PageDetail() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/summit/pages/${slug}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setPage(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen bg-[#090a12] text-slate-400 p-12">Loading page...</div>;
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-[#090a12] text-slate-100 p-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <Link to="/" className="text-[#1863dc] underline">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090a12] text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Summit Home
        </Link>

        <header className="mb-10 pb-6 border-b border-white/10">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#7a2fd6] font-semibold uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5" /> Summit Official Document
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white mb-3">
            {page.title}
          </h1>
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#e01377]" />
            <span>Updated: {new Date(page.updatedAt || page.publishedAt || Date.now()).toLocaleDateString()}</span>
          </div>
        </header>

        <div className="prose prose-invert max-w-none text-slate-300 text-base leading-relaxed space-y-4">
          {page.content && page.content.length > 0 ? (
            page.content.map((block, idx) => (
              <div key={idx} dangerouslySetInnerHTML={{ __html: block.value }} />
            ))
          ) : (
            <p className="text-slate-400">Content currently being updated by the summit secretariat.</p>
          )}
        </div>
      </div>
    </div>
  );
}
