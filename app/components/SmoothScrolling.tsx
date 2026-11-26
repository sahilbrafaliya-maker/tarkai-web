"use client";

import { useEffect, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

function LenisManager() {
  const pathname = usePathname();
  const lenis = useLenis();

  // 1. Synchronize Lenis scrolling with GSAP ScrollTrigger
  useEffect(() => {
    if (!lenis) return;

    gsap.registerPlugin(ScrollTrigger);

    const handleScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis]);

    // 2. Observe window and body resize to keep Lenis limit and ScrollTrigger synchronized
  useEffect(() => {
    if (!lenis) return;

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    // Dynamic layout shifts & image loads
    const ro = new ResizeObserver(() => {
      lenis.resize();
    });

    if (typeof document !== "undefined" && document.body) {
      ro.observe(document.body);
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
      ro.disconnect();
    };
  }, [lenis]);

  // 3. Handle route navigation, initial anchor scrolling, and layout recalculations
  useEffect(() => {
    if (!lenis) return;

    const hash = typeof window !== "undefined" ? window.location.hash : "";

    if (hash) {
      const rawId = hash.replace(/^#/, "");
      const scrollTimer = setTimeout(() => {
        try {
          const target =
            document.querySelector(hash) ||
            document.getElementById(rawId) ||
            document.querySelector(`[data-anchor="${rawId}"]`) ||
            document.querySelector(`[id*="${rawId}"]`);
          if (target) {
            lenis.scrollTo(target as HTMLElement, { offset: -90 });
          }
        } catch {
          // Ignore invalid selector
        }
      }, 120);

      return () => clearTimeout(scrollTimer);
    } else {
      // Normal page navigation: jump to top immediately
      lenis.scrollTo(0, { immediate: true });
    }

    // Refresh calculations once the new page layout settles
    const refreshTimer = setTimeout(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    }, 200);

    return () => clearTimeout(refreshTimer);
  }, [pathname, lenis]);

  // 4. Listen for in-page hash changes (e.g. browser history back/forward or anchor click)
  useEffect(() => {
    if (!lenis) return;

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const rawId = hash.replace(/^#/, "");
        try {
          const target =
            document.querySelector(hash) ||
            document.getElementById(rawId) ||
            document.querySelector(`[data-anchor="${rawId}"]`) ||
            document.querySelector(`[id*="${rawId}"]`);
          if (target) {
            lenis.scrollTo(target as HTMLElement, { offset: -90 });
          }
        } catch {
          // Ignore invalid selector
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [lenis]);

  // 5. Staggered card animations on scroll (Why Choose Us & Why Now)
  useEffect(() => {
    const observeStaggerCards = (selector: string, delayInterval = 180) => {
      const cards = document.querySelectorAll<HTMLElement>(selector);
      if (!cards.length) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const card = entry.target as HTMLElement;
              const index = Number(card.dataset.index || 0);
              setTimeout(() => {
                card.classList.add("is-visible");
              }, index * delayInterval);
              observer.unobserve(card);
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px -40px 0px",
        }
      );

      cards.forEach((card) => observer.observe(card));
      return observer;
    };

    const o1 = observeStaggerCards(".why-tarkai-card", 180);
    const o2 = observeStaggerCards(".why-now-card", 180);

    return () => {
      if (o1) o1.disconnect();
      if (o2) o2.disconnect();
    };
  }, [pathname]);

  return null;
}

export default function SmoothScrolling({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      autoRaf={true}
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.0,
        syncTouch: false,
        autoResize: true,
        prevent: (node) => node instanceof HTMLElement && node.hasAttribute?.("data-lenis-prevent"),
      }}
    >
      <LenisManager />
      {children}
    </ReactLenis>
  );
}
