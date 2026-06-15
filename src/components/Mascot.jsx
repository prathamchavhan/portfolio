"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";

export default function Mascot({
    message = "Let's build together!",
    size = 100,
    followMouse = true,
    interactive = true
}) {
    const [isBlinking, setIsBlinking] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const mascotRef = useRef(null);

    // Mouse Tracking Logic
    const mouseX = useSpring(0, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(0, { stiffness: 150, damping: 20 });

    useEffect(() => {
        if (!followMouse) return;

        const handleMouseMove = (e) => {
            if (!mascotRef.current) return;
            const rect = mascotRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = (e.clientX - centerX) / 30;
            const dy = (e.clientY - centerY) / 30;

            mouseX.set(Math.max(-10, Math.min(10, dx)));
            mouseY.set(Math.max(-10, Math.min(10, dy)));
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [followMouse, mouseX, mouseY]);

    // Blinking logic
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            if (Math.random() > 0.8) {
                setIsBlinking(true);
                setTimeout(() => setIsBlinking(false), 150);
            }
        }, 3000);
        return () => clearInterval(blinkInterval);
    }, []);

    const eyeX = mouseX;
    const eyeY = mouseY;
    const eyeRotate = useTransform(mouseX, [-10, 10], [-5, 5]);

    // Handle click to toggle message
    const handleMascotClick = (e) => {
        e.stopPropagation();
        setShowMessage(!showMessage);
    };

    return (
        <div
            ref={mascotRef}
            className="absolute bottom-0 left-0 w-full h-0 overflow-visible pointer-events-none"
        >
            <motion.div
                animate={{
                    x: ["2vw", "85vw", "2vw"],
                }}
                transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: [0.45, 0, 0.55, 1],
                    times: [0, 0.6, 1],
                }}
                style={{ width: size, height: size }}
                className="absolute bottom-4 left-0 pointer-events-auto transition-opacity duration-500"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleMascotClick}
            >
                <AnimatePresence>
                    {showMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            className="absolute bottom-full mb-6 left-1/2 -translate-x-1/2 min-w-[160px] px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-[11px] text-white font-medium text-center shadow-xl pointer-events-none z-[100]"
                        >
                            {message}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white/10" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Body bob synced with walk */}
                <motion.div
                    animate={{
                        y: [0, -1.5, 0],
                        rotate: isHovered ? [0, -2, 2, 0] : 0
                    }}
                    transition={{
                        y: { duration: 0.6, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 0.5, repeat: isHovered ? Infinity : 0 }
                    }}
                    className="w-full h-full cursor-pointer flex items-end justify-center"
                >
                    <svg viewBox="0 0 100 130" className="w-full h-full drop-shadow-2xl overflow-visible">
                        {/* Shadow on ground */}
                        <motion.ellipse
                            cx="50" cy="122" rx="22" ry="4"
                            fill="rgba(0,0,0,0.15)"
                            animate={{ opacity: [0.1, 0.2, 0.1] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                        />

                        {/* Body */}
                        <rect x="20" y="42" width="60" height="50" rx="4" fill="#FFFFFF" />

                        {/* Left Leg group */}
                        <motion.g
                            animate={{ translateY: [0, -6, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <rect x="33" y="92" width="10" height="22" rx="3" fill="#FFFFFF" />
                            <rect x="31" y="111" width="14" height="6" rx="3" fill="#FFFFFF" />
                        </motion.g>

                        {/* Right Leg group */}
                        <motion.g
                            animate={{ translateY: [-6, 0, -6] }}
                            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <rect x="57" y="92" width="10" height="22" rx="3" fill="#FFFFFF" />
                            <rect x="55" y="111" width="14" height="6" rx="3" fill="#FFFFFF" />
                        </motion.g>

                        {/* Eyes */}
                        <motion.g style={{ rotate: eyeRotate }}>
                            <motion.rect
                                x={38} y={57} width="6" height={isBlinking ? "1" : "8"}
                                rx={isBlinking ? "0.5" : "1"}
                                fill="#000000"
                                style={{ x: eyeX, y: eyeY }}
                            />
                            <motion.rect
                                x={56} y={57} width="6" height={isBlinking ? "1" : "8"}
                                rx={isBlinking ? "0.5" : "1"}
                                fill="#000000"
                                style={{ x: eyeX, y: eyeY }}
                            />
                        </motion.g>
                    </svg>

                    <div className="absolute top-1/2 left-1/3 w-1/5 h-1/8 bg-white/20 rounded-full blur-sm pointer-events-none" />
                </motion.div>
            </motion.div>
        </div>
    );
}
