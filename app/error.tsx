"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { FaRedo, FaHome, FaExclamationTriangle } from 'react-icons/fa';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Check if error is related to stale deployment chunk 404 or React Hook mismatch
    const msg = (error?.message || '').toLowerCase();
    const isChunkOrDeployError =
      msg.includes('loading chunk') ||
      msg.includes('failed to fetch') ||
      msg.includes('dynamically imported module') ||
      msg.includes('minified react error #300') ||
      msg.includes('chunkloaderror');

    if (isChunkOrDeployError) {
      const lastReload = sessionStorage.getItem('tarkai_error_reload');
      const now = Date.now();

      // Guard against infinite reload loops
      if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
        sessionStorage.setItem('tarkai_error_reload', now.toString());
        window.location.reload();
      }
    }
  }, [error]);

  const handleHardRefresh = () => {
    sessionStorage.removeItem('tarkai_error_reload');
    sessionStorage.removeItem('tarkai_last_chunk_reload');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-brand-lightest/40 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center">
        <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaExclamationTriangle className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-bold text-brand-darkest mb-2">
          Page Update Available
        </h1>

        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          A new version of the website is available or an asset took too long to load. Refreshing will load the latest version.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleHardRefresh}
            className="w-full py-3 px-6 bg-brand-accent hover:bg-brand-dark text-white font-bold rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <FaRedo className="text-sm" />
            Refresh Page
          </button>

          <button
            onClick={() => reset()}
            className="w-full py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 cursor-pointer"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="w-full py-3 px-6 text-brand-dark hover:text-brand-accent text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <FaHome className="text-sm" />
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
