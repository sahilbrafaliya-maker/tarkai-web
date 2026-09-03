'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { motion } from 'motion/react';
import { FaEdit, FaTrash, FaPlus, FaStar, FaSearch, FaCheckCircle } from 'react-icons/fa';

interface ReviewItem {
  _id?: string;
  id: number;
  author: string;
  role: string;
  avatar?: string;
  rating: number;
  reviewText: string;
  isVerified: boolean;
  date?: string;
}

export default function ReviewsManagerPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  // Edit Modal State
  const [editingReview, setEditingReview] = useState<ReviewItem | null>(null);
  const [editAuthor, setEditAuthor] = useState('');
  const [editRating, setEditRating] = useState<number>(5);
  const [editDate, setEditDate] = useState('');
  const [editReviewText, setEditReviewText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Google Review Badge Stats Settings
  const [statsRating, setStatsRating] = useState('4.9');
  const [statsCount, setStatsCount] = useState('226');
  const [isSavingStats, setIsSavingStats] = useState(false);

  const showToast = useCallback((msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        if (data.averageRating) setStatsRating(data.averageRating);
        if (data.totalReviews) setStatsCount(data.totalReviews);
      }
    } catch {
      // keep defaults
    }
  }, []);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch {
      showToast('Failed to fetch reviews', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchReviews();
    fetchSettings();
  }, [fetchReviews, fetchSettings]);

  const handleSaveStats = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingStats(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          averageRating: statsRating,
          totalReviews: statsCount,
        }),
      });
      if (res.ok) {
        showToast('Google Reviews stats updated successfully!', 'success');
      } else {
        showToast('Failed to update stats', 'error');
      }
    } catch {
      showToast('Error updating stats', 'error');
    } finally {
      setIsSavingStats(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this Google Review?')) return;
    try {
      await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
      showToast('Review deleted successfully', 'success');
      fetchReviews();
    } catch {
      showToast('Error deleting review', 'error');
    }
  };

  const openEditModal = (review: ReviewItem) => {
    setEditingReview(review);
    setEditAuthor(review.author || '');
    setEditRating(review.rating || 5);
    setEditDate(review.date || 'a week ago');
    setEditReviewText(review.reviewText || '');
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;
    if (!editAuthor.trim() || !editReviewText.trim()) {
      showToast('Author Name and Review Content are required', 'error');
      return;
    }
    setIsSaving(true);

    try {
      const payload = {
        ...editingReview,
        author: editAuthor,
        rating: editRating,
        date: editDate,
        reviewText: editReviewText,
      };

      const res = await fetch(`/api/reviews/${editingReview.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast('Review updated successfully!', 'success');
        setEditingReview(null);
        fetchReviews();
      } else {
        const err = await res.json();
        showToast(err.error || 'Failed to update review', 'error');
      }
    } catch (err: unknown) {
      const error = err as Error;
      showToast(error.message || 'Something went wrong', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const filteredReviews = reviews.filter(
    (r) =>
      r.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reviewText.toLowerCase().includes(searchQuery.toLowerCase())
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

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-darkest tracking-tight">
            Google Reviews ({reviews.length})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reviews..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent"
            />
          </div>

          <Link
            href="/ad-tarkai-2026/add-review"
            className="px-4 py-2.5 rounded-xl bg-brand-accent text-white font-bold text-xs hover:bg-brand-dark transition-all flex items-center gap-2 shadow-md shrink-0"
          >
            <FaPlus className="text-xs" />
            <span>Add Review</span>
          </Link>
        </div>
      </div>

      {/* Google Reviews Badge Stats Settings Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 rounded-3xl p-5 sm:p-6 mb-8 shadow-xs">
        <form onSubmit={handleSaveStats} className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 flex items-center justify-center font-black text-lg shrink-0">
              ★
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-brand-darkest">Homepage Google Review Badge Stats</h3>
              {/* <p className="text-xs text-gray-500 font-medium">Configure average rating and total reviews count displayed on homepage.</p> */}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-gray-200">
              <span className="text-xs font-extrabold text-gray-500 uppercase text-[10px]">Average Rating:</span>
              <input
                type="text"
                value={statsRating}
                onChange={(e) => setStatsRating(e.target.value)}
                placeholder="4.3"
                className="w-14 text-xs font-black text-brand-darkest focus:outline-none text-center bg-transparent "
              />
            </div>

            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-gray-200">
              <span className="text-xs font-extrabold text-gray-500 uppercase text-[10px]">Total Reviews:</span>
              <input
                type="text"
                value={statsCount}
                onChange={(e) => setStatsCount(e.target.value)}
                placeholder="226"
                className="w-16 text-xs font-black text-brand-darkest focus:outline-none text-center bg-transparent "
              />
            </div>

            <button
              type="submit"
              disabled={isSavingStats}
              className="px-5 py-2.5 rounded-2xl bg-brand-darkest hover:bg-brand-dark text-white font-extrabold text-xs transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {isSavingStats ? 'Saving...' : 'Save Stats'}
            </button>
          </div>
        </form>
      </div>

      {/* REVIEWS DATA TABLE */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        {isLoading ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-200/80 text-gray-500 font-semibold text-sm">
            Loading reviews...
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-200/80">
            <FaStar className="text-4xl text-amber-300 mx-auto mb-3" />
            <h3 className="text-lg font-black text-brand-darkest mb-1">No reviews found</h3>
            <p className="text-xs text-gray-500 mb-6">Create your first Google Review card to populate the homepage.</p>
            <Link
              href="/ad-tarkai-2026/add-review"
              className="px-6 py-3 bg-brand-accent text-white rounded-2xl font-bold text-xs hover:bg-brand-dark transition-all shadow-md inline-block"
            >
              Add Review
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-200/80 text-[11px] font-extrabold uppercase tracking-wider text-gray-500">
                    <th className="py-4 px-6">Author</th>
                    <th className="py-4 px-6">Rating &amp; Review Text</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs font-semibold text-gray-700">
                  {filteredReviews.map((item) => (
                    <tr key={item.id} className="hover:bg-brand-lightest/30 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center overflow-hidden border border-amber-200 shrink-0">
                            {item.avatar ? (
                              <NextImage src={item.avatar} alt={item.author} width={40} height={40} className="object-cover w-full h-full" />
                            ) : (
                              item.author.charAt(0)
                            )}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-brand-darkest text-sm">{item.author}</h4>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6 max-w-xs">
                        <div className="flex items-center gap-1 text-amber-500 mb-1">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <FaStar key={i} className="text-[10px]" />
                          ))}
                        </div>
                        <p className="text-xs text-gray-700 line-clamp-2">{item.reviewText}</p>
                      </td>

                      <td className="py-4 px-6 text-gray-500 text-xs font-semibold">
                        {item.date || 'a week ago'}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-2 rounded-xl bg-gray-100 text-brand-darkest hover:bg-brand-darkest hover:text-white transition-colors cursor-pointer"
                            title="Edit Review"
                          >
                            <FaEdit className="text-xs" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                            title="Delete Review"
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

      {/* EDIT REVIEW MODAL POPUP */}
      {editingReview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-2xl max-w-lg w-full my-8 relative"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <div>
                <h3 className="text-xl font-black text-brand-darkest">Edit Google Review</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingReview(null)}
                className="text-gray-400 hover:text-brand-darkest font-extrabold text-lg p-1.5 rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-5">
              {/* Author Name & Star Rating */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-8">
                  <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
                    Author Name *
                  </label>
                  <input
                    type="text"
                    value={editAuthor}
                    onChange={(e) => setEditAuthor(e.target.value)}
                    placeholder="e.g. Aarav Patel"
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-xs font-semibold text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50/50"
                    required
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
                    Star Rating *
                  </label>
                  <select
                    value={editRating}
                    onChange={(e) => setEditRating(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-xs font-semibold text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50/50"
                  >
                    <option value={5}>5</option>
                    <option value={4}>4</option>
                    <option value={3}>3</option>
                    <option value={2}>2</option>
                    <option value={1}>1</option>
                  </select>
                </div>
              </div>

              {/* Date String */}
              <div>
                <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
                  Date String
                </label>
                <input
                  type="text"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  placeholder="e.g. a week ago or 2 months ago"
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-xs font-semibold text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50/50"
                />
              </div>

              {/* Review Content */}
              <div>
                <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
                  Review Content *
                </label>
                <textarea
                  rows={4}
                  value={editReviewText}
                  onChange={(e) => setEditReviewText(e.target.value)}
                  placeholder="Write the full review content here..."
                  className="w-full p-4 border border-gray-200 rounded-2xl text-xs font-medium leading-relaxed text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50/50"
                  required
                />
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingReview(null)}
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
