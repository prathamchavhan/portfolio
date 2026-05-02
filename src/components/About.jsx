'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/* ── Opacity Reveal: each word fades in from low opacity ── */
function RevealText({ children, className, delay = 0 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: '-60px' });
    const words = children.split(' ');

    return (
        <p ref={ref} className={className}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0.1 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0.1 }}
                    transition={{ duration: 1.5, delay: delay + i * 0.035, ease: 'easeOut' }}
                    className="inline-block mr-[0.3em]"
                >
                    {word}
                </motion.span>
            ))}
        </p>
    );
}

/* ── Auto Slideshow Image ── */
function AutoSlideshowImages({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!images || images.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images]);

    return (
        <div className="relative w-full h-[380px] sm:h-[450px] md:h-[550px] overflow-hidden bg-[#11]">
            {images.map((imgSrc, index) => (
                <Image
                    key={imgSrc}
                    src={imgSrc}
                    alt={`Slideshow image ${index}`}
                    fill
                    className={`object-cover transition-opacity duration-[800ms] ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            ))}
        </div>
    );
}

const PlusMarker = ({ x, y }) => (
    <svg className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none stroke-black/25 dark:stroke-white/25" style={{ left: x, top: y, width: 12, height: 12 }} viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth={1} />
        <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth={1} />
    </svg>
);

export default function About() {
    const sectionRef = useRef(null);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative w-full min-h-[85vh] pt-10 pb-24 px-4 sm:px-10 z-20 font-sans overflow-y-visible overflow-x-clip flex justify-center items-center bg-transparent"
            onMouseEnter={() => window.dispatchEvent(new CustomEvent('cursor-label', { detail: { label: 'About' } }))}
            onMouseLeave={() => window.dispatchEvent(new CustomEvent('cursor-label', { detail: { label: '' } }))}
        >
            <div className="max-w-7xl w-full mx-auto relative z-10 w-full flex flex-col md:flex-row relative">

                {/* Visual Grid Lines mapping the exact image layout */}
                {/* Horizontal Top Line */}
                <div className="absolute hidden md:block w-[150%] h-[1px] top-[15%] -left-[25%] pointer-events-none bg-black/[0.06] dark:bg-white/[0.04]" />
                {/* Horizontal Bottom Line for Text */}
                <div className="absolute hidden md:block w-full h-[1px] bottom-[20%] left-0 pointer-events-none bg-black/[0.06] dark:bg-white/[0.04]" />
                {/* Vertical Separator Line */}
                <div className="absolute hidden md:block w-[1px] h-[200%] -top-[100%] left-[55%] pointer-events-none bg-black/[0.06] dark:bg-white/[0.04]" />
                {/* Vertical Left Edge Line */}
                <div className="absolute hidden md:block w-[1px] h-[200%] -top-[100%] left-0 pointer-events-none bg-black/[0.06] dark:bg-white/[0.04]" />

                {/* + Markers matching intersections */}
                <PlusMarker x="0%" y="15%" />
                <PlusMarker x="55%" y="15%" />
                <PlusMarker x="100%" y="15%" />
                <PlusMarker x="0%" y="80%" />
                <PlusMarker x="55%" y="80%" />

                {/* Content */}
                <div className="w-full md:w-[55%] flex flex-col justify-start md:pr-12 lg:pr-20 md:pl-0 pt-[15%] pb-[20%]">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 1.2 }}
                        className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-black dark:text-white mb-12"
                    >
                        About Me
                    </motion.h2>

                    <div className="space-y-6">
                        <RevealText
                            className="text-black dark:text-[#FFFFFF] text-[26px] md:text-[20px] leading-[1.9] font-sans tracking-wide "
                            delay={0}
                        >
                            I am Pratham a Full Stack Developer and AI enthusiast obsessed with building digital products that just feel right. Our expertise spans web design, frontend development, backend systems, and modern cloud deployment.
                        </RevealText>

                        <RevealText
                            className="text-black dark:text-[#FFFFFF] text-[26px] md:text-[20px] leading-[1.9] font-sans tracking-wide"
                            delay={0.4}
                        >
                            With a focus on creativity, performance, and user experience, I build websites and applications that are visually engaging, technically robust, and tailored to client needs.
                        </RevealText>

                        <RevealText
                            className="text-black dark:text-[#FFFFFF] text-[16px] md:text-[20px] leading-[1.9] font-sans tracking-wide"
                            delay={0.8}
                        >
                            I turn ideas into impactful digital products through clean design, scalable development, and reliable technology.
                        </RevealText>
                    </div>
                </div>

                {/* Image Section */}
                <div className="w-full md:w-[45%] flex items-center justify-center p-6 md:p-12 relative">
                    {/* Frame bounding the image exactly like the screenshot */}
                    <div className="w-full max-w-[400px] border border-[#333] p-2 relative bg-[#1c1c1c]">
                        {/* Horizontal Image Top Boundary */}
                        <div className="absolute w-[200%] h-[1px] top-0 -left-[50%] pointer-events-none bg-black/[0.06] dark:bg-white/[0.04]" />
                        <div className="absolute w-[200%] h-[1px] bottom-0 -left-[50%] pointer-events-none bg-black/[0.06] dark:bg-white/[0.04]" />
                        <PlusMarker x="0%" y="0%" />
                        <PlusMarker x="100%" y="0%" />
                        <PlusMarker x="0%" y="100%" />
                        <PlusMarker x="100%" y="100%" />

                        <AutoSlideshowImages images={['/assets/manali.png', '/assets/3.png', '/assets/intern.jpeg', '/assets/nashik.png']} />
                    </div>
                </div>

            </div>
        </section>
    );
}