// ===== LANDING PAGE — WITH STAR CHART MODAL =====
import { navigate } from '../utils/router.js';
import { markVisited } from '../utils/storage.js';
import { magneticEffect, addRipple, staggerChildren, onVisible } from '../utils/motion.js';
import { createAurora } from '../graphics/aurora.js';
import { createStarfield } from '../graphics/starfield.js';
import { createStarChart } from '../graphics/starchart.js';

export default function landing(container) {
  markVisited('/');

  // Background: aurora + starfield (space feel)
  const canvas = document.createElement('canvas');
  canvas.classList.add('landing__canvas');
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);

  const aurora = createAurora(document.body);
  const stars = createStarfield(canvas, document.body);

  // Star chart state
  let starChartInstance = null;
  let starChartCanvas = null;

  container.innerHTML = `
    <div class="page landing">
      <div class="landing__content">

        <div class="landing__badge">
          <span class="landing__badge-dot"></span>
          <span>24 Şubat 1997 · Balık Burcu · Kahramanmaraş</span>
        </div>

        <h1 class="landing__hero">İyi ki doğdun,<br><em>Gözde.</em></h1>

        <p class="landing__sub">
          Bu gece sana bir hediye hazırladım. Büyük değil, gösterişli değil — 
          ama her satırında biraz ben, biraz sen, biraz da biz var.
        </p>

        <div class="landing__actions">
          <button class="btn btn--primary" id="cta-start">Deneyimi Başlat</button>
          <button class="btn btn--ghost" id="cta-letter">Mektubu Aç</button>
        </div>

        <button class="landing__sky-btn" id="sky-chart-btn" aria-label="Doğduğun gün gökyüzünü gör">
          <span class="landing__sky-btn-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20"/>
              <path d="M2 12h20"/>
              <circle cx="7" cy="7" r="1" fill="currentColor" stroke="none"/>
              <circle cx="17" cy="9" r="0.8" fill="currentColor" stroke="none"/>
              <circle cx="14" cy="5" r="0.6" fill="currentColor" stroke="none"/>
              <circle cx="9" cy="16" r="0.7" fill="currentColor" stroke="none"/>
            </svg>
          </span>
          <span class="landing__sky-btn-text">Doğduğun Gün Gökyüzü</span>
          <span class="landing__sky-btn-arrow">→</span>
        </button>

        <div class="landing__info-strip">
          <div class="landing__info-item">
            <span class="landing__info-value">28</span>
            <span class="landing__info-label">Yaş</span>
          </div>
          <div class="landing__info-divider"></div>
          <div class="landing__info-item">
            <span class="landing__info-value" id="days-count">10.592</span>
            <span class="landing__info-label">Gün</span>
          </div>
          <div class="landing__info-divider"></div>
          <div class="landing__info-item">
            <span class="landing__info-value">♓</span>
            <span class="landing__info-label">Burç</span>
          </div>
          <div class="landing__info-divider"></div>
          <div class="landing__info-item">
            <span class="landing__info-value">7</span>
            <span class="landing__info-label">Sayfa</span>
          </div>
        </div>

      </div>

      <div class="landing__scroll-hint" id="scroll-hint">
        <div class="landing__scroll-line"></div>
        <span>Keşfet</span>
      </div>

      <div class="landing__bottom-cards" id="bottom-cards">
        <div class="landing__preview-card" data-route="/sky">
          <div class="landing__preview-icon">✦</div>
          <h3>Gökyüzü Arşivi</h3>
          <p>Doğduğun gecenin yıldız haritası ve sayılar.</p>
        </div>
        <div class="landing__preview-card" data-route="/pisces">
          <div class="landing__preview-icon">♓</div>
          <h3>Balık Burcu</h3>
          <p>Bilim ve astroloji perspektifinden seni çözmek.</p>
        </div>
        <div class="landing__preview-card" data-route="/reasons">
          <div class="landing__preview-icon">❤</div>
          <h3>12 Neden</h3>
          <p>Seni sevmemin 12 küçük (ama büyük) nedeni.</p>
        </div>
        <div class="landing__preview-card" data-route="/letter">
          <div class="landing__preview-icon">✉</div>
          <h3>Mektup</h3>
          <p>Zarfı aç — içinde sana yazdığım bir şey var.</p>
        </div>
        <div class="landing__preview-card" data-route="/studio">
          <div class="landing__preview-icon">◐</div>
          <h3>Poster Stüdyo</h3>
          <p>Sana özel üretilmiş generative posterler.</p>
        </div>
        <div class="landing__preview-card" data-route="/coupon">
          <div class="landing__preview-icon">🎁</div>
          <h3>Hediye Kuponu</h3>
          <p>Üç seçenek, bir hak. Seç ve mühürle.</p>
        </div>
      </div>

      <footer class="page-footer">
        <span>Sadık tarafından, sevgiyle ✦ 2025</span>
        <button class="secret-star" id="secret-star" aria-label="Gizli sayfa">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
        </button>
      </footer>
    </div>

    <!-- Fullscreen Star Chart Modal -->
    <div class="starchart-modal" id="starchart-modal" role="dialog" aria-modal="true" aria-label="Doğum günü gökyüzü haritası">
      <canvas class="starchart-modal__canvas" id="starchart-canvas"></canvas>
      <div class="starchart-modal__overlay">
        <div class="starchart-modal__header">
          <div class="starchart-modal__title">
            <h2>Doğduğun Gün Gökyüzü</h2>
            <p>24 Şubat 1997 · 22:00 · Kahramanmaraş</p>
          </div>
          <button class="starchart-modal__close" id="starchart-close" aria-label="Kapat">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="starchart-modal__footer">
          <span>♓ Pisces bölgesi işaretli · Fareyi hareket ettir</span>
        </div>
      </div>
    </div>
  `;

  // Calculate days
  const birthDate = new Date(1997, 1, 24);
  const now = new Date();
  const daysAlive = Math.floor((now - birthDate) / (1000 * 60 * 60 * 24));
  const daysEl = container.querySelector('#days-count');
  if (daysEl) daysEl.textContent = daysAlive.toLocaleString('tr-TR');

  // CTA handlers
  const startBtn = container.querySelector('#cta-start');
  const letterBtn = container.querySelector('#cta-letter');
  startBtn.addEventListener('click', () => navigate('/sky'));
  letterBtn.addEventListener('click', () => navigate('/letter'));

  const cleanMag1 = magneticEffect(startBtn);
  const cleanMag2 = magneticEffect(letterBtn);
  addRipple(startBtn);
  addRipple(letterBtn);

  // Sky chart button → open fullscreen modal
  const skyBtn = container.querySelector('#sky-chart-btn');
  const modal = container.querySelector('#starchart-modal');
  const closeBtn = container.querySelector('#starchart-close');
  const chartCanvas = container.querySelector('#starchart-canvas');

  function openStarChart() {
    modal.classList.add('starchart-modal--visible');
    document.body.style.overflow = 'hidden';
    // Init star chart on the modal canvas
    if (!starChartInstance) {
      starChartInstance = createStarChart(chartCanvas, modal);
    }
    // Focus trap
    closeBtn.focus();
  }

  function closeStarChart() {
    modal.classList.remove('starchart-modal--visible');
    document.body.style.overflow = '';
    if (starChartInstance) {
      starChartInstance.destroy();
      starChartInstance = null;
    }
    skyBtn.focus();
  }

  skyBtn.addEventListener('click', openStarChart);
  closeBtn.addEventListener('click', closeStarChart);
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('starchart-modal__overlay')) return;
  });
  // ESC to close
  const onKeyDown = (e) => {
    if (e.key === 'Escape' && modal.classList.contains('starchart-modal--visible')) {
      closeStarChart();
    }
  };
  document.addEventListener('keydown', onKeyDown);

  // Preview cards click
  container.querySelectorAll('.landing__preview-card').forEach(card => {
    card.addEventListener('click', () => navigate(card.dataset.route));
    card.style.cursor = 'pointer';
  });

  // Stagger
  staggerChildren(container.querySelector('.landing__info-strip'), '.landing__info-item', 100);
  const bottomCards = container.querySelector('#bottom-cards');
  const cleanVis = onVisible(bottomCards, () => {
    staggerChildren(bottomCards, '.landing__preview-card', 80);
  });

  // Secret star
  let clickCount = 0;
  let clickTimer = null;
  const secretStar = container.querySelector('#secret-star');
  secretStar.addEventListener('click', () => {
    clickCount++;
    clearTimeout(clickTimer);
    if (clickCount >= 5) { clickCount = 0; navigate('/secret'); }
    clickTimer = setTimeout(() => { clickCount = 0; }, 2000);
  });

  return () => {
    aurora.destroy();
    stars.destroy();
    canvas.remove();
    cleanMag1();
    cleanMag2();
    cleanVis();
    if (starChartInstance) starChartInstance.destroy();
    document.removeEventListener('keydown', onKeyDown);
    document.body.style.overflow = '';
  };
}
