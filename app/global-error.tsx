"use client";

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    const msg = (error?.message || '').toLowerCase();
    const isChunkOrDeployError =
      msg.includes('loading chunk') ||
      msg.includes('failed to fetch') ||
      msg.includes('dynamically imported module') ||
      msg.includes('minified react error #300') ||
      msg.includes('chunkloaderror');

    if (isChunkOrDeployError) {
      const lastReload = sessionStorage.getItem('tarkai_global_reload');
      const now = Date.now();

      if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
        sessionStorage.setItem('tarkai_global_reload', now.toString());
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 text-sm mb-6">
            The application encountered a temporary error. Please refresh to load the latest version.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 px-6 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition"
            >
              Refresh Application
            </button>
            <button
              onClick={() => reset()}
              className="w-full py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
