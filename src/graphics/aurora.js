// ===== AURORA GRADIENT MESH =====
import { createAnimationLoop } from '../utils/canvas.js';
import { prefersReducedMotion } from '../utils/motion.js';

export function createAurora(container) {
    const el = document.createElement('div');
    el.classList.add('aurora-mesh');
    el.setAttribute('aria-hidden', 'true');
    el.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  `;

    // Create mesh blobs
    const blobs = [
        { color: 'rgba(110, 140, 255, 0.12)', x: 30, y: 20, size: 50 },
        { color: 'rgba(168, 85, 247, 0.10)', x: 70, y: 60, size: 45 },
        { color: 'rgba(59, 130, 246, 0.08)', x: 50, y: 80, size: 55 },
        { color: 'rgba(124, 58, 237, 0.07)', x: 20, y: 50, size: 40 },
    ];

    blobs.forEach((blob, i) => {
        const div = document.createElement('div');
        div.style.cssText = `
      position: absolute;
      left: ${blob.x}%;
      top: ${blob.y}%;
      width: ${blob.size}vw;
      height: ${blob.size}vw;
      background: radial-gradient(circle, ${blob.color} 0%, transparent 70%);
      border-radius: 50%;
      filter: blur(60px);
      transform: translate(-50%, -50%);
      animation: auroraFloat${i} ${15 + i * 5}s ease-in-out infinite alternate;
    `;
        el.appendChild(div);
    });

    // Add keyframe animations
    const style = document.createElement('style');
    style.textContent = blobs.map((_, i) => `
    @keyframes auroraFloat${i} {
      0% { transform: translate(-50%, -50%) translate(0, 0); }
      33% { transform: translate(-50%, -50%) translate(${20 - i * 10}px, ${30 + i * 8}px); }
      66% { transform: translate(-50%, -50%) translate(${-15 + i * 5}px, ${-20 - i * 5}px); }
      100% { transform: translate(-50%, -50%) translate(${10 + i * 3}px, ${15 - i * 7}px); }
    }
  `).join('');

    if (prefersReducedMotion()) {
        style.textContent = '';
    }

    el.appendChild(style);
    container.appendChild(el);

    return {
        destroy() {
            el.remove();
        }
    };
}
