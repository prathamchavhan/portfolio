'use client';

import Link from "next/link";

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

export default function PortfolioHeader() {
    return (
        <header className="absolute top-0 left-0 w-full z-50 bg-transparent text-white pt-8 px-6 md:px-12 pointer-events-none">
            <div className="max-w-[1800px] mx-auto flex justify-between items-start">

                {/* Left: Logo & Theme Status */}
                <div className="flex items-center gap-4 pointer-events-auto group cursor-default">
                    <Link href="/" className="shrink-0">
                        <LogoIcon />
                    </Link>
                    <div className="flex flex-col leading-tight">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-[#666666] group-hover:text-white transition-colors duration-300">DARK MODE</span>
                        <span className="text-[12px] font-bold tracking-[0.1em]">ON</span>
                    </div>
                </div>

                {/* Center: Greeting */}
                <div className="hidden lg:block pointer-events-auto">
                    <h2 className="text-[16px] md:text-[27px] font-bold  uppercase text-white mt-1.5">
                        HI THERE, I'M PRATHAM CHAVHAN
                    </h2>
                </div>

                {/* Right: Social Links */}
                <div className="flex flex-col items-end gap-1 pointer-events-auto">
                    <a
                        href="https://github.com/prathamchavhan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold tracking-[0.2em] text-white hover:text-[#F2542D] transition-colors duration-300 py-0.5"
                    >
                        GITHUB
                    </a>
                    <a
                        href="https://www.linkedin.com/in/pratham-chavhan-a1148a2a3/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold tracking-[0.2em] text-white hover:text-[#F2542D] transition-colors duration-300 py-0.5"
                    >
                        LINKEDIN
                    </a>
                    <a
                        href="https://instagram.com/prathamchavhan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold tracking-[0.2em] text-white hover:text-[#F2542D] transition-colors duration-300 py-0.5"
                    >
                        INSTAGRAM
                    </a>
                </div>
            </div>

            {/* Mobile Greeting (visible only on small screens) */}
            <div className="lg:hidden mt-8 flex justify-center pointer-events-auto">
                <h2 className="text-[13px] font-bold tracking-[0.12em] uppercase text-white opacity-90 text-center px-4">
                    HI THERE, I'M PRATHAM CHAVHAN
                </h2>
            </div>
        </header>
    );
}