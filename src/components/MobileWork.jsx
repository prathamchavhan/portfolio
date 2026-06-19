'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
    {
        brand: "AI LAB",
        title: "Student-Focused AI Interview Assistant",
        tags: ["Mock interviews", "Real-time feedback", "Career readiness"],
        description: "AI-powered Interview, HR & Job Portal System built with Next.js, Supabase, OpenAI, and Google Gemini featuring virtual AI interviews, aptitude tests, AI score models, performance graphs, question bank generator, real-time transcription, analytics dashboard, PDF evaluation reports, and a modern tech job portal for candidates and recruiters.",
        year: "2024",
        category: "AI / EdTech",
        leftBg: "#ffffffff",
        rightBg: "#f8fafc",
        bgImage: "/assets/imagegallery/nn.png",
        brandColor: "#000000ff"
    },
    {
        brand: "Beyond words",
        title: "Modern Shopping Experience for Digital Goods",
        tags: ["Fast performance", "Seamless checkout", "Analytics"],
        description: "A high-performance ecommerce platform built for digital products with advanced subscription management.",
        year: "2023",
        category: "Web App / Commerce",
        leftBg: "#edf9fcff",
        rightBg: "#2e1065",
        bgImage: "/assets/imagegallery/g.png",
        brandColor: "#000000ff"
    },
    {
        brand: "Hyreso website & webapp",
        title: "Interactive Platform for Global Conferences",
        tags: ["Networking", "Live Streaming", "Workshops"],
        description: "A comprehensive solution for hosting large-scale virtual events with real-time interaction and engagement tools.",
        year: "2024",
        category: "Web App / Events",
        leftBg: "#fffafaff",
        rightBg: "#451a03",
        bgImage: "/assets/imagegallery/sun.png",
        brandColor: "#f59e0b"
    },
    {
        brand: "RAG based system",
        title: "Seamless Payment Solutions for Teams",
        tags: ["Secure", "Multi-currency", "Reporting"],
        description: "Developed an intelligent assistant with a role-based access system and project management capabilities. Users can create and manage projects, assign roles and permissions, and interact through natural conversations. Integrated Retrieval-Augmented Generation (RAG) to retrieve relevant project knowledge and provide accurate, context-aware responses. The system enhances collaboration, knowledge access, and productivity through intelligent workflows.",
        year: "2023",
        category: "Fintech / SaaS",
        leftBg: "#ffffffff",
        rightBg: "#1e3a8a",
        bgImage: "/assets/imagegallery/nn.png",
        brandColor: "#2563eb"
    }
];

/* ─── Individual Stacked Card ─── */
const MobileStackCard = ({ project, index, total, scrollYProgress }) => {
    const targetScale = 1 - ((total - index) * 0.03);
    const scale = useTransform(
        scrollYProgress,
        [index / total, 1],
        [1, targetScale]
    );

    return (
        <div
            className="sticky flex items-start justify-center w-full pt-2 mb-2"
            style={{ top: `calc(10vh + ${index * 28}px)` }}
        >
            <motion.div
                style={{ scale, backgroundColor: project.leftBg }}
                className="w-full rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.2)] flex flex-col"
            >
                {/* Background Image Banner */}
                <div
                    className="w-full h-36 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${project.bgImage})`,
                        backgroundColor: project.rightBg,
                    }}
                />

                {/* Card Content */}
                <div className="p-4">
                    <div className="flex items-center justify-between mb-1.5">
                        <h3
                            className="text-[16px] font-bold tracking-tight"
                            style={{ color: project.brandColor }}
                        >
                            {project.brand}
                        </h3>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                            {project.year}
                        </span>
                    </div>

                    <h4 className="text-[14px] font-medium leading-snug mb-2 text-black">
                        {project.title}
                    </h4>

                    <div className="flex flex-wrap gap-x-2 gap-y-1 mb-3">
                        {project.tags.map((tag, i) => (
                            <div key={i} className="flex items-center gap-1">
                                {i !== 0 && <span className="w-0.5 h-0.5 rounded-full bg-gray-400" />}
                                <span className="text-[11px] font-semibold text-gray-600">{tag}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-[12px] text-gray-500 leading-relaxed mb-3 line-clamp-2">
                        {project.description}
                    </p>

                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                            {project.category}
                        </span>
                        <a
                            href="#"
                            className="bg-black text-white p-2 rounded-full active:scale-95 transition duration-200"
                        >
                            <ArrowUpRight size={14} />
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

/* ─── Mobile "See All" Stacked Card ─── */
const MobileShowAllCard = ({ index, total, scrollYProgress }) => {
    const targetScale = 1 - ((total - index) * 0.03);
    const scale = useTransform(
        scrollYProgress,
        [index / total, 1],
        [1, targetScale]
    );

    return (
        <div
            className="sticky flex items-center justify-center w-full py-6"
            style={{ top: `calc(10vh + ${index * 28}px)` }}
        >
            <motion.div
                style={{ scale }}
                className="w-full rounded-2xl flex items-center justify-center py-10"
            >
                <Link
                    href="https://github.com/prathamchavhan"
                    className="flex flex-col items-center gap-4"
                >
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-transform">
                        <ArrowUpRight size={26} className="text-white" />
                    </div>
                    <span className="text-xl font-black text-white tracking-tight">
                        See All Projects
                    </span>
                </Link>
            </motion.div>
        </div>
    );
};

/* ─── Main Mobile Work Section ─── */
export default function MobileWork() {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    const total = projects.length + 1;

    return (
        <section
            ref={sectionRef}
            className="md:hidden relative w-full bg-black pt-8 pb-0 px-4"
        >
            <div className="mb-6">
                <p className="text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase mb-2">
                    Selected Works
                </p>
                <h2 className="text-[24px] font-black text-white leading-tight">
                    Featured Projects<span className="text-[#F2542D]">.</span>
                </h2>
            </div>

            {projects.map((project, idx) => (
                <MobileStackCard
                    key={idx}
                    project={project}
                    index={idx}
                    total={total}
                    scrollYProgress={scrollYProgress}
                />
            ))}

            <MobileShowAllCard
                index={projects.length}
                total={total}
                scrollYProgress={scrollYProgress}
            />
        </section>
    );
}
