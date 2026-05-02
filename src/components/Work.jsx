'use client';

import { useLayoutEffect, useRef, useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { generateRandomBoxes } from './gridUtils';

function WorkGridBackground({ seed = 101, offsetY }) {
    const [size, setSize] = useState({ w: 0, h: 0 });
    const [pageHeight, setPageHeight] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setSize({
                w: Math.max(document.documentElement.scrollWidth, window.innerWidth),
                h: typeof window !== 'undefined' ? window.innerHeight : 900
            });
            setPageHeight(document.documentElement.scrollHeight);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        const t = setTimeout(handleResize, 100);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(t);
        };
    }, []);

    const { boxes, corners, imageBox } = useMemo(() => {
        if (size.w === 0 || pageHeight === 0) return { boxes: [], corners: [], imageBox: null };
        const viewH = typeof window !== 'undefined' ? window.innerHeight : 900;
        const allBoxesContext = generateRandomBoxes(size.w, pageHeight, seed, viewH);

        const filteredBoxes = allBoxesContext.boxes.filter(b => b.y + b.h > offsetY && b.y < offsetY + size.h);
        const filteredCorners = allBoxesContext.corners.filter(pt => pt.y > offsetY && pt.y < offsetY + size.h);

        let targetImageBox = null;
        if (filteredBoxes.length) {
            const leftBoxes = filteredBoxes
                .filter(b => b.x < size.w * 0.25 && b.w > 80 && b.h > 80)
                .sort((a, b) => a.y - b.y);

            const downBox = leftBoxes[3] || leftBoxes[leftBoxes.length - 1] || filteredBoxes[0];
            const rightNeighbor = filteredBoxes.find(b => {
                const touchesRight = Math.abs(b.x - (downBox.x + downBox.w)) < 5;
                const overlapsVertically = b.y < downBox.y + downBox.h && b.y + b.h > downBox.y;
                return touchesRight && overlapsVertically && b !== downBox;
            });
            targetImageBox = rightNeighbor || downBox;
        }

        return { boxes: filteredBoxes, corners: filteredCorners, imageBox: targetImageBox };
    }, [size.w, size.h, pageHeight, seed, offsetY]);

    const lineColor = '#FFFFFF';
    const lineOpacity = 0.04;
    const plusOpacity = 0.25;
    const plusSize = 6;

    if (size.w === 0) return null;

    return (
        <div
            aria-hidden="true"
            style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
                overflow: 'hidden'
            }}
        >
            {imageBox && (
                <div
                    style={{
                        position: 'absolute',
                        left: imageBox.x,
                        top: imageBox.y - offsetY,
                        width: imageBox.w,
                        height: imageBox.h,
                        overflow: 'hidden',
                        opacity: 0.35,
                    }}
                >
                    <Image
                        src="/assets/waterfall.png"
                        alt="Work background accent"
                        fill
                        style={{ objectFit: 'cover', filter: 'grayscale(100%)' }}
                    />
                </div>
            )}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox={`0 0 ${size.w} ${size.h}`}
                preserveAspectRatio="none"
                style={{ display: 'block', position: 'relative', zIndex: 1 }}
            >
                {boxes.map((box, i) => (
                    <rect
                        key={`wbox-${i}`}
                        x={box.x}
                        y={box.y - offsetY}
                        width={box.w}
                        height={box.h}
                        fill="none"
                        className="stroke-black/[0.05] dark:stroke-white/[0.04]"
                        strokeWidth={1}
                    />
                ))}
                {corners.map((pt, i) => (
                    <g key={`wp-${i}`} className="stroke-black/[0.15] dark:stroke-white/25" strokeWidth={1}>
                        <line x1={pt.x - plusSize} y1={pt.y - offsetY} x2={pt.x + plusSize} y2={pt.y - offsetY} />
                        <line x1={pt.x} y1={pt.y - offsetY - plusSize} x2={pt.x} y2={pt.y - offsetY + plusSize} />
                    </g>
                ))}
            </svg>
        </div>
    );
}

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

    const isDark = project.bgColor.startsWith('#0') || project.bgColor.startsWith('#1') || project.bgColor.startsWith('#2');
    const textPrimary = isDark ? '#EAEAEA' : '#111111';
    const textSecondary = isDark ? '#888888' : '#555555';
    const borderCol = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.12)';

    return (
        <div
            className="sticky flex items-center justify-center w-full"
            style={{ top: `calc(8vh + ${index * 28}px)`, paddingBottom: '4px' }}
        >
            <motion.div
                style={{ scale, backgroundColor: project.bgColor, border: `1px solid ${borderCol}` }}
                className="w-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer group origin-top"
            >
                {/* ── Header row: year left, category right ── */}
                <div
                    className="flex items-center justify-between px-6 pt-5 pb-3"
                    style={{ borderBottom: `1px solid ${borderCol}` }}
                >
                    <span className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: textSecondary }}>
                        {project.year}
                    </span>
                    <span className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: textSecondary }}>
                        {project.category}
                    </span>
                </div>

                {/* ── Title row: big title left, arrow icon right ── */}
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
                        style={{ border: `1px solid ${borderCol}`, color: textPrimary }}
                        onClick={e => e.stopPropagation()}
                    >
                        <ArrowUpRight size={18} />
                    </a>
                </div>

                {/* ── Full-width image block ── */}
                <div className="relative w-full overflow-hidden" style={{ height: 'clamp(220px, 42vh, 520px)' }}>
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
    const [workTop, setWorkTop] = useState(0);

    useEffect(() => {
        const handleMeasure = () => {
            if (sectionRef.current) {
                setWorkTop(sectionRef.current.offsetTop);
            }
        };
        handleMeasure();
        window.addEventListener('resize', handleMeasure);
        const t1 = setTimeout(handleMeasure, 150);
        const t2 = setTimeout(handleMeasure, 500);
        const t3 = setTimeout(handleMeasure, 1500);
        return () => {
            window.removeEventListener('resize', handleMeasure);
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        }
    }, []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    return (
        <section
            ref={sectionRef}
            id="work"
            className="relative w-full bg-transparent font-mono"
            onMouseEnter={() => window.dispatchEvent(new CustomEvent('cursor-label', { detail: { label: 'Projects' } }))}
            onMouseLeave={() => window.dispatchEvent(new CustomEvent('cursor-label', { detail: { label: '' } }))}
        >
            {/* Sticky Background Grid */}
            <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ zIndex: 0 }}>
                <WorkGridBackground seed={101} offsetY={workTop} />
            </div>

            {/* Main Content wrapped with negative margin to pull over the bg */}
            <div className="relative z-10 w-full -mt-[100vh] pb-0">
                {/* Intro Area */}
                <div className="pt-8 pb-12 md:pt-10 md:pb-16 w-full flex flex-col justify-start px-10 md:px-20 max-w-7xl mx-auto">
                    <p className="text-[11px] md:text-xs font-semibold tracking-[0.2em] text-[#666666] uppercase mb-4">
                        Selected Works
                    </p>
                    <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-black dark:text-[#EAEAEA]">
                        Featured Projects<span className="text-[#F2542D]">.</span>
                    </h2>
                    <p className="text-[#444444] dark:text-[#A3A3A3] mt-6 max-w-sm text-lg">Scroll down to explore the stacked gallery.</p>
                </div>

                {/* Stacked Cards Area */}
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

                    {/* Show All Projects CTA */}
                    <div
                        className="sticky w-full h-[25vh] flex items-center justify-center z-20 pt-5 pb-5"
                        style={{ top: `calc(10vh + ${projects.length * 30}px)` }}
                    >
                        <Link href="/projects" className="group flex flex-col items-center justify-center gap-6">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#111] border border-[#333] flex items-center justify-center group-hover:bg-[#EAEAEA] transition duration-500 shadow-2xl group-hover:scale-105">
                                <ArrowUpRight size={48} className="text-[#EAEAEA] group-hover:text-[#151515] transition duration-500" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-medium text-black dark:text-[#EAEAEA] tracking-wider group-hover:text-[#F2542D] transition duration-300 shadow-none dark:shadow-black drop-shadow-sm dark:drop-shadow-lg">
                                Show All Projects
                            </h3>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
