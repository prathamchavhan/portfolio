'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Macbook from './Macbook';

const projects = [
    {
        brand: "AI LAB",

        title: "Student-Focused AI Interview Assistant",
        tags: ["Mock interviews", "Real-time feedback", "Career readiness"],
        description: "AI-powered Interview, HR & Job Portal System built with Next.js, Supabase, OpenAI, and Google Gemini featuring virtual AI interviews, aptitude tests, AI score models, performance graphs, question bank generator, real-time transcription, analytics dashboard, PDF evaluation reports, and a modern tech job portal for candidates and recruiters.",
        trustedBy: "Trusted by 50,000+ Users",
        year: "2024",
        category: "AI / EdTech",
        videoUrl: "/video.mp4",
        accentColor: "#ffffffff",
        leftBg: "#ffffffff",
        rightBg: "#f8fafc",
        bgImage: "/assets/imagegallery/nn.png",
        textColor: "#7faedcff",
        brandColor: "#000000ff"
    },
    {
        brand: "Beyond words",

        title: "Modern Shopping Experience for Digital Goods",
        tags: ["Fast performance", "Seamless checkout", "Analytics"],
        description: "A high-performance ecommerce platform built for digital products with advanced subscription management.",
        trustedBy: "Empowering 100+ Businesses",
        year: "2023",
        category: "Web App / Commerce",
        videoUrl: "/video.mp4",
        accentColor: "#4ade80",
        leftBg: "#edf9fcff",
        rightBg: "#2e1065",
        bgImage: "/assets/imagegallery/g.png",
        textColor: "#111111",
        brandColor: "#000000ff"
    },
    {
        brand: "Hyreso website & webapp",

        title: "Interactive Platform for Global Conferences",
        tags: ["Networking", "Live Streaming", "Workshops"],
        description: "A comprehensive solution for hosting large-scale virtual events with real-time interaction and engagement tools.",
        trustedBy: "Used by Fortune 500",
        year: "2024",
        category: "Web App / Events",
        videoUrl: "/video.mp4",
        accentColor: "#facc15",
        leftBg: "#fffafaff",
        rightBg: "#451a03",
        bgImage: "/assets/imagegallery/sun.png",
        textColor: "#111111",
        brandColor: "#f59e0b"
    },
    {
        brand: "RAG based system",

        title: "Seamless Payment Solutions for Teams",
        tags: ["Secure", "Multi-currency", "Reporting"],
        description: "Developed an intelligent assistant with a role-based access system and project management capabilities. Users can create and manage projects, assign roles and permissions, and interact through natural conversations. Integrated Retrieval-Augmented Generation (RAG) to retrieve relevant project knowledge and provide accurate, context-aware responses. The system enhances collaboration, knowledge access, and productivity through intelligent workflows.",
        trustedBy: "Trusted by 10k+ Teams",
        year: "2023",
        category: "Fintech / SaaS",
        videoUrl: "/video.mp4",
        accentColor: "#3b82f6",
        leftBg: "#ffffffff",
        rightBg: "#1e3a8a",
        bgImage: "/assets/imagegallery/nn.png",
        textColor: "#111111",
        brandColor: "#2563eb"
    }
];


const ProjectCard = ({ project, index, total, scrollYProgress, setIsHovered }) => {
    const targetScale = 1 - ((total - index) * 0.04);
    const scale = useTransform(
        scrollYProgress,
        [index / total, 1],
        [1, targetScale]
    );

    return (
        <div
            className="sticky flex items-center justify-center w-full min-h-[70vh] mb-20"
            style={{ top: `calc(10vh + ${index * 40}px)` }}
        >
            <motion.div
                style={{ scale, backgroundColor: project.leftBg }}
                className="w-full max-w-6xl h-[460px] md:h-[540px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col md:flex-row relative group cursor-none"
                data-hide-cursor="true"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Left Side - Info */}
                <div
                    className="w-full md:w-[45%] p-8 md:p-14 flex flex-col justify-between"
                >
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <h3 className="text-[17px] md:text-[30px] font-semibold tracking-tighter" style={{ color: project.brandColor }}>
                                {project.brand}
                            </h3>
                            <span className="text-[12px] font-normal text-gray-500 pt-1">
                                {project.brandSecondary}
                            </span>
                        </div>

                        <h3 className="text-[17px] md:text-[24px] font-normal leading-tight mb-4 text-black">
                            {project.title}
                        </h3>

                        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-8">
                            {project.tags.map((tag, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    {i !== 0 && <span className="w-1 h-1 rounded-full bg-black"></span>}
                                    <span className="text-sm md:text-base font-semibold text-black">
                                        {tag}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <p className="text-base md:text-[15px] text-black ">
                            {project.description}
                        </p>
                    </div>

                    <div className="mt-8 flex items-center justify-between">

                        <a
                            href="#"
                            className="bg-black text-white p-4 rounded-full hover:scale-110 transition duration-300"
                        >
                            <ArrowUpRight size={24} />
                        </a>
                    </div>
                </div>

                {/* Right Side - Visuals */}
                <div
                    className="w-full md:w-[55%] relative flex items-center justify-center p-6 md:p-12"
                >
                    {/* Inset floating background image */}
                    <div
                        className="absolute inset-4 md:inset-6 rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                        style={{
                            background: project.rightBg,
                            backgroundImage: `url(${project.bgImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="absolute inset-0" />
                    </div>

                    {/* Single Macbook */}
                    <div className="relative w-full h-full flex items-center justify-center overflow-visible z-10 scale-[1.05] pointer-events-none">
                        <Macbook
                            videoUrl={project.videoUrl}
                            rotateX={0}
                            rotateY={0}
                            scale={0.9}
                            className="pointer-events-auto"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const ShowAllCard = ({ index, total, scrollYProgress }) => {
    const targetScale = 1 - ((total - index) * 0.04);
    const scale = useTransform(
        scrollYProgress,
        [index / total, 1],
        [1, targetScale]
    );

    return (
        <div
            className="sticky flex items-center justify-center w-full min-h-[70vh] mb-20"
            style={{ top: `calc(10vh + ${index * 40}px)` }}
        >
            <motion.div
                style={{ scale }}
                className="w-full max-w-6xl h-[460px] md:h-[540px] flex items-center justify-center group cursor-pointer"
            >
                <Link
                    href="https://github.com/prathamchavhan"
                    className="w-full h-full flex flex-col items-center justify-center gap-8 relative"
                >
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-black rounded-full border border-black flex items-center justify-center transition-all duration-500 group-hover:scale-110 z-10 shadow-2xl">
                        <ArrowUpRight
                            size={48}
                            className="text-white  transition-colors duration-500"
                        />
                    </div>
                    <h3 className="text-3xl md:text-[50px] font-black text-black transition-colors z-10 tracking-tighter">
                        See All Projects
                    </h3>
                </Link>
            </motion.div>
        </div>
    );
};

export default function Work() {
    const sectionRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    return (
        <section
            ref={sectionRef}
            id="work"
            className="relative w-full bg-black pt-20 pb-0 hidden md:block"
        >
            <div className="max-w-7xl mx-auto px-6 mb-20">
                <p className="text-xs font-bold tracking-[0.3em] text-gray-500 uppercase mb-4">
                    Selected Works
                </p>
                <h2 className="text-3xl md:text-[45px] font-black font-semibold text-white">
                    Featured Projects<span className="text-[#F2542D]">.</span>
                </h2>
            </div>

            <div className="w-full max-w-7xl mx-auto px-6">
                {projects.map((project, idx) => (
                    <ProjectCard
                        key={idx}
                        project={project}
                        index={idx}
                        total={projects.length + 1}
                        scrollYProgress={scrollYProgress}
                        setIsHovered={setIsHovered}
                    />
                ))}

                <ShowAllCard
                    index={projects.length}
                    total={projects.length + 1}
                    scrollYProgress={scrollYProgress}
                />
            </div>



            {/* Custom Cursor / Floating Label */}
            <motion.div
                className="fixed top-0 left-0 px-5 py-2.5 rounded-full bg-white text-black flex items-center justify-center pointer-events-none z-[100] border border-gray-200 shadow-xl uppercase tracking-[0.1em] text-[10px] font-extrabold whitespace-nowrap"
                animate={{
                    x: mousePosition.x + 16,
                    y: mousePosition.y + 16,
                    scale: isHovered ? 1 : 0,
                    opacity: isHovered ? 1 : 0
                }}
                transition={{
                    type: "tween",
                    ease: "backOut",
                    duration: 0.3
                }}
            >
                View Project
            </motion.div>
        </section>
    );
}