"use client";

import { useEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react';

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    let gsapRef: any = null;
    let updateFn: ((time: number) => void) | null = null;

    async function initGsap() {
      const gsapModule = await import('gsap');
      const ScrollTriggerModule = await import('gsap/ScrollTrigger');
      
      const gsap = gsapModule.default || gsapModule;
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
      
      gsap.registerPlugin(ScrollTrigger);
      gsapRef = gsap;

      updateFn = (time: number) => {
        lenisRef.current?.lenis?.raf(time * 1000);
      };
      
      gsap.ticker.lagSmoothing(0);
      gsap.ticker.add(updateFn);
    }
    
    initGsap();

    return () => {
      if (gsapRef && updateFn) {
        gsapRef.ticker.remove(updateFn);
      }
    };
  }, []);

  return (
    <ReactLenis 
      ref={lenisRef}
      root 
      autoRaf={false} 
      options={{ 
        lerp: 0.07,           // Slower, smoother interpolation (0.05 - 0.1 is premium range)
        duration: 1.5,        // Fallback for duration if lerp isn't enough
        smoothWheel: true, 
        wheelMultiplier: 0.8, // Slightly reduces scroll speed for a heavier, premium feel
        touchMultiplier: 1.5, 
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
