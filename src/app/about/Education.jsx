"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EducationContent from "./EducationContent";
import AchievementsContent from "./AchievementsContent";

export default function Education({ isWrapped = false }) {
    const [activeTab, setActiveTab] = useState("education");

    const tabs = [
        { id: "education", label: "Education" },
        { id: "achievements", label: "Achievements" }
    ];

    const cardContent = (
        <div className="relative w-full">
            {/* Main Card Container */}
            <div className="rounded-[24px] border border-white/5 bg-[#0A0A0A] shadow-2xl backdrop-blur-xl overflow-hidden group transition-all duration-500">
                {/* Inner highlight/rim light */}
                <div className="absolute inset-0 rounded-[24px] border border-white/[0.03] pointer-events-none" />

                <div className="p-5 md:p-7">
                    {/* Compact Toggle (Segmented Control) */}
                    <div className="flex justify-center mb-6 text-black">
                        <div className="relative flex p-1 bg-[#0A0A0A] rounded-lg shadow-inner border border-white/40">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className="relative px-5 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 outline-none"
                                >
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="active-pill-bg-v2"
                                            className="absolute inset-0 bg-white rounded-lg shadow-lg"
                                            transition={{
                                                type: "spring",
                                                stiffness: 500,
                                                damping: 40,
                                                mass: 1
                                            }}
                                        />
                                    )}

                                    <span
                                        className={`relative z-10 transition-colors duration-300 ${activeTab === tab.id
                                            ? "text-black"
                                            : "text-white/50 hover:text-white"
                                            }`}
                                    >
                                        {tab.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Animated Content Area - FIXED HEIGHT */}
                    <div className="relative h-[310px] overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                                transition={{
                                    duration: 0.3,
                                    ease: [0.23, 1, 0.32, 1]
                                }}
                            >
                                {activeTab === "education" ? (
                                    <EducationContent />
                                ) : (
                                    <AchievementsContent />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );

    if (isWrapped) {
        return cardContent;
    }

    return (
        <section className="relative py-8 bg-black flex items-center justify-center px-6 overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#F2542D]/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative w-full max-w-lg">
                {cardContent}
            </div>
        </section>
    );
}