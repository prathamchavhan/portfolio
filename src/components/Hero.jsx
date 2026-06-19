"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import IPodWidget from "./IPodWidget";
import ResumeWidget from "./ResumeWidget";
import { Button } from "@/components/ui/button"
import { MapPin, Download } from "lucide-react"
import TiltedCard from './TiltedCard';



export default function Hero() {
    const [ipodOpen, setIpodOpen] = useState(false);
    const [resumeOpen, setResumeOpen] = useState(false);


    return (
        <section id="hero" className="relative min-h-[80vh] md:min-h-[85vh] w-full hidden md:flex items-center overflow-hidden duration-500 font-mono justify-center">







            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 pt-2 pb-4 flex flex-col md:flex-row items-center gap-12 lg:gap-20">

                <div className="w-[220px] h-[220px] md:w-[260px] md:h-[260px] shrink-0 mx-auto md:mx-0">
                    <TiltedCard
                        imageSrc="/assets/imagegallery/pro.png"
                        altText="Pratham "
                        captionText="Pratham "
                        containerHeight="100%"
                        containerWidth="100%"
                        imageHeight="100%"
                        imageWidth="100%"
                        rotateAmplitude={12}
                        scaleOnHover={1.05}
                        showMobileWarning={false}
                        showTooltip
                        displayOverlayContent
                    />
                </div>

                <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl relative w-full">

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

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-black dark:text-[#EAEAEA] leading-[1.05] mb-6">
                        Creating scalable
                        <br className="hidden md:block" />
                        products across the full stack<span className="text-[#F2542D]">.</span>
                    </h1>

                    <p className="text-base md:text-[17px] text-[#444444] dark:text-[#A3A3A3] font-light leading-relaxed mb-8 max-w-xl mx-auto md:mx-0">
                        Obsessed with building digital products that feel as good as they function.
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-10">
                        <Button asChild variant="ghost" className="p-0 h-auto ">
                            <a
                                href="https://www.google.com/maps?q=Nagpur,+Maharashtra,+India"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-[#666666] underline-offset-1 "
                            >
                                <MapPin size={14} />
                                <span>Nagpur, Maharashtra, India</span>
                            </a>
                        </Button>
                    </div>

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
