'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScroll({ children }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5, // Increased from 1.2 for more "weight" and buttery feel
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
            lerp: 0.05, // Lower lerp for slower, smoother following
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Map Lenis scroll position to CSS variable for potentially syncing other animations
        lenis.on('scroll', ({ scroll }) => {
            document.documentElement.style.setProperty('--scroll-y', `${scroll}px`);
        });

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
