"use client";

import Link from "next/link";

export default function PortfolioHeader() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-transparent border-b border-gray-200 dark:border-[#1c1c1c]">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-[77px] flex items-center justify-between">

                {/* Left Name */}
                <Link
                    href="/"
                    className="text-black dark:text-[#EAEAEA] text-[18px] font-normal tracking-[-0.03em] hover:opacity-80 transition"
                    style={{
                        fontFamily:
                            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    }}
                >
                    Pratham Chavhan
                </Link>

                {/* Right Nav */}
                <nav className="flex items-center gap-14">
                    {["About", "Work", "Contact", "Resume"].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-[#6F6F6F] hover:text-black dark:hover:text-[#EAEAEA] transition duration-300 font-normal tracking-[-0.02em]"
                            style={{
                                fontFamily:
                                    'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                            }}
                        >
                            {item}
                        </a>
                    ))}


                </nav>
            </div>
        </header>
    );
}