'use client';

import { useState } from 'react';
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

const LogoIcon = () => (
    <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hover:rotate-180 transition-transform duration-700"
    >
        <circle cx="16" cy="16" r="14" stroke="white" strokeWidth="2.5" />
        <path
            d="M16 2L16 14M16 18L16 30"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
        />
        <circle cx="16" cy="16" r="3" fill="white" />
    </svg>
);

const socialLinks = [
    { label: "GITHUB", href: "https://github.com/prathamchavhan" },
    { label: "LINKEDIN", href: "https://www.linkedin.com/in/pratham-chavhan-a1148a2a3/" },
    { label: "INSTAGRAM", href: "https://instagram.com/prathamchavhan" },
];

export default function PortfolioHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="absolute top-0 left-0 w-full z-50 bg-transparent text-white pt-6 md:pt-8 px-5 md:px-12 pointer-events-none">
            <div className="max-w-[1800px] mx-auto flex justify-between items-center md:items-start">

                {/* Left: Logo & Name */}
                <div className="flex items-center gap-3 pointer-events-auto group cursor-default">
                    <Link href="/" className="shrink-0">
                        <LogoIcon />
                    </Link>
                    <span className="text-[14px] md:text-[15px] font-bold">PRATHAM&copy;</span>
                </div>

                {/* Center: Greeting (desktop only) */}
                <div className="hidden lg:block pointer-events-auto">
                    <h2 className="text-[27px] font-bold uppercase text-white mt-1.5">
                        HI THERE, I'M PRATHAM CHAVHAN
                    </h2>
                </div>

                {/* Right: Social Links (desktop) */}
                <div className="hidden md:flex flex-col items-end gap-1 pointer-events-auto">
                    {socialLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-bold tracking-[0.2em] text-white hover:text-[#F2542D] transition-colors duration-300 py-0.5"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-white hover:text-[#F2542D] transition-colors duration-300 py-0.5"
                    >
                        <Download size={14} />
                        <span>RESUME</span>
                    </a>
                </div>

                {/* Right: Mobile Hamburger */}
                <button
                    className="md:hidden pointer-events-auto p-2 -mr-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden pointer-events-auto mt-4 mx-auto bg-[#111] border border-white/10 rounded-2xl p-5 flex flex-col gap-4"
                    >

                        <div className="flex flex-wrap justify-center gap-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[12px] font-bold tracking-[0.15em] text-white hover:text-[#F2542D] transition-colors duration-300"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 text-[12px] font-bold tracking-[0.15em] text-[#F2542D] transition-colors duration-300"
                        >
                            <Download size={14} />
                            <span>RESUME</span>
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}