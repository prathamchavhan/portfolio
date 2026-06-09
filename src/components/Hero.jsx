"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import IPodWidget from "./IPodWidget";
import ResumeWidget from "./ResumeWidget";
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"


function StarField() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        let W = canvas.width = window.innerWidth;
        let H = canvas.height = window.innerHeight;

        const STAR_COUNT = 220;
        const stars = Array.from({ length: STAR_COUNT }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.4 + 0.3,
            baseAlpha: Math.random() * 0.6 + 0.25,
            alpha: 0,
            twinkleSpeed: Math.random() * 0.008 + 0.003,
            twinkleOffset: Math.random() * Math.PI * 2,
        }));

        let frame = 0;
        let rafId;

        const draw = () => {
            ctx.clearRect(0, 0, W, H);
            frame += 0.016;
            stars.forEach((s) => {
                s.alpha = s.baseAlpha * (0.5 + 0.5 * Math.sin(frame / s.twinkleSpeed + s.twinkleOffset));
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${s.alpha.toFixed(3)})`;
                ctx.fill();
            });
            rafId = requestAnimationFrame(draw);
        };
        draw();

        const onResize = () => {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
            stars.forEach((s) => { s.x = Math.random() * W; s.y = Math.random() * H; });
        };
        window.addEventListener("resize", onResize);
        return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", onResize); };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 w-full h-full hidden dark:block"
        />
    );
}

export default function Hero() {
    const [ipodOpen, setIpodOpen] = useState(false);
    const [resumeOpen, setResumeOpen] = useState(false);


    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["35deg", "-35deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-35deg", "35deg"]);

    // Added translation/shift effect
    const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-40px", "40px"]);
    const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-40px", "40px"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section id="hero" className="relative min-h-[80vh] md:min-h-[85vh] w-full flex items-center overflow-hidden duration-500 font-mono">







            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 pt-2 pb-4 flex flex-col md:flex-row items-center gap-12 lg:gap-20">

                <motion.div
                    className="w-56 h-64 md:w-72 md:h-80 shrink-0 relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] cursor-grab active:cursor-grabbing"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    drag
                    dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                    dragElastic={0.2}
                    style={{
                        rotateX,
                        rotateY,
                        x: translateX,
                        y: translateY,
                        transformStyle: "preserve-3d"
                    }}
                >
                    <Image
                        src="/assets/smile.png"
                        alt="Profile"
                        fill
                        className="object-cover"
                    />
                </motion.div>


                <div className="flex flex-col items-start text-left max-w-2xl relative w-full">

                    <div className="hidden lg:flex absolute -right-16 xl:-right-32 top-0 flex-col items-center gap-1 z-20">


                        <Button
                            variant="ghost"
                            onClick={() => setIpodOpen(true)}
                            className="p-0 h-auto hover:bg-transparent"
                        >
                            <Image
                                src="/assets/ipod.png"
                                alt="Open iPod Widget"
                                width={40}
                                height={40}
                                className="object-contain hover:scale-110 transition duration-300"
                            />
                        </Button>
                    </div>

                    <p className="text-[13px] md:text-xs font-semibold tracking-[0.2em] text-[#666666] uppercase mb-4 md:mb-6">
                        Full Stack Developer + AI BUILDER
                    </p>

                    <h1 className="text-4xl md:text-4xl lg:text-5xl font-medium tracking-tight text-black dark:text-[#EAEAEA] leading-[1.05] mb-6">
                        Creating scalable
                        <br className="hidden md:block" />
                        products across the full stack<span className="text-[#F2542D]">.</span>
                    </h1>

                    <p className="text-base md:text-[17px] text-[#444444] dark:text-[#A3A3A3] font-light leading-relaxed mb-10 max-w-xl">
                        Obsessed with building digital products that feel as good as they function.
                    </p>


                    <Button asChild variant="ghost" className="p-0 h-auto hover:bg-transparent">
                        <a
                            href="https://www.google.com/maps?q=Nagpur,+Maharashtra,+India"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-[#444444] dark:text-[#777777] hover:text-black dark:hover:text-white transition"
                        >
                            <MapPin size={14} />
                            <span className="border-b border-dashed border-[#444444] pb-[1px]">
                                Nagpur, Maharashtra, India
                            </span>
                        </a>
                    </Button>
                </div>
            </div>

            {/* Resume Button (Absolute Bottom Left) */}
            <div className="absolute left-9 bottom-10 md:left-24 md:bottom-16 z-20 flex items-center gap-1">
                <div className="hidden md:flex flex-col items-start gap-0 text-[#A3A3A3] ml-3 mb-4">
                    <span className="text-[20px] rotate-[8deg] ml-6 mb-1" style={{ fontFamily: 'var(--font-edu-tas)' }}></span>

                    <Button
                        variant="ghost"
                        onClick={() => setResumeOpen(true)}
                        className="p-0 h-auto hover:bg-transparent group"
                    >
                        <div className="w-[55px] h-[55px] flex items-center justify-center relative hover:scale-[1.15] transition duration-300 transform origin-bottom-left pt-3">
                            <Image
                                src="/assets/resume.png"
                                alt="Resume Graphic"
                                width={50}
                                height={50}
                                className="object-contain drop-shadow-2xl"
                            />
                        </div>

                    </Button>

                </div>
            </div>

            <IPodWidget externalOpen={ipodOpen} onExternalClose={() => setIpodOpen(false)} />
            <ResumeWidget externalOpen={resumeOpen} onExternalClose={() => setResumeOpen(false)} />
        </section>
    );
}
