'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import NextImage from 'next/image';
import { motion } from 'motion/react';
import { FaCheckCircle, FaUpload } from 'react-icons/fa';

interface MentorItem {
  _id?: string;
  id: number;
  name: string;
  role?: string;
  avatar: string;
  companyLogo?: string;
}

const emptyForm = {
  name: '',
  avatar: '',
  companyLogo: '/Logo.png',
};

function AddMentorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editIdParam = searchParams.get('edit');

  const [form, setForm] = useState<typeof emptyForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Avatar file upload & interactive mouse drag/zoom state
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [photoZoom, setPhotoZoom] = useState<number>(1.0);
  const [cropPos, setCropPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!avatarPreview && !form.avatar) return;
    e.stopPropagation();
    setIsDragging(true);
    setDragStart({ x: e.clientX - cropPos.x, y: e.clientY - cropPos.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.stopPropagation();
    setCropPos({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!avatarPreview && !form.avatar) return;
    e.stopPropagation();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    setPhotoZoom((prev) => Math.max(1.0, Math.min(3.0, parseFloat((prev + delta).toFixed(2)))));
  };

  const resetCrop = () => {
    setPhotoZoom(1.0);
    setCropPos({ x: 0, y: 0 });
  };

  // Company Logo file upload
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState('');
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = useCallback((msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setAvatarFile(null);
    setAvatarPreview('');
    setLogoFile(null);
    setLogoPreview('');
    setEditingId(null);
    resetCrop();
  };

  const fetchMentorToEdit = useCallback(async (id: number) => {
    try {
      const res = await fetch(`/api/mentors/${id}`);
      if (res.ok) {
        const data: MentorItem = await res.json();
        setForm({
          name: data.name || '',
          avatar: data.avatar || '',
          companyLogo: data.companyLogo || '/Logo.png',
        });
        setEditingId(data.id);
      }
    } catch {
      showToast('Failed to load mentor for editing', 'error');
    }
  }, [showToast]);

  useEffect(() => {
    if (editIdParam) {
      const id = parseInt(editIdParam, 10);
      if (!isNaN(id)) {
        fetchMentorToEdit(id);
      }
    }
  }, [editIdParam, fetchMentorToEdit]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    resetCrop();
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const createCroppedFileFromDrag = (
    imageSrc: string,
    zoom: number,
    pos: { x: number; y: number }
  ): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageSrc;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context unavailable'));
          return;
        }

        const targetSize = 600;
        canvas.width = targetSize;
        canvas.height = targetSize;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, targetSize, targetSize);

        const previewContainerSize = 192;
        const scaleFactor = targetSize / previewContainerSize;

        const minDim = Math.min(img.width, img.height);
        const baseDrawSize = targetSize / minDim;

        const drawWidth = img.width * baseDrawSize * zoom;
        const drawHeight = img.height * baseDrawSize * zoom;

        const drawX = (targetSize - drawWidth) / 2 + (pos.x * scaleFactor);
        const drawY = (targetSize - drawHeight) / 2 + (pos.y * scaleFactor);

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Canvas export failed'));
            return;
          }
          const file = new File([blob], 'mentor_portrait.jpg', { type: 'image/jpeg' });
          resolve(file);
        }, 'image/jpeg', 0.92);
      };
      img.onerror = (err) => reject(err);
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      showToast('Mentor Full Name is required', 'error');
      return;
    }
    setSubmitting(true);

    try {
      let avatarUrl = form.avatar;
      const currentSrc = avatarPreview || form.avatar;

      if (avatarFile || (currentSrc && (cropPos.x !== 0 || cropPos.y !== 0 || photoZoom !== 1.0))) {
        let fileToUpload: File | null = avatarFile;
        if (currentSrc && (cropPos.x !== 0 || cropPos.y !== 0 || photoZoom !== 1.0)) {
          try {
            fileToUpload = await createCroppedFileFromDrag(currentSrc, photoZoom, cropPos);
          } catch {
            // Fallback to avatarFile
          }
        }

        if (fileToUpload) {
          const fd = new FormData();
          fd.append('file', fileToUpload);
          const res = await fetch('/api/upload', { method: 'POST', body: fd });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Portrait photo upload failed');
          avatarUrl = data.url;
        }
      }

      let companyLogoUrl = form.companyLogo;
      if (logoFile) {
        const fd = new FormData();
        fd.append('file', logoFile);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Company logo upload failed');
        companyLogoUrl = data.url;
      }

      const payload = {
        name: form.name,
        role: 'AI / Data Science Faculty',
        avatar: avatarUrl,
        companyLogo: companyLogoUrl,
      };

      const method = editingId !== null ? 'PUT' : 'POST';
      const url = editingId !== null ? `/api/mentors/${editingId}` : '/api/mentors';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast(editingId !== null ? 'Mentor updated successfully!' : 'Mentor created successfully!', 'success');
        resetForm();
        router.push('/ad-tarkai-2026/mentors');
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
                {editingId !== null ? 'Edit Mentor Profile' : 'Add Mentor Profile'}
              </h3>
              {/* <p className="text-xs font-medium text-gray-500 mt-1">
                Provide Mentor Full Name, Portrait Photo, and Organization Logo.
              </p> */}
            </div>
            <button
              type="button"
              onClick={resetForm}
              className="text-xs font-bold text-gray-500 hover:text-brand-darkest transition-colors cursor-pointer"
            >
              Reset Form
            </button>
          </div>

          {/* 1. Mentor Full Name */}
          <div>
            <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
              Mentor Full Name *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Sahil Rafaliya"
              className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-xs font-semibold text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50/50"
              required
            />
          </div>

          {/* Side-by-Side Square Upload Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* LEFT SQUARE CARD: Mentor Portrait Photo (Round View) */}
            <div className="flex flex-col">
              <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
                Mentor Portrait Photo *
              </label>

              <div className="w-full aspect-square border-2 border-dashed border-gray-200 bg-gray-50/50 rounded-3xl p-5 sm:p-6 transition-all duration-300 flex flex-col items-center justify-between text-center group relative overflow-hidden">
                <input
                  type="file"
                  ref={avatarInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  className="hidden"
                />

                <span className="text-xs font-extrabold text-brand-darkest uppercase tracking-wider">
                  {(avatarPreview || form.avatar) ? 'Photo Preview' : 'Select Photo'}
                </span>

                {/* Round Circle Portrait Photo Container (Interactive Mouse Drag) */}
                <div
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onWheel={handleWheel}
                  onClick={() => {
                    if (!avatarPreview && !form.avatar) avatarInputRef.current?.click();
                  }}
                  className={`w-44 h-44 sm:w-52 sm:h-52 rounded-full border-4 border-brand-accent/50 bg-white overflow-hidden shrink-0 shadow-lg flex items-center justify-center relative my-auto select-none ${(avatarPreview || form.avatar) ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'
                    }`}
                  title={(avatarPreview || form.avatar) ? 'Click and drag to position photo, scroll mouse wheel to zoom' : 'Click to select photo'}
                >
                  {(avatarPreview || form.avatar) ? (
                    <img
                      src={avatarPreview || form.avatar}
                      alt="Mentor Portrait"
                      draggable={false}
                      style={{
                        transform: `translate(${cropPos.x}px, ${cropPos.y}px) scale(${photoZoom})`,
                        transformOrigin: 'center center',
                      }}
                      className="w-full h-full object-cover pointer-events-none transition-transform duration-75 select-none"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400 p-4">
                      <FaUpload className="text-3xl mb-1 text-gray-400 group-hover:text-brand-accent transition-colors" />
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">Upload Photo</span>
                    </div>
                  )}
                </div>

                <div className="w-full flex flex-col items-center gap-1">
                  {/* Explicit Upload Photo Button */}
                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    className="px-5 py-2.5 rounded-2xl bg-brand-darkest hover:bg-brand-dark text-white font-extrabold text-xs transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2"
                  >
                    <FaUpload className="text-xs text-brand-light" />
                    <span>{(avatarPreview || form.avatar) ? 'Change Portrait Photo' : 'Upload Portrait Photo'}</span>
                  </button>
                  <p className="text-[10px] font-medium text-gray-400 mt-0.5">
                    JPG, PNG or WEBP image
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SQUARE CARD: Mentor Company / Organization Logo */}
            <div className="flex flex-col">
              <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
                Company / Organization Logo
              </label>

              <div className="w-full aspect-square border-2 border-dashed border-gray-200 bg-gray-50/50 rounded-3xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between items-center text-center group relative overflow-hidden">
                <input
                  type="file"
                  ref={logoInputRef}
                  onChange={handleLogoChange}
                  accept="image/*"
                  className="hidden"
                />

                <span className="text-xs font-extrabold text-brand-darkest uppercase tracking-wider">
                  {(logoPreview || form.companyLogo) ? 'Logo Preview' : 'Select Logo'}
                </span>

                {/* FULL-SIZE Company Logo Container */}
                <div
                  onClick={() => logoInputRef.current?.click()}
                  className="w-full flex-1 min-h-[190px] rounded-2xl border-2 border-gray-200/80 bg-white p-4 shadow-sm flex items-center justify-center relative my-3 cursor-pointer group-hover:scale-[1.01] transition-transform"
                >
                  {(logoPreview || form.companyLogo) ? (
                    <img
                      src={logoPreview || form.companyLogo}
                      alt="Company Logo"
                      className="max-h-full max-w-full object-contain p-2"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400 p-4">
                      <FaUpload className="text-4xl mb-2 text-gray-400 group-hover:text-brand-accent transition-colors" />
                      <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400">Click to Upload Logo</span>
                    </div>
                  )}
                </div>

                <div className="w-full flex flex-col items-center gap-1">
                  {/* Explicit Upload Logo Button */}
                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    className="px-5 py-2.5 rounded-2xl bg-brand-darkest hover:bg-brand-dark text-white font-extrabold text-xs transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2"
                  >
                    <FaUpload className="text-xs text-brand-light" />
                    <span>{(logoPreview || form.companyLogo) ? 'Change Organization Logo' : 'Upload Organization Logo'}</span>
                  </button>
                  <p className="text-[10px] font-medium text-gray-400 mt-0.5">
                    PNG, SVG or JPG image
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => router.push('/ad-tarkai-2026/mentors')}
              className="px-6 py-3.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3.5 rounded-2xl bg-brand-darkest hover:bg-brand-dark text-white font-extrabold text-xs transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              {submitting ? 'Saving...' : editingId !== null ? 'Save Mentor' : 'Create Mentor'}
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
}

export default function AddMentorPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-xs font-semibold text-gray-500">Loading form...</div>}>
      <AddMentorContent />
    </Suspense>
  );
}
