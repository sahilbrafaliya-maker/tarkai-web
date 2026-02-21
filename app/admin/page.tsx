'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Blog {
    _id: string;
    id: number;
    slug: string;
    title: string;
    description: string;
    date: string;
    tag: string;
    coverImage: string;
    paragraph: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    images: string[];
}

const emptyForm = {
    title: '',
    description: '',
    date: '',
    tag: '',
    paragraph: '',
    instagram: '',
    linkedin: '',
    twitter: '',
};

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');

    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [markdownPreview, setMarkdownPreview] = useState(false);

    // Cover image state
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
    const [coverImagePreview, setCoverImagePreview] = useState<string>('');
    const [existingCoverImage, setExistingCoverImage] = useState<string>('');

    // Gallery images state
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>([]);

    const coverInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);

    const showToast = (msg: string, type: 'success' | 'error') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'tarkai@admin2025') {
            setIsAuthenticated(true);
            fetchBlogs();
        } else {
            setAuthError('Incorrect password. Please try again.');
        }
    };

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/blogs');
            const data = await res.json();
            setBlogs(Array.isArray(data) ? data : []);
        } catch {
            showToast('Failed to load blogs', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setCoverImageFile(file);
        setCoverImagePreview(URL.createObjectURL(file));
    };

    const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setGalleryFiles(prev => [...prev, ...files]);
        const newPreviews = files.map(f => URL.createObjectURL(f));
        setGalleryPreviews(prev => [...prev, ...newPreviews]);
    };

    const removeGalleryPreview = (index: number) => {
        setGalleryFiles(prev => prev.filter((_, i) => i !== index));
        setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (index: number) => {
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    };

    const resetForm = () => {
        setForm(emptyForm);
        setEditingId(null);
        setCoverImageFile(null);
        setCoverImagePreview('');
        setExistingCoverImage('');
        setGalleryFiles([]);
        setGalleryPreviews([]);
        setExistingImages([]);
        setShowForm(false);
        setMarkdownPreview(false);
    };

    const handleEdit = (blog: Blog) => {
        setForm({
            title: blog.title || '',
            description: blog.description || '',
            date: blog.date || '',
            tag: blog.tag || '',
            paragraph: blog.paragraph || '',
            instagram: blog.instagram || '',
            linkedin: blog.linkedin || '',
            twitter: blog.twitter || '',
        });
        setEditingId(blog.id);
        setExistingCoverImage(blog.coverImage || '');
        setCoverImageFile(null);
        setCoverImagePreview('');
        setExistingImages(blog.images || []);
        setGalleryFiles([]);
        setGalleryPreviews([]);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this blog post?')) return;
        try {
            const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
            if (res.ok) {
                showToast('Blog deleted successfully', 'success');
                fetchBlogs();
            } else {
                showToast('Failed to delete blog', 'error');
            }
        } catch {
            showToast('Failed to delete blog', 'error');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title.trim()) {
            showToast('Title is required', 'error');
            return;
        }
        setSubmitting(true);

        try {
            // 1. Upload cover image if new one selected
            let coverImageUrl = existingCoverImage;
            if (coverImageFile) {
                const fd = new FormData();
                fd.append('file', coverImageFile);
                const res = await fetch('/api/upload', { method: 'POST', body: fd });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Cover image upload failed');
                coverImageUrl = data.url;
            }

            // 2. Upload new gallery images
            let newImageUrls: string[] = [];
            if (galleryFiles.length > 0) {
                const fd = new FormData();
                galleryFiles.forEach(f => fd.append('file', f));
                const res = await fetch('/api/upload-multiple', { method: 'POST', body: fd });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Gallery upload failed');
                newImageUrls = data.urls || [];
            }

            const allImages = [...existingImages, ...newImageUrls];

            const slug = form.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');

            const payload = {
                ...form,
                coverImage: coverImageUrl,
                images: allImages,
                ...(editingId === null && { slug }),
            };

            const url = editingId !== null ? `/api/blogs/${editingId}` : '/api/blogs';
            const method = editingId !== null ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                showToast(editingId !== null ? 'Blog updated!' : 'Blog created!', 'success');
                resetForm();
                fetchBlogs();
            } else {
                const err = await res.json();
                showToast(err.error || 'Failed to save blog', 'error');
            }
        } catch (err: any) {
            showToast(err.message || 'Something went wrong', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    // ─── Render ─────────────────────────────────────────────────────────────────
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
                <form onSubmit={handleAuth} className="bg-[#12121a] border border-white/10 rounded-2xl p-10 w-full max-w-md flex flex-col gap-5 shadow-2xl">
                    <div className="text-center mb-2">
                        <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
                        <p className="text-white/50 text-sm mt-1">TarkAI Blog Management</p>
                    </div>
                    <input
                        type="password"
                        placeholder="Enter admin password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-violet-500 transition"
                    />
                    {authError && <p className="text-red-400 text-sm text-center">{authError}</p>}
                    <button type="submit" className="bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl py-3 transition">
                        Login
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white pb-20">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium transition-all ${toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'}`}>
                    {toast.msg}
                </div>
            )}

            {/* Header */}
            <div className="border-b border-white/10 px-6 py-5 flex items-center justify-between sticky top-0 bg-[#0a0a0f]/95 backdrop-blur z-40">
                <h1 className="text-xl font-bold text-white">
                    <span className="text-violet-400">TarkAI</span> Blog Admin
                </h1>
                <button
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition"
                >
                    + New Blog
                </button>
            </div>

            <div className="max-w-5xl mx-auto px-4 mt-8 flex flex-col gap-8">

                {/* ─── Form ──────────────────────────────────────────────────── */}
                {showForm && (
                    <form onSubmit={handleSubmit} className="bg-[#12121a] border border-white/10 rounded-2xl p-8 flex flex-col gap-6">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-lg font-semibold text-white/90">
                                {editingId !== null ? 'Edit Blog Post' : 'New Blog Post'}
                            </h2>
                            <button type="button" onClick={resetForm} className="text-white/40 hover:text-white text-sm transition">✕ Cancel</button>
                        </div>

                        {/* Cover Image */}
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-2">Cover Image</label>
                            <div
                                onClick={() => coverInputRef.current?.click()}
                                className="border-2 border-dashed border-white/10 hover:border-violet-500/50 rounded-xl cursor-pointer transition flex items-center justify-center overflow-hidden"
                                style={{ minHeight: '160px' }}
                            >
                                {(coverImagePreview || existingCoverImage) ? (
                                    <div className="relative w-full" style={{ height: '200px' }}>
                                        <Image
                                            src={coverImagePreview || existingCoverImage}
                                            alt="Cover preview"
                                            fill
                                            className="object-cover rounded-xl"
                                        />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition rounded-xl">
                                            <span className="text-white text-sm font-medium">Click to change</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-10 px-4">
                                        <div className="text-4xl mb-2 opacity-30">🖼</div>
                                        <p className="text-white/30 text-sm">Click to upload cover image</p>
                                    </div>
                                )}
                            </div>
                            <input ref={coverInputRef} type="file" accept="image/*" onChange={handleCoverImageChange} className="hidden" />
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-2">Title *</label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                placeholder="Blog post title"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 outline-none focus:border-violet-500 transition"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-2">Description</label>
                            <textarea
                                value={form.description}
                                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                placeholder="Short summary shown on blog cards"
                                rows={3}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 outline-none focus:border-violet-500 transition resize-none"
                            />
                        </div>

                        {/* Date & Tag */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-2">Date</label>
                                <input
                                    type="date"
                                    value={form.date}
                                    onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-violet-500 transition [color-scheme:dark]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-2">Tag</label>
                                <input
                                    type="text"
                                    value={form.tag}
                                    onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}
                                    placeholder="e.g. AI Trends, Career, Data Science"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 outline-none focus:border-violet-500 transition"
                                />
                            </div>
                        </div>

                        {/* Paragraph – Markdown */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-medium text-white/60">Paragraph (Markdown)</label>
                                <button
                                    type="button"
                                    onClick={() => setMarkdownPreview(p => !p)}
                                    className="text-xs text-violet-400 hover:text-violet-300 transition"
                                >
                                    {markdownPreview ? '✏️ Edit' : '👁 Preview'}
                                </button>
                            </div>
                            {markdownPreview ? (
                                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 min-h-[200px] prose prose-invert prose-sm max-w-none text-white/80 text-sm leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(form.paragraph) }}
                                />
                            ) : (
                                <textarea
                                    value={form.paragraph}
                                    onChange={e => setForm(f => ({ ...f, paragraph: e.target.value }))}
                                    placeholder={"# Heading\n\nWrite your **markdown** content here...\n\n- List item 1\n- List item 2"}
                                    rows={10}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 outline-none focus:border-violet-500 transition resize-none font-mono text-sm"
                                />
                            )}
                            <p className="text-white/25 text-xs mt-1.5">Supports full Markdown: headings, bold, italic, lists, code blocks, links</p>
                        </div>

                        {/* Social URLs */}
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-3">Social URLs <span className="text-white/30 font-normal">(optional)</span></label>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-pink-400 text-lg w-6">📸</span>
                                    <input
                                        type="url"
                                        value={form.instagram}
                                        onChange={e => setForm(f => ({ ...f, instagram: e.target.value }))}
                                        placeholder="Instagram URL"
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 outline-none focus:border-pink-500 transition text-sm"
                                    />
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-blue-400 text-lg w-6">💼</span>
                                    <input
                                        type="url"
                                        value={form.linkedin}
                                        onChange={e => setForm(f => ({ ...f, linkedin: e.target.value }))}
                                        placeholder="LinkedIn URL"
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 outline-none focus:border-blue-500 transition text-sm"
                                    />
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sky-400 text-lg w-6">🐦</span>
                                    <input
                                        type="url"
                                        value={form.twitter}
                                        onChange={e => setForm(f => ({ ...f, twitter: e.target.value }))}
                                        placeholder="Twitter / X URL"
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 outline-none focus:border-sky-500 transition text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Gallery Images */}
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-2">Gallery Images <span className="text-white/30 font-normal">(multiple allowed)</span></label>

                            {/* Existing images */}
                            {existingImages.length > 0 && (
                                <div className="mb-3">
                                    <p className="text-xs text-white/30 mb-2">Existing images (click × to remove)</p>
                                    <div className="flex flex-wrap gap-2">
                                        {existingImages.map((url, i) => (
                                            <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden group">
                                                <Image src={url} alt={`image-${i}`} fill className="object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeExistingImage(i)}
                                                    className="absolute top-1 right-1 bg-black/70 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                                                >×</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* New previews */}
                            {galleryPreviews.length > 0 && (
                                <div className="mb-3 flex flex-wrap gap-2">
                                    {galleryPreviews.map((url, i) => (
                                        <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden group">
                                            <Image src={url} alt={`new-${i}`} fill className="object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeGalleryPreview(i)}
                                                className="absolute top-1 right-1 bg-black/70 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                                            >×</button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={() => galleryInputRef.current?.click()}
                                className="border-2 border-dashed border-white/10 hover:border-violet-500/50 rounded-xl px-6 py-4 text-white/30 hover:text-white/60 transition text-sm w-full"
                            >
                                + Add Images
                            </button>
                            <input ref={galleryInputRef} type="file" accept="image/*" multiple onChange={handleGalleryChange} className="hidden" />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold rounded-xl py-3.5 transition"
                        >
                            {submitting ? 'Saving...' : (editingId !== null ? 'Update Blog' : 'Publish Blog')}
                        </button>
                    </form>
                )}

                {/* ─── Blog List ──────────────────────────────────────────────── */}
                <div>
                    <h2 className="text-lg font-semibold text-white/80 mb-4">All Blog Posts <span className="text-white/30 text-sm font-normal">({blogs.length})</span></h2>
                    {loading ? (
                        <div className="text-center text-white/30 py-12">Loading...</div>
                    ) : blogs.length === 0 ? (
                        <div className="text-center text-white/30 py-12 bg-white/5 rounded-2xl border border-white/5">
                            <p className="text-5xl mb-3">📝</p>
                            <p>No blog posts yet. Create your first one!</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {blogs.map(blog => (
                                <div key={blog._id} className="bg-[#12121a] border border-white/10 rounded-2xl p-5 flex gap-5 items-start">
                                    {blog.coverImage && (
                                        <div className="relative w-20 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                            <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <h3 className="font-semibold text-white truncate">{blog.title}</h3>
                                                <p className="text-white/40 text-sm truncate mt-0.5">{blog.description}</p>
                                                <div className="flex items-center gap-3 mt-2">
                                                    {blog.tag && (
                                                        <span className="text-xs bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full">{blog.tag}</span>
                                                    )}
                                                    {blog.date && (
                                                        <span className="text-xs text-white/30">{formatDate(blog.date)}</span>
                                                    )}
                                                    {blog.images?.length > 0 && (
                                                        <span className="text-xs text-white/30">{blog.images.length} image{blog.images.length > 1 ? 's' : ''}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex gap-2 flex-shrink-0">
                                                <button
                                                    onClick={() => handleEdit(blog)}
                                                    className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(blog.id)}
                                                    className="text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-1.5 rounded-lg transition"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function formatDate(dateStr: string) {
    try {
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
        return dateStr;
    }
}

// Simple markdown-to-HTML for admin preview only (not used in public pages)
function simpleMarkdownToHtml(md: string) {
    if (!md) return '<p class="text-white/30">Nothing to preview yet...</p>';
    return md
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/^### (.+)$/gm, '<h3 class="text-base font-bold text-white mt-4 mb-1">$1</h3>')
        .replace(/^## (.+)$/gm, '<h2 class="text-lg font-bold text-white mt-5 mb-2">$1</h2>')
        .replace(/^# (.+)$/gm, '<h1 class="text-xl font-bold text-white mt-6 mb-2">$1</h1>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code class="bg-white/10 rounded px-1 text-xs">$1</code>')
        .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
        .replace(/\n{2,}/g, '</p><p class="mb-3">')
        .replace(/\n/g, '<br/>');
}
