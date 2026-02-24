// ===== SPARKLE EFFECT =====

export function createSparkle(element) {
    const count = 8;
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:visible;';
    wrapper.setAttribute('aria-hidden', 'true');

    for (let i = 0; i < count; i++) {
        const spark = document.createElement('div');
        const angle = (i / count) * Math.PI * 2;
        const dist = 20 + Math.random() * 30;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;
        const size = 3 + Math.random() * 4;
        const delay = i * 40;

        spark.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: ${size}px;
      height: ${size}px;
      background: var(--c-accent, #6e8cff);
      border-radius: 50%;
      opacity: 0;
      box-shadow: 0 0 6px var(--c-accent, #6e8cff);
      animation: sparkleOut 600ms ${delay}ms ease-out forwards;
      --tx: ${tx}px;
      --ty: ${ty}px;
    `;
        wrapper.appendChild(spark);
    }

    if (!document.getElementById('sparkle-style')) {
        const style = document.createElement('style');
        style.id = 'sparkle-style';
        style.textContent = `
      @keyframes sparkleOut {
        0% { opacity: 1; transform: translate(-50%, -50%) translate(0, 0) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(0); }
      }
    `;
        document.head.appendChild(style);
    }

    element.style.position = element.style.position || 'relative';
    element.appendChild(wrapper);

    setTimeout(() => wrapper.remove(), 800);
}
