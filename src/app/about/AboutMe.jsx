"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const InlineVideoStack = () => (
    <span className="inline-flex items-center -space-x-3 mx-1.5 translate-y-1">
        {[...Array(3)].map((_, idx) => (
            <motion.div
                key={idx}
                initial={{ rotate: idx * 6 - 6 }}
                whileHover={{ rotate: 0, scale: 1.25, zIndex: 50, y: -4 }}
                className="relative w-8 h-8 md:w-10 md:h-10 rounded-lg border-[1.5px] border-white shadow-lg overflow-hidden flex-shrink-0 bg-black"
                style={{ zIndex: 3 - idx }}
            >
                <video
                    src="/video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="object-cover w-full h-full"
                />
            </motion.div>
        ))}
    </span>
);

const ImagePill = () => (
    <motion.span
        whileHover={{ scale: 1.05 }}
        className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white/10 border border-white/20 rounded-full mx-1 translate-y-1 overflow-hidden"
    >
        <span className="w-8 h-4 md:w-10 md:h-5 rounded-md overflow-hidden bg-black relative inline-block">
            <Image
                src="/assets/imagegallery/me.png"
                alt="Me"
                width={40}
                height={20}
                className="absolute inset-0 w-full h-full object-cover"
            />
        </span>
        <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-white/90">View</span>
    </motion.span>
);

export default function AboutMe() {
    return (
        <div className="w-full max-w-xl mx-auto px-8 py-9 bg-[#0A0A0A] rounded-[28px] border border-white/5 shadow-2xl backdrop-blur-xl relative overflow-hidden group min-h-[320px] flex flex-col justify-center">
            {/* Inner highlight/rim light */}
            <div className="absolute inset-0 rounded-[28px] border border-white/[0.03] pointer-events-none" />

            <div className="relative z-10 w-full">
                <h2 className="text-[20px] md:text-[24px] font-medium text-white tracking-tight mb-5">
                    About Me
                </h2>

                <div className="space-y-6">
                    <div className="text-sm md:text-[15px] font-light text-white/90 leading-relaxed tracking-wide">
                        I am a <span className="font-medium text-white decoration-[#40E0D0]/30 underline underline-offset-4 decoration-1 hover:text-[#40E0D0] transition-colors">Full Stack Developer</span>
                        <InlineVideoStack />
                        with a deep passion for crafting
                        <span className="italic font-serif"> high-fidelity </span>
                        digital experiences that bridge the gap between heavy technical architectures and human-centric design.
                    </div>

                    <div className="text-sm md:text-[15px] font-light text-white/80 leading-relaxed tracking-wide">
                        Beyond development, I enjoy traveling
                        <ImagePill />
                        , photography, and exploring new experiences.Whether it's discovering new destinations or capturing moments through a camera lens, I find inspiration in the world around me and bring that perspective into the work I create.
                    </div>
                </div>
            </div>
        </div>
    );
}
