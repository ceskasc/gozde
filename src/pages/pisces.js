// ===== PISCES PAGE — PREMIUM =====
import { markVisited } from '../utils/storage.js';
import { staggerChildren, onVisible } from '../utils/motion.js';
import { createMetaballs } from '../graphics/metaballs.js';

const SCIENCE_TRAITS = [
  { emoji: '🧠', title: 'Empati Kapasitesi', desc: 'Ayna nöronlar ortalamanın 3 katı aktif. Karşısındakinin ruh halini Wi-Fi gibi algılar.', stat: '3x', statLabel: 'ortalama üstü' },
  { emoji: '🎨', title: 'Yaratıcı Zekâ', desc: 'Sağ hemisfer dominantlığı: hayal gücü, sezgi, sanatsal dürtü — hepsi factory ayarında yüksek.', stat: '92%', statLabel: 'sağ hemisfer' },
  { emoji: '🌊', title: 'Adaptasyon', desc: 'Su elementi: akışkan, esnek, şekil alır ama özünü asla kaybetmez.', stat: '∞', statLabel: 'esneklik' },
  { emoji: '💡', title: 'Sezgisel Akıl', desc: 'Data olmadan pattern recognition. Bazıları buna altıncı his diyor, biz "advanced intuition" diyoruz.', stat: '6th', statLabel: 'sense' },
  { emoji: '❤️', title: 'Duygusal Derinlik', desc: 'Yüzeyde sakin, dipte okyanus. Her duyguyu gerçekten yaşar, yarım bırakmaz.', stat: '11k', statLabel: 'metre derinlik' },
  { emoji: '✨', title: 'İnsanları Okuma', desc: 'Bir bakışta hikâyeyi anlar. Kelimelere ihtiyaç duymaz, sessizliği bile dinler.', stat: '0.3s', statLabel: 'okuma süresi' },
];

const ASTRO_TRAITS = [
  { emoji: '♓', title: 'Romantizm', desc: 'Premium paket — sınırsız kullanım, gizli ücret yok.', stat: '∞', statLabel: 'unlimited' },
  { emoji: '🔮', title: 'Sezgi', desc: 'Wi-Fi yokken bile çeker. 5G falan değil, doğuştan gelen frekans.', stat: '5G+', statLabel: 'frekans' },
  { emoji: '🥺', title: 'Empati', desc: 'Karşısındaki üzülünce o da üzülür. Karşısındaki sevinince gözleri parlar.', stat: '100%', statLabel: 'sync oranı' },
  { emoji: '🎭', title: 'Mood Değişimi', desc: '0-100 arası mood transition: 0.3 saniye. Ferrari bile bu kadar hızlı değildir.', stat: '0.3s', statLabel: 'geçiş hızı' },
  { emoji: '💫', title: 'Hayal Gücü', desc: 'Gerçeklik seviyesi: "şimdi hangisi gerçekti?" — cevabı bile güzeldir.', stat: '4D', statLabel: 'imagination' },
  { emoji: '🧩', title: 'Gizem', desc: 'Her katmanın altında yeni bir katman. Bitmez, tükenmez, sıkılmazsın.', stat: '∞', statLabel: 'katman' },
];

export default function pisces(container) {
  markVisited('/pisces');

  const canvas = document.createElement('canvas');
  canvas.classList.add('sky__canvas'); // Keep the background z-index class
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);

  const bgEffect = createMetaballs(canvas, document.body, {
    opacity: 0.15,
    color1: [110, 140, 255], // Deep oceanic blue
    color2: [168, 85, 247],  // Mystical purple
    count: 5,
  });

  let isAstro = false;

  function render() {
    const traits = isAstro ? ASTRO_TRAITS : SCIENCE_TRAITS;

    container.innerHTML = `
      <div class="page pisces">
        <div class="pisces__content">

          <p class="section-label">♓ Balık Burcu Analizi</p>
          <h2 class="section-title">Gözde Güngör: Decoded</h2>
          <p class="section-subtitle" style="text-align:center;">
            ${isAstro
        ? 'Yıldızlar ne diyorsa o. Bilim falan sonra, önce vibes.'
        : 'Balık burcu özelliklerinin bilimsel(ish) analizi. Peer-reviewed değil ama close enough.'}
          </p>

          <div class="pisces__mode-switch">
            <div class="toggle" role="switch" aria-checked="${isAstro}" tabindex="0" id="mode-toggle">
              <span class="toggle__label ${!isAstro ? 'toggle__label--active' : ''}">Bilim</span>
              <div class="toggle__track ${isAstro ? 'toggle__track--active' : ''}">
                <div class="toggle__thumb"></div>
              </div>
              <span class="toggle__label ${isAstro ? 'toggle__label--active' : ''}">Astro</span>
            </div>
          </div>

          <div class="pisces__grid">
            ${traits.map(t => `
              <div class="pisces__card">
                <div class="pisces__card-header">
                  <span class="pisces__card-emoji">${t.emoji}</span>
                  <div class="pisces__card-stat">
                    <span class="pisces__card-stat-val">${t.stat}</span>
                    <span class="pisces__card-stat-label">${t.statLabel}</span>
                  </div>
                </div>
                <h3 class="pisces__card-title">${t.title}</h3>
                <p class="pisces__card-desc">${t.desc}</p>
              </div>
            `).join('')}
          </div>

          <div class="pisces__compat" id="pisces-compat">
            <div class="pisces__compat-header">
              <h3>Uyum Analizi</h3>
              <span class="pisces__compat-badge">${isAstro ? 'ASTRO ENGINE' : 'DATA SCIENCE'}</span>
            </div>
            <div class="pisces__compat-names">
              <span>Sadık</span>
              <span class="pisces__compat-heart">♥</span>
              <span>Gözde</span>
            </div>
            <div class="pisces__compat-bar">
              <div class="pisces__compat-fill" id="compat-fill"></div>
            </div>
            <div class="pisces__compat-row">
              <span class="pisces__compat-pct" id="compat-pct">0%</span>
              <span class="pisces__compat-msg" id="compat-msg"></span>
            </div>
          </div>

          <div class="pisces__quote">
            <p>${isAstro
        ? '"İki Balık yan yana yüzmez — ruhları iç içe geçer."'
        : '"Korelasyon nedensellik değildir. Ama sizin ikinizde doğrudan nedensellik var."'}</p>
          </div>

        </div>

        <footer class="page-footer">
          <button class="secret-star" id="secret-star-pisces" aria-label="Gizli sayfa">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
          </button>
        </footer>
      </div>
    `;

    // Toggle handler
    const toggle = container.querySelector('#mode-toggle');
    toggle.addEventListener('click', () => { isAstro = !isAstro; render(); });
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); isAstro = !isAstro; render(); }
    });

    // Stagger cards
    staggerChildren(container.querySelector('.pisces__grid'), '.pisces__card', 80);

    // Animate compat bar
    const fill = container.querySelector('#compat-fill');
    const pct = container.querySelector('#compat-pct');
    const msg = container.querySelector('#compat-msg');
    const compatWrap = container.querySelector('#pisces-compat');

    onVisible(compatWrap, () => {
      const target = isAstro ? 97 : 94.7;
      fill.style.width = target + '%';
      setTimeout(() => {
        pct.textContent = target + '%';
        msg.textContent = isAstro
          ? '✨ "Bu eşleşme nadir görülür." — Evren'
          : '📊 p < 0.001 — İstatistiksel olarak anlamlı.';
      }, 800);
    });

    // Secret star
    let cc = 0, ct = null;
    const ss = container.querySelector('#secret-star-pisces');
    if (ss) ss.addEventListener('click', () => { cc++; clearTimeout(ct); if (cc >= 5) { cc = 0; window.location.hash = '/secret'; } ct = setTimeout(() => cc = 0, 2000); });
  }

  render();

  return () => { bgEffect.destroy(); canvas.remove(); };
}
