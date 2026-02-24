// ===== CANVAS STARFIELD =====
import { setupCanvas, createAnimationLoop, rand } from '../utils/canvas.js';
import { prefersReducedMotion, onTabHidden } from '../utils/motion.js';

export function createStarfield(canvas, container) {
    const { ctx, cleanup: cleanupCanvas } = setupCanvas(canvas, container);
    const stars = [];
    const shootingStars = [];
    let mouseX = 0.5, mouseY = 0.5;
    const STAR_COUNT = prefersReducedMotion() ? 80 : 200;

    // Initialize stars
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random(),
            y: Math.random(),
            size: rand(0.5, 2.2),
            alpha: rand(0.2, 0.8),
            speed: rand(0.0001, 0.0005),
            twinkleSpeed: rand(0.5, 2),
            twinklePhase: Math.random() * Math.PI * 2,
            depth: rand(0.3, 1),
        });
    }

    function spawnShootingStar() {
        if (prefersReducedMotion()) return;
        shootingStars.push({
            x: rand(0, 1),
            y: rand(0, 0.4),
            vx: rand(0.3, 0.6),
            vy: rand(0.1, 0.25),
            life: 1,
            decay: rand(0.008, 0.015),
            length: rand(0.04, 0.08),
        });
    }

    // Mouse tracking for parallax
    const onMouseMove = (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMouseMove);

    const loop = createAnimationLoop((dt, time) => {
        const w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
        const h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));

        ctx.clearRect(0, 0, w, h);

        // Stars
        const t = time * 0.001;
        const parallaxX = (mouseX - 0.5) * 20;
        const parallaxY = (mouseY - 0.5) * 15;

        for (const star of stars) {
            const twinkle = Math.sin(t * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
            const px = star.x * w + parallaxX * star.depth;
            const py = star.y * h + parallaxY * star.depth;
            const alpha = star.alpha * twinkle;

            ctx.beginPath();
            ctx.arc(px, py, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200, 215, 255, ${alpha})`;
            ctx.fill();

            // Glow for larger stars
            if (star.size > 1.5) {
                ctx.beginPath();
                ctx.arc(px, py, star.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(110, 140, 255, ${alpha * 0.15})`;
                ctx.fill();
            }
        }

        // Shooting stars
        for (let i = shootingStars.length - 1; i >= 0; i--) {
            const ss = shootingStars[i];
            ss.x += ss.vx * dt;
            ss.y += ss.vy * dt;
            ss.life -= ss.decay;

            if (ss.life <= 0) {
                shootingStars.splice(i, 1);
                continue;
            }

            const sx = ss.x * w;
            const sy = ss.y * h;
            const ex = (ss.x - ss.vx * ss.length) * w;
            const ey = (ss.y - ss.vy * ss.length) * h;

            const grad = ctx.createLinearGradient(sx, sy, ex, ey);
            grad.addColorStop(0, `rgba(200, 220, 255, ${ss.life * 0.8})`);
            grad.addColorStop(1, 'rgba(200, 220, 255, 0)');

            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(ex, ey);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
    });

    loop.start();

    // Shooting star interval
    const shootInterval = setInterval(() => {
        if (Math.random() > 0.5) spawnShootingStar();
    }, 3000);

    // Pause on tab hidden
    const cleanupTab = onTabHidden((hidden) => {
        if (hidden) loop.stop();
        else loop.start();
    });

    return {
        destroy() {
            loop.stop();
            clearInterval(shootInterval);
            cleanupCanvas();
            cleanupTab();
            window.removeEventListener('mousemove', onMouseMove);
        }
    };
}
