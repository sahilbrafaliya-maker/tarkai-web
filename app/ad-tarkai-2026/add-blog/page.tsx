'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import NextImage from 'next/image';
import { motion } from 'motion/react';
import { FaInstagram, FaLinkedin, FaTwitter, FaCheckCircle } from 'react-icons/fa';

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

function AddBlogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editIdParam = searchParams.get('edit');

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

  const showToast = useCallback((msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const fetchBlogToEdit = useCallback(async (id: number) => {
    try {
      const res = await fetch(`/api/blogs/${id}`);
      if (res.ok) {
        const blog: BlogPost = await res.json();
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
        setExistingImages(blog.images || []);
      }
    } catch {
      showToast('Failed to load article for editing', 'error');
    }
  }, [showToast]);

  useEffect(() => {
    if (editIdParam) {
      const id = parseInt(editIdParam, 10);
      if (!isNaN(id)) {
        fetchBlogToEdit(id);
      }
    }
  }, [editIdParam, fetchBlogToEdit]);

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      showToast('Article title is required', 'error');
      return;
    }
    setSubmitting(true);

    try {
      let coverImageUrl = form.coverImage;
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
        editingSlug ||
        form.title
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
        showToast(editingId !== null ? 'Article updated!' : 'Article published!', 'success');
        resetForm();
        router.push('/ad-tarkai-2026/all-blog');
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

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        <form onSubmit={handleSave} className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-xs space-y-6">

          <div className="flex items-center justify-between border-b border-gray-100 pb-5">
            <div>
              <h3 className="text-xl font-black text-brand-darkest">
                {editingId !== null ? 'Edit Article Details' : 'Add New Blog'}
              </h3>
              {/* <p className="text-xs text-gray-500 font-medium mt-0.5">Fill out content details and published media assets</p> */}
            </div>
            <button
              type="button"
              onClick={resetForm}
              className="text-xs font-bold text-gray-500 hover:text-brand-darkest transition-colors cursor-pointer"
            >
              Reset Form
            </button>
          </div>

          {/* Title & Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            <div className="md:col-span-8">
              <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
                Article Title *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. The Rise of Agentic AI in Enterprise Software"
                className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-xs font-semibold text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50/50"
                required
              />
            </div>

            <div className="md:col-span-4">
              <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
                Category Tag *
              </label>
              <input
                type="text"
                value={form.tag}
                onChange={(e) => setForm({ ...form, tag: e.target.value })}
                placeholder="e.g. Artificial Intelligence"
                className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-xs font-semibold text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50/50"
                required
              />
            </div>

          </div>

          {/* Date & Description */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            <div className="md:col-span-4">
              <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
                Publish Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-xs font-semibold text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50/50"
              />
            </div>

            <div className="md:col-span-8">
              <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
                Short Excerpt / Summary
              </label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="A brief 1-2 sentence overview for cards and meta descriptions..."
                className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-xs font-semibold text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50/50"
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
                className="px-5 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-brand-darkest font-bold text-xs transition-colors cursor-pointer border border-gray-200"
              >
                Select Cover Image
              </button>
              <input
                type="file"
                ref={coverInputRef}
                onChange={handleCoverChange}
                accept="image/*"
                className="hidden"
              />
              {(coverPreview || form.coverImage) && (
                <div className="relative w-20 h-12 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                  <NextImage src={coverPreview || form.coverImage} alt="Cover Preview" fill className="object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Gallery Images Upload Dropzone */}
          <div>
            <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
              Additional Gallery Images
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="px-5 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-brand-darkest font-bold text-xs transition-colors cursor-pointer border border-gray-200"
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

          {/* Main Article Paragraph Body */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider">
                Main Article Content (Markdown Supported)
              </label>
              <button
                type="button"
                onClick={() => setMarkdownPreview(!markdownPreview)}
                className="text-xs font-bold text-brand-accent hover:underline cursor-pointer"
              >
                {markdownPreview ? 'Edit Content' : 'Preview Format'}
              </button>
            </div>

            {markdownPreview ? (
              <div className="w-full p-5 border border-gray-200 rounded-2xl bg-gray-50/70 min-h-[220px] text-xs font-medium leading-relaxed prose max-w-none">
                {form.paragraph}
              </div>
            ) : (
              <textarea
                rows={8}
                value={form.paragraph}
                onChange={(e) => setForm({ ...form, paragraph: e.target.value })}
                placeholder="Write your article body here. Markdown formatting is supported..."
                className="w-full p-4 border border-gray-200 rounded-2xl text-xs font-medium leading-relaxed text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50/50"
              />
            )}
          </div>

          {/* Social Media Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-extrabold text-gray-600 mb-1.5">
                <FaInstagram className="text-pink-500" /> Instagram Link
              </label>
              <input
                type="url"
                value={form.instagram}
                onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                placeholder="https://instagram.com/..."
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs font-semibold text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50/50"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-extrabold text-gray-600 mb-1.5">
                <FaLinkedin className="text-blue-600" /> LinkedIn Link
              </label>
              <input
                type="url"
                value={form.linkedin}
                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs font-semibold text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50/50"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-extrabold text-gray-600 mb-1.5">
                <FaTwitter className="text-sky-500" /> Twitter Link
              </label>
              <input
                type="url"
                value={form.twitter}
                onChange={(e) => setForm({ ...form, twitter: e.target.value })}
                placeholder="https://twitter.com/..."
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs font-semibold text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50/50"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => router.push('/ad-tarkai-2026/all-blog')}
              className="px-6 py-3.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3.5 rounded-2xl bg-brand-darkest hover:bg-brand-dark text-white font-extrabold text-xs transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              {submitting ? 'Saving...' : editingId !== null ? 'Save Changes' : 'Publish Article'}
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
}

export default function AddBlogPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-xs font-semibold text-gray-500">Loading editor...</div>}>
      <AddBlogContent />
    </Suspense>
  );
}
