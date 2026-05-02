'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { generateRandomBoxes } from './gridUtils';

export default function GridBackground({ seed = 101 }) {
    const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
    const [workRect, setWorkRect] = useState({ top: 0, height: 0 });
    const [aboutRect, setAboutRect] = useState({ top: 0, height: 0 });

    const measure = useCallback(() => {
        const w = window.innerWidth;
        const h = Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight,
            window.innerHeight
        );

        // Detect work section bounds to skip it
        const workEl = document.getElementById('work');
        if (workEl) {
            setWorkRect({ top: workEl.offsetTop, height: workEl.offsetHeight });
        }

        // Detect about section bounds for precise image placement
        const aboutEl = document.getElementById('about');
        if (aboutEl) {
            setAboutRect({ top: aboutEl.offsetTop, height: aboutEl.offsetHeight });
        }

        setDimensions(prev => {
            if (prev.w === w && prev.h === h) return prev;
            return { w, h };
        });
    }, []);

    useEffect(() => {
        const timer = setTimeout(measure, 150);
        window.addEventListener('resize', measure);
        const t2 = setTimeout(measure, 500);
        const t3 = setTimeout(measure, 1500);

        return () => {
            clearTimeout(timer);
            clearTimeout(t2);
            clearTimeout(t3);
            window.removeEventListener('resize', measure);
        };
    }, [measure]);

    const { boxes, corners } = useMemo(() => {
        if (dimensions.w === 0) return { boxes: [], corners: [] };

        // Pass the viewport height as chunkH to preserve the original top-down random seed shape
        const viewH = typeof window !== 'undefined' ? window.innerHeight : 900;
        return generateRandomBoxes(dimensions.w, dimensions.h, seed, viewH);
    }, [dimensions.w, dimensions.h, seed]);

    // Filter out boxes/corners that overlap with the Work OR About sections
    const filteredBoxes = useMemo(() => {
        const wTop = workRect.height ? workRect.top : Infinity;
        const wBottom = workRect.height ? workRect.top + workRect.height : Infinity;
        const aTop = aboutRect.height ? aboutRect.top : Infinity;
        const aBottom = aboutRect.height ? aboutRect.top + aboutRect.height : Infinity;
        return boxes.filter(b => {
            const inWork = !(b.y + b.h <= wTop || b.y >= wBottom);
            const inAbout = !(b.y + b.h <= aTop || b.y >= aBottom);
            return !inWork && !inAbout;
        });
    }, [boxes, workRect, aboutRect]);

    const filteredCorners = useMemo(() => {
        const wTop = workRect.height ? workRect.top : Infinity;
        const wBottom = workRect.height ? workRect.top + workRect.height : Infinity;
        const aTop = aboutRect.height ? aboutRect.top : Infinity;
        const aBottom = aboutRect.height ? aboutRect.top + aboutRect.height : Infinity;
        return corners.filter(pt =>
            (pt.y <= wTop || pt.y >= wBottom) &&
            (pt.y <= aTop || pt.y >= aBottom)
        );
    }, [corners, workRect, aboutRect]);

    const lineColor = '#FFFFFF';
    const lineOpacity = 0.04;
    const plusOpacity = 0.25;
    const plusSize = 6;

    // Video box: only from the hero area (first viewport)
    const targetBox = useMemo(() => {
        if (!boxes.length) return null;
        const viewH = typeof window !== 'undefined' ? window.innerHeight : 900;
        const heroBoxes = boxes.filter(b => b.y + b.h <= viewH + 50);
        if (!heroBoxes.length) return null;

        const rightBoxes = heroBoxes.filter(box => dimensions.w - (box.x + box.w) < 50);
        if (rightBoxes.length > 1) {
            rightBoxes.sort((a, b) => a.y - b.y);
            return rightBoxes[rightBoxes.length - 2];
        }

        let bestBox = null;
        let minDist = Infinity;
        for (const box of heroBoxes) {
            const dist = Math.pow(dimensions.w - (box.x + box.w / 2), 2) + Math.pow(viewH - (box.y + box.h / 2), 2);
            if (dist < minDist) {
                minDist = dist;
                bestBox = box;
            }
        }
        return bestBox || heroBoxes[heroBoxes.length - 1];
    }, [boxes, dimensions.w]);


    const aboutGrid = useMemo(() => {
        if (!aboutRect.height || dimensions.w === 0) return { lines: [], imageCell: null };

        const x0 = 0;
        const y0 = aboutRect.top;
        const W = dimensions.w;
        const H = aboutRect.height;
        const cellW = Math.round(W / 3);
        const cellH = Math.round(H / 2);

        // Vertical lines
        const vLines = [];
        for (let cx = cellW; cx < W; cx += cellW) {
            vLines.push({ x1: cx, y1: y0, x2: cx, y2: y0 + H });
        }
        // Horizontal lines
        const hLines = [];
        for (let ry = cellH; ry < H; ry += cellH) {
            hLines.push({ x1: x0, y1: y0 + ry, x2: x0 + W, y2: y0 + ry });
        }

        // Place the image in the top-right cell (col 2, row 0)
        const imgPad = 6;
        const imageCell = {
            x: cellW * 2 + imgPad,
            y: y0 + imgPad,
            w: cellW - imgPad * 2,
            h: cellH - imgPad * 2,
        };

        return { lines: [...vLines, ...hLines], imageCell };
    }, [aboutRect, dimensions.w]);

    if (dimensions.w === 0) return null;

    return (
        <div
            aria-hidden="true"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: dimensions.h,
                zIndex: 0,
                pointerEvents: 'none',
                overflow: 'hidden'
            }}
        >
            {/* Video in a hero-area box */}
            {targetBox && (
                <div
                    style={{
                        position: 'absolute',
                        left: targetBox.x,
                        top: targetBox.y,
                        width: targetBox.w,
                        height: targetBox.h,
                        overflow: 'hidden',
                        opacity: 0.45,
                    }}
                >
                    <video
                        src="/video.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            filter: 'grayscale(100%)'
                        }}
                    />
                </div>
            )}


            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox={`0 0 ${dimensions.w} ${dimensions.h}`}
                preserveAspectRatio="none"
                style={{ display: 'block', position: 'relative', zIndex: 1 }}
            >
                <defs>
                    <clipPath id="cutWork">
                        {/* Upper rect covering from 0 to top of work section */}
                        <rect x="0" y="0" width={dimensions.w} height={workRect.top > 0 ? workRect.top : 0} />
                        {/* Lower rect covering from bottom of work section downwards */}
                        <rect x="0" y={workRect.top + workRect.height} width={dimensions.w} height={dimensions.h} />
                    </clipPath>

                    <clipPath id="aboutClip">
                        <rect
                            x={aboutGrid.imageCell?.x || 0}
                            y={aboutGrid.imageCell?.y || 0}
                            width={aboutGrid.imageCell?.w || 0}
                            height={aboutGrid.imageCell?.h || 0}
                        />
                    </clipPath>
                </defs>

                <g clipPath="url(#cutWork)">
                    {filteredBoxes.map((box, i) => (
                        <rect
                            key={`box-${i}`}
                            x={box.x}
                            y={box.y}
                            width={box.w}
                            height={box.h}
                            fill="none"
                            className="stroke-black/[0.05] dark:stroke-white/[0.04]"
                            strokeWidth={1}
                        />
                    ))}
                    {filteredCorners.map((pt, i) => (
                        <g key={`p-${i}`} className="stroke-black/[0.15] dark:stroke-white/25" strokeWidth={1}>
                            <line x1={pt.x - plusSize} y1={pt.y} x2={pt.x + plusSize} y2={pt.y} />
                            <line x1={pt.x} y1={pt.y - plusSize} x2={pt.x} y2={pt.y + plusSize} />
                        </g>
                    ))}
                </g>
            </svg>
        </div>
    );
}
