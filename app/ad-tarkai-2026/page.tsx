"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaEdit, FaTrash, FaPlus, FaLock, FaCalendarAlt, FaInstagram, FaLinkedin, FaTwitter, FaList, FaPen } from 'react-icons/fa';
import NextImage from 'next/image';

interface BlogPost {
    _id?: string;
    id: number;
    slug?: string;
    title: string;
    tag: string;
    date: string;
    coverImage: string;
    description: string;
    paragraph: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    images: string[];
    // legacy
    category?: string;
    image?: string;
    color?: string;
}

const emptyForm = {
    title: '',
    tag: '',
    date: new Date().toISOString().split('T')[0],
    coverImage: '',
    description: '',
    paragraph: '',
    instagram: '',
    linkedin: '',
    twitter: '',
    images: [] as string[],
};

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'manager' | 'form'>('manager');

    const [form, setForm] = useState<typeof emptyForm>(emptyForm);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingSlug, setEditingSlug] = useState<string>('');
    const [submitting, setSubmitting] = useState(false);
    const [markdownPreview, setMarkdownPreview] = useState(false);

    // Cover image
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState('');
    const coverInputRef = useRef<HTMLInputElement>(null);

    // Gallery images
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const galleryInputRef = useRef<HTMLInputElement>(null);

    const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

    const showToast = (msg: string, type: 'success' | 'error') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    useEffect(() => {
        const isAdmin = sessionStorage.getItem('isAdminAd');
        if (isAdmin === 'true') setIsAuthenticated(true);
    }, []);

    useEffect(() => {
        if (isAuthenticated) fetchBlogs();
    }, [isAuthenticated]);

    const fetchBlogs = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/blogs');
            const data = await res.json();
            setBlogs(Array.isArray(data) ? data : []);
        } catch {
            console.error('Error fetching blogs');
        }
        setIsLoading(false);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'TarkAI@2026') {
            sessionStorage.setItem('isAdminAd', 'true');
            setIsAuthenticated(true);
        } else {
            alert('Invalid Password');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this blog post?')) return;
        try {
            await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
            fetchBlogs();
        } catch {
            console.error('Error deleting');
        }
    };

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setCoverFile(file);
        setCoverPreview(URL.createObjectURL(file));
    };

    const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setGalleryFiles(prev => [...prev, ...files]);
        setGalleryPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
    };

    const resetForm = () => {
        setForm(emptyForm);
        setEditingId(null);
        setEditingSlug('');
        setCoverFile(null);
        setCoverPreview('');
        setGalleryFiles([]);
        setGalleryPreviews([]);
        setExistingImages([]);
        setMarkdownPreview(false);
    };

    const startEdit = (blog: BlogPost) => {
        setForm({
            title: blog.title || '',
            tag: blog.tag || blog.category || '',
            date: blog.date || '',
            coverImage: blog.coverImage || blog.image || '',
            description: blog.description || '',
            paragraph: blog.paragraph || '',
            instagram: blog.instagram || '',
            linkedin: blog.linkedin || '',
            twitter: blog.twitter || '',
            images: [],
        });
        setEditingId(blog.id);
        setEditingSlug(blog.slug || '');
        setCoverFile(null);
        setCoverPreview('');
        setExistingImages(blog.images || []);
        setGalleryFiles([]);
        setGalleryPreviews([]);
        setActiveTab('form');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title.trim()) { showToast('Title is required', 'error'); return; }
        setSubmitting(true);

        try {
            // Upload cover if new
            let coverImageUrl = form.coverImage;
            if (coverFile) {
                const fd = new FormData();
                fd.append('file', coverFile);
                const res = await fetch('/api/upload', { method: 'POST', body: fd });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Cover upload failed');
                coverImageUrl = data.url;
            }

            // Upload gallery if new
            let newGalleryUrls: string[] = [];
            if (galleryFiles.length > 0) {
                const fd = new FormData();
                galleryFiles.forEach(f => fd.append('file', f));
                const res = await fetch('/api/upload-multiple', { method: 'POST', body: fd });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Gallery upload failed');
                newGalleryUrls = data.urls || [];
            }

            const allImages = [...existingImages, ...newGalleryUrls];
            const slug = editingSlug || form.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');

            const payload = { ...form, coverImage: coverImageUrl, images: allImages, slug };
            const method = editingId !== null ? 'PUT' : 'POST';
            const url = editingId !== null ? `/api/blogs/${editingId}` : '/api/blogs';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                showToast(editingId !== null ? 'Updated!' : 'Published!', 'success');
                resetForm();
                fetchBlogs();
                setActiveTab('manager');
            } else {
                const err = await res.json();
                showToast(err.error || 'Save failed', 'error');
            }
        } catch (err: any) {
            showToast(err.message || 'Something went wrong', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    // ─── Auth Gate ───────────────────────────────────────────────────────────────
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-lightest">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                    <div className="flex justify-center mb-6 text-brand-accent">
                        <FaLock size={40} />
                    </div>
                    <h1 className="text-2xl font-bold text-center text-brand-darkest mb-6">Admin Access</h1>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        className="w-full p-4 border border-gray-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                    />
                    <button type="submit" className="w-full py-4 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-accent transition-colors">
                        Unlock Dashboard
                    </button>
                </form>
            </div>
        );
    }

    // ─── Dashboard ───────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-4">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-semibold text-white ${toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'}`}>
                    {toast.msg}
                </div>
            )}

            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-brand-darkest mb-8">Content Manager</h1>

                {/* ── Tabs ── */}
                <div className="flex gap-2 mb-8 bg-white border border-gray-200 rounded-2xl p-1.5 w-fit shadow-sm">
                    <button
                        onClick={() => { setActiveTab('manager'); }}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'manager'
                            ? 'bg-brand-dark text-white shadow-md'
                            : 'text-gray-500 hover:text-brand-darkest'
                            }`}
                    >
                        <FaList size={12} /> Content Manager
                    </button>
                    <button
                        onClick={() => { resetForm(); setActiveTab('form'); }}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'form'
                            ? 'bg-brand-accent text-white shadow-md'
                            : 'text-gray-500 hover:text-brand-darkest'
                            }`}
                    >
                        <FaPen size={12} /> {editingId !== null ? 'Edit Post' : 'Add Post'}
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {/* ── Tab 1: Content Manager ── */}
                    {activeTab === 'manager' && (
                        <motion.div
                            key="manager"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="flex justify-end mb-6">
                                <button
                                    onClick={() => { resetForm(); setActiveTab('form'); }}
                                    className="flex items-center gap-2 px-6 py-3 bg-brand-accent text-white rounded-xl shadow-lg hover:bg-brand-dark transition-all hover:scale-105 font-bold"
                                >
                                    <FaPlus /> New Post
                                </button>
                            </div>

                            {isLoading ? (
                                <div className="text-center py-20 text-gray-500">Loading content...</div>
                            ) : blogs.length === 0 ? (
                                <div className="text-center py-20">
                                    <div className="bg-white rounded-3xl p-10 max-w-2xl mx-auto border border-gray-200 border-dashed">
                                        <h3 className="text-2xl font-bold text-gray-400 mb-2">No Posts Yet</h3>
                                        <p className="text-gray-500 mb-6">Create your first blog post to get started.</p>
                                        <button
                                            onClick={() => { resetForm(); setActiveTab('form'); }}
                                            className="px-6 py-2 bg-brand-accent text-white font-bold rounded-xl shadow-lg hover:bg-brand-dark transition-all flex items-center gap-2 mx-auto"
                                        >
                                            <FaPlus /> Create Post
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <AnimatePresence>
                                        {blogs.map((blog) => (
                                            <AdminBlogCard
                                                key={blog.id}
                                                blog={blog}
                                                onEdit={startEdit}
                                                onDelete={handleDelete}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* ── Tab 2: Add / Edit Post ── */}
                    {activeTab === 'form' && (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <form onSubmit={handleSave} className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 flex flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-brand-darkest">
                                        {editingId !== null ? 'Edit Post' : 'New Post'}
                                    </h2>
                                    {editingId !== null && (
                                        <button type="button" onClick={() => { resetForm(); setActiveTab('manager'); }} className="text-sm text-gray-400 hover:text-gray-600 transition">
                                            ✕ Cancel Edit
                                        </button>
                                    )}
                                </div>

                                {/* Cover Image */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Cover Image</label>
                                    <div
                                        onClick={() => coverInputRef.current?.click()}
                                        className="border-2 border-dashed border-gray-200 hover:border-brand-accent/50 rounded-2xl cursor-pointer transition overflow-hidden"
                                        style={{ minHeight: '140px' }}
                                    >
                                        {(coverPreview || form.coverImage) ? (
                                            <div className="relative w-full" style={{ height: '200px' }}>
                                                <NextImage src={coverPreview || form.coverImage} alt="Cover" fill className="object-cover" />
                                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                                                    <span className="text-white text-sm font-semibold">Click to change</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                                                <span className="text-4xl mb-2">🖼</span>
                                                <span className="text-sm">Click to upload cover image</span>
                                            </div>
                                        )}
                                    </div>
                                    <input ref={coverInputRef} type="file" accept="image/*" onChange={handleCoverChange} className="hidden" />
                                </div>

                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Title *</label>
                                    <input
                                        required
                                        value={form.title}
                                        onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                        placeholder="Blog post title"
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent/50 outline-none"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                    <textarea
                                        rows={3}
                                        maxLength={100}
                                        value={form.description}
                                        onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                        placeholder="Short summary shown on the blog card"
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent/50 outline-none resize-none"
                                    />
                                    <p className={`text-xs mt-1 text-right font-medium ${form.description.length >= 90 ? 'text-red-400' : 'text-gray-400'}`}>
                                        {form.description.length} / 100
                                    </p>
                                </div>

                                {/* Date & Tag */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                                        <input
                                            type="date"
                                            value={form.date}
                                            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent/50 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Tag</label>
                                        <input
                                            value={form.tag}
                                            onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}
                                            placeholder="e.g. AI Trends"
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent/50 outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Paragraph – Markdown */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-sm font-bold text-gray-700">Paragraph (Markdown)</label>
                                        <button
                                            type="button"
                                            onClick={() => setMarkdownPreview(p => !p)}
                                            className="text-xs text-brand-accent hover:text-brand-dark transition font-medium"
                                        >
                                            {markdownPreview ? '✏️ Edit' : '👁 Preview'}
                                        </button>
                                    </div>
                                    {markdownPreview ? (
                                        <div
                                            className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 min-h-[180px] text-sm text-gray-700 leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(form.paragraph) }}
                                        />
                                    ) : (
                                        <textarea
                                            rows={9}
                                            value={form.paragraph}
                                            onChange={e => setForm(f => ({ ...f, paragraph: e.target.value }))}
                                            placeholder={"# Heading\n\nWrite your **markdown** content here...\n\n- List item 1\n- List item 2"}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent/50 outline-none resize-none font-mono text-sm"
                                        />
                                    )}
                                    <p className="text-gray-400 text-xs mt-1.5">Supports Markdown: headings, bold, italic, lists, inline code</p>
                                </div>

                                {/* Social URLs */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3">Social URLs <span className="text-gray-400 font-normal">(optional)</span></label>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-3">
                                            <FaInstagram className="text-pink-500 text-xl flex-shrink-0" />
                                            <input
                                                type="url"
                                                value={form.instagram}
                                                onChange={e => setForm(f => ({ ...f, instagram: e.target.value }))}
                                                placeholder="Instagram URL"
                                                className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-200 outline-none text-sm"
                                            />
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FaLinkedin className="text-blue-600 text-xl flex-shrink-0" />
                                            <input
                                                type="url"
                                                value={form.linkedin}
                                                onChange={e => setForm(f => ({ ...f, linkedin: e.target.value }))}
                                                placeholder="LinkedIn URL"
                                                className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-200 outline-none text-sm"
                                            />
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FaTwitter className="text-sky-500 text-xl flex-shrink-0" />
                                            <input
                                                type="url"
                                                value={form.twitter}
                                                onChange={e => setForm(f => ({ ...f, twitter: e.target.value }))}
                                                placeholder="Twitter / X URL"
                                                className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-200 outline-none text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Gallery Images */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Images <span className="text-gray-400 font-normal">(multiple)</span></label>

                                    {existingImages.length > 0 && (
                                        <div className="mb-3">
                                            <p className="text-xs text-gray-400 mb-2">Existing (click × to remove)</p>
                                            <div className="flex flex-wrap gap-2">
                                                {existingImages.map((url, i) => (
                                                    <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden group">
                                                        <NextImage src={url} alt="" fill className="object-cover" />
                                                        <button
                                                            type="button"
                                                            onClick={() => setExistingImages(p => p.filter((_, idx) => idx !== i))}
                                                            className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                                                        >×</button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {galleryPreviews.length > 0 && (
                                        <div className="mb-3 flex flex-wrap gap-2">
                                            {galleryPreviews.map((url, i) => (
                                                <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden group">
                                                    <NextImage src={url} alt="" fill className="object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setGalleryFiles(p => p.filter((_, idx) => idx !== i));
                                                            setGalleryPreviews(p => p.filter((_, idx) => idx !== i));
                                                        }}
                                                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                                                    >×</button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => galleryInputRef.current?.click()}
                                        className="w-full py-3 border-2 border-dashed border-gray-200 hover:border-brand-accent/50 rounded-xl text-gray-400 hover:text-brand-dark transition text-sm font-medium"
                                    >
                                        + Add Images
                                    </button>
                                    <input ref={galleryInputRef} type="file" accept="image/*" multiple onChange={handleGalleryChange} className="hidden" />
                                </div>

                                {/* Submit */}
                                <div className="flex justify-end gap-4 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => { resetForm(); setActiveTab('manager'); }}
                                        className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="px-8 py-3 bg-brand-accent text-white font-bold rounded-xl shadow-lg hover:bg-brand-dark transition-all hover:scale-105 disabled:opacity-50"
                                    >
                                        {submitting ? 'Saving...' : (editingId !== null ? 'Save Changes' : 'Publish Post')}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

// ─── Admin Blog Card ─────────────────────────────────────────────────────────
function AdminBlogCard({ blog, onEdit, onDelete }: { blog: BlogPost, onEdit: (b: BlogPost) => void, onDelete: (id: number) => void }) {
    const imgSrc = blog.coverImage || blog.image || '/Logo.png';
    const displayTag = blog.tag || blog.category || '';
    const cardColor = blog.color || 'from-violet-400 to-indigo-600';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="group relative h-[450px] w-full"
        >
            <div className="absolute inset-0 bg-white rounded-4xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300">
                <div className="relative h-1/2 overflow-hidden clip-path-slant">
                    <div className={`absolute inset-0 bg-linear-to-br ${cardColor} opacity-20 mix-blend-overlay z-10`} />
                    <NextImage src={imgSrc} alt={blog.title} fill className="object-cover" unoptimized />

                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-dark shadow-sm z-20 flex items-center gap-1">
                        <FaCalendarAlt className="text-brand-accent" />
                        {blog.date}
                    </div>

                    {displayTag && (
                        <div className="absolute bottom-4 left-4 z-20">
                            <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold text-white bg-linear-to-r ${cardColor} shadow-lg`}>
                                {displayTag}
                            </span>
                        </div>
                    )}
                </div>

                <div className="p-6 h-1/2 flex flex-col relative z-20">
                    <h3 className="text-xl font-bold text-brand-darkest mb-2 leading-tight">{blog.title}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2 leading-relaxed grow">{blog.description}</p>

                    <div className="flex gap-2 mb-3 items-center">
                        {blog.instagram && <FaInstagram className="text-pink-500 text-sm" />}
                        {blog.linkedin && <FaLinkedin className="text-blue-600 text-sm" />}
                        {blog.twitter && <FaTwitter className="text-sky-500 text-sm" />}
                        {blog.images?.length > 0 && (
                            <span className="text-xs text-gray-400">{blog.images.length} image{blog.images.length > 1 ? 's' : ''}</span>
                        )}
                    </div>

                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center gap-3">
                        <button
                            onClick={() => onEdit(blog)}
                            className="flex-1 py-2 bg-brand-lightest text-brand-dark font-bold rounded-lg hover:bg-brand-dark hover:text-white transition-colors flex items-center justify-center gap-2"
                        >
                            <FaEdit /> Edit
                        </button>
                        <button
                            onClick={() => onDelete(blog.id)}
                            className="flex-1 py-2 bg-red-50 text-red-500 font-bold rounded-lg hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                        >
                            <FaTrash /> Delete
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function simpleMarkdownToHtml(md: string) {
    if (!md) return '<p style="color:#aaa">Nothing to preview yet...</p>';
    return md
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/^### (.+)$/gm, '<h3 style="font-weight:700;font-size:1rem;margin:12px 0 4px">$1</h3>')
        .replace(/^## (.+)$/gm, '<h2 style="font-weight:700;font-size:1.1rem;margin:16px 0 6px">$1</h2>')
        .replace(/^# (.+)$/gm, '<h1 style="font-weight:800;font-size:1.25rem;margin:20px 0 8px">$1</h1>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code style="background:#f0f0f0;border-radius:3px;padding:0 4px;font-size:0.8rem">$1</code>')
        .replace(/^- (.+)$/gm, '<li style="margin-left:16px;list-style:disc">$1</li>')
        .replace(/\n{2,}/g, '</p><p style="margin-bottom:8px">')
        .replace(/\n/g, '<br/>');
}
