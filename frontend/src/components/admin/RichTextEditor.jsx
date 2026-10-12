import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useEditor, useEditorState, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  CodeXml,
  Minus,
  Link2,
  Unlink,
  ImagePlus,
  Image as ImageIcon,
  Undo2,
  Redo2,
  FileCode,
  LoaderCircle,
  Trash2,
  X,
} from 'lucide-react';
import { ARTICLE_CLASSES } from '../PostContent';

const inputClass =
  'w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#7a2fd6]';

function normalizeUrl(raw) {
  const url = raw.trim();
  if (!url) return '';
  if (/^(https?:|mailto:|tel:|\/|#)/i.test(url)) return url;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(url)) return `mailto:${url}`;
  return `https://${url}`;
}

function altFromFileName(name) {
  return name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim();
}

function ToolbarButton({ onClick, active, disabled, title, children }) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
        active ? 'bg-[#7a2fd6] text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}

const Divider = () => <span className="w-px h-6 bg-white/10 mx-1" />;

/**
 * WYSIWYG article editor. Emits sanitized-on-save HTML via `onChange`.
 * `value` is only read on mount — remount with a new `key` to load a different post.
 */
export default function RichTextEditor({ value, onChange, onUploadImage, placeholder = 'Start writing your article…' }) {
  const [panel, setPanel] = useState(null); // null | 'link' | 'imageUrl'
  const [linkUrl, setLinkUrl] = useState('');
  const [linkNewTab, setLinkNewTab] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [uploading, setUploading] = useState(0);
  const [uploadError, setUploadError] = useState('');
  const [sourceMode, setSourceMode] = useState(false);
  const [sourceHtml, setSourceHtml] = useState('');
  const fileInputRef = useRef(null);

  // Editor callbacks are bound once at creation; refs keep them pointing at the latest props.
  const onChangeRef = useRef(onChange);
  const onUploadRef = useRef(onUploadImage);
  const editorRef = useRef(null);

  const insertImageFiles = async (files, position) => {
    const images = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (!images.length || !editorRef.current) return false;
    setUploadError('');
    for (const file of images) {
      setUploading((n) => n + 1);
      try {
        const src = await onUploadRef.current(file);
        const editor = editorRef.current;
        const node = { type: 'image', attrs: { src, alt: altFromFileName(file.name) } };
        if (typeof position === 'number') editor.chain().focus().insertContentAt(position, node).run();
        else editor.chain().focus().setImage(node.attrs).run();
      } catch (err) {
        setUploadError(err.message || 'Image upload failed');
      } finally {
        setUploading((n) => n - 1);
      }
    }
    return true;
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: {
          openOnClick: false,
          autolink: true,
          defaultProtocol: 'https',
          HTMLAttributes: { target: null, rel: null },
        },
      }),
      Image.configure({ HTMLAttributes: { loading: 'lazy' } }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || '',
    editorProps: {
      attributes: { class: `${ARTICLE_CLASSES} tiptap min-h-[420px] px-5 py-4` },
      handlePaste: (view, event) => {
        const files = event.clipboardData?.files;
        if (!files?.length || !Array.from(files).some((f) => f.type.startsWith('image/'))) return false;
        event.preventDefault();
        insertImageFiles(files);
        return true;
      },
      handleDrop: (view, event, slice, moved) => {
        const files = event.dataTransfer?.files;
        if (moved || !files?.length || !Array.from(files).some((f) => f.type.startsWith('image/'))) return false;
        event.preventDefault();
        const pos = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos;
        insertImageFiles(files, pos);
        return true;
      },
    },
    onUpdate: ({ editor: ed }) => onChangeRef.current(ed.isEmpty ? '' : ed.getHTML()),
  });

  useLayoutEffect(() => {
    onChangeRef.current = onChange;
    onUploadRef.current = onUploadImage;
    editorRef.current = editor;
  });

  const state = useEditorState({
    editor,
    selector: ({ editor: ed }) => {
      if (!ed) return null;
      const text = ed.getText();
      return {
        bold: ed.isActive('bold'),
        italic: ed.isActive('italic'),
        underline: ed.isActive('underline'),
        strike: ed.isActive('strike'),
        h2: ed.isActive('heading', { level: 2 }),
        h3: ed.isActive('heading', { level: 3 }),
        bulletList: ed.isActive('bulletList'),
        orderedList: ed.isActive('orderedList'),
        blockquote: ed.isActive('blockquote'),
        codeBlock: ed.isActive('codeBlock'),
        link: ed.isActive('link'),
        image: ed.isActive('image') ? ed.getAttributes('image') : null,
        canUndo: ed.can().undo(),
        canRedo: ed.can().redo(),
        words: text.trim() ? text.trim().split(/\s+/).length : 0,
      };
    },
  });

  useEffect(() => {
    if (!uploadError) return undefined;
    const t = setTimeout(() => setUploadError(''), 6000);
    return () => clearTimeout(t);
  }, [uploadError]);

  if (!editor || !state) return null;

  const chain = () => editor.chain().focus();

  const openLinkPanel = () => {
    const attrs = editor.getAttributes('link');
    setLinkUrl(attrs.href || '');
    setLinkNewTab(attrs.target === '_blank');
    setPanel('link');
  };

  const applyLink = (e) => {
    e.preventDefault();
    const href = normalizeUrl(linkUrl);
    if (!href) {
      chain().extendMarkRange('link').unsetLink().run();
    } else {
      const attrs = { href, target: linkNewTab ? '_blank' : null };
      if (editor.state.selection.empty && !editor.isActive('link')) {
        chain().insertContent({ type: 'text', text: linkUrl.trim(), marks: [{ type: 'link', attrs }] }).run();
      } else {
        chain().extendMarkRange('link').setLink(attrs).run();
      }
    }
    setPanel(null);
  };

  const applyImageUrl = (e) => {
    e.preventDefault();
    const src = normalizeUrl(imageUrl);
    if (/^https?:\/\//i.test(src)) chain().setImage({ src, alt: imageAlt.trim() }).run();
    setImageUrl('');
    setImageAlt('');
    setPanel(null);
  };

  const toggleSourceMode = () => {
    if (sourceMode) {
      editor.commands.setContent(sourceHtml, { emitUpdate: true });
    } else {
      setSourceHtml(editor.isEmpty ? '' : editor.getHTML());
    }
    setSourceMode(!sourceMode);
  };

  const iconSize = 'w-4 h-4';

  return (
    <div
      className="rounded-xl border border-white/10 bg-[#0d0f1c]"
      onKeyDown={(e) => {
        if (!sourceMode && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          openLinkPanel();
        }
      }}
    >
      {/* Toolbar */}
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-white/10 bg-[#151933] rounded-t-xl">
        <ToolbarButton title="Undo (Ctrl+Z)" disabled={sourceMode || !state.canUndo} onClick={() => chain().undo().run()}>
          <Undo2 className={iconSize} />
        </ToolbarButton>
        <ToolbarButton title="Redo (Ctrl+Shift+Z)" disabled={sourceMode || !state.canRedo} onClick={() => chain().redo().run()}>
          <Redo2 className={iconSize} />
        </ToolbarButton>
        <Divider />
        <ToolbarButton title="Heading" active={state.h2} disabled={sourceMode} onClick={() => chain().toggleHeading({ level: 2 }).run()}>
          <Heading2 className={iconSize} />
        </ToolbarButton>
        <ToolbarButton title="Subheading" active={state.h3} disabled={sourceMode} onClick={() => chain().toggleHeading({ level: 3 }).run()}>
          <Heading3 className={iconSize} />
        </ToolbarButton>
        <Divider />
        <ToolbarButton title="Bold (Ctrl+B)" active={state.bold} disabled={sourceMode} onClick={() => chain().toggleBold().run()}>
          <Bold className={iconSize} />
        </ToolbarButton>
        <ToolbarButton title="Italic (Ctrl+I)" active={state.italic} disabled={sourceMode} onClick={() => chain().toggleItalic().run()}>
          <Italic className={iconSize} />
        </ToolbarButton>
        <ToolbarButton title="Underline (Ctrl+U)" active={state.underline} disabled={sourceMode} onClick={() => chain().toggleUnderline().run()}>
          <Underline className={iconSize} />
        </ToolbarButton>
        <ToolbarButton title="Strikethrough" active={state.strike} disabled={sourceMode} onClick={() => chain().toggleStrike().run()}>
          <Strikethrough className={iconSize} />
        </ToolbarButton>
        <Divider />
        <ToolbarButton title="Bulleted list" active={state.bulletList} disabled={sourceMode} onClick={() => chain().toggleBulletList().run()}>
          <List className={iconSize} />
        </ToolbarButton>
        <ToolbarButton title="Numbered list" active={state.orderedList} disabled={sourceMode} onClick={() => chain().toggleOrderedList().run()}>
          <ListOrdered className={iconSize} />
        </ToolbarButton>
        <ToolbarButton title="Quote" active={state.blockquote} disabled={sourceMode} onClick={() => chain().toggleBlockquote().run()}>
          <Quote className={iconSize} />
        </ToolbarButton>
        <ToolbarButton title="Code block" active={state.codeBlock} disabled={sourceMode} onClick={() => chain().toggleCodeBlock().run()}>
          <CodeXml className={iconSize} />
        </ToolbarButton>
        <ToolbarButton title="Divider line" disabled={sourceMode} onClick={() => chain().setHorizontalRule().run()}>
          <Minus className={iconSize} />
        </ToolbarButton>
        <Divider />
        <ToolbarButton title="Add / edit link (Ctrl+K)" active={state.link || panel === 'link'} disabled={sourceMode} onClick={openLinkPanel}>
          <Link2 className={iconSize} />
        </ToolbarButton>
        <ToolbarButton title="Remove link" disabled={sourceMode || !state.link} onClick={() => chain().extendMarkRange('link').unsetLink().run()}>
          <Unlink className={iconSize} />
        </ToolbarButton>
        <ToolbarButton title="Upload image (or paste / drag an image into the text)" disabled={sourceMode} onClick={() => fileInputRef.current?.click()}>
          <ImagePlus className={iconSize} />
        </ToolbarButton>
        <ToolbarButton title="Image from URL" active={panel === 'imageUrl'} disabled={sourceMode} onClick={() => setPanel(panel === 'imageUrl' ? null : 'imageUrl')}>
          <ImageIcon className={iconSize} />
        </ToolbarButton>
        <div className="ml-auto flex items-center gap-2">
          {uploading > 0 && (
            <span className="flex items-center gap-1.5 text-xs text-slate-300">
              <LoaderCircle className="w-3.5 h-3.5 animate-spin" /> Uploading…
            </span>
          )}
          <ToolbarButton title={sourceMode ? 'Back to visual editor' : 'Edit HTML source'} active={sourceMode} onClick={toggleSourceMode}>
            <FileCode className={iconSize} />
          </ToolbarButton>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          multiple
          hidden
          onChange={(e) => {
            insertImageFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </div>

      {/* Contextual panels */}
      {panel === 'link' && (
        <form onSubmit={applyLink} className="flex flex-wrap items-center gap-2 px-3 py-2 border-b border-white/10 bg-[#121526]">
          <input
            autoFocus
            type="text"
            placeholder="https://example.com, /post/some-slug or name@email.com"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className={`${inputClass} flex-1 min-w-[240px]`}
          />
          <label className="flex items-center gap-1.5 text-xs text-slate-300">
            <input type="checkbox" checked={linkNewTab} onChange={(e) => setLinkNewTab(e.target.checked)} />
            Open in new tab
          </label>
          <button type="submit" className="px-3 py-2 rounded-lg text-xs font-bold bg-[#7a2fd6] text-white">
            Apply
          </button>
          <button type="button" onClick={() => setPanel(null)} className="p-2 text-slate-400 hover:text-white" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </form>
      )}

      {panel === 'imageUrl' && (
        <form onSubmit={applyImageUrl} className="flex flex-wrap items-center gap-2 px-3 py-2 border-b border-white/10 bg-[#121526]">
          <input
            autoFocus
            type="url"
            required
            placeholder="https://… image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className={`${inputClass} flex-1 min-w-[220px]`}
          />
          <input
            type="text"
            placeholder="Alt text (describe the image)"
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
            className={`${inputClass} flex-1 min-w-[180px]`}
          />
          <button type="submit" className="px-3 py-2 rounded-lg text-xs font-bold bg-[#7a2fd6] text-white">
            Insert
          </button>
          <button type="button" onClick={() => setPanel(null)} className="p-2 text-slate-400 hover:text-white" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </form>
      )}

      {state.image && !sourceMode && (
        <div className="flex flex-wrap items-center gap-2 px-3 py-2 border-b border-white/10 bg-[#121526]">
          <span className="text-xs font-semibold text-slate-400">Selected image · Alt text</span>
          <input
            type="text"
            placeholder="Describe the image for SEO & screen readers"
            value={state.image.alt || ''}
            onChange={(e) => editor.commands.updateAttributes('image', { alt: e.target.value })}
            className={`${inputClass} flex-1 min-w-[220px]`}
          />
          <button
            type="button"
            onClick={() => chain().deleteSelection().run()}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold text-rose-400 hover:bg-white/5"
          >
            <Trash2 className="w-3.5 h-3.5" /> Remove
          </button>
        </div>
      )}

      {uploadError && (
        <div className="px-3 py-2 text-xs text-rose-300 bg-rose-500/10 border-b border-rose-500/20">{uploadError}</div>
      )}

      {/* Body */}
      {sourceMode ? (
        <textarea
          value={sourceHtml}
          onChange={(e) => {
            setSourceHtml(e.target.value);
            onChange(e.target.value);
          }}
          spellCheck={false}
          className="w-full min-h-[420px] px-5 py-4 bg-transparent text-slate-200 font-mono text-xs leading-relaxed focus:outline-none"
        />
      ) : (
        <EditorContent editor={editor} />
      )}

      <div className="flex justify-between px-4 py-2 border-t border-white/10 text-[11px] text-slate-500">
        <span>Tip: paste or drag images straight into the text. Shift+Enter for a line break.</span>
        <span>
          {state.words} words · ~{Math.max(1, Math.round(state.words / 220))} min read
        </span>
      </div>
    </div>
  );
}
