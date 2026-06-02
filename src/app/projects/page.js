import PortfolioHeader from "@/components/header";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-[#151515] text-[#EAEAEA] font-mono">
            <PortfolioHeader />
            <div className="max-w-6xl mx-auto pt-32 px-6 sm:px-10">
                <Link href="https://github.com/prathamchavhan" className="inline-flex items-center gap-2 text-[#888] hover:text-white transition mb-12">
                    <ArrowLeft size={16} /> Back to Home
                </Link>

                <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
                    All Projects<span className="text-[#F2542D]">.</span>
                </h1>
                <p className="text-[#A3A3A3] text-lg max-w-2xl mb-20 leading-relaxed">
                    A comprehensive archive of things I've built, experimented with, and launched over the years.
                </p>

                <div className="w-full border-t border-[#333] py-20 flex flex-col items-center justify-center">
                    <p className="text-[#666]">Detailed project archive coming soon.</p>
                </div>
            </div>
        </main>
    );
}
