
import Link from "next/link";
import { FiDownload } from "react-icons/fi";

export default function PortfolioHeader() {
    return (
        <header className="absolute top-0 left-0 w-full z-50 bg-transparent border-b border-gray-200 dark:border-[#1c1c1c]">
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

                    <a
                        href="#about"
                        className="text-[#6F6F6F] hover:text-black dark:hover:text-[#EAEAEA] transition duration-300"
                    >
                        About
                    </a>

                    <a
                        href="#work"
                        className="text-[#6F6F6F] hover:text-black dark:hover:text-[#EAEAEA] transition duration-300"
                    >
                        Work
                    </a>

                    <a
                        href="#contact"
                        className="text-[#6F6F6F] hover:text-black dark:hover:text-[#EAEAEA] transition duration-300"
                    >
                        Contact
                    </a>

                    {/* Resume Download Button */}
                    <a
                        href="/resume.pdf"
                        download
                        className=" flex items-center gap-2 px-5 py-2 rounded-lg border border-[#6F6F6F] text-[#6F6F6F] hover:text-black dark:hover:text-[#EAEAEA] transition duration-300"
                    >
                        <FiDownload size={16} />
                        Resume
                    </a>

                </nav>
            </div>
        </header>
    );
}