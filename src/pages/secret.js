// ===== SECRET PAGE =====
import { markVisited } from '../utils/storage.js';
import { createMetaballs } from '../graphics/metaballs.js';
import { createFloatingHearts } from '../graphics/hearts.js';

export default function secret(container) {
  markVisited('/secret');

  const canvas = document.createElement('canvas');
  canvas.classList.add('landing__canvas');
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);

  const meta = createMetaballs(canvas, document.body, {
    opacity: 0.08,
    color1: [255, 100, 150],
    color2: [168, 85, 247],
    count: 6,
  });

  const hearts = createFloatingHearts(container);

  container.innerHTML = `
    <div class="page secret">
      <div class="secret__glass">
        <div class="secret__heart" aria-hidden="true">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" 
                  fill="url(#heart-grad)" stroke="none"/>
            <defs>
              <linearGradient id="heart-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#ff6b9d"/>
                <stop offset="100%" style="stop-color:#c084fc"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h1 class="secret__message">Seni çok seviyorum.</h1>
        
        <p class="secret__sub">
          Gizli sayfayı buldun. Bu, her şeyin ötesinde, en basit ve en derin gerçek:<br><br>
          <em>Seninle her şey daha güzel.</em><br>
          İyi ki doğdun Gözde'm.
        </p>

        <div style="margin-top:var(--s-12); opacity:0; animation: secretFade 2s 3.5s cubic-bezier(0.16,1,0.3,1) forwards;">
          <p style="font-family:var(--ff-serif); font-style:italic; color:var(--c-accent); font-size:var(--fs-md);">
            — Sadık
          </p>
        </div>
      </div>
    </div>
  `;

  return () => {
    meta.destroy();
    hearts.destroy();
    canvas.remove();
  };
}
