"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, X } from "lucide-react";

export default function PremiumResume({ isOpen, onClose }) {
    const resumePath = "/assets/resume.pdf";

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 md:p-8 pt-12 md:pt-16 overflow-y-auto bg-black/60 backdrop-blur-md">
                    {/* Backdrop (Clickable Area) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 cursor-pointer"
                    />

                    {/* Modal Content - macOS Style Window */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 40 }}
                        className="relative w-full max-w-5xl h-[85vh] bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col z-10"
                    >
                        {/* macOS Header / Title Bar */}
                        <div className="flex items-center justify-between px-4 py-3 bg-[#1A1A1A] border-b border-white/5 select-none shrink-0">
                            {/* Traffic Light Dots */}
                            <div className="flex items-center gap-2 w-[100px]">
                                <button
                                    onClick={onClose}
                                    className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] hover:bg-[#FF5F56]/80 transition-colors flex items-center justify-center group"
                                    title="Close & Go Back"
                                >
                                    <X size={8} className="text-black/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                                <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E]" />
                                <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F]" />
                            </div>

                            {/* Centered Filename */}
                            <div className="flex items-center gap-2 text-white/70">
                                <FileText size={14} className="text-[#40E0D0]" />
                                <span className="text-[10px] md:text-xs font-semibold tracking-tight">pratham_resume.pdf</span>
                            </div>

                            {/* Right Side Actions */}
                            <div className="flex items-center justify-end w-[100px]">
                                <a
                                    href={resumePath}
                                    download="Pratham_Chavhan_Resume.pdf"
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all border border-white/10 text-[10px] font-bold uppercase tracking-wider"
                                >
                                    <Download size={14} />
                                    <span className="hidden sm:inline">Save</span>
                                </a>
                            </div>
                        </div>

                        {/* PDF Viewer Body */}
                        <div className="flex-1 w-full bg-black relative overflow-hidden">
                            <iframe
                                src={`${resumePath}#view=FitH`}
                                className="w-full h-full border-none absolute inset-0"
                                title="Resume PDF Viewer"
                            />

                            {/* Loading State Placeholder */}
                            <div className="absolute inset-0 -z-10 flex items-center justify-center">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-10 h-10 border-2 border-[#40E0D0]/10 border-t-[#40E0D0] rounded-full animate-spin" />
                                    <p className="text-white/20 text-[10px] tracking-widest uppercase font-medium">Rendering PDF</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
