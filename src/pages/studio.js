// ===== STUDIO PAGE (Generative Poster Studio) =====
import { markVisited } from '../utils/storage.js';
import { rand, hsl } from '../utils/canvas.js';

let currentPoster = 0;

function drawPosterA(ctx, w, h) {
    // POSTER 1: "Neon Nocturne" - High-Fashion Typographic

    // Deep textured background
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, '#020204');
    bg.addColorStop(0.5, '#0a0a0e');
    bg.addColorStop(1, '#020305');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Subtle noise texture approximation (using tiny dots)
    ctx.fillStyle = 'rgba(255,255,255,0.01)';
    for (let i = 0; i < 4000; i++) {
        ctx.fillRect(rand(0, w), rand(0, h), 1, 1);
    }

    // Glowing atmospheric orbs (The "Nocturne" glow)
    const orb1 = ctx.createRadialGradient(w * 0.8, h * 0.2, 0, w * 0.8, h * 0.2, w * 0.5);
    orb1.addColorStop(0, 'rgba(168, 85, 247, 0.15)'); // Purple
    orb1.addColorStop(1, 'transparent');
    ctx.fillStyle = orb1;
    ctx.fillRect(0, 0, w, h);

    const orb2 = ctx.createRadialGradient(w * 0.2, h * 0.8, 0, w * 0.2, h * 0.8, w * 0.5);
    orb2.addColorStop(0, 'rgba(56, 189, 248, 0.1)'); // Cyan
    orb2.addColorStop(1, 'transparent');
    ctx.fillStyle = orb2;
    ctx.fillRect(0, 0, w, h);

    // Fine framing lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    ctx.strokeRect(w * 0.05, h * 0.05, w * 0.9, h * 0.9);
    ctx.strokeRect(w * 0.06, h * 0.06, w * 0.88, h * 0.88);

    // Abstract geometric elements: A massive frosted-glass circle
    ctx.beginPath();
    ctx.arc(w / 2, h * 0.45, w * 0.35, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Concentric hairline rings
    for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(w / 2, h * 0.45, w * 0.35 + (i * w * 0.015), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 - (i * 0.01)})`;
        ctx.stroke();
    }

    // ---------------- TYPOGRAPHY ---------------- //

    // Background ghost text (Massive scale)
    ctx.font = `900 ${w * 0.4}px 'Outfit', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
    ctx.fillText('GÖZ', w / 2, h * 0.25);
    ctx.fillText('DE', w / 2, h * 0.65);

    // Foreground Text: "GÖZDE" with a stunning split-gradient and shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetY = 10;

    ctx.font = `800 ${w * 0.25}px 'Outfit', sans-serif`;

    // Create a metallic/pearl gradient for the text
    const textGrad = ctx.createLinearGradient(0, h * 0.35, 0, h * 0.55);
    textGrad.addColorStop(0, '#ffffff');
    textGrad.addColorStop(0.4, '#e2e8f0'); // Soft silver
    textGrad.addColorStop(1, '#94a3b8');   // Slate 
    ctx.fillStyle = textGrad;
    ctx.fillText('GÖZDE', w / 2, h * 0.45);

    ctx.shadowBlur = 0; // Reset shadow
    ctx.shadowOffsetY = 0;

    // Subtitle block (Glass panel effect)
    const boxW = w * 0.65;
    const boxH = h * 0.06;
    const boxY = h * 0.65;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.beginPath();
    ctx.roundRect(w / 2 - boxW / 2, boxY, boxW, boxH, boxH / 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.stroke();

    ctx.font = `400 ${w * 0.035}px 'Inter', sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.letterSpacing = '0.4em';
    ctx.fillText('İYİ Kİ DOĞDUN', w / 2, boxY + boxH / 2);

    // Typography details
    ctx.font = `300 ${w * 0.02}px 'Inter', sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.letterSpacing = '0.2em';

    // Top layout
    ctx.textAlign = 'left';
    ctx.fillText('NO. 01 — EDITION', w * 0.08, h * 0.08);
    ctx.textAlign = 'right';
    ctx.fillText('ISTANBUL, TR', w * 0.92, h * 0.08);

    // Bottom layout
    ctx.textAlign = 'center';
    ctx.font = `400 ${w * 0.015}px 'Inter', sans-serif`;
    ctx.letterSpacing = '0.5em';
    ctx.fillText('CELEBRATING TWENTY-EIGHT YEARS OF BRILLIANCE', w / 2, h * 0.92);
}

function drawPosterB(ctx, w, h) {
    // POSTER 2: "Astral Blueprint" - Highly intricate sky chart

    // Deep void space background (Midnight blue to pitch black)
    const bg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, h);
    bg.addColorStop(0, '#090d1f'); // Deep blue core
    bg.addColorStop(0.6, '#03040a');
    bg.addColorStop(1, '#010103');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Milky Way Ribbon (Curved layered gradients)
    ctx.globalCompositeOperation = 'screen';
    for (let j = 0; j < 5; j++) {
        const cx = w * 0.5 + Math.sin(j) * w * 0.2;
        const cy = h * 0.5 + Math.cos(j) * h * 0.3;
        const cr = w * 0.6;
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
        grd.addColorStop(0, `hsla(${230 + j * 15}, 60%, 40%, 0.1)`);
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, w, h);
    }
    ctx.globalCompositeOperation = 'source-over'; // Reset

    // Impossibly Dense Starfield (Multiple layers for depth)
    for (let i = 0; i < 800; i++) {
        const x = rand(0, w);
        const y = rand(0, h);
        const size = rand(0.2, 1.5);

        // Some stars are brighter and slightly blue/gold
        const isBright = Math.random() > 0.95;
        const isGold = Math.random() > 0.98;

        if (isBright) {
            ctx.fillStyle = isGold ? 'rgba(255, 215, 0, 0.9)' : 'rgba(200, 230, 255, 0.9)';
            ctx.shadowBlur = 8;
            ctx.shadowColor = ctx.fillStyle;
            ctx.beginPath(); ctx.arc(x, y, size * 1.5, 0, Math.PI * 2); ctx.fill();
        } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${rand(0.1, 0.6)})`;
            ctx.shadowBlur = 0;
            ctx.beginPath(); ctx.arc(x, y, size, 0, Math.PI * 2); ctx.fill();
        }
    }
    ctx.shadowBlur = 0; // reset

    // ASTROLABE DIALS (The Blueprint structure)
    const cx = w / 2;
    const cy = h / 2.1;
    const rBase = w * 0.38;

    // Outer thick ring
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.15)'; // Gold tint
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(cx, cy, rBase, 0, Math.PI * 2); ctx.stroke();

    // Inner gap ring
    ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.arc(cx, cy, rBase - w * 0.015, 0, Math.PI * 2); ctx.stroke();

    // Third ring with degree ticks
    ctx.beginPath(); ctx.arc(cx, cy, rBase - w * 0.03, 0, Math.PI * 2); ctx.stroke();

    // Draw 360 degree ticks
    for (let i = 0; i < 360; i += 2) {
        const angle = i * Math.PI / 180;
        const isMajor = i % 10 === 0;
        const isCardinal = i % 90 === 0;

        const r1 = rBase - w * 0.03;
        const r2 = rBase - w * (isCardinal ? 0.05 : (isMajor ? 0.04 : 0.035));

        ctx.strokeStyle = isCardinal ? 'rgba(255, 215, 0, 0.4)' : 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = isCardinal ? 1.5 : 0.5;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1);
        ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2);
        ctx.stroke();
    }

    // Constellation lines inside the ring (Geometric Web)
    const points = [];
    for (let i = 0; i < 22; i++) {
        const r = rand(0, rBase - w * 0.06);
        const theta = rand(0, Math.PI * 2);
        points.push({ x: cx + r * Math.cos(theta), y: cy + r * Math.sin(theta) });
    }

    // Connect them logically (triangulation style)
    ctx.strokeStyle = 'rgba(110, 140, 255, 0.25)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const dist = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
            if (dist < w * 0.18) {
                ctx.beginPath(); ctx.moveTo(points[i].x, points[i].y); ctx.lineTo(points[j].x, points[j].y); ctx.stroke();
            }
        }
    }

    // Draw star nodes
    for (let i = 0; i < points.length; i++) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ffffff';
        ctx.beginPath(); ctx.arc(points[i].x, points[i].y, rand(1.5, 3), 0, Math.PI * 2); ctx.fill();

        // Glowing halos around major stars
        if (Math.random() > 0.7) {
            ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.arc(points[i].x, points[i].y, rand(6, 12), 0, Math.PI * 2); ctx.stroke();
        }
    }
    ctx.shadowBlur = 0;

    // TYPOGRAPHY (Scientific / Elegant)
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Main Date inside chart
    ctx.font = `italic 300 ${w * 0.08}px 'Outfit', serif`; // Mixed font style for premium look
    ctx.fillStyle = '#ffffff';
    ctx.fillText('24.02.1997', cx, cy);

    // Decorative text around chart
    ctx.font = `400 ${w * 0.015}px 'Inter', sans-serif`;
    ctx.fillStyle = 'rgba(255, 215, 0, 0.6)'; // Gold text
    ctx.letterSpacing = '0.3em';
    ctx.fillText('CELESTIAL ALIGNMENT RECORD', cx, cy - rBase - w * 0.04);

    // Bottom Plate block
    const plateY = h * 0.88;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(w * 0.3, plateY); ctx.lineTo(w * 0.7, plateY); ctx.stroke();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = `300 ${w * 0.025}px 'Inter', sans-serif`;
    ctx.letterSpacing = '0.5em';
    ctx.fillText('THE STARS ALIGNED', cx, plateY + h * 0.04);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.font = `400 ${w * 0.012}px 'Inter', monospace`;
    ctx.letterSpacing = '0.2em';
    ctx.fillText('RA: 22h 38m 15s  |  DEC: +18° 52\' 42"', cx, plateY + h * 0.07);
}

function drawPosterC(ctx, w, h) {
    // POSTER 3: "Ethereal Flow" - Fluid, dream-like art for Pisces

    // Smooth, pale ethereal gradient background
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, '#fdfbfb'); // Almost white
    bg.addColorStop(0.5, '#ebedee'); // Very light silver
    bg.addColorStop(1, '#e2ebf0'); // Pale blue tint
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Render fluid organic shapes (aurora / water feel)
    // We use massive blurred circles layered with globalCompositeOperation='multiply'
    ctx.globalCompositeOperation = 'multiply';

    const colors = [
        'rgba(240, 147, 251, 0.6)', // Soft magenta
        'rgba(245, 87, 108, 0.4)',  // Soft red
        'rgba(94, 114, 235, 0.5)',  // Deep periwinkle
        'rgba(79, 172, 254, 0.4)'   // Clear water blue
    ];

    for (let i = 0; i < 6; i++) {
        const cx = rand(0.1, 0.9) * w;
        const cy = rand(0.1, 0.9) * h;
        const cr = rand(0.4, 0.8) * w;

        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
        grd.addColorStop(0, colors[i % colors.length]);
        grd.addColorStop(1, 'transparent');

        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, w, h);
    }
    ctx.globalCompositeOperation = 'source-over'; // Reset

    // Topographic / Flow Lines (Simulating water ripples or silk)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'; // White lines on the pale background
    ctx.lineWidth = 1;

    for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        ctx.moveTo(0, h * 0.2 + (i * h * 0.02));

        // Draw a smooth bezier curve across the screen
        const startY = h * 0.2 + (i * h * 0.02);
        const cp1x = w * 0.3;
        const cp1y = startY - Math.sin(i * 0.1) * h * 0.1;
        const cp2x = w * 0.7;
        const cp2y = startY + Math.cos(i * 0.15) * h * 0.1;
        const endX = w;
        const endY = startY - Math.sin(i * 0.05) * h * 0.05;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
        ctx.stroke();
    }

    // Frosted Glass Layer over the middle to hold typography
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'; // Highly transparent white
    // Note: True blur isn't easily done in raw 2D canvas without heavy pixel manipulation,
    // so we simulate the frosted look with a gradient and white overlay
    const glass = ctx.createLinearGradient(0, h * 0.35, 0, h * 0.65);
    glass.addColorStop(0, 'rgba(255,255,255,0)');
    glass.addColorStop(0.2, 'rgba(255,255,255,0.4)');
    glass.addColorStop(0.8, 'rgba(255,255,255,0.4)');
    glass.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = glass;
    ctx.fillRect(0, h * 0.35, w, h * 0.3);

    // Fine frame inside the glass
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w * 0.1, h * 0.4); ctx.lineTo(w * 0.9, h * 0.4);
    ctx.moveTo(w * 0.1, h * 0.6); ctx.lineTo(w * 0.9, h * 0.6);
    ctx.stroke();

    // ---------------- TYPOGRAPHY ---------------- //
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // "PISCES" in massive bold serif, elegant and dark
    ctx.font = `italic 700 ${w * 0.16}px 'Times New Roman', serif`;
    // We use a dark indigo for the text to contrast with the bright background
    ctx.fillStyle = '#1e1b4b';
    ctx.fillText('PISCES', w / 2, h * 0.47);

    // Minimalist detail text
    ctx.font = `400 ${w * 0.02}px 'Inter', sans-serif`;
    ctx.fillStyle = '#334155'; // Slate gray
    ctx.letterSpacing = '0.4em';
    ctx.fillText('THE WATER ELEMENT ♓', w / 2, h * 0.55);

    // Dates and small text
    ctx.font = `300 ${w * 0.015}px 'Inter', sans-serif`;
    ctx.letterSpacing = '0.2em';
    ctx.fillText('FEBRUARY 24, 1997', w / 2, h * 0.88);
    ctx.fillText('EMPATHETIC · INTUITIVE · ARTISTIC', w / 2, h * 0.91);
}

const POSTERS = [
    { name: 'Gözde — Typographic', draw: drawPosterA },
    { name: '24.02.1997 — Sky Map', draw: drawPosterB },
    { name: 'Pisces Mode — Retro', draw: drawPosterC },
];

export default function studio(container) {
    markVisited('/studio');

    container.innerHTML = `
    <div class="page studio">
      <p class="section-label">Generative Poster Studio</p>
      <h2 class="section-title">Sana Özel Posterler</h2>
      <p class="section-subtitle" style="text-align:center;">
        Dışarıdan alınmadı, görseller tamamen kod ile üretildi. İndir, kullan, duvara as.
      </p>

      <div class="studio__canvas-wrap">
        <canvas class="studio__canvas" id="poster-canvas"></canvas>
      </div>

      <p style="text-align:center; color:var(--c-text-dim); font-size:var(--fs-sm); margin-bottom:var(--s-2);" id="poster-name"></p>

      <div class="studio__nav">
        ${POSTERS.map((_, i) => `
          <button class="studio__dot ${i === currentPoster ? 'studio__dot--active' : ''}" data-idx="${i}" aria-label="Poster ${i + 1}"></button>
        `).join('')}
      </div>

      <div class="studio__actions">
        <button class="btn btn--primary" id="download-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          PNG İndir
        </button>
        <button class="btn btn--ghost" id="next-btn">
          Sonraki →
        </button>
      </div>

      <footer class="page-footer">
        <button class="secret-star" id="secret-star-studio" aria-label="Gizli sayfa">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
        </button>
      </footer>
    </div>
  `;

    const canvas = container.querySelector('#poster-canvas');
    const nameEl = container.querySelector('#poster-name');
    const wrap = container.querySelector('.studio__canvas-wrap');

    // Size canvas for poster (high-res)
    function sizeCanvas() {
        const rect = wrap.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        return { ctx, w: rect.width, h: rect.height };
    }

    function renderPoster() {
        const { ctx, w, h } = sizeCanvas();
        POSTERS[currentPoster].draw(ctx, w, h);
        nameEl.textContent = POSTERS[currentPoster].name;

        // Update dots
        container.querySelectorAll('.studio__dot').forEach((dot, i) => {
            dot.classList.toggle('studio__dot--active', i === currentPoster);
        });
    }

    renderPoster();

    // Dot navigation
    container.querySelectorAll('.studio__dot').forEach(dot => {
        dot.addEventListener('click', () => {
            currentPoster = parseInt(dot.dataset.idx);
            renderPoster();
        });
    });

    // Next button
    container.querySelector('#next-btn').addEventListener('click', () => {
        currentPoster = (currentPoster + 1) % POSTERS.length;
        renderPoster();
    });

    // Download
    container.querySelector('#download-btn').addEventListener('click', () => {
        // Render at high res for export
        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = 1200;
        exportCanvas.height = 1600;
        const exportCtx = exportCanvas.getContext('2d');
        POSTERS[currentPoster].draw(exportCtx, 1200, 1600);

        const link = document.createElement('a');
        link.download = `gozde-poster-${currentPoster + 1}.png`;
        link.href = exportCanvas.toDataURL('image/png');
        link.click();
    });

    // Resize handler
    const onResize = () => renderPoster();
    window.addEventListener('resize', onResize);

    // Secret star
    let clickCount = 0;
    let clickTimer = null;
    const secretStar = container.querySelector('#secret-star-studio');
    if (secretStar) {
        secretStar.addEventListener('click', () => {
            clickCount++;
            clearTimeout(clickTimer);
            if (clickCount >= 5) { clickCount = 0; window.location.hash = '/secret'; }
            clickTimer = setTimeout(() => { clickCount = 0; }, 2000);
        });
    }

    return () => {
        window.removeEventListener('resize', onResize);
    };
}
