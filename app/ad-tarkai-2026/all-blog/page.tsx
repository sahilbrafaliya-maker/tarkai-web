'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { FaEdit, FaTrash, FaPlus, FaNewspaper, FaSearch, FaCheckCircle, FaTimes, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

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
  category?: string;
  image?: string;
}

const compressImage = async (file: File, maxWidth = 1200, maxHeight = 675, quality = 0.8): Promise<File> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(new File([blob], file.name.replace(/\.[^/.]+$/, '') + '.jpg', { type: 'image/jpeg', lastModified: Date.now() }));
            } else {
              resolve(file);
            }
          },
          'image/jpeg',
          quality
        );
      };
    };
  });
};

export default function AllBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  // View Article Modal State
  const [viewingBlog, setViewingBlog] = useState<BlogPost | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Edit Modal State
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [markdownPreview, setMarkdownPreview] = useState(false);

  const [editForm, setEditForm] = useState({
    title: '',
    tag: '',
    date: '',
    coverImage: '',
    description: '',
    paragraph: '',
    instagram: '',
    linkedin: '',
    twitter: '',
  });

  // Media upload state
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState('');
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const showToast = useCallback((msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const fetchBlogs = useCallback(async () => {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch {
      showToast('Failed to fetch articles', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      showToast('Article deleted successfully', 'success');
      fetchBlogs();
    } catch {
      showToast('Error deleting article', 'error');
    }
  };

  const openViewModal = (blog: BlogPost) => {
    setViewingBlog(blog);
    setIsViewModalOpen(true);
  };

  const openEditModal = (blog: BlogPost) => {
    setEditingBlog(blog);
    setEditForm({
      title: blog.title || '',
      tag: blog.tag || blog.category || '',
      date: blog.date || '',
      coverImage: blog.coverImage || blog.image || '',
      description: blog.description || '',
      paragraph: blog.paragraph || '',
      instagram: blog.instagram || '',
      linkedin: blog.linkedin || '',
      twitter: blog.twitter || '',
    });
    setCoverFile(null);
    setCoverPreview('');
    setExistingImages(blog.images || []);
    setGalleryFiles([]);
    setGalleryPreviews([]);
    setMarkdownPreview(false);
    setIsEditModalOpen(true);
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setGalleryFiles((prev) => [...prev, ...files]);
    setGalleryPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const handleModalSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;
    if (!editForm.title.trim()) {
      showToast('Title is required', 'error');
      return;
    }
    setSubmitting(true);

    try {
      let coverImageUrl = editForm.coverImage;
      if (coverFile) {
        const compressedCover = await compressImage(coverFile);
        const fd = new FormData();
        fd.append('file', compressedCover);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Cover image upload failed');
        coverImageUrl = data.url;
      }

      let newGalleryUrls: string[] = [];
      if (galleryFiles.length > 0) {
        const fd = new FormData();
        for (const file of galleryFiles) {
          const compressedFile = await compressImage(file);
          fd.append('file', compressedFile);
        }
        const res = await fetch('/api/upload-multiple', { method: 'POST', body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Gallery upload failed');
        newGalleryUrls = data.urls || [];
      }

      const allImages = [...existingImages, ...newGalleryUrls];
      const slug =
        editingBlog.slug ||
        editForm.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');

      const payload = { ...editForm, coverImage: coverImageUrl, images: allImages, slug };
      const res = await fetch(`/api/blogs/${editingBlog.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast('Article updated successfully!', 'success');
        setIsEditModalOpen(false);
        fetchBlogs();
      } else {
        const err = await res.json();
        showToast(err.error || 'Save failed', 'error');
      }
    } catch (err: unknown) {
      const error = err as Error;
      showToast(error.message || 'Something went wrong', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.tag && b.tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-6 py-3.5 rounded-2xl shadow-2xl text-xs font-bold text-white transition-all flex items-center gap-2 ${toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
            }`}
        >
          <FaCheckCircle className="text-sm" />
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Top Action & Search Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-darkest tracking-tight">
            All Blogs ({blogs.length})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent"
            />
          </div>

          <Link
            href="/ad-tarkai-2026/add-blog"
            className="px-4 py-2.5 rounded-xl bg-brand-accent text-white font-bold text-xs hover:bg-brand-dark transition-all flex items-center gap-2 shadow-md shrink-0"
          >
            <FaPlus className="text-xs" />
            <span>Add Blog</span>
          </Link>
        </div>
      </div>

      {/* ARTICLE MANAGER TABLE */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        {isLoading ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-200/80 text-gray-500 font-semibold text-sm">
            Loading articles...
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-200/80">
            <FaNewspaper className="text-4xl text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-black text-brand-darkest mb-1">No articles found</h3>
            <p className="text-xs text-gray-500 mb-6">Create your first blog post to populate your site.</p>
            <Link
              href="/ad-tarkai-2026/add-blog"
              className="px-6 py-3 bg-brand-accent text-white rounded-2xl font-bold text-xs hover:bg-brand-dark transition-all shadow-md inline-block"
            >
              Add Blog
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-200/80 text-[11px] font-extrabold uppercase tracking-wider text-gray-500">
                    <th className="py-4 px-6">Article</th>
                    <th className="py-4 px-6">Category Tag</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs font-semibold text-gray-700">
                  {filteredBlogs.map((blog) => (
                    <tr
                      key={blog.id}
                      className="hover:bg-brand-lightest/30 transition-colors cursor-pointer group"
                      onClick={() => openViewModal(blog)}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4 max-w-lg">
                          <div className="relative w-24 h-16 sm:w-28 sm:h-18 rounded-md overflow-hidden bg-gray-100 shrink-0 border border-gray-200/80 shadow-xs group-hover:scale-105 transition-transform duration-300">
                            {blog.coverImage ? (
                              <NextImage src={blog.coverImage} alt={blog.title} fill className="object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-base">
                                <FaNewspaper />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-extrabold text-brand-darkest text-xs sm:text-sm leading-snug group-hover:text-brand-accent transition-colors">
                              {blog.title}
                            </h4>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span className="text-xs font-semibold text-gray-700">
                          {blog.tag || blog.category || 'General'}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-gray-500">
                        {blog.date ? new Date(blog.date).toLocaleDateString() : 'N/A'}
                      </td>

                      <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(blog)}
                            className="p-2 rounded-xl bg-gray-100 text-brand-darkest hover:bg-brand-darkest hover:text-white transition-colors cursor-pointer"
                            title="Edit Article"
                          >
                            <FaEdit className="text-xs" />
                          </button>
                          <button
                            onClick={() => handleDelete(blog.id)}
                            className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                            title="Delete Article"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>

      {/* ─── VIEW ARTICLE DETAILS MODAL POPUP ──────────────────────────────────── */}
      <AnimatePresence>
        {isViewModalOpen && viewingBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-[32px] border border-gray-200 shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 sm:p-10 space-y-6"
            >
              {/* View Modal Header */}
              <div className="flex items-start justify-between border-b border-gray-100 pb-5 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-extrabold border border-brand-accent/20">
                      {viewingBlog.tag || viewingBlog.category || 'General'}
                    </span>
                    {viewingBlog.date && (
                      <span className="text-xs font-semibold text-gray-500">
                        {new Date(viewingBlog.date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-brand-darkest leading-snug">
                    {viewingBlog.title}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setIsViewModalOpen(false)}
                  className="p-2 rounded-xl text-gray-400 hover:text-brand-darkest hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>

              {/* Cover Image Showcase */}
              {(viewingBlog.coverImage || viewingBlog.image) && (
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-brand-dark border border-gray-200 shadow-sm">
                  <NextImage
                    src={viewingBlog.coverImage || viewingBlog.image || ''}
                    alt={viewingBlog.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Excerpt Box */}
              {viewingBlog.description && (
                <div className="p-4 rounded-2xl bg-brand-lightest/40 border border-brand-accent/20 text-xs font-bold text-brand-darkest leading-relaxed">
                  {viewingBlog.description}
                </div>
              )}

              {/* Main Content Body */}
              {viewingBlog.paragraph && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">Content Body</h4>
                  <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-200/80 text-xs font-medium leading-relaxed text-gray-800 whitespace-pre-wrap">
                    {viewingBlog.paragraph}
                  </div>
                </div>
              )}

              {/* Additional Gallery Images */}
              {viewingBlog.images && viewingBlog.images.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">Gallery Media</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {viewingBlog.images.map((imgUrl, idx) => (
                      <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                        <NextImage src={imgUrl} alt={`Gallery ${idx}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links */}
              {(viewingBlog.instagram || viewingBlog.linkedin || viewingBlog.twitter) && (
                <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                  <span className="text-xs font-bold text-gray-400">Connected Links:</span>
                  {viewingBlog.instagram && (
                    <a href={viewingBlog.instagram} target="_blank" rel="noreferrer" className="text-pink-500 hover:scale-110 transition-transform">
                      <FaInstagram size={18} />
                    </a>
                  )}
                  {viewingBlog.linkedin && (
                    <a href={viewingBlog.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:scale-110 transition-transform">
                      <FaLinkedin size={18} />
                    </a>
                  )}
                  {viewingBlog.twitter && (
                    <a href={viewingBlog.twitter} target="_blank" rel="noreferrer" className="text-sky-500 hover:scale-110 transition-transform">
                      <FaTwitter size={18} />
                    </a>
                  )}
                </div>
              )}

              {/* View Modal Footer Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-xs transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsViewModalOpen(false);
                    openEditModal(viewingBlog);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-brand-darkest hover:bg-brand-dark text-white font-extrabold text-xs transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <FaEdit className="text-xs" />
                  <span>Edit Article</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── EDIT ARTICLE MODAL POPUP ─────────────────────────────────────────── */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-[32px] border border-gray-200 shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 sm:p-10 space-y-6"
            >
              {/* Edit Modal Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-xl font-black text-brand-darkest">Edit Article</h3>
                  <p className="text-xs text-gray-500 font-medium">Update blog post details and media assets</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 rounded-xl text-gray-400 hover:text-brand-darkest hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <FaTimes className="text-base" />
                </button>
              </div>

              {/* Edit Modal Form */}
              <form onSubmit={handleModalSave} className="space-y-6">
                {/* Title & Tag */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  <div className="md:col-span-8">
                    <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-xs font-semibold text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50/50"
                      required
                    />
                  </div>

                  <div className="md:col-span-4">
                    <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
                      Category Tag *
                    </label>
                    <input
                      type="text"
                      value={editForm.tag}
                      onChange={(e) => setEditForm({ ...editForm, tag: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-xs font-semibold text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50/50"
                      required
                    />
                  </div>
                </div>

                {/* Date & Description */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  <div className="md:col-span-4">
                    <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
                      Publish Date
                    </label>
                    <input
                      type="date"
                      value={editForm.date}
                      onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-xs font-semibold text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50/50"
                    />
                  </div>

                  <div className="md:col-span-8">
                    <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
                      Short Excerpt / Summary
                    </label>
                    <input
                      type="text"
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-xs font-semibold text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50/50"
                    />
                  </div>
                </div>

                {/* Cover Image Upload Dropzone */}
                <div>
                  <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
                    Cover Image
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => coverInputRef.current?.click()}
                      className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-brand-darkest font-bold text-xs transition-colors cursor-pointer border border-gray-200"
                    >
                      Change Cover Image
                    </button>
                    <input
                      type="file"
                      ref={coverInputRef}
                      onChange={handleCoverChange}
                      accept="image/*"
                      className="hidden"
                    />
                    {(coverPreview || editForm.coverImage) && (
                      <div className="relative w-20 h-12 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                        <NextImage src={coverPreview || editForm.coverImage} alt="Cover Preview" fill className="object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Gallery Images */}
                <div>
                  <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
                    Additional Gallery Images
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => galleryInputRef.current?.click()}
                      className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-brand-darkest font-bold text-xs transition-colors cursor-pointer border border-gray-200"
                    >
                      Add Gallery Images
                    </button>
                    <input
                      type="file"
                      ref={galleryInputRef}
                      onChange={handleGalleryChange}
                      accept="image/*"
                      multiple
                      className="hidden"
                    />
                    {galleryPreviews.map((preview, idx) => (
                      <div key={idx} className="relative w-16 h-12 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                        <NextImage src={preview} alt={`Gallery Preview ${idx}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Content Textarea */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider">
                      Main Article Body (Markdown)
                    </label>
                    <button
                      type="button"
                      onClick={() => setMarkdownPreview(!markdownPreview)}
                      className="text-xs font-bold text-brand-accent hover:underline cursor-pointer"
                    >
                      {markdownPreview ? 'Edit Format' : 'Preview Format'}
                    </button>
                  </div>

                  {markdownPreview ? (
                    <div className="w-full p-4 border border-gray-200 rounded-2xl bg-gray-50/70 min-h-[180px] text-xs font-medium leading-relaxed prose max-w-none">
                      {editForm.paragraph}
                    </div>
                  ) : (
                    <textarea
                      rows={6}
                      value={editForm.paragraph}
                      onChange={(e) => setEditForm({ ...editForm, paragraph: e.target.value })}
                      className="w-full p-4 border border-gray-200 rounded-2xl text-xs font-medium leading-relaxed text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50/50"
                    />
                  )}
                </div>

                {/* Social Links */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="flex items-center gap-1 text-[11px] font-extrabold text-gray-600 mb-1">
                      <FaInstagram className="text-pink-500" /> Instagram Link
                    </label>
                    <input
                      type="url"
                      value={editForm.instagram}
                      onChange={(e) => setEditForm({ ...editForm, instagram: e.target.value })}
                      placeholder="https://instagram.com/..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-brand-darkest bg-gray-50/50"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1 text-[11px] font-extrabold text-gray-600 mb-1">
                      <FaLinkedin className="text-blue-600" /> LinkedIn Link
                    </label>
                    <input
                      type="url"
                      value={editForm.linkedin}
                      onChange={(e) => setEditForm({ ...editForm, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-brand-darkest bg-gray-50/50"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1 text-[11px] font-extrabold text-gray-600 mb-1">
                      <FaTwitter className="text-sky-500" /> Twitter Link
                    </label>
                    <input
                      type="url"
                      value={editForm.twitter}
                      onChange={(e) => setEditForm({ ...editForm, twitter: e.target.value })}
                      placeholder="https://twitter.com/..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-brand-darkest bg-gray-50/50"
                    />
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-xs transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 rounded-xl bg-brand-darkest hover:bg-brand-dark text-white font-extrabold text-xs transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
