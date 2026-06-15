"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PremiumResume from "../../components/PremiumResume";

const experienceData = [
    {
        role: "Senior Full Stack Developer",
        company: "HUB",
        period: "Dec 2024 – Current"
    },
    {
        role: "Product Developer",
        company: "HUB",
        period: "Sep 2023 – Nov 2024"
    },
    {
        role: "Frontend Engineer",
        company: "Dehaat",
        period: "Apr 2023 – Aug 2023"
    },
    {
        role: "Web Developer",
        company: "Dehaat",
        period: "Feb 2022 – Mar 2023"
    },
    {
        role: "UI/UX Intern",
        company: "Vuoto",
        period: "Oct 2020 – Jan 2022"
    }
];

export default function Experience() {
    const [resumeOpen, setResumeOpen] = useState(false);

    return (
        <div className="w-full h-full p-8 md:p-10 bg-[#0A0A0A] rounded-[28px] border border-white/5 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
            {/* Inner highlight/rim light */}
            <div className="absolute inset-0 rounded-[28px] border border-white/[0.03] pointer-events-none" />

            <div className="flex items-center justify-between mb-12">
                <h2 className="text-xl md:text-2xl font-medium text-white tracking-tight">
                    Professional Journey
                </h2>

                <button
                    onClick={() => setResumeOpen(true)}
                    className="flex items-center gap-2 text-xs md:text-sm text-white  transition-colors group/link p-1"
                >
                    <span className="w-1.5 h-1.5 rounded-full border border-white/40 group-hover/link:border-white transition-colors" />
                    <span className="underline underline-offset-4 decoration-white/10 group-hover/link:decoration-white">View Resume</span>
                </button>
            </div>

            {/* Premium Resume Widget */}
            <PremiumResume isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />

            <div className="relative space-y-10">
                {/* Vertical Timeline Line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-white/10" />

                {experienceData.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative flex items-center justify-between gap-6 pl-8"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white/70 border-black z-10 shadow-[0_0_10px_rgba(64,224,208,0.3)]" />

                        <div className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] transition-all duration-300">
                            <h3 className="text-sm md:text-base font-medium text-white/90">
                                {item.role} <span className="text-white/30 px-2">|</span> {item.company}
                            </h3>
                        </div>

                        <p className="text-[11px] md:text-xs text-white/40 font-medium whitespace-nowrap">
                            {item.period}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
