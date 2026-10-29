"use client";

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

function isElementVisible(el: HTMLElement): boolean {
    if (
        el.id?.toLowerCase().includes('preloader') ||
        (typeof el.className === 'string' && el.className.toLowerCase().includes('preloader'))
    ) {
        return false;
    }
    if (typeof window === 'undefined') return false;
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
        return false;
    }
    return el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0;
}

export default function KeyboardNavigation() {
    const router = useRouter();
    const pathname = usePathname();
    const isFirstRender = useRef(true);
    const isPopStateRef = useRef(false);

    // Track navigation history depth within the current tab session
    useEffect(() => {
        const handlePopState = () => {
            isPopStateRef.current = true;
            try {
                const currentDepth = parseInt(sessionStorage.getItem('tarkai_nav_depth') || '0', 10);
                const newDepth = Math.max(0, currentDepth - 1);
                sessionStorage.setItem('tarkai_nav_depth', newDepth.toString());
            } catch {
                // Ignore storage errors in restricted private/iframe mode
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Update depth on route changes
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            try {
                if (sessionStorage.getItem('tarkai_nav_depth') === null) {
                    sessionStorage.setItem('tarkai_nav_depth', '0');
                }
            } catch {
                // Ignore storage errors
            }
            return;
        }

        if (isPopStateRef.current) {
            isPopStateRef.current = false;
            return;
        }

        // Forward navigation within the application
        try {
            const currentDepth = parseInt(sessionStorage.getItem('tarkai_nav_depth') || '0', 10);
            sessionStorage.setItem('tarkai_nav_depth', (currentDepth + 1).toString());
        } catch {
            // Ignore storage errors
        }
    }, [pathname]);

    // Global Escape key handler
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') return;

            // 1. If an input, textarea, select, or editable element is focused, blur it and do not navigate
            const activeEl = document.activeElement;
            if (
                activeEl &&
                (activeEl.tagName === 'INPUT' ||
                 activeEl.tagName === 'TEXTAREA' ||
                 activeEl.tagName === 'SELECT' ||
                 (activeEl as HTMLElement).isContentEditable)
            ) {
                e.preventDefault();
                (activeEl as HTMLElement).blur();
                return;
            }

            // 2. If already handled / cancelled by a component-level handler
            if (e.defaultPrevented) return;

            // 3. Check for any open native HTML5 dialog element
            const openDialog = document.querySelector('dialog[open]');
            if (openDialog instanceof HTMLDialogElement) {
                e.preventDefault();
                openDialog.close();
                return;
            }

            // 4. Check for open mobile navigation menu in Navbar
            const mobileMenuCloseBtn = document.querySelector<HTMLElement>(
                'button[aria-label="Close menu"][aria-expanded="true"]'
            );
            if (mobileMenuCloseBtn && isElementVisible(mobileMenuCloseBtn)) {
                e.preventDefault();
                mobileMenuCloseBtn.click();
                return;
            }

            // 5. Check for any open modal, dialog, popup, or overlay in the DOM
            const openOverlays = Array.from(
                document.querySelectorAll<HTMLElement>(
                    '[role="dialog"], [role="alertdialog"], [aria-modal="true"], [data-state="open"], .fixed.inset-0'
                )
            ).filter(isElementVisible);

            if (openOverlays.length > 0) {
                const topOverlay = openOverlays[openOverlays.length - 1];
                const closeBtn = topOverlay.querySelector<HTMLElement>(
                    'button[aria-label*="close" i], button[aria-label*="cancel" i], button[title*="close" i]'
                );
                if (closeBtn && isElementVisible(closeBtn)) {
                    e.preventDefault();
                    closeBtn.click();
                    return;
                }
                // An active overlay is present; do not navigate away
                e.preventDefault();
                return;
            }

            // 6. Navigation fallback verification
            let canGoBack = false;

            try {
                const depth = parseInt(sessionStorage.getItem('tarkai_nav_depth') || '0', 10);
                if (depth > 0 && typeof window !== 'undefined' && window.history.length > 1) {
                    canGoBack = true;
                }
            } catch {
                // Fallback to history.length and history.state check
                if (typeof window !== 'undefined' && window.history.length > 1) {
                    const state = window.history.state;
                    if (state && typeof state.idx === 'number' && state.idx > 0) {
                        canGoBack = true;
                    }
                }
            }

            // 7. Navigate back using Next.js router history when appropriate
            if (canGoBack) {
                e.preventDefault();
                router.back();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [router]);

    return null;
}
