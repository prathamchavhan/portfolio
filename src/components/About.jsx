'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/* Reveal Text */
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
                    transition={{
                        duration: 1.5,
                        delay: delay + i * 0.035,
                        ease: 'easeOut'
                    }}
                    className="inline-block mr-[0.3em]"
                >
                    {word}
                </motion.span>
            ))}
        </p>
    );
}

function AutoSlideshowImages({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!images?.length) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images]);

    return (
        <div className="relative w-full h-[380px] sm:h-[450px] md:h-[550px] overflow-hidden bg-[#000000]">
            {images.map((imgSrc, index) => (
                <Image
                    key={imgSrc}
                    src={imgSrc}
                    alt={`Slideshow image ${index}`}
                    fill
                    className={`object-cover transition-opacity duration-[800ms] ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            ))}
        </div>
    );
}

export default function About() {
    const sectionRef = useRef(null);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative w-full min-h-[85vh] pt-10 pb-24 px-4 sm:px-10 z-10 font-sans overflow-x-clip flex justify-center items-center bg-transparent"
        >
            <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row">

                {/* Content */}
                <div className="w-full md:w-[55%] flex flex-col justify-start md:pr-12 lg:pr-20">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 1.2 }}
                        className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-white dark:text-white mb-12"
                    >
                        About Me
                    </motion.h2>

                    <div className="space-y-6">
                        <RevealText
                            className="text-white dark:text-white text-[26px] md:text-[20px] leading-[1.9] tracking-wide"
                            delay={0}
                        >
                            I am Pratham a Full Stack Developer and AI enthusiast obsessed with building digital products that just feel right.
                        </RevealText>

                        <RevealText
                            className="text-white dark:text-white text-[26px] md:text-[20px] leading-[1.9] tracking-wide"
                            delay={0.4}
                        >
                            With a focus on creativity, performance, and user experience, I build websites and applications that are visually engaging.
                        </RevealText>

                        <RevealText
                            className="text-white dark:text-white text-[16px] md:text-[20px] leading-[1.9] tracking-wide"
                            delay={0.8}
                        >
                            I turn ideas into impactful digital products through clean design, scalable development, and reliable technology.
                        </RevealText>
                    </div>
                </div>

                {/* Image Section */}
                <div className="w-full md:w-[45%] flex items-center justify-center p-6 md:p-12">
                    <div className="w-full max-w-[400px] border border-[#333] p-2 relative bg-[#1c1c1c]">
                        <AutoSlideshowImages
                            images={[
                                '/assets/manali.png',
                                '/assets/3.png',
                                '/assets/intern.jpeg',
                                '/assets/nashik.png'
                            ]}
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}