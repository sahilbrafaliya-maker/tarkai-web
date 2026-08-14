"use client";

import { useEffect } from 'react';

/**
 * Automatically intercepts Next.js chunk loading failures and stale deployment chunk 404s.
 * When a user navigates between pages after a new build is deployed, old chunk hashes
 * no longer exist on the server (returning 404). This handler seamlessly refreshes the page
 * to fetch the new build assets without showing the React error crash screen.
 */
export default function ChunkLoadHandler() {
  useEffect(() => {
    const handleChunkError = (error: any) => {
      const errorMessage = (error?.message || error?.reason?.message || error?.target?.src || '').toString().toLowerCase();

      const isChunkLoadFailed =
        errorMessage.includes('loading chunk') ||
        errorMessage.includes('chunkloaderror') ||
        errorMessage.includes('failed to fetch dynamically imported module') ||
        errorMessage.includes('minified react error #300') ||
        errorMessage.includes('minified react error #310') ||
        errorMessage.includes('minified react error #418') ||
        errorMessage.includes('minified react error #423') ||
        errorMessage.includes('minified react error #425') ||
        (error?.target?.tagName === 'SCRIPT' && errorMessage.includes('_next/static/chunks'));

      if (isChunkLoadFailed) {
        const lastReload = sessionStorage.getItem('tarkai_last_chunk_reload');
        const now = Date.now();

        // Prevent infinite reload loop: allow 1 reload per 10 seconds
        if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
          sessionStorage.setItem('tarkai_last_chunk_reload', now.toString());
          // Force reload to get fresh HTML and JavaScript chunk hashes
          window.location.reload();
        }
      }
    };

    const handleWindowError = (event: ErrorEvent) => {
      handleChunkError(event.error || event);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      handleChunkError(event.reason);
    };

    window.addEventListener('error', handleWindowError, true);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleWindowError, true);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null;
}
