'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ExternalLink,
} from 'lucide-react';
import {
    SiPython,
    SiJavascript,
    SiCplusplus,
    SiReact,
    SiNextdotjs,
    SiFlask,
    SiDjango,
    SiPostgresql,
    SiMysql,
    SiSqlite,
    SiJson,
    SiScikitlearn,
    SiOpencv,
    SiPandas,
    SiOpenai,
    SiFigma,
    SiGithub,
    SiSupabase,
    SiVercel,
    SiPostman,
    SiFirebase,
    SiTailwindcss,
    SiNodedotjs,
    SiTypescript
} from 'react-icons/si';

const skills = [
    {
        id: "languages",
        category: "Languages",
        items: [
            { name: "Python", desc: "General purpose & AI", url: "https://www.python.org/doc/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
            { name: "JavaScript", desc: "Web & backend", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
            { name: "TypeScript", desc: "Typed JavaScript", url: "https://www.typescriptlang.org/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
            { name: "C++", desc: "Systems & performance", url: "https://en.cppreference.com/w/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
        ]
    },
    {
        id: "frameworks",
        category: "Frameworks / Libs",
        items: [
            { name: "React", desc: "UI development", url: "https://react.dev/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            { name: "Next.js", desc: "Full-stack React", url: "https://nextjs.org/docs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
            { name: "Tailwind CSS", desc: "Utility-first CSS", url: "https://tailwindcss.com/docs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
            { name: "Node.js", desc: "JS Runtime", url: "https://nodejs.org/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
            { name: "Flask", desc: "Python lightweight web", url: "https://flask.palletsprojects.com/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
            {
                name: "Django",
                desc: "Python robust web",
                url: "https://www.djangoproject.com/",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg"
            }
        ]
    },
    {
        id: "databases",
        category: "Databases",
        items: [
            { name: "PostgreSQL", desc: "Relational SQL", url: "https://www.postgresql.org/docs/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
            { name: "MySQL", desc: "Scalable SQL", url: "https://dev.mysql.com/doc/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
            { name: "SQLite", desc: "Embedded SQL", url: "https://www.sqlite.org/docs.html", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
            { name: "Firebase", desc: "Cloud Database", url: "https://firebase.google.com/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
            {
                name: "MongoDB",
                desc: "NoSQL Database",
                url: "https://www.mongodb.com/docs/",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
            },
        ]
    },
    {
        id: "ai-ml",
        category: "AI / ML",
        items: [
            { name: "Scikit-learn", desc: "Machine learning", url: "https://scikit-learn.org/stable/documentation.html", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
            { name: "OpenCV", desc: "Computer vision", url: "https://docs.opencv.org/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
            { name: "Pandas", desc: "Data manipulation", url: "https://pandas.pydata.org/docs/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
            { name: "OpenAI", desc: "AI Models & APIs", url: "https://platform.openai.com/docs", icon: <SiOpenai className="text-white" /> },
        ]
    },
    {
        id: "tools",
        category: "Tools & Services",
        items: [
            { name: "Figma", desc: "Design & prototyping", url: "https://help.figma.com/hc/en-us", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
            {
                name: "GitHub",
                desc: "Code collaboration",
                url: "https://docs.github.com/",
                icon: "https://skillicons.dev/icons?i=github"
            },
            {
                name: "Supabase",
                desc: "Backend as a Service",
                url: "https://supabase.com/docs",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg"
            },
            { name: "Vercel", desc: "Deployment platform", url: "https://vercel.com/docs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
            { name: "Postman", desc: "API testing", url: "https://learning.postman.com/docs/getting-started/introduction/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
            { name: "Linux", desc: "OS & Shell", url: "https://www.linux.org/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
            {
                name: "Docker",
                desc: "Containerization Platform",
                url: "https://docs.docker.com/",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
            },
            {
                name: "GitHub Actions",
                desc: "CI/CD Automation",
                url: "https://docs.github.com/en/actions",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg"
            },
            {
                name: "VS Code",
                desc: "Code Editor",
                url: "https://code.visualstudio.com/docs",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"
            },

        ]

    },
    {
        id: "ai-tools",
        category: "AI Tools",
        items: [


            { name: "OpenAI", desc: "AI Models & APIs", url: "https://platform.openai.com/docs", icon: <SiOpenai className="text-white" /> },

            {
                name: "Claude",
                desc: "AI Assistant",
                url: "https://claude.ai",
                icon: "/icons/claude-icon.svg"
            },
            {
                name: "Cursor",
                desc: "AI-Powered IDE",
                url: "https://cursor.com",
                icon: "/icons/cursor-icon.svg"
            },
            {
                name: "Antigravity",
                desc: "AI Development Tool",
                url: "https://antigravity.dev",
                icon: "/icons/antigravity.webp"
            },
            {
                name: "Google Gemini",
                desc: "AI Assistant",
                url: "https://gemini.google.com",
                icon: "https://cdn.simpleicons.org/googlegemini"
            },


        ]
    },
];

const SkillCard = ({ name, desc, url, icon }) => {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
        >
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                whileHover={{ scale: 1.01, translateY: -2 }}
                className="relative bg-[#0A0A0A] border border-white/5 rounded-xl p-4 hover:border-white/20 transition-all duration-300 overflow-hidden"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                        {typeof icon === 'string' ? (
                            <img src={icon} alt={name} className="w-10 h-10 object-contain" />
                        ) : (
                            React.cloneElement(icon, { size: 36 })
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                            <h4 className="text-[14px] font-semibold text-white truncate">
                                {name}
                            </h4>
                        </div>
                        <p className="text-[13px] text-zinc-500 leading-snug truncate group-hover:text-zinc-400 transition-colors mt-0.5">{desc}</p>
                    </div>
                </div>
            </motion.div>
        </a>
    );
};

export default function MyStack() {
    const [activeId, setActiveId] = useState(skills[0].id);
    const activeCategory = skills.find(s => s.id === activeId);

    return (
        <section id="stack" className="w-full pt-10 pb-0 px-6 md:px-12 bg-black font-sans relative">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-[45px] font-black font-semibold text-white">
                        My Stacks<span className="text-[#F2542D]">.</span>
                    </h2>

                </div>


                <div className="md:hidden flex overflow-x-auto gap-3 pb-6 no-scrollbar -mx-6 px-6">
                    {skills.map((skill) => (
                        <button
                            key={skill.id}
                            onClick={() => setActiveId(skill.id)}
                            className={`whitespace-nowrap px-4 py-2 rounded-full text-[15px] font-medium transition-all duration-300 ${activeId === skill.id
                                ? 'bg-white text-black'
                                : 'bg-zinc-900 text-zinc-500  border border-white/5'
                                }`}
                        >
                            {skill.category}
                        </button>
                    ))}
                </div>


                <div className="hidden md:flex md:flex-row gap-12 lg:gap-20 items-start">

                    <div className="w-[240px] shrink-0">

                        <nav className="sticky top-32 space-y-1 border-l border-white/5">
                            {skills.map((skill) => (
                                <button
                                    key={skill.id}
                                    onClick={() => setActiveId(skill.id)}
                                    className={`w-full text-left pl-5 pr-4 py-3 text-[19px] font-medium transition-all duration-300 relative ${activeId === skill.id
                                        ? 'text-white'
                                        : 'text-zinc-500 hover:text-zinc-300'
                                        }`}
                                >
                                    {activeId === skill.id && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="absolute left-0 top-0 bottom-0 w-[2px] bg-white rounded-full"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    {skill.category}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Content Area (flex-1) */}
                    <div className="flex-1 min-w-0 min-h-[400px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeId}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {activeCategory?.items.map((skill, sIdx) => (
                                        <SkillCard
                                            key={`${activeId}-${sIdx}`}
                                            name={skill.name}
                                            desc={skill.desc}
                                            url={skill.url}
                                            icon={skill.icon}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Mobile: content area */}
                <div className="md:hidden mt-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeId}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <h3 className="text-xl font-bold text-white mb-6">
                                {activeCategory?.category}
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {activeCategory?.items.map((skill, sIdx) => (
                                    <SkillCard
                                        key={`${activeId}-${sIdx}`}
                                        name={skill.name}
                                        desc={skill.desc}
                                        url={skill.url}
                                        icon={skill.icon}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
