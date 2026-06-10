'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import TiltedCard from './TiltedCard';

const galleryImages = [
    {
        id: 1,
        src: "./assets/vist/image.png",
        name: "waterfall",
        caption: "@pratham"
    },
    {
        id: 2,

        src: "./assets/imagegallery/devloper.png",
        name: "manali",
        caption: "@pratham"
    },
    {
        id: 3,
        src: "./assets/pra.jpeg",
        name: "Retro Setup",
        caption: "@pratham"
    },
    {
        id: 4,
        src: "./assets/imagegallery/image.png",
        name: "Tech Hardware",
        caption: "@pratham"
    },
    {
        id: 5,
        src: "./assets/imagegallery/mountain.png",
        name: "Digital World",
        caption: "@pratham"
    },
    {
        id: 6,
        src: "./assets/waterfall.png",

        name: "Future Interface",
        caption: "@pratham"
    },
    {
        id: 7,
        src: "./assets/imagegallery/me.png",
        name: "Future Interface",
        caption: "@pratham"
    }
];

export default function ImageGallery() {
    const [selectedId, setSelectedId] = useState(null);
    const selectedImage = galleryImages.find(img => img.id === selectedId);

    const nextImage = (e) => {
        e.stopPropagation();
        const currentIndex = galleryImages.findIndex(img => img.id === selectedId);
        const nextIndex = (currentIndex + 1) % galleryImages.length;
        setSelectedId(galleryImages[nextIndex].id);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        const currentIndex = galleryImages.findIndex(img => img.id === selectedId);
        const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        setSelectedId(galleryImages[prevIndex].id);
    };

    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "center center",]
    });

    return (

        <>
            <section
                id="gallery"
                ref={sectionRef}
                className="w-full py-32 px-6 md:px-12 bg-black overflow-hidden"
            >

                <div className="max-w-7xl mx-auto flex flex-col items-center">

                    <div className="text-center ">
                        <h2 className="text-4xl md:text-8xl font-bold text-white">
                            Beyond the Code
                        </h2>
                        <p className="text-zinc-500 mt-4">
                            A collection of moments, journeys, and experiences that shape my perspective both as a developer and as a person.
                        </p>
                    </div>

                    {/* Curved Gallery Stack */}
                    <div className="relative w-full max-w-4xl h-[400px] md:h-[500px] flex items-center justify-center">
                        {galleryImages.map((image, index) => {
                            const targetRotation = (index - (galleryImages.length - 1) / 2) * 3;
                            const targetX = (index - (galleryImages.length - 1) / 2) * 120;
                            const yOffset = index % 2 === 0 ? 12 : -12;

                            const rotation = useTransform(scrollYProgress, [0, 1], [0, targetRotation]);
                            const xOffset = useTransform(scrollYProgress, [0, 1], [0, targetX]);

                            return (
                                <motion.div
                                    key={image.id}
                                    className="absolute cursor-pointer"
                                    style={{
                                        x: xOffset,
                                        rotate: rotation,
                                        y: yOffset
                                    }}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    whileHover={{
                                        y: yOffset - 40,
                                        scale: 1.05,
                                        zIndex: 50,
                                        transition: { duration: 0.3 }
                                    }}
                                    onClick={() => setSelectedId(image.id)}
                                >
                                    <TiltedCard
                                        imageSrc={image.src}
                                        altText={image.name}
                                        captionText={image.name}
                                        containerHeight="240px"
                                        containerWidth="270px"
                                        imageHeight="240px"
                                        imageWidth="270px"
                                        rotateAmplitude={8}
                                        scaleOnHover={1.02}
                                        showMobileWarning={false}
                                        showTooltip={false}
                                    />

                                    {/* Custom tag matching the screenshot style */}
                                    <motion.div
                                        className="absolute -top-4 -right-8 px-3 py-1 rounded-full text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileHover={{ opacity: 1, scale: 1 }}
                                    >
                                        {image.caption}
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>


                </div>

                {/* Lightbox / Modal */}
                <AnimatePresence>
                    {selectedId && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
                            onClick={() => setSelectedId(null)}
                        >
                            <motion.button
                                className="absolute top-8 right-8 text-white/50 hover:text-white p-2 transition-colors"
                                onClick={() => setSelectedId(null)}
                            >
                                <X size={32} />
                            </motion.button>

                            <div className="relative w-full max-w-5xl h-[70vh] flex items-center justify-center">
                                <motion.button
                                    className="absolute left-4 md:-left-16 text-white/30 hover:text-white p-2 transition-colors bg-white/5 rounded-full"
                                    onClick={prevImage}
                                >
                                    <ChevronLeft size={40} />
                                </motion.button>

                                <motion.div
                                    key={selectedId}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <img
                                        src={selectedImage.src}
                                        alt={selectedImage.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-8">
                                        <h3 className="text-2xl font-bold text-white mb-1">
                                            {selectedImage.name}
                                        </h3>
                                        <p className="text-white/50 text-sm italic">
                                            Created by Pratham
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.button
                                    className="absolute right-4 md:-right-16 text-white/30 hover:text-white p-2 transition-colors bg-white/5 rounded-full"
                                    onClick={nextImage}
                                >
                                    <ChevronRight size={40} />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </>
    );
}
