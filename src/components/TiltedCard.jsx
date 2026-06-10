'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function TiltedCard({
    imageSrc,
    altText,
    captionText,
    containerHeight = '300px',
    containerWidth = '300px',
    imageHeight = '300px',
    imageWidth = '300px',
    rotateAmplitude = 15,
    scaleOnHover = 1.1,
    showMobileWarning = true,
    showTooltip = true,
    displayOverlayContent = false,
    overlayContent = null,
}) {
    const ref = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);
    const cursorXSpring = useSpring(cursorX, { stiffness: 450, damping: 30 });
    const cursorYSpring = useSpring(cursorY, { stiffness: 450, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${rotateAmplitude}deg`, `-${rotateAmplitude}deg`]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${rotateAmplitude}deg`, `${rotateAmplitude}deg`]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = (mouseX / width - 0.5);
        const yPct = (mouseY / height - 0.5);

        x.set(xPct);
        y.set(yPct);

        cursorX.set(mouseX);
        cursorY.set(mouseY);
    };

    const handleMouseEnter = () => setIsHovering(true);

    const handleMouseLeave = () => {
        setIsHovering(false);
        x.set(0);
        y.set(0);
    };

    return (
        <div
            ref={ref}
            className="relative"
            data-hide-cursor="true"
            style={{
                width: containerWidth,
                height: containerHeight,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0A0A0A]  shadow-2xl cursor-none"
                style={{
                    rotateX,
                    rotateY,
                    scale: 1,
                    transformStyle: 'preserve-3d',
                }}
                whileHover={{ scale: scaleOnHover }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                <motion.img
                    src={imageSrc}
                    alt={altText}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                        width: imageWidth,
                        height: imageHeight,
                        transform: 'translateZ(0)',
                    }}
                />

                {displayOverlayContent && overlayContent && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                        <div className="transform translate-z-20">
                            {overlayContent}
                        </div>
                    </div>
                )}

                {showTooltip && captionText && (
                    <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
                        <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg inline-block">
                            <p className="text-[12px] font-medium text-white/90">
                                Pratham Chavhan
                            </p>
                        </div>
                    </div>
                )}

                {/* Floating Cursor Label */}
                <motion.div
                    className="absolute z-50 pointer-events-none bg-white text-black px-2 py-1 rounded-lg text-[10px] font-semibold shadow-2xl  duration-300"
                    style={{
                        left: cursorXSpring,
                        top: cursorYSpring,
                        x: '-50%',
                        y: '-140%',
                        opacity: isHovering ? 1 : 0,
                        scale: isHovering ? 1 : 0.8,
                    }}
                >
                    {captionText}
                    {/* Add a small arrow tip to the box */}
                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45" />
                </motion.div>
            </motion.div>

            {showMobileWarning && (
                <div className="md:hidden mt-2 text-[10px] text-zinc-500 text-center">
                    Tilt effect works best on desktop
                </div>
            )}
        </div>
    );
}
