'use client';

import { useState } from 'react';
import { Github, Linkedin, ArrowUp, Send, Loader2, Copy, Check } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';

export default function Footer() {
    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText('chavhanpratham06@gmail.com');
            setCopied(true);
            toast.success("Email copied!");

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (err) {
            toast.error("Failed to copy email");
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsSubmitting(true);

        try {
            // NOTE TO USER: Replace these 3 string placeholders with your actual EmailJS credentials
            const serviceId = "YOUR_SERVICE_ID";
            const templateId = "YOUR_TEMPLATE_ID";
            const publicKey = "YOUR_PUBLIC_KEY";

            // Prevent sending dummy emails if not configured
            if (serviceId === "YOUR_SERVICE_ID") {
                await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
                toast.success("Message sent successfully! (Simulated - Configure EmailJS to send real emails)");
            } else {
                await emailjs.send(
                    serviceId,
                    templateId,
                    {
                        from_name: formData.name,
                        reply_to: formData.email,
                        message: formData.message,
                        to_name: "Devashish"
                    },
                    publicKey
                );
                toast.success("Message sent successfully!");
            }

            // Reset form
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error("FAILED TO SEND EMAIL", error);
            toast.error("Failed to send message. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <footer id="Footer" className="w-full px-4 md:px-8 pt-0 pb-24 dark:bg-black">
            <div className="max-w-7xl mx-auto w-full relative min-h-[500px] lg:h-[600px] rounded-[2rem] md:rounded-[3rem] overflow-hidden group shadow-2xl flex flex-col lg:flex-row">

                {/* Background Video (Neon Retro City / Synthwave) */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-80 mix-blend-screen transition-transform duration-700 group-hover:scale-105"
                    >
                        {/* Note: This is an open source cyberpunk-style video. Feel free to replace the src with your own local MP4! */}
                        <source src="/video.mp4" type="video/mp4" />
                    </video>
                    {/* Dark gradient overlays */}
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    <div className="absolute lg:inset-y-0 lg:left-0 lg:w-1/2 bg-gradient-to-r from-black/60 lg:from-black/80 to-transparent hidden lg:block"></div>
                </div>

                {/* LEFT COLUMN: Massive Typography & Social Links */}
                <div className="relative z-10 w-full lg:w-1/2 h-full flex flex-col items-center lg:items-start justify-end lg:justify-center pt-24 pb-8 lg:py-12 px-8 lg:pl-16">
                    <h2 className="text-[12vw] md:text-[8vw] lg:text-[6vw] font-black text-white/70 leading-[0.9] tracking-tighter mb-8 select-none text-center lg:text-left drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]">
                        GET IN <br className="hidden lg:block" /> TOUCH
                    </h2>

                    <div className="flex flex-col items-center lg:items-start gap-4 text-zinc-300 font-medium w-full mt-4 lg:mt-8">
                        <div className="flex items-center gap-2">
                            <a
                                href="mailto:chavhanpratham06@gmail.com"
                                className="hover:text-white transition-colors text-lg md:text-xl font-mono"
                            >
                                chavhanpratham06@gmail.com
                            </a>

                            <button
                                onClick={copyEmail}
                                className="text-zinc-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
                                aria-label="Copy email"
                            >
                                {copied ? (
                                    <Check className="w-4 h-4 text-green-500" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        <a href="tel:+917499180533" className="hover:text-white transition-colors text-lg text-zinc-400">
                            +91 7499180533
                        </a>

                        <div className="flex items-center gap-6 mt-8">
                            <button onClick={scrollToTop} className="flex items-center gap-2 hover:text-white transition-colors group/btn text-sm px-4 py-2 rounded-full border border-zinc-700 hover:border-zinc-500 bg-black/20 backdrop-blur-sm">
                                <ArrowUp className="w-4 h-4 group-hover/btn:-translate-y-1 transition-transform" />
                                Back to top
                            </button>
                            <a href="https://www.linkedin.com/in/devashish-dhumal-b675a7257/" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors p-2 bg-black/20 rounded-full border border-zinc-800 backdrop-blur-sm" aria-label="LinkedIn">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="https://github.com/deva41103" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors p-2 bg-black/20 rounded-full border border-zinc-800 backdrop-blur-sm" aria-label="GitHub">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Shadcn Contact Form */}
                <div className="relative z-10 w-full lg:w-1/2 h-full flex items-center justify-center p-6 lg:p-12 mt-8 lg:mt-0 pb-16">
                    <div className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">

                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
                            <p className="text-zinc-400 text-sm">I'm currently available for freelance work and full-time roles.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-zinc-300">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-emerald-500 rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-zinc-300">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-emerald-500 rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-zinc-300">Message</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Tell me about your project..."
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-emerald-500 resize-none rounded-xl"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-6 mt-4 transition-all duration-300 flex items-center gap-2 group/send"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <Send className="w-4 h-4 group-hover/send:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>

            </div>
        </footer>
    );
}