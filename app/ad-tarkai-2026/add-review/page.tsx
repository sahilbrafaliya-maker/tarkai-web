'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import NextImage from 'next/image';
import { motion } from 'motion/react';
import { FaCheckCircle, FaUpload } from 'react-icons/fa';

interface ReviewItem {
  _id?: string;
  id: number;
  author: string;
  role?: string;
  avatar?: string;
  rating: number;
  reviewText: string;
  isVerified?: boolean;
  date?: string;
}

const emptyForm = {
  author: '',
  role: 'Student',
  avatar: '',
  rating: 5,
  reviewText: '',
  isVerified: true,
  date: 'a week ago',
};

function AddReviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editIdParam = searchParams.get('edit');

  const [form, setForm] = useState<typeof emptyForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Avatar file upload
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = useCallback((msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setAvatarFile(null);
    setAvatarPreview('');
    setEditingId(null);
  };

  const fetchReviewToEdit = useCallback(async (id: number) => {
    try {
      const res = await fetch(`/api/reviews/${id}`);
      if (res.ok) {
        const data: ReviewItem = await res.json();
        setForm({
          author: data.author || '',
          role: data.role || 'Student',
          avatar: data.avatar || '',
          rating: data.rating || 5,
          reviewText: data.reviewText || '',
          isVerified: data.isVerified ?? true,
          date: data.date || 'a week ago',
        });
        setEditingId(data.id);
      }
    } catch {
      showToast('Failed to load review for editing', 'error');
    }
  }, [showToast]);

  useEffect(() => {
    if (editIdParam) {
      const id = parseInt(editIdParam, 10);
      if (!isNaN(id)) {
        fetchReviewToEdit(id);
      }
    }
  }, [editIdParam, fetchReviewToEdit]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.author.trim() || !form.reviewText.trim()) {
      showToast('Author Name and Review Content are required', 'error');
      return;
    }
    setSubmitting(true);

    try {
      let avatarUrl = form.avatar;
      if (avatarFile) {
        const fd = new FormData();
        fd.append('file', avatarFile);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Avatar upload failed');
        avatarUrl = data.url;
      }

      const payload = {
        ...form,
        role: 'Student',
        avatar: avatarUrl,
      };

      const method = editingId !== null ? 'PUT' : 'POST';
      const url = editingId !== null ? `/api/reviews/${editingId}` : '/api/reviews';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast(editingId !== null ? 'Review updated successfully!' : 'Review created successfully!', 'success');
        resetForm();
        router.push('/ad-tarkai-2026/reviews');
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
                {editingId !== null ? 'Edit Google Review' : 'Add Google Review'}
              </h3>
            </div>
            <button
              type="button"
              onClick={resetForm}
              className="text-xs font-bold text-gray-500 hover:text-brand-darkest transition-colors cursor-pointer"
            >
              Reset Form
            </button>
          </div>

          {/* 1. Author Name & 2. Star Rating */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8">
              <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
                Author Name *
              </label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="e.g. Aarav Patel"
                className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-xs font-semibold text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50/50"
                required
              />
            </div>

            <div className="md:col-span-4">
              <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
                Star Rating *
              </label>
              <select
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-xs font-semibold text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50/50"
              >
                <option value={5}>5</option>
                <option value={4}>4</option>
                <option value={3}>3</option>
                <option value={2}>2</option>
                <option value={1}>1</option>
              </select>
            </div>
          </div>

          {/* 3. Date String */}
          <div>
            <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
              Date String
            </label>
            <input
              type="text"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              placeholder="e.g. a week ago or 2 months ago"
              className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-xs font-semibold text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50/50"
            />
          </div>

          {/* Review Content Textarea */}
          <div>
            <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
              Review Content *
            </label>
            <textarea
              rows={4}
              value={form.reviewText}
              onChange={(e) => setForm({ ...form, reviewText: e.target.value })}
              placeholder="Write the full review content here..."
              className="w-full p-4 border border-gray-200 rounded-2xl text-xs font-medium leading-relaxed text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50/50"
              required
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => router.push('/ad-tarkai-2026/reviews')}
              className="px-6 py-3.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3.5 rounded-2xl bg-brand-darkest hover:bg-brand-dark text-white font-extrabold text-xs transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              {submitting ? 'Saving...' : editingId !== null ? 'Save Review' : 'Create Review'}
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
}

export default function AddReviewPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-xs font-semibold text-gray-500">Loading form...</div>}>
      <AddReviewContent />
    </Suspense>
  );
}
