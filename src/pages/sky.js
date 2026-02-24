// ===== SKY PAGE — PREMIUM REDESIGN =====
import { markVisited } from '../utils/storage.js';
import { staggerChildren, onVisible, animateCounter, tiltEffect } from '../utils/motion.js';
import { createStarfield } from '../graphics/starfield.js';
import { createStarChart } from '../graphics/starchart.js';

export default function sky(container) {
  markVisited('/sky');

  const canvas = document.createElement('canvas');
  canvas.classList.add('sky__canvas');
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);
  const starfield = createStarfield(canvas, document.body);

  // Calculate stats
  const birthDate = new Date(1997, 1, 24, 22, 0, 0);
  const now = new Date();
  const daysAlive = Math.floor((now - birthDate) / (1000 * 60 * 60 * 24));
  const hoursAlive = daysAlive * 24;
  const heartsBeaten = Math.floor(daysAlive * 24 * 60 * 72);
  const fullMoons = Math.floor(daysAlive / 29.53);
  const sunrises = daysAlive;
  const breaths = Math.floor(daysAlive * 24 * 60 * 16);

  let starChartInstance = null;

  container.innerHTML = `
    <div class="page sky">
      <div class="sky__content">

        <p class="section-label">Gökyüzü Arşivi</p>
        <h2 class="section-title">Senin Gecen</h2>
        <p class="section-subtitle">
          Bir yıldız düştü, bir dilek tutuldu — ve sen geldin.
        </p>

        <!-- Hero Date -->
        <div class="sky__hero" id="sky-hero">
          <div class="sky__hero-ring"></div>
          <div class="sky__hero-inner">
            <span class="sky__hero-label">DOĞUM TARİHİ</span>
            <div class="sky__hero-date">24.02.1997</div>
            <span class="sky__hero-detail">Pazartesi · 22:00 · Kahramanmaraş</span>
            <div class="sky__hero-tags">
              <span class="sky__hero-tag">♓ Balık</span>
              <span class="sky__hero-tag">☽ Su</span>
              <span class="sky__hero-tag">♆ Neptün</span>
            </div>
          </div>
        </div>

        <!-- Star Chart CTA -->
        <button class="sky__chart-btn" id="sky-chart-open">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="8" cy="8" r="1.2" fill="currentColor" stroke="none"/><circle cx="16" cy="10" r="0.8" fill="currentColor" stroke="none"/><circle cx="13" cy="16" r="0.9" fill="currentColor" stroke="none"/></svg>
          <span>Doğduğun Gecenin Yıldız Haritası</span>
          <span class="sky__chart-arrow">→</span>
        </button>

        <!-- Counters -->
        <div class="sky__counters" id="sky-counters">
          <div class="sky__counter sky__counter--hero">
            <div class="sky__counter-val" id="c-days">0</div>
            <div class="sky__counter-label">gün bu dünyada</div>
            <div class="sky__counter-sub">ve her biri senin için</div>
          </div>
          <div class="sky__counter-row">
            <div class="sky__counter">
              <div class="sky__counter-val" id="c-hours">0</div>
              <div class="sky__counter-label">saat</div>
            </div>
            <div class="sky__counter">
              <div class="sky__counter-val" id="c-hearts">0</div>
              <div class="sky__counter-label">kalp atışı</div>
            </div>
            <div class="sky__counter">
              <div class="sky__counter-val" id="c-moons">0</div>
              <div class="sky__counter-label">dolunay</div>
            </div>
          </div>
        </div>

        <!-- Timeline -->
        <div class="sky__timeline" id="sky-timeline">
          <h3 class="sky__timeline-title">O Gün Dünyada Neler Oluyordu?</h3>
          <div class="sky__timeline-list">
            <div class="sky__tl-item">
              <span class="sky__tl-icon">🎵</span>
              <div>
                <strong>"Wannabe" — Spice Girls</strong>
                <span>Dünya listelerinde #1</span>
              </div>
            </div>
            <div class="sky__tl-item">
              <span class="sky__tl-icon">🎬</span>
              <div>
                <strong>Star Wars: Special Edition</strong>
                <span>Sinemalarda yeniden vizyonda</span>
              </div>
            </div>
            <div class="sky__tl-item">
              <span class="sky__tl-icon">💻</span>
              <div>
                <strong>İnternet henüz dial-up</strong>
                <span>Google daha kurulmamış</span>
              </div>
            </div>
            <div class="sky__tl-item">
              <span class="sky__tl-icon">📱</span>
              <div>
                <strong>Nokia 6110</strong>
                <span>"Akıllı telefon" diye bir şey yok</span>
              </div>
            </div>
            <div class="sky__tl-item">
              <span class="sky__tl-icon">🐑</span>
              <div>
                <strong>Dolly koyun klonlandı</strong>
                <span>Bilim dünyası şokta (5 ay önce)</span>
              </div>
            </div>
            <div class="sky__tl-item">
              <span class="sky__tl-icon">🏀</span>
              <div>
                <strong>Michael Jordan</strong>
                <span>5. şampiyonlık peşinde</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Closing -->
        <div class="sky__closing">
          <p>Ve tüm bunlar olurken, <em>sen</em> geldin.<br>
          Dünya o gece daha güzel bir yer oldu.</p>
        </div>

      </div>

      <footer class="page-footer">
        <button class="secret-star" id="secret-star-sky" aria-label="Gizli sayfa">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
        </button>
      </footer>
    </div>

    <!-- Fullscreen Star Chart Modal -->
    <div class="starchart-modal" id="starchart-modal" role="dialog" aria-modal="true" aria-label="Doğum günü gökyüzü haritası">
      <canvas class="starchart-modal__canvas" id="starchart-canvas-sky"></canvas>
      <div class="starchart-modal__overlay">
        <div class="starchart-modal__header">
          <div class="starchart-modal__title">
            <h2>Doğduğun Gecenin Gökyüzü</h2>
            <p>24 Şubat 1997 · 22:00 · Kahramanmaraş</p>
          </div>
          <button class="starchart-modal__close" id="starchart-close-sky" aria-label="Kapat">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="starchart-modal__footer">
          <span>♓ Pisces bölgesi işaretli · Fareyi hareket ettir</span>
        </div>
      </div>
    </div>
  `;

  // Tilt on hero
  const heroEl = container.querySelector('#sky-hero');
  const cleanTilt = tiltEffect(heroEl, 5);

  // Counters
  const countersWrap = container.querySelector('#sky-counters');
  const cleanVis = onVisible(countersWrap, () => {
    animateCounter(container.querySelector('#c-days'), daysAlive, 2000);
    animateCounter(container.querySelector('#c-hours'), hoursAlive, 2500);
    animateCounter(container.querySelector('#c-hearts'), heartsBeaten, 3000);
    animateCounter(container.querySelector('#c-moons'), fullMoons, 1500);
    staggerChildren(countersWrap, '.sky__counter', 120);
  });

  // Timeline stagger
  const timeline = container.querySelector('#sky-timeline');
  const cleanVisTl = onVisible(timeline, () => {
    staggerChildren(timeline, '.sky__tl-item', 80);
  });

  // Star chart modal
  const chartBtn = container.querySelector('#sky-chart-open');
  const modal = container.querySelector('#starchart-modal');
  const closeBtn = container.querySelector('#starchart-close-sky');
  const chartCanvas = container.querySelector('#starchart-canvas-sky');

  function openChart() {
    modal.classList.add('starchart-modal--visible');
    document.body.style.overflow = 'hidden';
    if (!starChartInstance) starChartInstance = createStarChart(chartCanvas, modal);
    closeBtn.focus();
  }
  function closeChart() {
    modal.classList.remove('starchart-modal--visible');
    document.body.style.overflow = '';
    if (starChartInstance) { starChartInstance.destroy(); starChartInstance = null; }
    chartBtn.focus();
  }

  chartBtn.addEventListener('click', openChart);
  closeBtn.addEventListener('click', closeChart);
  const onKey = (e) => { if (e.key === 'Escape' && modal.classList.contains('starchart-modal--visible')) closeChart(); };
  document.addEventListener('keydown', onKey);

  // Secret star
  let cc = 0, ct = null;
  const ss = container.querySelector('#secret-star-sky');
  if (ss) ss.addEventListener('click', () => { cc++; clearTimeout(ct); if (cc >= 5) { cc = 0; window.location.hash = '/secret'; } ct = setTimeout(() => cc = 0, 2000); });

  return () => {
    starfield.destroy(); canvas.remove(); cleanTilt(); cleanVis(); cleanVisTl();
    if (starChartInstance) starChartInstance.destroy();
    document.removeEventListener('keydown', onKey);
    document.body.style.overflow = '';
  };
}
