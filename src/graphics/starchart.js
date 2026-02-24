// ===== BIRTH DATE STAR CHART — 24 Feb 1997 =====
// Approximate star positions for constellations visible from Kahramanmaraş (37.5°N)
// on the evening of 24 February 1997, ~22:00 local time.
// Positions are in normalized viewport coords (0-1).

import { setupCanvas, createAnimationLoop, rand, lerp } from '../utils/canvas.js';
import { prefersReducedMotion, onTabHidden } from '../utils/motion.js';

// Major stars with approximate positions for that date/time/location
// [x, y, magnitude, name, constellation]
const STARS = [
    // Orion — dominant in south-southwest
    [0.42, 0.48, 0.1, 'Betelgeuse', 'Orion'],
    [0.46, 0.58, 0.2, 'Rigel', 'Orion'],
    [0.44, 0.52, 1.7, 'Bellatrix', 'Orion'],
    [0.435, 0.53, 2.0, 'Mintaka', 'Orion'],   // belt
    [0.44, 0.535, 1.8, 'Alnilam', 'Orion'],    // belt
    [0.445, 0.54, 2.0, 'Alnitak', 'Orion'],    // belt
    [0.45, 0.56, 2.1, 'Saiph', 'Orion'],

    // Taurus — west of Orion
    [0.32, 0.42, 0.9, 'Aldebaran', 'Taurus'],
    [0.28, 0.36, 2.8, 'Elnath', 'Taurus'],
    [0.30, 0.38, 3.5, '', 'Taurus'],
    [0.31, 0.40, 3.2, '', 'Taurus'],
    [0.33, 0.41, 3.6, '', 'Taurus'],

    // Pleiades cluster
    [0.26, 0.34, 3.0, '', 'Pleiades'],
    [0.265, 0.335, 3.4, '', 'Pleiades'],
    [0.258, 0.345, 3.6, '', 'Pleiades'],
    [0.27, 0.33, 3.5, '', 'Pleiades'],
    [0.262, 0.338, 3.8, '', 'Pleiades'],
    [0.268, 0.342, 3.9, '', 'Pleiades'],
    [0.255, 0.34, 4.0, '', 'Pleiades'],

    // Gemini — east of Orion
    [0.52, 0.32, 1.2, 'Pollux', 'Gemini'],
    [0.50, 0.30, 1.6, 'Castor', 'Gemini'],
    [0.48, 0.38, 2.9, '', 'Gemini'],
    [0.51, 0.36, 3.0, '', 'Gemini'],
    [0.47, 0.35, 3.2, '', 'Gemini'],

    // Canis Major — below Orion
    [0.48, 0.72, -1.5, 'Sirius', 'Canis Major'], // brightest star
    [0.52, 0.78, 1.5, 'Adhara', 'Canis Major'],
    [0.50, 0.76, 1.8, 'Wezen', 'Canis Major'],
    [0.46, 0.75, 2.0, 'Mirzam', 'Canis Major'],

    // Leo — rising in the east
    [0.72, 0.42, 1.4, 'Regulus', 'Leo'],
    [0.78, 0.38, 2.1, 'Denebola', 'Leo'],
    [0.74, 0.36, 2.0, 'Algieba', 'Leo'],
    [0.70, 0.40, 2.6, '', 'Leo'],
    [0.76, 0.40, 3.0, '', 'Leo'],
    [0.73, 0.34, 3.3, '', 'Leo'],

    // PISCES — where the sun was (near western horizon, faint)
    [0.18, 0.55, 3.6, '', 'Pisces'],
    [0.20, 0.52, 3.8, '', 'Pisces'],
    [0.22, 0.54, 4.0, '', 'Pisces'],
    [0.19, 0.58, 3.9, '', 'Pisces'],
    [0.16, 0.56, 4.1, '', 'Pisces'],
    [0.21, 0.50, 3.7, '♓ Pisces', 'Pisces'],
    [0.17, 0.53, 4.0, '', 'Pisces'],
    [0.23, 0.57, 4.2, '', 'Pisces'],
    [0.15, 0.59, 4.3, '', 'Pisces'],

    // Canis Minor
    [0.55, 0.45, 0.4, 'Procyon', 'Canis Minor'],
    [0.56, 0.47, 2.9, 'Gomeisa', 'Canis Minor'],

    // Auriga — high in sky
    [0.38, 0.20, 0.1, 'Capella', 'Auriga'],
    [0.36, 0.24, 2.7, '', 'Auriga'],
    [0.40, 0.22, 2.6, '', 'Auriga'],
    [0.42, 0.25, 3.0, '', 'Auriga'],

    // Jupiter (was in Capricornus, below horizon at night, skip)
    // Mars (in Virgo)
    [0.82, 0.50, 1.0, 'Mars ♂', 'Planet'],

    // Saturn
    [0.14, 0.65, 0.8, '', 'Planet'],
];

// Constellation lines (indices into STARS array)
const CONSTELLATION_LINES = [
    // Orion body
    [0, 2], [2, 3], [3, 4], [4, 5], [5, 1], [0, 6], [1, 6],
    // Orion belt
    [3, 4], [4, 5],
    // Taurus V-shape
    [7, 8], [7, 9], [9, 10], [10, 11],
    // Gemini
    [19, 20], [20, 22], [19, 21], [21, 22],
    // Canis Major
    [25, 26], [26, 27], [25, 28],
    // Leo sickle
    [29, 30], [30, 31], [31, 32], [29, 32], [30, 33],
    // Pisces ring (partial)
    [34, 35], [35, 36], [36, 37], [37, 38], [34, 40], [40, 41],
    // Canis Minor
    [43, 44],
    // Auriga triangle
    [45, 46], [46, 47], [47, 48], [48, 45],
];

export function createStarChart(canvas, container) {
    const { ctx, cleanup: cleanupCanvas } = setupCanvas(canvas, container);
    let mouseX = 0.5, mouseY = 0.5;
    const reduced = prefersReducedMotion();

    // Background field stars
    const bgStars = [];
    for (let i = 0; i < (reduced ? 100 : 350); i++) {
        bgStars.push({
            x: Math.random(),
            y: Math.random(),
            size: rand(0.3, 1.5),
            alpha: rand(0.08, 0.35),
            twinkleSpeed: rand(0.3, 1.5),
            twinklePhase: Math.random() * Math.PI * 2,
        });
    }

    // Shooting stars
    const shootingStars = [];
    function spawnShootingStar() {
        if (reduced) return;
        shootingStars.push({
            x: rand(0.1, 0.9),
            y: rand(0.05, 0.35),
            vx: rand(0.2, 0.5) * (Math.random() > 0.5 ? 1 : -1),
            vy: rand(0.08, 0.2),
            life: 1,
            decay: rand(0.01, 0.02),
            length: rand(0.03, 0.06),
        });
    }

    // Parallax mouse
    const onMouseMove = (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMouseMove);

    const loop = createAnimationLoop((dt, time) => {
        const w = canvas.width / Math.min(window.devicePixelRatio || 1, 2);
        const h = canvas.height / Math.min(window.devicePixelRatio || 1, 2);
        const t = time * 0.001;

        ctx.clearRect(0, 0, w, h);

        // Parallax offsets
        const px = (mouseX - 0.5) * 25;
        const py = (mouseY - 0.5) * 18;

        // — Background stars (ambient) —
        for (const star of bgStars) {
            const twinkle = reduced ? 0.5 : Math.sin(t * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
            const sx = star.x * w + px * 0.3;
            const sy = star.y * h + py * 0.3;
            ctx.beginPath();
            ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(180, 200, 255, ${star.alpha * twinkle})`;
            ctx.fill();
        }

        // — Constellation lines —
        ctx.strokeStyle = 'rgba(110, 140, 255, 0.06)';
        ctx.lineWidth = 0.8;
        for (const [a, b] of CONSTELLATION_LINES) {
            if (a >= STARS.length || b >= STARS.length) continue;
            const sa = STARS[a], sb = STARS[b];
            ctx.beginPath();
            ctx.moveTo(sa[0] * w + px * 0.6, sa[1] * h + py * 0.6);
            ctx.lineTo(sb[0] * w + px * 0.6, sb[1] * h + py * 0.6);
            ctx.stroke();
        }

        // — Catalog stars —
        for (const star of STARS) {
            const [sx, sy, mag, name, constellation] = star;
            const x = sx * w + px * 0.6;
            const y = sy * h + py * 0.6;

            // Size from magnitude (brighter = bigger)
            const size = Math.max(0.8, 3.5 - mag * 0.5);
            const alpha = Math.min(1, Math.max(0.2, 1 - mag * 0.12));
            const twinkle = reduced ? 1 : Math.sin(t * 1.2 + sx * 20 + sy * 30) * 0.15 + 0.85;

            // Star color based on spectral type approximation
            let color;
            if (constellation === 'Planet') {
                color = `rgba(255, 180, 120, ${alpha * twinkle})`;
            } else if (name === 'Betelgeuse') {
                color = `rgba(255, 160, 100, ${alpha * twinkle})`; // red supergiant
            } else if (name === 'Aldebaran') {
                color = `rgba(255, 170, 110, ${alpha * twinkle})`; // orange giant
            } else if (name === 'Sirius') {
                color = `rgba(200, 220, 255, ${alpha * twinkle})`; // blue-white
            } else if (name === 'Rigel') {
                color = `rgba(180, 210, 255, ${alpha * twinkle})`; // blue supergiant
            } else {
                color = `rgba(210, 220, 255, ${alpha * twinkle})`;
            }

            // Draw star point
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();

            // Glow for bright stars
            if (mag < 1.5) {
                const glowSize = size * (mag < 0 ? 8 : 5);
                const glowAlpha = alpha * twinkle * (mag < 0 ? 0.12 : 0.06);
                const grd = ctx.createRadialGradient(x, y, 0, x, y, glowSize);

                if (constellation === 'Planet' || name === 'Betelgeuse' || name === 'Aldebaran') {
                    grd.addColorStop(0, `rgba(255, 170, 110, ${glowAlpha})`);
                } else {
                    grd.addColorStop(0, `rgba(140, 170, 255, ${glowAlpha})`);
                }
                grd.addColorStop(1, 'transparent');
                ctx.fillStyle = grd;
                ctx.beginPath();
                ctx.arc(x, y, glowSize, 0, Math.PI * 2);
                ctx.fill();

                // Cross spikes for very bright
                if (mag < 0.5 && !reduced) {
                    const spikeLen = size * 6;
                    const spikeAlpha = alpha * twinkle * 0.15;
                    ctx.strokeStyle = `rgba(200, 220, 255, ${spikeAlpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(x - spikeLen, y); ctx.lineTo(x + spikeLen, y);
                    ctx.moveTo(x, y - spikeLen); ctx.lineTo(x, y + spikeLen);
                    ctx.stroke();
                }
            }

            // Labels for named stars
            if (name && name.length > 0) {
                ctx.font = `300 ${Math.max(9, w * 0.008)}px 'Inter', sans-serif`;
                ctx.fillStyle = constellation === 'Pisces'
                    ? `rgba(168, 130, 255, ${alpha * 0.5})`
                    : `rgba(160, 175, 210, ${alpha * 0.3})`;
                ctx.textAlign = 'left';
                ctx.fillText(name, x + size + 4, y + 3);
            }
        }

        // — Pisces highlight ring —
        const piscesX = 0.19 * w + px * 0.6;
        const piscesY = 0.54 * h + py * 0.6;
        const ringR = w * 0.06;
        const ringAlpha = reduced ? 0.05 : (Math.sin(t * 0.5) * 0.02 + 0.04);
        ctx.strokeStyle = `rgba(168, 85, 247, ${ringAlpha})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.arc(piscesX, piscesY, ringR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // — Ecliptic line (faint dashed curve across sky) —
        ctx.strokeStyle = 'rgba(255, 200, 100, 0.025)';
        ctx.lineWidth = 0.8;
        ctx.setLineDash([8, 12]);
        ctx.beginPath();
        ctx.moveTo(0.05 * w + px * 0.6, 0.62 * h + py * 0.6);
        ctx.quadraticCurveTo(
            0.4 * w + px * 0.6, 0.35 * h + py * 0.6,
            0.95 * w + px * 0.6, 0.48 * h + py * 0.6
        );
        ctx.stroke();
        ctx.setLineDash([]);

        // — Coordinate circles (celestial grid) —
        ctx.strokeStyle = 'rgba(110, 140, 255, 0.015)';
        ctx.lineWidth = 0.5;
        // Horizon
        ctx.beginPath();
        ctx.moveTo(0, 0.88 * h + py * 0.2);
        ctx.quadraticCurveTo(0.5 * w, 0.92 * h + py * 0.2, w, 0.88 * h + py * 0.2);
        ctx.stroke();
        // Meridian
        ctx.beginPath();
        ctx.moveTo(0.5 * w + px * 0.6, 0);
        ctx.lineTo(0.5 * w + px * 0.6, h);
        ctx.stroke();

        // — Shooting stars —
        for (let i = shootingStars.length - 1; i >= 0; i--) {
            const ss = shootingStars[i];
            ss.x += ss.vx * dt;
            ss.y += ss.vy * dt;
            ss.life -= ss.decay;
            if (ss.life <= 0) { shootingStars.splice(i, 1); continue; }

            const sx = ss.x * w;
            const sy = ss.y * h;
            const ex = (ss.x - ss.vx * ss.length) * w;
            const ey = (ss.y - ss.vy * ss.length) * h;
            const grad = ctx.createLinearGradient(sx, sy, ex, ey);
            grad.addColorStop(0, `rgba(220, 230, 255, ${ss.life * 0.7})`);
            grad.addColorStop(1, 'rgba(220, 230, 255, 0)');
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(ex, ey);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.2;
            ctx.stroke();
        }

        // — Corner info labels —
        ctx.font = `300 ${Math.max(10, w * 0.009)}px 'Inter', sans-serif`;
        ctx.fillStyle = 'rgba(140, 155, 190, 0.2)';
        ctx.textAlign = 'left';
        ctx.fillText('24 ŞUBAT 1997 · 22:00 UTC+2', w * 0.03, h * 0.96);
        ctx.textAlign = 'right';
        ctx.fillText('37°35\'N  36°56\'E · KAHRAMANMARAŞ', w * 0.97, h * 0.96);
        ctx.textAlign = 'center';
        ctx.fillText('— GÖK HARİTASI —', w * 0.5, h * 0.96);
    });

    loop.start();

    const shootInterval = setInterval(() => {
        if (Math.random() > 0.4) spawnShootingStar();
    }, 4000);

    const cleanupTab = onTabHidden((hidden) => {
        if (hidden) loop.stop(); else loop.start();
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
