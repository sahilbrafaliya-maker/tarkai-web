'use client';

import React, { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NextImage from 'next/image';
import { FaList, FaPen, FaLock, FaCheckCircle, FaChevronDown, FaNewspaper, FaStar, FaVideo, FaGraduationCap } from 'react-icons/fa';
import { motion, AnimatePresence } from 'motion/react';

const emptySubscribe = () => () => {};

function useIsAdminAuth() {
  return useSyncExternalStore(
    emptySubscribe,
    () => (typeof window !== 'undefined' ? sessionStorage.getItem('isAdminAd') === 'true' : false),
    () => false
  );
}

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export default function AdAdminLayout({ children }: { children: React.ReactNode }) {
  const isMounted = useIsMounted();
  const isSessionAuth = useIsAdminAuth();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const [password, setPassword] = useState('');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  // Dropdown states
  const [openSection, setOpenSection] = useState<'blog' | 'reviews' | 'reels' | 'mentors' | null>('blog');

  const pathname = usePathname();

  const isAuthenticated = isSessionAuth || userLoggedIn;

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'TarkAI@2026') {
      sessionStorage.setItem('isAdminAd', 'true');
      setUserLoggedIn(true);
    } else {
      showToast('Invalid Admin Password', 'error');
    }
  };

  const toggleSection = (section: 'blog' | 'reviews' | 'reels' | 'mentors') => {
    setOpenSection(openSection === section ? null : section);
  };

  if (!isMounted) {
    return <div className="min-h-screen bg-[#001724]" />;
  }

  // ─── LOGIN GATE ─────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#001724] via-[#002b3d] to-[#001c29] px-4">
        {toast && (
          <div className="fixed top-5 right-5 z-50 px-6 py-3.5 rounded-2xl shadow-2xl text-xs font-bold text-white bg-red-600">
            {toast.msg}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/95 backdrop-blur-xl p-8 sm:p-10 rounded-[32px] shadow-2xl w-full max-w-md border border-white/20 text-center"
        >
          <div className="mb-6 flex justify-center">
            <NextImage
              src="/Logo.png"
              alt="TarkAI EdTech Logo"
              width={160}
              height={50}
              className="h-12 w-auto object-contain"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-extrabold uppercase tracking-wider mb-4 border border-brand-accent/20">
            <FaLock className="text-xs" />
            <span>Admin Console 2026</span>
          </div>

          <h1 className="text-2xl font-black text-brand-darkest mb-2">Management Login</h1>
          <p className="text-xs text-gray-500 mb-6 font-medium">Enter system key to unlock TarkAI content controls</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Admin Password"
              className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm font-semibold text-brand-darkest bg-brand-lightest/30"
              autoFocus
            />

            <button
              type="submit"
              className="w-full py-4 bg-brand-darkest hover:bg-brand-dark text-white font-extrabold rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer text-sm"
            >
              Unlock Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ─── DASHBOARD LAYOUT WITH SIDEBAR DROPDOWNS ─────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50/80 text-gray-800 flex">
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

      {/* LEFT SIDEBAR (ASIDE) */}
      <aside className="w-64 bg-[#001724] text-white border-r border-white/10 flex flex-col p-6 shrink-0 sticky top-0 h-screen z-40 hidden md:flex shadow-2xl overflow-y-auto">
        
        {/* Logo Section */}
        <div className="pb-4 border-b border-white/10 flex flex-col items-start shrink-0">
          <NextImage
            src="/Logo.png"
            alt="TarkAI EdTech Logo"
            width={150}
            height={48}
            className="h-10 w-auto object-contain brightness-0 invert"
          />
        </div>

        {/* Navigation Dropdown Menus */}
        <nav className="mt-5 space-y-2 flex-1">
          
          {/* 1. BLOG DROPDOWN */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection('blog')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-extrabold text-gray-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/5"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-md bg-brand-accent/20 text-teal-300 border border-brand-accent/30">
                  <FaNewspaper className="text-xs" />
                </div>
                <span>Blogs</span>
              </div>
              <FaChevronDown
                className={`text-[10px] transition-transform duration-300 ${
                  openSection === 'blog' ? 'rotate-180 text-teal-300' : 'text-gray-500'
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {openSection === 'blog' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden pl-3 space-y-1 pt-1 border-l-2 border-white/10 ml-4"
                >
                  <Link
                    href="/ad-tarkai-2026/all-blog"
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-bold transition-all duration-200 ${
                      pathname?.includes('/all-blog')
                        ? 'bg-gradient-to-r from-brand-accent to-teal-500 text-white shadow-md shadow-brand-accent/25 font-extrabold'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <FaList className="text-[11px]" />
                    <span>All Blogs</span>
                  </Link>

                  <Link
                    href="/ad-tarkai-2026/add-blog"
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-bold transition-all duration-200 ${
                      pathname?.includes('/add-blog')
                        ? 'bg-gradient-to-r from-brand-accent to-teal-500 text-white shadow-md shadow-brand-accent/25 font-extrabold'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <FaPen className="text-[11px]" />
                    <span>Add Blog</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 2. GOOGLE REVIEWS DROPDOWN */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection('reviews')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-extrabold text-gray-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/5"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-md bg-amber-400/20 text-amber-400 border border-amber-400/30">
                  <FaStar className="text-xs" />
                </div>
                <span>Google Reviews</span>
              </div>
              <FaChevronDown
                className={`text-[10px] transition-transform duration-300 ${
                  openSection === 'reviews' ? 'rotate-180 text-amber-400' : 'text-gray-500'
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {openSection === 'reviews' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden pl-3 space-y-1 pt-1 border-l-2 border-white/10 ml-4"
                >
                  <Link
                    href="/ad-tarkai-2026/reviews"
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-bold transition-all duration-200 ${
                      pathname === '/ad-tarkai-2026/reviews'
                        ? 'bg-gradient-to-r from-brand-accent to-teal-500 text-white shadow-md shadow-brand-accent/25 font-extrabold'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <FaList className="text-[11px]" />
                    <span>All Reviews</span>
                  </Link>

                  <Link
                    href="/ad-tarkai-2026/add-review"
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-bold transition-all duration-200 ${
                      pathname === '/ad-tarkai-2026/add-review'
                        ? 'bg-gradient-to-r from-brand-accent to-teal-500 text-white shadow-md shadow-brand-accent/25 font-extrabold'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <FaPen className="text-[11px]" />
                    <span>Add Review</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. REELS & FEED DROPDOWN */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection('reels')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-extrabold text-gray-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/5"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-md bg-purple-400/20 text-purple-300 border border-purple-400/30">
                  <FaVideo className="text-xs" />
                </div>
                <span>Reels &amp; Feed</span>
              </div>
              <FaChevronDown
                className={`text-[10px] transition-transform duration-300 ${
                  openSection === 'reels' ? 'rotate-180 text-purple-300' : 'text-gray-500'
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {openSection === 'reels' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden pl-3 space-y-1 pt-1 border-l-2 border-white/10 ml-4"
                >
                  <Link
                    href="/ad-tarkai-2026/reels"
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-bold transition-all duration-200 ${
                      pathname === '/ad-tarkai-2026/reels'
                        ? 'bg-gradient-to-r from-brand-accent to-teal-500 text-white shadow-md shadow-brand-accent/25 font-extrabold'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <FaList className="text-[11px]" />
                    <span>All Reels / Posts</span>
                  </Link>

                  <Link
                    href="/ad-tarkai-2026/add-reel"
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-bold transition-all duration-200 ${
                      pathname === '/ad-tarkai-2026/add-reel'
                        ? 'bg-gradient-to-r from-brand-accent to-teal-500 text-white shadow-md shadow-brand-accent/25 font-extrabold'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <FaPen className="text-[11px]" />
                    <span>Add Reel / Post</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 4. MENTORS DROPDOWN */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection('mentors')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-extrabold text-gray-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/5"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-md bg-blue-400/20 text-blue-300 border border-blue-400/30">
                  <FaGraduationCap className="text-xs" />
                </div>
                <span>Mentors</span>
              </div>
              <FaChevronDown
                className={`text-[10px] transition-transform duration-300 ${
                  openSection === 'mentors' ? 'rotate-180 text-blue-300' : 'text-gray-500'
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {openSection === 'mentors' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden pl-3 space-y-1 pt-1 border-l-2 border-white/10 ml-4"
                >
                  <Link
                    href="/ad-tarkai-2026/mentors"
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-bold transition-all duration-200 ${
                      pathname === '/ad-tarkai-2026/mentors'
                        ? 'bg-gradient-to-r from-brand-accent to-teal-500 text-white shadow-md shadow-brand-accent/25 font-extrabold'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <FaList className="text-[11px]" />
                    <span>All Mentors</span>
                  </Link>

                  <Link
                    href="/ad-tarkai-2026/add-mentor"
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-bold transition-all duration-200 ${
                      pathname === '/ad-tarkai-2026/add-mentor'
                        ? 'bg-gradient-to-r from-brand-accent to-teal-500 text-white shadow-md shadow-brand-accent/25 font-extrabold'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <FaPen className="text-[11px]" />
                    <span>Add Mentor</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </nav>

      </aside>

      {/* MAIN CONTENT WORKSPACE */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 lg:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
