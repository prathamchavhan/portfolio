'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function MobileHero() {
    return (
        <section className="md:hidden relative w-full flex flex-col items-center justify-center px-5 pt-28 pb-8 overflow-hidden font-mono">
            {/* Profile Image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-[150px] h-[150px] rounded-2xl overflow-hidden bg-[#0A0A0A] shadow-2xl mb-6"
            >
                <Image
                    src="/assets/imagegallery/pro.png"
                    alt="Pratham"
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Text Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex flex-col items-center text-center w-full"
            >
                <p className="text-[10px] font-semibold tracking-[0.25em] text-[#666666] uppercase mb-3">
                    Full Stack Developer + AI Builder
                </p>

                <h1 className="text-[24px] font-medium tracking-tight text-black dark:text-[#EAEAEA] leading-[1.15] mb-4">
                    Creating scalable products across the full stack<span className="text-[#F2542D]">.</span>
                </h1>

                <p className="text-[14px] text-[#444444] dark:text-[#A3A3A3] font-light leading-relaxed mb-5 max-w-xs">
                    Obsessed with building digital products that feel as good as they function.
                </p>

                <a
                    href="https://www.google.com/maps?q=Nagpur,+Maharashtra,+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[12px] text-[#666666]"
                >
                    <MapPin size={12} />
                    <span>Nagpur, Maharashtra, India</span>
                </a>
            </motion.div>
        </section>
    );
}
