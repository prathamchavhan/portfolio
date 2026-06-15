"use client";

import { motion } from "framer-motion";

const achievementsData = [
    {
        title: "HackSphere 2.0",
        details: "National Hackathon at Ramdeo Baba College."
    },
    {
        title: "AI Summit (IEEE)",
        details: "Contribution as event support team member."
    },
    {
        title: "Smart India Hackathon",
        details: "Participant in the national innovation competition."
    },

    {
        title: "Coding Test Winner ",
        details: "1st Rank in campus code bugging competition."
    },
    {
        title: "Creative Arts Winner",
        details: "1st Rank in Photography & Videography."
    }
];

export default function AchievementsContent() {
    return (
        <div className="space-y-6 py-1">
            <h2 className="text-lg font-medium text-white mb-6">
                Achievements
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                {achievementsData.map((item, index) => (
                    <div
                        key={index}
                        className="relative pl-5 border-l border-white/20"
                    >
                        <div className="space-y-1">
                            <h3 className="text-[15px] text-white font-medium leading-snug">
                                {item.title}
                            </h3>
                            <p className="text-gray-400 text-[12px] leading-relaxed">
                                {item.details}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
