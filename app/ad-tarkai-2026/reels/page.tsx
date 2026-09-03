'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { motion } from 'motion/react';
import { FaEdit, FaTrash, FaPlus, FaVideo, FaSearch, FaCheckCircle, FaUpload } from 'react-icons/fa';

interface ReelItem {
  _id?: string;
  id: number;
  title: string;
  platform?: 'Instagram' | 'LinkedIn' | 'YouTube';
  category?: string;
  videoUrl?: string;
  coverImage?: string;
}

export default function ReelsManagerPage() {
  const [reels, setReels] = useState<ReelItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  // Edit Modal State
  const [editingReel, setEditingReel] = useState<ReelItem | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editPlatform, setEditPlatform] = useState<'Instagram' | 'LinkedIn' | 'YouTube'>('Instagram');
  const [editVideoUrl, setEditVideoUrl] = useState('');
  const [editVideoFile, setEditVideoFile] = useState<File | null>(null);
  const [editVideoPreview, setEditVideoPreview] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const editVideoInputRef = useRef<HTMLInputElement>(null);

  const showToast = useCallback((msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const fetchReels = useCallback(async () => {
    try {
      const res = await fetch('/api/reels');
      const data = await res.json();
      setReels(Array.isArray(data) ? data : []);
    } catch {
      showToast('Failed to fetch reels', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchReels();
  }, [fetchReels]);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this Reel / Post?')) return;
    try {
      await fetch(`/api/reels/${id}`, { method: 'DELETE' });
      showToast('Reel deleted successfully', 'success');
      fetchReels();
    } catch {
      showToast('Error deleting reel', 'error');
    }
  };

  const openEditModal = (reel: ReelItem) => {
    setEditingReel(reel);
    setEditTitle(reel.title || '');
    setEditPlatform(reel.platform || 'Instagram');
    setEditVideoUrl(reel.videoUrl || '');
    setEditVideoFile(null);
    setEditVideoPreview('');
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditVideoFile(file);
    setEditVideoPreview(URL.createObjectURL(file));
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReel) return;
    if (!editTitle.trim()) {
      showToast('Reel Title is required', 'error');
      return;
    }
    setIsSaving(true);

    try {
      let uploadedVideoUrl = editVideoUrl;
      if (editVideoFile) {
        const fd = new FormData();
        fd.append('file', editVideoFile);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Video upload failed');
        uploadedVideoUrl = data.url;
      }

      const payload = {
        ...editingReel,
        title: editTitle,
        platform: editPlatform,
        category: editPlatform,
        videoUrl: uploadedVideoUrl,
      };

      const res = await fetch(`/api/reels/${editingReel.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast('Reel updated successfully!', 'success');
        setEditingReel(null);
        fetchReels();
      } else {
        const err = await res.json();
        showToast(err.error || 'Failed to update reel', 'error');
      }
    } catch (err: unknown) {
      const error = err as Error;
      showToast(error.message || 'Something went wrong', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const filteredReels = reels.filter(
    (r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.platform && r.platform.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-darkest tracking-tight">
            Reels &amp; Feed ({reels.length})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reels..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent"
            />
          </div>

          <Link
            href="/ad-tarkai-2026/add-reel"
            className="px-4 py-2.5 rounded-xl bg-brand-accent text-white font-bold text-xs hover:bg-brand-dark transition-all flex items-center gap-2 shadow-md shrink-0"
          >
            <FaPlus className="text-xs" />
            <span>Add Reel</span>
          </Link>
        </div>
      </div>

      {/* REELS DATA TABLE */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        {isLoading ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-200/80 text-gray-500 font-semibold text-sm">
            Loading reels...
          </div>
        ) : filteredReels.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-200/80">
            <FaVideo className="text-4xl text-purple-300 mx-auto mb-3" />
            <h3 className="text-lg font-black text-brand-darkest mb-1">No reels found</h3>
            <p className="text-xs text-gray-500 mb-6">Upload your first Reel video to populate the homepage &amp; feed page.</p>
            <Link
              href="/ad-tarkai-2026/add-reel"
              className="px-6 py-3 bg-brand-accent text-white rounded-2xl font-bold text-xs hover:bg-brand-dark transition-all shadow-md inline-block"
            >
              Add Reel
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-200/80 text-[11px] font-extrabold uppercase tracking-wider text-gray-500">
                    <th className="py-4 px-6">Reel Post</th>
                    <th className="py-4 px-6">Social Platform</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs font-semibold text-gray-700">
                  {filteredReels.map((item) => (
                    <tr key={item.id} className="hover:bg-brand-lightest/30 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-gray-900 shrink-0 border border-gray-200 shadow-xs flex items-center justify-center">
                            {item.videoUrl ? (
                              <video src={item.videoUrl} className="w-full h-full object-cover" />
                            ) : item.coverImage ? (
                              <NextImage src={item.coverImage} alt={item.title} fill className="object-cover" />
                            ) : (
                              <FaVideo className="text-white text-lg" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-brand-darkest text-sm max-w-xs">{item.title}</h4>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-[10px] font-extrabold border border-purple-200">
                          {item.platform || item.category || 'Instagram'}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-2 rounded-xl bg-gray-100 text-brand-darkest hover:bg-brand-darkest hover:text-white transition-colors cursor-pointer"
                            title="Edit Reel"
                          >
                            <FaEdit className="text-xs" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                            title="Delete Reel"
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

      {/* EDIT REEL MODAL POPUP */}
      {editingReel && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-2xl max-w-lg w-full my-8 relative"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <div>
                <h3 className="text-xl font-black text-brand-darkest">Edit Reel / Post</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingReel(null)}
                className="text-gray-400 hover:text-brand-darkest font-extrabold text-lg p-1.5 rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-5">
              {/* Reel Title & Select Social */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-8">
                  <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
                    Reel Title *
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="e.g. AI Hackathon Highlights"
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-xs font-semibold text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50/50"
                    required
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
                    Select Social *
                  </label>
                  <select
                    value={editPlatform}
                    onChange={(e) => setEditPlatform(e.target.value as 'Instagram' | 'LinkedIn' | 'YouTube')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-xs font-semibold text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50/50"
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="YouTube">YouTube</option>
                  </select>
                </div>
              </div>

              {/* Upload Video */}
              <div>
                <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
                  Upload Video
                </label>
                <div className="border-2 border-dashed border-gray-200 bg-gray-50/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                  <input
                    type="file"
                    ref={editVideoInputRef}
                    onChange={handleVideoChange}
                    accept="video/*"
                    className="hidden"
                  />
                  {(editVideoPreview || editVideoUrl) ? (
                    <div className="w-full space-y-3">
                      <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-black aspect-video flex items-center justify-center">
                        <video src={editVideoPreview || editVideoUrl} controls className="w-full h-full object-contain" />
                      </div>
                      <button
                        type="button"
                        onClick={() => editVideoInputRef.current?.click()}
                        className="px-4 py-2 rounded-xl bg-brand-darkest text-white text-[11px] font-bold shadow-xs hover:bg-brand-dark cursor-pointer flex items-center gap-1.5 mx-auto"
                      >
                        <FaVideo className="text-[10px]" />
                        <span>Change Video</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => editVideoInputRef.current?.click()}
                      className="px-4 py-2 rounded-xl bg-brand-darkest text-white text-[11px] font-bold shadow-xs hover:bg-brand-dark cursor-pointer flex items-center gap-1.5"
                    >
                      <FaUpload className="text-[10px]" />
                      <span>Upload Video</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingReel(null)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-extrabold text-xs hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-brand-darkest text-white font-extrabold text-xs hover:bg-brand-dark transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
