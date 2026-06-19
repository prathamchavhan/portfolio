'use client';

import React from 'react';
import { motion } from 'framer-motion';

const MobileMockup = ({
    videoUrl,
    className = "",
    rotateX = 0,
    rotateY = 0,
    scale = 1,
}) => {
    return (
        <div className={`relative perspective-[1400px] ${className}`} style={{ scale }}>
            <motion.div
                className="relative w-full max-w-[280px] md:max-w-[320px] mx-auto"
                animate={{
                    y: [0, -15, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Phone Frame */}
                <div className="relative aspect-[9/19.5] bg-[#1a1a1a] rounded-[2.5rem] md:rounded-[3rem] p-2.5 md:p-3 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border-4 border-gray-800">

                    {/* Inner Screen */}
                    <div className="relative w-full h-full rounded-[2rem] md:rounded-[2.4rem] overflow-hidden bg-white shadow-inner">

                        {/* Dynamic Island */}
                        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-30 flex items-center justify-between px-2 shadow-sm">
                            <div className="w-3 h-3 bg-[#111] rounded-full border border-gray-800" />
                            <div className="w-2.5 h-2.5 bg-[#0a0a2a] rounded-full flex items-center justify-center border border-gray-700">
                                <div className="w-1 h-1 bg-blue-600 rounded-full" />
                            </div>
                        </div>

                        {/* Top Status Bar Content */}
                        <div className="absolute top-3 w-full z-20 flex justify-between items-center px-6 text-[11px] font-semibold text-black tracking-tighter mix-blend-difference invert">
                            <span>9:41</span>
                            <div className="flex gap-1.5 items-center">
                                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21L15.6 16.2C14.6 15.4 13.3 15 12 15C10.7 15 9.4 15.4 8.4 16.2L12 21ZM12 3C7.9 3 4.2 4.6 1.3 7.1L3.9 10.6C6 8.7 8.8 7.5 12 7.5C15.2 7.5 18 8.7 20.1 10.6L22.7 7.1C19.8 4.6 16.1 3 12 3Z" /></svg>
                                <div className="w-5 h-2.5 border border-current rounded-sm p-[1px] relative opacity-90">
                                    <div className="w-3 h-full bg-current rounded-[1px]" />
                                </div>
                            </div>
                        </div>

                        {/* App Content / Video */}
                        {videoUrl ? (
                            <video
                                src={videoUrl}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
                                <span className="text-gray-400 font-medium">App Content</span>
                            </div>
                        )}

                        {/* Subtle Screen Glare */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/20 pointer-events-none" />

                        {/* Bottom Home Indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1.5 bg-black/80 backdrop-blur-sm rounded-full z-20 mix-blend-difference invert" />
                    </div>

                    {/* Hardware Buttons */}
                    <div className="absolute left-[-6px] top-24 w-1 h-8 bg-gray-700/80 rounded-l-md" />
                    <div className="absolute left-[-6px] top-36 w-1 h-12 bg-gray-700/80 rounded-l-md" />
                    <div className="absolute left-[-6px] top-52 w-1 h-12 bg-gray-700/80 rounded-l-md" />

                    <div className="absolute right-[-6px] top-32 w-1 h-16 bg-gray-700/80 rounded-r-md" />
                </div>

                {/* Floor Shadow */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-black/30 blur-xl rounded-[100%]" />
            </motion.div>
        </div>
    );
};

export default MobileMockup;
