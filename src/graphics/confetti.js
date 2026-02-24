// ===== CONFETTI =====
import { rand } from '../utils/canvas.js';

export function createConfetti(container, options = {}) {
    const count = options.count || 60;
    const colors = options.colors || ['#6e8cff', '#a855f7', '#3b82f6', '#c084fc', '#f0f0f5', '#fbbf24'];
    const duration = options.duration || 3000;

    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9998;overflow:hidden;';
    wrapper.setAttribute('aria-hidden', 'true');

    for (let i = 0; i < count; i++) {
        const piece = document.createElement('div');
        const size = rand(4, 10);
        const color = colors[Math.floor(Math.random() * colors.length)];
        const startX = rand(20, 80);
        const drift = rand(-100, 100);
        const rotEnd = rand(360, 1080);
        const delay = rand(0, 300);

        piece.style.cssText = `
      position: absolute;
      left: ${startX}%;
      top: -10px;
      width: ${size}px;
      height: ${size * rand(0.5, 1.5)}px;
      background: ${color};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      opacity: 0;
      animation: confettiFall ${duration}ms ${delay}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      --drift: ${drift}px;
      --rot: ${rotEnd}deg;
    `;
        wrapper.appendChild(piece);
    }

    // Inject animation if not present
    if (!document.getElementById('confetti-style')) {
        const style = document.createElement('style');
        style.id = 'confetti-style';
        style.textContent = `
      @keyframes confettiFall {
        0% { opacity: 1; transform: translateX(0) translateY(0) rotate(0); }
        80% { opacity: 1; }
        100% { opacity: 0; transform: translateX(var(--drift)) translateY(100vh) rotate(var(--rot)); }
      }
    `;
        document.head.appendChild(style);
    }

    container.appendChild(wrapper);

    setTimeout(() => wrapper.remove(), duration + 500);

    return { destroy: () => wrapper.remove() };
}
