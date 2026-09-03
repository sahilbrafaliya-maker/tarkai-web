'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { motion } from 'motion/react';
import { FaEdit, FaTrash, FaPlus, FaGraduationCap, FaSearch, FaCheckCircle, FaUpload } from 'react-icons/fa';

interface MentorItem {
  _id?: string;
  id: number;
  name: string;
  role?: string;
  avatar: string;
  companyLogo?: string;
}

export default function MentorsManagerPage() {
  const [mentors, setMentors] = useState<MentorItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  // Edit Modal State
  const [editingMentor, setEditingMentor] = useState<MentorItem | null>(null);
  const [editName, setEditName] = useState('');
  const [editAvatar, setEditAvatar] = useState('');
  const [editCompanyLogo, setEditCompanyLogo] = useState('');
  const [editAvatarFile, setEditAvatarFile] = useState<File | null>(null);
  const [editAvatarPreview, setEditAvatarPreview] = useState('');
  const [editLogoFile, setEditLogoFile] = useState<File | null>(null);
  const [editLogoPreview, setEditLogoPreview] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Drag & Zoom State inside Edit Modal
  const [photoZoom, setPhotoZoom] = useState<number>(1.0);
  const [cropPos, setCropPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const editAvatarInputRef = useRef<HTMLInputElement>(null);
  const editLogoInputRef = useRef<HTMLInputElement>(null);

  const showToast = useCallback((msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const fetchMentors = useCallback(async () => {
    try {
      const res = await fetch('/api/mentors');
      const data = await res.json();
      setMentors(Array.isArray(data) ? data : []);
    } catch {
      showToast('Failed to fetch mentors', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchMentors();
  }, [fetchMentors]);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this Mentor profile?')) return;
    try {
      await fetch(`/api/mentors/${id}`, { method: 'DELETE' });
      showToast('Mentor deleted successfully', 'success');
      fetchMentors();
    } catch {
      showToast('Error deleting mentor', 'error');
    }
  };

  const openEditModal = (mentor: MentorItem) => {
    setEditingMentor(mentor);
    setEditName(mentor.name);
    setEditAvatar(mentor.avatar || '');
    setEditCompanyLogo(mentor.companyLogo || '/Logo.png');
    setEditAvatarFile(null);
    setEditAvatarPreview('');
    setEditLogoFile(null);
    setEditLogoPreview('');
    setPhotoZoom(1.0);
    setCropPos({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!editAvatarPreview && !editAvatar) return;
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
    if (!editAvatarPreview && !editAvatar) return;
    e.stopPropagation();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    setPhotoZoom((prev) => Math.max(1.0, Math.min(3.0, parseFloat((prev + delta).toFixed(2)))));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditAvatarFile(file);
    setEditAvatarPreview(URL.createObjectURL(file));
    setPhotoZoom(1.0);
    setCropPos({ x: 0, y: 0 });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditLogoFile(file);
    setEditLogoPreview(URL.createObjectURL(file));
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

        const previewContainerSize = 144; // 144px (w-36)
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

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMentor) return;
    if (!editName.trim()) {
      showToast('Mentor Full Name is required', 'error');
      return;
    }
    setIsSaving(true);

    try {
      let avatarUrl = editAvatar;
      const currentSrc = editAvatarPreview || editAvatar;

      if (editAvatarFile || (currentSrc && (cropPos.x !== 0 || cropPos.y !== 0 || photoZoom !== 1.0))) {
        let fileToUpload: File | null = editAvatarFile;
        if (currentSrc && (cropPos.x !== 0 || cropPos.y !== 0 || photoZoom !== 1.0)) {
          try {
            fileToUpload = await createCroppedFileFromDrag(currentSrc, photoZoom, cropPos);
          } catch {
            // Fallback
          }
        }

        if (fileToUpload) {
          const fd = new FormData();
          fd.append('file', fileToUpload);
          const res = await fetch('/api/upload', { method: 'POST', body: fd });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Avatar upload failed');
          avatarUrl = data.url;
        }
      }

      let companyLogoUrl = editCompanyLogo;
      if (editLogoFile) {
        const fd = new FormData();
        fd.append('file', editLogoFile);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Company logo upload failed');
        companyLogoUrl = data.url;
      }

      const payload = {
        name: editName,
        role: 'AI / Data Science Faculty',
        avatar: avatarUrl,
        companyLogo: companyLogoUrl,
      };

      const res = await fetch(`/api/mentors/${editingMentor.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast('Mentor updated successfully!', 'success');
        setEditingMentor(null);
        fetchMentors();
      } else {
        const err = await res.json();
        showToast(err.error || 'Failed to update mentor', 'error');
      }
    } catch (err: unknown) {
      const error = err as Error;
      showToast(error.message || 'Something went wrong', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const filteredMentors = mentors.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
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
            Mentors ({mentors.length})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search mentors..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent"
            />
          </div>

          <Link
            href="/ad-tarkai-2026/add-mentor"
            className="px-4 py-2.5 rounded-xl bg-brand-accent text-white font-bold text-xs hover:bg-brand-dark transition-all flex items-center gap-2 shadow-md shrink-0"
          >
            <FaPlus className="text-xs" />
            <span>Add Mentor</span>
          </Link>
        </div>
      </div>

      {/* MENTORS DATA TABLE */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        {isLoading ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-200/80 text-gray-500 font-semibold text-sm">
            Loading mentors...
          </div>
        ) : filteredMentors.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-200/80">
            <FaGraduationCap className="text-4xl text-blue-300 mx-auto mb-3" />
            <h3 className="text-lg font-black text-brand-darkest mb-1">No mentors found</h3>
            <p className="text-xs text-gray-500 mb-6">Add your first Mentor profile card to populate the homepage.</p>
            <Link
              href="/ad-tarkai-2026/add-mentor"
              className="px-6 py-3 bg-brand-accent text-white rounded-2xl font-bold text-xs hover:bg-brand-dark transition-all shadow-md inline-block"
            >
              Add Mentor
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-200/80 text-[11px] font-extrabold uppercase tracking-wider text-gray-500">
                    <th className="py-4 px-6">Mentor Profile</th>
                    <th className="py-4 px-6">Company / Organization Logo</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs font-semibold text-gray-700">
                  {filteredMentors.map((item) => (
                    <tr key={item.id} className="hover:bg-brand-lightest/30 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-gray-200 shadow-xs">
                            {item.avatar ? (
                              <NextImage src={item.avatar} alt={item.name} fill className="object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold">
                                {item.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-brand-darkest text-sm">{item.name}</h4>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="relative h-10 w-28 rounded-lg overflow-hidden border border-gray-200 bg-white p-1 flex items-center justify-center shadow-xs">
                          <img
                            src={item.companyLogo || '/Logo.png'}
                            alt="Company Logo"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-2 rounded-xl bg-gray-100 text-brand-darkest hover:bg-brand-darkest hover:text-white transition-colors cursor-pointer"
                            title="Edit Mentor"
                          >
                            <FaEdit className="text-xs" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                            title="Delete Mentor"
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

      {/* EDIT MENTOR MODAL POPUP */}
      {editingMentor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-2xl max-w-xl w-full my-8 relative"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <div>
                <h3 className="text-xl font-black text-brand-darkest">Edit Mentor Profile</h3>
                {/* <p className="text-xs text-gray-500 font-medium mt-0.5">Update mentor details and image assets.</p> */}
              </div>
              <button
                type="button"
                onClick={() => setEditingMentor(null)}
                className="text-gray-400 hover:text-brand-darkest font-extrabold text-lg p-1.5 rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-6">
              {/* Mentor Full Name */}
              <div>
                <label className="block text-xs font-extrabold text-brand-darkest uppercase tracking-wider mb-2">
                  Mentor Full Name *
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="e.g. Sahil Rafaliya"
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-xs font-semibold text-brand-darkest focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50/50"
                  required
                />
              </div>

              {/* Side-by-Side Upload Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Portrait Photo */}
                <div className="flex flex-col border-2 border-dashed border-gray-200 rounded-3xl p-4 bg-gray-50/50 text-center items-center justify-between aspect-square relative">
                  <span className="text-[11px] font-extrabold text-brand-darkest uppercase tracking-wider">Portrait Photo</span>

                  <div
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onWheel={handleWheel}
                    onClick={() => {
                      if (!editAvatarPreview && !editAvatar) editAvatarInputRef.current?.click();
                    }}
                    className={`w-36 h-36 rounded-full border-4 border-brand-accent/50 bg-white overflow-hidden shrink-0 shadow-md flex items-center justify-center relative my-auto select-none ${(editAvatarPreview || editAvatar) ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'
                      }`}
                    title={(editAvatarPreview || editAvatar) ? 'Click & drag to position photo, scroll to zoom' : 'Click to select photo'}
                  >
                    {(editAvatarPreview || editAvatar) ? (
                      <img
                        src={editAvatarPreview || editAvatar}
                        alt="Portrait"
                        draggable={false}
                        style={{
                          transform: `translate(${cropPos.x}px, ${cropPos.y}px) scale(${photoZoom})`,
                          transformOrigin: 'center center',
                        }}
                        className="w-full h-full object-cover pointer-events-none select-none"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400 p-2">
                        <FaUpload className="text-2xl mb-1 text-gray-400" />
                        <span className="text-[9px] font-extrabold uppercase">Upload</span>
                      </div>
                    )}
                  </div>

                  <input
                    type="file"
                    ref={editAvatarInputRef}
                    onChange={handleAvatarChange}
                    accept="image/*"
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => editAvatarInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-brand-darkest text-white text-[11px] font-bold shadow-xs hover:bg-brand-dark cursor-pointer flex items-center gap-1.5"
                  >
                    <FaUpload className="text-[10px] text-brand-light" />
                    <span>{(editAvatarPreview || editAvatar) ? 'Change Photo' : 'Upload Photo'}</span>
                  </button>
                </div>

                {/* Company Logo */}
                <div className="flex flex-col border-2 border-dashed border-gray-200 rounded-3xl p-4 bg-gray-50/50 text-center items-center justify-between aspect-square relative">
                  <span className="text-[11px] font-extrabold text-brand-darkest uppercase tracking-wider">Organization Logo</span>

                  <div
                    onClick={() => editLogoInputRef.current?.click()}
                    className="w-full flex-1 rounded-2xl border border-gray-200 bg-white p-2.5 shadow-xs flex items-center justify-center my-2 cursor-pointer hover:scale-[1.01] transition-transform"
                  >
                    {(editLogoPreview || editCompanyLogo) ? (
                      <img
                        src={editLogoPreview || editCompanyLogo}
                        alt="Logo"
                        className="max-h-full max-w-full object-contain p-1"
                      />
                    ) : (
                      <div className="text-gray-400 text-xs font-semibold">No Logo</div>
                    )}
                  </div>

                  <input
                    type="file"
                    ref={editLogoInputRef}
                    onChange={handleLogoChange}
                    accept="image/*"
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => editLogoInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-brand-darkest text-white text-[11px] font-bold shadow-xs hover:bg-brand-dark cursor-pointer flex items-center gap-1.5"
                  >
                    <FaUpload className="text-[10px] text-brand-light" />
                    <span>{(editLogoPreview || editCompanyLogo) ? 'Change Logo' : 'Upload Logo'}</span>
                  </button>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingMentor(null)}
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
