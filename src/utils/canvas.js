// ===== CANVAS HELPERS =====

export function setupCanvas(canvas, container) {
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        ctx.scale(dpr, dpr);
        return { w: rect.width, h: rect.height };
    }

    let dims = resize();
    const onResize = () => { dims = resize(); };
    window.addEventListener('resize', onResize);

    return {
        ctx,
        dpr,
        get width() { return dims.w; },
        get height() { return dims.h; },
        cleanup: () => window.removeEventListener('resize', onResize),
    };
}

// Animation loop with pause support
export function createAnimationLoop(callback) {
    let rafId = null;
    let running = false;
    let lastTime = 0;

    function loop(time) {
        if (!running) return;
        const dt = Math.min((time - lastTime) / 1000, 0.05); // cap at 50ms
        lastTime = time;
        callback(dt, time);
        rafId = requestAnimationFrame(loop);
    }

    return {
        start() {
            if (running) return;
            running = true;
            lastTime = performance.now();
            rafId = requestAnimationFrame(loop);
        },
        stop() {
            running = false;
            if (rafId) cancelAnimationFrame(rafId);
            rafId = null;
        },
        get isRunning() { return running; },
    };
}

// Lerp
export function lerp(a, b, t) {
    return a + (b - a) * t;
}

// Random range
export function rand(min, max) {
    return Math.random() * (max - min) + min;
}

// HSL to string
export function hsl(h, s, l, a = 1) {
    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
}
