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
            className="sticky flex items-center justify-center w-full min-h-[55vh] mb-6"
            style={{ top: `calc(12vh + ${index * 30}px)` }}
        >
            <motion.div
                style={{ scale, backgroundColor: project.leftBg }}
                className="w-full rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.25)] flex flex-col"
            >
                {/* Background Image Banner */}
                <div
                    className="w-full h-40 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${project.bgImage})`,
                        backgroundColor: project.rightBg,
                    }}
                />

                {/* Card Content */}
                <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                        <h3
                            className="text-[18px] font-bold tracking-tight"
                            style={{ color: project.brandColor }}
                        >
                            {project.brand}
                        </h3>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                            {project.year}
                        </span>
                    </div>

                    <h4 className="text-[15px] font-medium leading-snug mb-3 text-black">
                        {project.title}
                    </h4>

                    <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4">
                        {project.tags.map((tag, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                                {i !== 0 && <span className="w-1 h-1 rounded-full bg-gray-400" />}
                                <span className="text-[12px] font-semibold text-gray-700">{tag}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-[13px] text-gray-600 leading-relaxed mb-4 line-clamp-3">
                        {project.description}
                    </p>

                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                            {project.category}
                        </span>
                        <a
                            href="#"
                            className="bg-black text-white p-2.5 rounded-full active:scale-95 transition duration-200"
                        >
                            <ArrowUpRight size={16} />
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
            className="sticky flex items-center justify-center w-full min-h-[40vh] mb-6"
            style={{ top: `calc(12vh + ${index * 30}px)` }}
        >
            <motion.div
                style={{ scale }}
                className="w-full rounded-2xl flex items-center justify-center py-14"
            >
                <Link
                    href="https://github.com/prathamchavhan"
                    className="flex flex-col items-center gap-5"
                >
                    <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-transform">
                        <ArrowUpRight size={32} className="text-white" />
                    </div>
                    <span className="text-2xl font-black text-white tracking-tight">
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
            className="md:hidden relative w-full bg-black pt-16 pb-0 px-4"
        >
            <div className="mb-10">
                <p className="text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase mb-3">
                    Selected Works
                </p>
                <h2 className="text-[28px] font-black text-white leading-tight">
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
