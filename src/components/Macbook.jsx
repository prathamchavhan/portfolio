'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Macbook – premium CSS MacBook frame with a video playing on the screen.
 * Design inspired by a high-fidelity macOS laptop mockup.
 */
const Macbook = ({
    videoUrl,
    className = "",
    rotateX = 0,
    rotateY = 0,
    scale = 1,
}) => {
    return (
        <div className={`relative perspective-[1400px] ${className}`} style={{ scale }}>
            <motion.div
                className="relative w-full max-w-[820px] mx-auto"
                initial={{ rotateX, rotateY }}
                style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
            >
                {/* ── Screen / Lid ── */}
                <div className="w-full aspect-[16/10] bg-black rounded-t-[1.5rem] rounded-b-md p-2 md:p-3 shadow-2xl relative border border-white/5 flex flex-col pt-4 md:pt-5 overflow-hidden">

                    {/* Camera Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 rounded-b-xl bg-[#0c0c0c] z-30 flex justify-center items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-900/50 flex justify-center items-center">
                            <div className="w-0.5 h-0.5 rounded-full bg-blue-400"></div>
                        </div>
                    </div>

                    {/* Inner Screen */}
                    <div className="relative w-full h-full rounded-sm overflow-hidden bg-zinc-900 border border-black flex flex-col">

                        {/* macOS Top Menu Bar */}
                        <div className="w-full h-5 md:h-6 bg-black/40 backdrop-blur-md flex items-center justify-between px-3 md:px-4 z-40 border-b border-white/10 text-[7px] md:text-[9px] text-white font-medium tracking-wide shrink-0">
                            <div className="flex items-center gap-2 md:gap-3">
                                <span className="font-bold cursor-default"></span>
                                <span className="font-bold cursor-default hidden sm:block">Finder</span>
                                <span className="cursor-default hidden sm:block text-white/70">File</span>
                                <span className="cursor-default hidden sm:block text-white/70">Edit</span>
                                <span className="cursor-default hidden sm:block text-white/70">View</span>
                                <span className="cursor-default hidden sm:block text-white/70">Go</span>
                                <span className="cursor-default hidden sm:block text-white/70">Window</span>
                                <span className="cursor-default hidden sm:block text-white/70">Help</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="cursor-default text-white/70">Tue Sep 12</span>
                                <span className="cursor-default font-semibold">9:41 AM</span>
                            </div>
                        </div>

                        {/* Video Area (Desktop wallpaper replaced by video) */}
                        <div className="flex-1 relative overflow-hidden">
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
                                <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500" />
                            )}
                            {/* Subtle gloss */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5 pointer-events-none" />
                        </div>

                    </div>

                    {/* MacBook Pro chin text */}
                    <div className="w-full text-center pb-0.5 pt-1 bg-black">
                        <span className="text-[7px] md:text-[9px] text-white/30 font-semibold tracking-[0.15em]">MacBook Pro</span>
                    </div>
                </div>

                {/* ── Silver Keyboard Base ── */}
                <div className="w-[108%] -ml-[4%] h-3 md:h-4 bg-gradient-to-b from-[#b5b5b5] via-[#a0a0a0] to-[#737373] rounded-b-xl rounded-t-sm shadow-[0_20px_40px_-5px_rgba(0,0,0,0.5)] relative border border-white/40 border-t-0 flex justify-center -mt-0.5 z-10">
                    {/* Thumb indentation */}
                    <div className="w-14 md:w-20 h-1 bg-gradient-to-b from-[#999] to-[#777] rounded-b-md shadow-inner"></div>
                </div>
            </motion.div>
        </div>
    );
};

export default Macbook;
