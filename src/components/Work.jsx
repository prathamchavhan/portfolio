'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const YEAR_NOW = new Date().getFullYear();

const projects = [
    {
        title: "AI Automation Dashboard",
        category: "AI / Full Stack",
        year: YEAR_NOW,
        image: "/assets/data.png",
        link: "#",
        bgColor: "#0f1117",
    },
    {
        title: "Modern Chat Interface",
        category: "Web App",
        year: YEAR_NOW - 1,
        image: "/assets/chatgpt_image.png",
        link: "#",
        bgColor: "#f0f4f8",
    },
    {
        title: "City Explorer App",
        category: "WebGL / Maps",
        year: YEAR_NOW - 1,
        image: "/assets/city.png",
        link: "#",
        bgColor: "#d6e8f0",
    }
];

const ProjectCard = ({ project, index, total, scrollYProgress }) => {
    const targetScale = 1 - ((total - index) * 0.04);

    const scale = useTransform(
        scrollYProgress,
        [index / total, 1],
        [1, targetScale]
    );

    const isDark =
        project.bgColor.startsWith('#0') ||
        project.bgColor.startsWith('#1') ||
        project.bgColor.startsWith('#2');

    const textPrimary = isDark ? '#EAEAEA' : '#111111';
    const textSecondary = isDark ? '#888888' : '#555555';
    const borderCol = isDark
        ? 'rgba(255,255,255,0.08)'
        : 'rgba(0,0,0,0.12)';

    return (
        <div
            className="sticky flex items-center justify-center w-full"
            style={{ top: `calc(8vh + ${index * 28}px)` }}
        >
            <motion.div
                style={{
                    scale,
                    backgroundColor: project.bgColor,
                    border: `1px solid ${borderCol}`
                }}
                className="w-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer group origin-top"
            >
                <div
                    className="flex items-center justify-between px-6 pt-5 pb-3"
                    style={{ borderBottom: `1px solid ${borderCol}` }}
                >
                    <span
                        className="text-xs font-semibold tracking-[0.18em] uppercase"
                        style={{ color: textSecondary }}
                    >
                        {project.year}
                    </span>

                    <span
                        className="text-xs font-semibold tracking-[0.18em] uppercase"
                        style={{ color: textSecondary }}
                    >
                        {project.category}
                    </span>
                </div>

                <div className="flex items-center justify-between px-6 py-4">
                    <h3
                        className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight leading-tight"
                        style={{ color: textPrimary }}
                    >
                        {project.title}
                    </h3>

                    <a
                        href={project.link}
                        className="flex items-center justify-center w-10 h-10 rounded-full transition duration-300 hover:scale-110 shrink-0 ml-4"
                        style={{
                            border: `1px solid ${borderCol}`,
                            color: textPrimary
                        }}
                    >
                        <ArrowUpRight size={18} />
                    </a>
                </div>

                <div
                    className="relative w-full overflow-hidden"
                    style={{ height: 'clamp(220px, 42vh, 520px)' }}
                >
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition duration-700 ease-out"
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default function Work() {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    return (
        <section
            ref={sectionRef}
            id="work"
            className="relative w-full bg-transparent font-mono"
        >
            <div className="relative z-10 w-full pb-0">
                <div className="pt-8 pb-12 md:pt-10 md:pb-16 w-full flex flex-col justify-start px-10 md:px-20 max-w-7xl mx-auto">
                    <p className="text-[11px] md:text-xs font-semibold tracking-[0.2em] text-[#666666] uppercase mb-4">
                        Selected Works
                    </p>

                    <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-black dark:text-[#EAEAEA]">
                        Featured Projects
                        <span className="text-[#F2542D]">.</span>
                    </h2>

                    <p className="text-[#444444] dark:text-[#A3A3A3] mt-6 max-w-sm text-lg">
                        Scroll down to explore the stacked gallery.
                    </p>
                </div>

                <div className="w-full max-w-6xl mx-auto px-6 relative mt-2">
                    {projects.map((project, idx) => (
                        <ProjectCard
                            key={idx}
                            project={project}
                            index={idx}
                            total={projects.length}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}

                    <div
                        className="sticky w-full h-[25vh] flex items-center justify-center z-20 pt-5 pb-5"
                        style={{ top: `calc(10vh + ${projects.length * 30}px)` }}
                    >
                        <Link
                            href="https://github.com/prathamchavhan"
                            className="group flex flex-col items-center justify-center gap-6"
                        >
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#111] border border-[#333] flex items-center justify-center group-hover:bg-[#EAEAEA] transition duration-500 shadow-2xl group-hover:scale-105">
                                <ArrowUpRight
                                    size={48}
                                    className="text-[#EAEAEA] group-hover:text-[#151515] transition duration-500"
                                />
                            </div>

                            <h3 className="text-xl md:text-2xl font-medium text-black dark:text-[#EAEAEA] tracking-wider group-hover:text-[#F2542D] transition duration-300">
                                Show All Projects
                            </h3>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}