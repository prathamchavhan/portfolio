"use client";

import { motion } from "framer-motion";

const educationData = [
    {
        degree: "Bachelor's of Technology (Computer Science and Engineering)",
        institution: "G.H. Raisoni College of Engineering and Management, Nagpur",
        period: "2023 – 2026"
    },
    {
        degree: "Higher Secondary Education in Science",
        institution: "Prerna College, Nagpur",
        period: "2021-2022"
    }
];

export default function EducationContent() {
    return (
        <div className="space-y-8 py-2">
            <h2 className="text-xl font-medium text-white mb-8">
                Education
            </h2>

            <div className="space-y-10">
                {educationData.map((item, index) => (
                    <div
                        key={index}
                        className="relative pl-6 border-l border-white/20"
                    >
                        <div className="space-y-2">
                            <h3 className="text-lg text-white font-medium">
                                {item.degree}
                            </h3>
                            {item.period && (
                                <p className="text-gray-500 text-sm">
                                    {item.period}
                                </p>
                            )}
                            <p className="text-gray-400 text-sm">
                                {item.institution}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
