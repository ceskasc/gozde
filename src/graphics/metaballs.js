// ===== METABALLS / LIQUID LIGHT =====
import { setupCanvas, createAnimationLoop, lerp } from '../utils/canvas.js';
import { prefersReducedMotion, onTabHidden } from '../utils/motion.js';

export function createMetaballs(canvas, container, options = {}) {
    const { ctx, cleanup: cleanupCanvas } = setupCanvas(canvas, container);
    const color1 = options.color1 || [110, 140, 255];
    const color2 = options.color2 || [168, 85, 247];
    const ballCount = prefersReducedMotion() ? 3 : (options.count || 5);
    const opacity = options.opacity || 0.08;

    const balls = [];
    for (let i = 0; i < ballCount; i++) {
        balls.push({
            x: Math.random(),
            y: Math.random(),
            vx: (Math.random() - 0.5) * 0.02,
            vy: (Math.random() - 0.5) * 0.02,
            radius: 0.1 + Math.random() * 0.15,
        });
    }

    const loop = createAnimationLoop((dt) => {
        const w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
        const h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));
        ctx.clearRect(0, 0, w, h);

        // Update positions
        for (const ball of balls) {
            ball.x += ball.vx * dt;
            ball.y += ball.vy * dt;

            // Bounce
            if (ball.x < -0.1 || ball.x > 1.1) ball.vx *= -1;
            if (ball.y < -0.1 || ball.y > 1.1) ball.vy *= -1;
        }

        // Render each ball as a radial gradient
        for (const ball of balls) {
            const px = ball.x * w;
            const py = ball.y * h;
            const r = ball.radius * Math.min(w, h);

            const mix = ball.x;
            const cr = Math.round(lerp(color1[0], color2[0], mix));
            const cg = Math.round(lerp(color1[1], color2[1], mix));
            const cb = Math.round(lerp(color1[2], color2[2], mix));

            const grad = ctx.createRadialGradient(px, py, 0, px, py, r);
            grad.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${opacity})`);
            grad.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(px, py, r, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    loop.start();

    const cleanupTab = onTabHidden((hidden) => {
        if (hidden) loop.stop();
        else loop.start();
    });

    return {
        destroy() {
            loop.stop();
            cleanupCanvas();
            cleanupTab();
        }
    };
}
