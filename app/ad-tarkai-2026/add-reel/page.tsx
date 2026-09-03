'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import { FaCheckCircle, FaUpload, FaVideo } from 'react-icons/fa';

interface ReelItem {
  _id?: string;
  id: number;
  title: string;
  platform?: 'Instagram' | 'LinkedIn' | 'YouTube';
  videoUrl?: string;
  coverImage?: string;
  category?: string;
  views?: string;
  duration?: string;
}

const emptyForm = {
  title: '',
  platform: 'Instagram' as 'Instagram' | 'LinkedIn' | 'YouTube',
  videoUrl: '',
  coverImage: '/Logo.png',
};

function AddReelContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editIdParam = searchParams.get('edit');

  const [form, setForm] = useState<typeof emptyForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Video file upload
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState('');
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = useCallback((msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setVideoFile(null);
    setVideoPreview('');
    setEditingId(null);
  };

  const fetchReelToEdit = useCallback(async (id: number) => {
    try {
      const res = await fetch(`/api/reels/${id}`);
      if (res.ok) {
        const data: ReelItem = await res.json();
        setForm({
          title: data.title || '',
          platform: data.platform || 'Instagram',
          videoUrl: data.videoUrl || '',
          coverImage: data.coverImage || '/Logo.png',
        });
        setEditingId(data.id);
      }
    } catch {
      showToast('Failed to load reel for editing', 'error');
    }
  }, [showToast]);

  useEffect(() => {
    if (editIdParam) {
      const id = parseInt(editIdParam, 10);
      if (!isNaN(id)) {
        fetchReelToEdit(id);
      }
    }
  }, [editIdParam, fetchReelToEdit]);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      showToast('Reel Title is required', 'error');
      return;
    }
    setSubmitting(true);

    try {
      let uploadedVideoUrl = form.videoUrl;
      if (videoFile) {
        const fd = new FormData();
        fd.append('file', videoFile);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Video upload failed');
        uploadedVideoUrl = data.url;
      }

      const payload = {
        title: form.title,
        platform: form.platform,
        videoUrl: uploadedVideoUrl,
        category: form.platform,
        coverImage: form.coverImage || '/Logo.png',
      };

      const method = editingId !== null ? 'PUT' : 'POST';
      const url = editingId !== null ? `/api/reels/${editingId}` : '/api/reels';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast(editingId !== null ? 'Reel updated successfully!' : 'Reel created successfully!', 'success');
        resetForm();
        router.push('/ad-tarkai-2026/reels');
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
          className={`fixed top-5 right-5 z-50 px-6 py-3.5 rounded-2xl shadow-2xl text-xs font-bold text-white transition-all flex items-center gap-2 ${
            toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
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
                {editingId !== null ? 'Edit Reel / Post' : 'Add Reel / Post'}
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

          {/* 1. Reel Title & 2. Select Social Platform */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8">
              <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
                Reel Title *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. AI Hackathon Highlights 2026"
                className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-xs font-semibold text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50/50"
                required
              />
            </div>

            <div className="md:col-span-4">
              <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
                Select Social *
              </label>
              <select
                value={form.platform}
                onChange={(e) => setForm({ ...form, platform: e.target.value as 'Instagram' | 'LinkedIn' | 'YouTube' })}
                className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-xs font-semibold text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50/50"
              >
                <option value="Instagram">Instagram</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="YouTube">YouTube</option>
              </select>
            </div>
          </div>

          {/* 3. Upload Video Dropzone */}
          <div>
            <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
              Upload Video *
            </label>

            <div className="border-2 border-dashed border-gray-200 bg-gray-50/50 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center relative">
              <input
                type="file"
                ref={videoInputRef}
                onChange={handleVideoChange}
                accept="video/*"
                className="hidden"
              />

              {(videoPreview || form.videoUrl) ? (
                <div className="w-full max-w-md space-y-4">
                  <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-black aspect-video flex items-center justify-center shadow-md">
                    <video
                      src={videoPreview || form.videoUrl}
                      controls
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => videoInputRef.current?.click()}
                    className="px-5 py-2.5 rounded-2xl bg-brand-darkest hover:bg-brand-dark text-white font-extrabold text-xs transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2 mx-auto"
                  >
                    <FaVideo className="text-xs text-brand-light" />
                    <span>Change Video</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4 py-4">
                  <div className="w-16 h-16 rounded-full bg-brand-accent/10 text-brand-accent flex items-center justify-center mx-auto text-2xl">
                    <FaVideo />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-brand-darkest mb-1">Upload Video File</h4>
                    <p className="text-xs text-gray-400 font-medium">MP4, MOV, or WEBM video clip</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => videoInputRef.current?.click()}
                    className="px-6 py-3 rounded-2xl bg-brand-darkest hover:bg-brand-dark text-white font-extrabold text-xs transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2 mx-auto"
                  >
                    <FaUpload className="text-xs text-brand-light" />
                    <span>Upload Video</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => router.push('/ad-tarkai-2026/reels')}
              className="px-6 py-3.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3.5 rounded-2xl bg-brand-darkest hover:bg-brand-dark text-white font-extrabold text-xs transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              {submitting ? 'Saving...' : editingId !== null ? 'Save Reel' : 'Create Reel'}
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
}

export default function AddReelPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-xs font-semibold text-gray-500">Loading form...</div>}>
      <AddReelContent />
    </Suspense>
  );
}
