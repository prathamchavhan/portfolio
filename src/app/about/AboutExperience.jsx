"use client";

import AboutMe from "./AboutMe";
import Education from "./Education";
import Experience from "./Experience";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import Mascot from "@/components/Mascot";

const PointerTitle = ({ title, avatar }) => (
    <div className="flex items-center space-x-2">
        <img
            src={avatar}
            height="24"
            width="24"
            alt="avatar"
            className="rounded-full border-2 border-white/30"
        />
        <p className="text-[11px] font-bold text-white tracking-tight">{title}</p>
    </div>
);

export default function AboutExperience() {
    return (
        <section className="relative py-12 lg:py-24 bg-black overflow-hidden" id="about-section">
            {/* background glows */}
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#F2542D]/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 items-stretch">
                {/* Left Column: Stacked AboutMe and Education */}
                <div className="flex flex-col gap-6 w-full">
                    <div className="w-full">
                        <FollowerPointerCard
                            title={<PointerTitle title="About Me" avatar="/assets/newside.jpeg" />}
                            className="w-full"
                        >
                            <div data-hide-cursor="true">
                                <AboutMe />
                            </div>
                        </FollowerPointerCard>
                    </div>
                    <div className="w-full flex-1">
                        <FollowerPointerCard
                            title={<PointerTitle title="Academic" avatar="/assets/newside.jpeg" />}
                            className="w-full"
                        >
                            <div data-hide-cursor="true">
                                <Education isWrapped={true} />
                            </div>
                        </FollowerPointerCard>
                    </div>
                </div>

                {/* Right Column: Full-Height Experience */}
                <div className="h-full">
                    <FollowerPointerCard
                        title={<PointerTitle title="Journey" avatar="/assets/newside.jpeg" />}
                        className="w-full h-full"
                    >
                        <div data-hide-cursor="true" className="h-full">
                            <Experience />
                        </div>
                    </FollowerPointerCard>
                </div>
            </div>
        </section>
    );
}
