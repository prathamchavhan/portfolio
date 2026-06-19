'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function MobileHero() {
    return (
        <section className="md:hidden relative min-h-[85vh] w-full flex flex-col items-center justify-center px-6 pt-24 pb-12 overflow-hidden font-mono">
            {/* Profile Image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-[180px] h-[180px] rounded-2xl overflow-hidden bg-[#0A0A0A] shadow-2xl mb-8"
            >
                <Image
                    src="/assets/imagegallery/pro.png"
                    alt="Pratham"
                    width={180}
                    height={180}
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
                <p className="text-[11px] font-semibold tracking-[0.25em] text-[#666666] uppercase mb-4">
                    Full Stack Developer + AI Builder
                </p>

                <h1 className="text-[28px] font-medium tracking-tight text-black dark:text-[#EAEAEA] leading-[1.1] mb-5">
                    Creating scalable products across the full stack<span className="text-[#F2542D]">.</span>
                </h1>

                <p className="text-[15px] text-[#444444] dark:text-[#A3A3A3] font-light leading-relaxed mb-8 max-w-sm">
                    Obsessed with building digital products that feel as good as they function.
                </p>

                <a
                    href="https://www.google.com/maps?q=Nagpur,+Maharashtra,+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[13px] text-[#666666]"
                >
                    <MapPin size={13} />
                    <span>Nagpur, Maharashtra, India</span>
                </a>
            </motion.div>
        </section>
    );
}
