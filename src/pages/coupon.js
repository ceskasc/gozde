// ===== COUPON PAGE — LDR PREMIUM =====
import { markVisited, getSelectedCoupon, setSelectedCoupon, remove } from '../utils/storage.js';
import { staggerChildren } from '../utils/motion.js';
import { createConfetti } from '../graphics/confetti.js';
import { createStarfield } from '../graphics/starfield.js';

const COUPONS = [
  {
    id: 'virtual-date',
    icon: '🌙',
    title: 'Sanal Gece Başbaşa',
    desc: 'Aynı anda aynı filmi açıyoruz, aynı yemeği söylüyoruz, ekranın öbür tarafında sen varsın. Organizasyonu ben yapıyorum — sen sadece gel.',
    detail: 'Film + yemek + sürpriz playlist',
  },
  {
    id: 'surpriz-kargo',
    icon: '📦',
    title: 'Sürpriz Kargo',
    desc: 'Kapında bir kutu beliriyor. İçinde ne olduğunu bilmiyorsun — ama her şey senin için özenle seçilmiş. Mektup dahil.',
    detail: 'El yazısı mektup + hediyeler',
  },
  {
    id: 'bulusma-plani',
    icon: '✈️',
    title: 'Buluşma Planı',
    desc: 'Bir sonraki buluşmamızı baştan sona ben planlıyorum. Nereye gideceğiz, ne yapacağız, hangi yemekleri yiyeceğiz — hepsi sürpriz.',
    detail: 'Tam gün plan + sürpriz detaylar',
  },
];

export default function coupon(container) {
  markVisited('/coupon');

  // Reset the old coupon selection
  remove('coupon');

  const canvas = document.createElement('canvas');
  canvas.classList.add('sky__canvas');
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);
  const starfield = createStarfield(canvas, document.body);

  const selected = getSelectedCoupon();

  container.innerHTML = `
    <div class="page coupon">
      <div class="coupon__content">
        <p class="section-label">Hediye Kuponu</p>
        <h2 class="section-title">Bir Tane Seç</h2>
        <p class="section-subtitle" style="text-align:center;">
          Üç kupon, bir hak. Son kullanma tarihi yok — ama ne kadar erken kullanırsan, o kadar güzel. 💫
        </p>

        <div class="coupon__notice">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <span>Dikkat: Seçtiğin kupon mühürlenir, değiştirilemez.</span>
        </div>

        ${selected ? `
          <div class="coupon__sealed">
            <div class="coupon__sealed-icon">🎉</div>
            <h3 class="coupon__sealed-title">Kupon Mühürlendi!</h3>
            <p class="coupon__sealed-choice">
              Seçimin: <strong>${COUPONS.find(c => c.id === selected)?.title || selected}</strong>
            </p>
            <p class="coupon__sealed-note">
              Artık geri alınamaz. Sadık bunu yerine getirecek. ✦
            </p>
          </div>
        ` : `
          <div class="coupon__grid">
            ${COUPONS.map(c => `
              <div class="coupon__card" data-coupon="${c.id}" tabindex="0" role="button" aria-label="${c.title} hediye kuponu seç">
                <div class="coupon__card-icon">${c.icon}</div>
                <h3 class="coupon__card-title">${c.title}</h3>
                <p class="coupon__card-desc">${c.desc}</p>
                <div class="coupon__card-detail">
                  <span>${c.detail}</span>
                </div>
                <div class="coupon__card-action">
                  <span>Bunu Seçiyorum →</span>
                </div>
              </div>
            `).join('')}
          </div>
        `}

        <div class="coupon__footer-note">
          <p>Bu kuponlar Sadık tarafından onaylanmıştır.<br>Geçerlilik: <strong>sınırsız</strong> · Kullanım: <strong>1 kez</strong></p>
        </div>
      </div>

      <footer class="page-footer">
        <button class="secret-star" id="secret-star-coupon" aria-label="Gizli sayfa">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
        </button>
      </footer>
    </div>
  `;

  if (!selected) {
    staggerChildren(container.querySelector('.coupon__grid'), '.coupon__card', 100);

    container.querySelectorAll('.coupon__card').forEach(card => {
      const handler = () => {
        const id = card.dataset.coupon;
        container.querySelectorAll('.coupon__card').forEach(c => c.classList.remove('coupon__card--selected'));
        card.classList.add('coupon__card--selected');
        createConfetti(document.body);
        setTimeout(() => { setSelectedCoupon(id); coupon(container); }, 1500);
      };
      card.addEventListener('click', handler);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); }
      });
    });
  }

  // Secret star
  let cc = 0, ct = null;
  const ss = container.querySelector('#secret-star-coupon');
  if (ss) ss.addEventListener('click', () => { cc++; clearTimeout(ct); if (cc >= 5) { cc = 0; window.location.hash = '/secret'; } ct = setTimeout(() => cc = 0, 2000); });

  return () => { starfield.destroy(); canvas.remove(); };
}
