// Simple seeded pseudo-random number generator
export function createRng(seed) {
    let s = seed;
    return function () {
        s |= 0;
        s = (s + 0x6d2b79f5) | 0;
        let t = Math.imul(s ^ (s >>> 15), 1 | s);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export function generateRandomBoxes(w, h, seed = 42, chunkH = 0, options = {}) {
    const rng = createRng(seed);
    const boxes = [];

    // Base minimums
    const baseMinW = options.minW || 160;
    const baseMinH = options.minH || 160;

    function splitBox(box, isDenseChunk = false) {
        // If this is the dense chunk (e.g. About section), allow much smaller boxes
        const minW = isDenseChunk ? Math.max(80, baseMinW / 2) : baseMinW;
        const minH = isDenseChunk ? Math.max(80, baseMinH / 2) : baseMinH;

        // We can split if it's large enough for two minimum sized parts
        const canSplitV = box.w > minW * 2;
        const canSplitH = box.h > minH * 2;

        if (!canSplitV && !canSplitH) {
            boxes.push(box);
            return;
        }

        // Stop splitting randomly if the box is relatively small to keep some bigger boxes
        if (box.w < minW * 3.5 && box.h < minH * 3.5 && rng() > 0.4) {
            boxes.push(box);
            return;
        }

        let splitDir = '';
        if (canSplitV && canSplitH) {
            // Split the longer side to encourage square-like shapes
            if (box.w > box.h * 1.5) splitDir = 'V';
            else if (box.h > box.w * 1.5) splitDir = 'H';
            else splitDir = rng() > 0.5 ? 'V' : 'H';
        } else if (canSplitV) {
            splitDir = 'V';
        } else {
            splitDir = 'H';
        }

        if (splitDir === 'V') {
            const range = box.w - minW * 2;
            const splitPoint = minW + Math.floor(rng() * range);
            splitBox({ x: box.x, y: box.y, w: splitPoint, h: box.h }, isDenseChunk);
            splitBox({ x: box.x + splitPoint, y: box.y, w: box.w - splitPoint, h: box.h }, isDenseChunk);
        } else {
            const range = box.h - minH * 2;
            const splitPoint = minH + Math.floor(rng() * range);
            splitBox({ x: box.x, y: box.y, w: box.w, h: splitPoint }, isDenseChunk);
            splitBox({ x: box.x, y: box.y + splitPoint, w: box.w, h: box.h - splitPoint }, isDenseChunk);
        }
    }

    // Pre-split the canvas into chunks to preserve identical RNG sequences for the top screen
    if (chunkH > 0 && h > chunkH) {
        let currentY = 0;
        while (currentY < h) {
            const th = Math.min(chunkH, h - currentY);
            // If we are in the bottom 1500px, generate denser/smaller boxes for the About section
            const isDense = currentY >= h - 1500;
            splitBox({ x: 0, y: currentY, w, h: th }, isDense);
            currentY += chunkH;
        }
    } else {
        splitBox({ x: 0, y: 0, w, h }, false);
    }

    // Deduplicate corners so + are drawn perfectly once
    const cornerMap = new Set();
    const corners = [];
    boxes.forEach(b => {
        [
            { x: b.x, y: b.y },
            { x: b.x + b.w, y: b.y },
            { x: b.x, y: b.y + b.h },
            { x: b.x + b.w, y: b.y + b.h }
        ].forEach(pt => {
            const key = `${pt.x}-${pt.y}`;
            if (!cornerMap.has(key)) {
                cornerMap.add(key);
                corners.push(pt);
            }
        });
    });

    return { boxes, corners };
}
