'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [cursorLabel, setCursorLabel] = useState('');

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            const skipCursor = e.target.closest('[data-hide-cursor="true"]');
            setIsHidden(!!skipCursor);

            if (
                e.target.tagName.toLowerCase() === 'button' ||
                e.target.tagName.toLowerCase() === 'a' ||
                e.target.closest('button') ||
                e.target.closest('a')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        // Custom event: { detail: { label: 'Projects' } } or { detail: { label: '' } }
        const handleLabel = (e) => {
            setCursorLabel(e.detail?.label ?? '');
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('cursor-label', handleLabel);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('cursor-label', handleLabel);
        };
    }, []);

    const hasLabel = Boolean(cursorLabel);

    useEffect(() => {
        if (hasLabel) {
            document.body.classList.add('cursor-suppressed');
        } else {
            document.body.classList.remove('cursor-suppressed');
        }
    }, [hasLabel]);

    return (
        <>
            {/* Inner dot — hidden when label is showing */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
                animate={{
                    x: mousePosition.x - 6,
                    y: mousePosition.y - 6,
                    scale: isHovering || hasLabel || isHidden ? 0 : 1,
                    opacity: hasLabel || isHidden ? 0 : 1,
                }}
                transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
            />

            {/* Outer ring — turns into text pill when label active */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center"
                animate={{
                    x: mousePosition.x - (hasLabel ? 0 : 20),
                    y: mousePosition.y - (hasLabel ? 0 : 20),
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.8 }}
            >
                <AnimatePresence mode="wait">
                    {hasLabel ? (
                        <motion.div
                            key="label"
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            transition={{ duration: 0.2 }}
                            className="px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase bg-white text-[#151515] whitespace-nowrap"
                            style={{ transform: 'translate(-50%, -50%)' }}
                        >
                            {cursorLabel}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="ring"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHidden ? 0 : 1 }}
                            exit={{ opacity: 0 }}
                            className="w-10 h-10 border border-white/50 rounded-full"
                            style={{
                                backgroundColor: isHovering ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0)',
                                scale: isHovering ? 1.5 : 1,
                            }}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
}
