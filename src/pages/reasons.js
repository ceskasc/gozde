// ===== REASONS PAGE — PREMIUM =====
import { markVisited } from '../utils/storage.js';
import { staggerChildren, onVisible } from '../utils/motion.js';
import { createSparkle } from '../graphics/sparkle.js';
import { createStarfield } from '../graphics/starfield.js';
import { createFloatingHearts } from '../graphics/hearts.js';

const REASONS = [
  { title: 'Gülüşün', text: 'Bir odayı aydınlatan türden. Işıklar kapansa bile fark etmezdim.', icon: '☀️' },
  { title: 'Dinleme şeklin', text: 'Gerçekten dinliyorsun — cevap hazırlamak için değil, anlamak için.', icon: '🎧' },
  { title: 'Cesaretinle', text: 'Korksan bile yaparsın. Bu, cesaret kelimesinin tam tanımı.', icon: '🦁' },
  { title: 'Detaylara bakışın', text: 'Herkesin kaçırdığı şeyleri sen yakalarsın. Dünya senin gözünden daha zengin.', icon: '🔍' },
  { title: 'Sessizliğin bile', text: 'Seninle susabilmek, çoğu insanla konuşmaktan daha değerli.', icon: '🤫' },
  { title: 'Zekânla', text: 'Sadece bilgi değil — bağlantı kurma, anlam çıkarma, noktaları birleştirme.', icon: '🧠' },
  { title: 'Dokunuşun', text: 'Bir eli tutmayı sanat formuna çevirdin. Her temas bir cümle gibi.', icon: '🤝' },
  { title: 'Komikliğin', text: 'Beklenmedik anda gelen o espri. Zamanlaman mükemmel.', icon: '😂' },
  { title: 'Sadakatin', text: 'Sevdiğin insanların arkasında durursun. Sessizce, ama sarsılmaz.', icon: '🛡️' },
  { title: 'Hayallerin', text: 'Gerçekçi olmayan hayaller kurarsın — ve sonra gerçek yaparsın.', icon: '🚀' },
  { title: 'Kokunla', text: 'Bazı anılar görüntü değil, koku olarak kalır. Senin yokluğun bile bir parfüm gibi.', icon: '🌸' },
  { title: 'Var oluşun', text: 'Dünya senden önce de dönüyordu. Ama anlamlı dönmeye sen gelince başladı.', icon: '🌍' },
];

export default function reasons(container) {
  markVisited('/reasons');

  const canvas = document.createElement('canvas');
  canvas.classList.add('sky__canvas');
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);
  const starfield = createStarfield(canvas, document.body);

  // Add premium floating hearts over the starfield
  const hearts = createFloatingHearts(container);

  container.innerHTML = `
    <div class="page reasons">
      <div class="reasons__content">
        <p class="section-label">12 Küçük Neden</p>
        <h2 class="section-title">Seni Sevmemin Nedenleri</h2>
        <p class="section-subtitle" style="text-align:center;">
          Aslında 12'den çok daha fazla. Ama mükemmel sayı yoktur — başlangıç vardır.
        </p>

        <div class="reasons__grid">
          ${REASONS.map((r, i) => `
            <div class="reasons__card" data-idx="${i}" tabindex="0" role="button" aria-label="Neden ${i + 1}: ${r.title}">
              <div class="reasons__card-top">
                <span class="reasons__card-num">Neden ${String(i + 1).padStart(2, '0')}</span>
                <span class="reasons__card-icon">${r.icon}</span>
              </div>
              <h3 class="reasons__card-title">${r.title}</h3>
              <p class="reasons__card-text">${r.text}</p>
            </div>
          `).join('')}
        </div>

        <div class="reasons__closing">
          <p>Ve belki de en büyük neden:<br>
          <em>Seni sevmek için bir nedene ihtiyacım olmaması.</em></p>
        </div>
      </div>

      <footer class="page-footer">
        <button class="secret-star" id="secret-star-reasons" aria-label="Gizli sayfa">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
        </button>
      </footer>
    </div>
  `;

  // Stagger
  const grid = container.querySelector('.reasons__grid');
  onVisible(grid, () => staggerChildren(grid, '.reasons__card', 60));

  // Sparkle on click
  container.querySelectorAll('.reasons__card').forEach(card => {
    card.addEventListener('click', () => createSparkle(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); createSparkle(card); }
    });
  });

  // Secret star
  let cc = 0, ct = null;
  const ss = container.querySelector('#secret-star-reasons');
  if (ss) ss.addEventListener('click', () => { cc++; clearTimeout(ct); if (cc >= 5) { cc = 0; window.location.hash = '/secret'; } ct = setTimeout(() => cc = 0, 2000); });

  return () => {
    starfield.destroy();
    hearts.destroy();
    canvas.remove();
  };
}
