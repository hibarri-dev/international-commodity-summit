import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowLeft, ExternalLink, ImagePlus, LoaderCircle, Save, Send, Trash2, CircleCheck } from 'lucide-react';
import RichTextEditor from './RichTextEditor';
import { adminRequest, uploadAdminImage } from '../../lib/api';

const inputClass =
  'w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#7a2fd6]';
const labelClass = 'block text-xs font-semibold text-slate-400 mb-1';
const cardClass = 'bg-[#121526] p-5 rounded-2xl border border-white/10';

function slugify(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

function toLocalInput(date) {
  if (!date) return '';
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return '';
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

function formFromPost(post) {
  return {
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    category: post?.category || 'General',
    tags: (post?.tags || []).join(', '),
    authorName: post?.authorName || 'Summit Editorial',
    featuredImageUrl: post?.featuredImageUrl || '',
    status: post?.status || 'draft',
    publishedAt: toLocalInput(post?.publishedAt),
    contentHtml: post?.contentHtml || '',
  };
}

export default function PostEditor({ post, token, onSaved, onClose, onAuthError }) {
  const [postId, setPostId] = useState(post?._id || null);
  const [form, setForm] = useState(() => formFromPost(post));
  const [savedSnapshot, setSavedSnapshot] = useState(() => JSON.stringify(formFromPost(post)));
  const [savedSlug, setSavedSlug] = useState(post?.slug || '');
  const [savedStatus, setSavedStatus] = useState(post?.status || 'draft');
  const [slugTouched, setSlugTouched] = useState(Boolean(post?._id));
  const [saving, setSaving] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const coverInputRef = useRef(null);

  const dirty = JSON.stringify(form) !== savedSnapshot;
  const isPublishedOnServer = Boolean(postId) && savedStatus === 'published';

  const set = (field) => (value) => setForm((f) => ({ ...f, [field]: value }));

  const setTitle = (title) =>
    setForm((f) => ({ ...f, title, slug: slugTouched ? f.slug : slugify(title) }));

  const uploadImage = async (file) => {
    try {
      return await uploadAdminImage(file, token);
    } catch (err) {
      if (err.status === 401) onAuthError();
      throw err;
    }
  };

  const handleCoverFile = async (file) => {
    if (!file) return;
    setCoverUploading(true);
    setError('');
    try {
      set('featuredImageUrl')(await uploadImage(file));
    } catch (err) {
      setError(err.message);
    } finally {
      setCoverUploading(false);
    }
  };

  const save = async (status = form.status) => {
    const next = { ...form, status };
    if (!next.title.trim()) return setError('Title is required.');
    if (status === 'published' && !next.contentHtml.replace(/<[^>]*>/g, '').trim() && !/<img/i.test(next.contentHtml)) {
      return setError('Add some content before publishing.');
    }

    setSaving(true);
    setError('');
    try {
      const body = {
        ...next,
        slug: next.slug || slugify(next.title),
        tags: next.tags.split(',').map((t) => t.trim()).filter(Boolean),
        publishedAt: next.publishedAt ? new Date(next.publishedAt).toISOString() : null,
      };
      const { data } = postId
        ? await adminRequest(`/api/admin/summit/posts/${postId}`, { method: 'PATCH', body, token })
        : await adminRequest('/api/admin/summit/posts', { method: 'POST', body, token });

      // Keep the editor's content as typed (no remount); sync server-normalized metadata.
      const synced = { ...formFromPost(data), contentHtml: next.contentHtml };
      setPostId(data._id);
      setForm(synced);
      setSavedSnapshot(JSON.stringify(synced));
      setSavedSlug(data.slug);
      setSavedStatus(data.status);
      setSlugTouched(true);
      setNotice(status === 'published' ? 'Published' : 'Draft saved');
      onSaved(data);
    } catch (err) {
      if (err.status === 401) onAuthError();
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const saveRef = useRef(save);
  useLayoutEffect(() => {
    saveRef.current = save;
  });

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        saveRef.current();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  useEffect(() => {
    if (!notice) return undefined;
    const t = setTimeout(() => setNotice(''), 3000);
    return () => clearTimeout(t);
  }, [notice]);

  const close = () => {
    if (dirty && !confirm('You have unsaved changes. Leave without saving?')) return;
    onClose();
  };

  const excerptLength = form.excerpt.length;
  const slugChangedOnLivePost = isPublishedOnServer && form.slug !== savedSlug;
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button onClick={close} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4" /> All posts
        </button>
        <div className="flex items-center gap-3 text-xs">
          {notice && (
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <CircleCheck className="w-4 h-4" /> {notice}
            </span>
          )}
          {!notice && dirty && <span className="text-amber-400 font-semibold">Unsaved changes</span>}
          {isPublishedOnServer && savedSlug && (
            <a
              href={`/post/${savedSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-[#4d8ff0] hover:text-white"
            >
              View live <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {error && (
        <div className="px-4 py-3 rounded-xl text-sm text-rose-200 bg-rose-500/10 border border-rose-500/30">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
        {/* Main column */}
        <div className="space-y-4 min-w-0">
          <input
            type="text"
            placeholder="Post title"
            value={form.title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-1 py-2 bg-transparent border-0 border-b border-white/10 text-white font-heading font-black text-3xl sm:text-4xl placeholder:text-slate-600 focus:outline-none focus:border-[#7a2fd6]"
          />
          <RichTextEditor
            key={post?._id || 'new'}
            value={form.contentHtml}
            onChange={set('contentHtml')}
            onUploadImage={uploadImage}
          />
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-6">
          <div className={cardClass}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-white">Publish</h3>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  form.status === 'published' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'
                }`}
              >
                {form.status}
              </span>
            </div>
            <label className={labelClass}>Publish date</label>
            <input
              type="datetime-local"
              value={form.publishedAt}
              onChange={(e) => set('publishedAt')(e.target.value)}
              className={`${inputClass} [color-scheme:dark]`}
            />
            <p className="text-[11px] text-slate-500 mt-1 mb-4">Leave empty to use the moment you publish.</p>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                disabled={saving}
                onClick={() => save('published')}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-heading font-bold text-sm text-white bg-gradient-to-r from-[#1863dc] to-[#e01377] hover:opacity-90 disabled:opacity-50"
              >
                {saving ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {isPublishedOnServer ? 'Update post' : 'Publish'}
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => save('draft')}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold text-xs text-slate-200 bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isPublishedOnServer ? 'Unpublish → save as draft' : 'Save draft'}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-3">Ctrl+S saves without changing the status.</p>
          </div>

          <div className={cardClass}>
            <label className={labelClass}>URL slug</label>
            <div className="flex items-center rounded-xl bg-white/5 border border-white/10 focus-within:border-[#7a2fd6]">
              <span className="pl-3 text-xs text-slate-500">/post/</span>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  set('slug')(e.target.value);
                }}
                onBlur={() => set('slug')(slugify(form.slug) || slugify(form.title))}
                className="flex-1 min-w-0 px-1 py-2.5 bg-transparent text-white text-sm focus:outline-none"
              />
            </div>
            {slugChangedOnLivePost && (
              <p className="text-[11px] text-amber-400 mt-1">
                This post is live — changing the URL breaks links already shared or indexed by Google.
              </p>
            )}
          </div>

          <div className={cardClass}>
            <label className={labelClass}>Featured image</label>
            {form.featuredImageUrl ? (
              <div className="relative group">
                <img src={form.featuredImageUrl} alt="" className="w-full aspect-video object-cover rounded-xl border border-white/10" />
                <div className="absolute inset-0 flex items-center justify-center gap-2 rounded-xl bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => coverInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 text-white hover:bg-white/20"
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={() => set('featuredImageUrl')('')}
                    className="p-1.5 rounded-lg text-rose-300 bg-white/10 hover:bg-white/20"
                    aria-label="Remove featured image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                disabled={coverUploading}
                onClick={() => coverInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleCoverFile(e.dataTransfer.files?.[0]);
                }}
                className="w-full aspect-video flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/10 text-slate-400 hover:border-[#7a2fd6] hover:text-white transition-colors"
              >
                {coverUploading ? <LoaderCircle className="w-6 h-6 animate-spin" /> : <ImagePlus className="w-6 h-6" />}
                <span className="text-xs font-semibold">{coverUploading ? 'Uploading…' : 'Click or drop an image'}</span>
                <span className="text-[10px] text-slate-500">1600×900 recommended · max 8 MB</span>
              </button>
            )}
            <input
              ref={coverInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
              hidden
              onChange={(e) => {
                handleCoverFile(e.target.files?.[0]);
                e.target.value = '';
              }}
            />
            <input
              type="url"
              placeholder="…or paste an image URL"
              value={form.featuredImageUrl}
              onChange={(e) => set('featuredImageUrl')(e.target.value)}
              className={`${inputClass} mt-2 text-xs`}
            />
          </div>

          <div className={`${cardClass} space-y-4`}>
            <div>
              <label className={labelClass}>Excerpt / meta description</label>
              <textarea
                rows={3}
                maxLength={300}
                placeholder="1–2 sentence summary for cards and Google. Leave empty to auto-generate."
                value={form.excerpt}
                onChange={(e) => set('excerpt')(e.target.value)}
                className={`${inputClass} resize-y`}
              />
              <p className={`text-[11px] mt-1 ${excerptLength > 160 ? 'text-amber-400' : 'text-slate-500'}`}>
                {excerptLength}/160 recommended
              </p>
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <input
                type="text"
                list="summit-post-categories"
                value={form.category}
                onChange={(e) => set('category')(e.target.value)}
                className={inputClass}
              />
              <datalist id="summit-post-categories">
                {['General', 'Metals', 'Energy', 'Agriculture', 'Markets', 'Summit News', 'Speakers'].map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
            <div>
              <label className={labelClass}>Tags (comma separated)</label>
              <input
                type="text"
                placeholder="copper, supply chain, 2028"
                value={form.tags}
                onChange={(e) => set('tags')(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Author</label>
              <input
                type="text"
                value={form.authorName}
                onChange={(e) => set('authorName')(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
