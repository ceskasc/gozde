// ===== LETTER PAGE — ULTRA PREMIUM =====
import { markVisited } from '../utils/storage.js';
import { staggerChildren } from '../utils/motion.js';
import { createStarfield } from '../graphics/starfield.js';
import { createFloatingHearts } from '../graphics/hearts.js';

const LETTER = [
  { type: 'greeting', text: 'Sevgili Gözde,' },

  { type: 'paragraph', text: 'Sana bunu yazarken düşündüm: insanlar doğum günlerinde neler söyler? "Mutlu yıllar," "nice mutlu senelere," falan. Güzel cümleler ama artık kimsenin aslında duymadığı türden. Ben sana farklı bir şey söylemek istiyorum — çünkü sen farklı birisin.' },

  { type: 'paragraph', text: 'Sen benim hayatımdaki en güzel tesadüfsün. Tesadüf diyorum çünkü seni bulmak için bir plan yapmadım — ama seni tanıdıktan sonra her planım seninle güzelleşti. Seni tanımadan önceki hayatıma baktığımda, eksik olan şeyin ne olduğunu şimdi anlıyorum.' },

  { type: 'paragraph', text: 'Bazen gece geç saatlerde, herkes uyurken, telefonuma bakıp senin adını görüyorum ve gülümsüyorum. Hiçbir şey yazmasan bile, orada olduğunu bilmek yetiyor. Bazı insanlar "mesafe ilişkiyi öldürür" der. Ama biz bunun tam tersini kanıtladık. Her kilometre, her saat farkı — hepsi bizi daha güçlü yaptı.' },

  { type: 'paragraph', text: 'Seni özlediğimde hüzünlenmiyorum artık. Çünkü seni özleyebilmek bile bir ayrıcalık. Dünya üzerinde milyarlarca insan var ve ben, tam olarak seni buldum. Bu ne kadar düşük bir ihtimal, düşünsene. Ama oldu. Ve her gün bunun için şükrediyorum.' },

  { type: 'paragraph', text: 'Senin gülüşünü düşünüyorum mesela — o gülüş ki bir odayı değil, benim bütün dünyamı aydınlatıyor. Ya da sinirliyken dudaklarını büzme şeklini. Ya da bir şeye çok konsantre olduğunda kaşlarının hafifçe çatılmasını. Bunlar küçük detaylar belki başkaları için ama benim için her biri bir hazine.' },

  { type: 'paragraph', text: 'Bu projeyi yapmak kolay değildi, biliyor musun? Ama her satır kod yazarken, her renk seçerken, her kelimeyi düzenlerken hep seni düşündüm. "Gözde bunu görünce ne hisseder?" diye sordum kendime. Eğer en az bir kere gülümsediysen, her şeye değdi.' },

  { type: 'paragraph', text: 'Sana söz veriyorum: bir gün bu mesafe bitecek. Aynı şehirde, aynı evde, aynı yastığa baş koyacağız. O gün gelene kadar sana her gün biraz daha âşık olacağım — çünkü her gün senin hakkında yeni bir şey keşfediyorum ve her keşif, seni daha çok sevmem için bir neden daha.' },

  { type: 'paragraph', text: 'Doğum günün kutlu olsun Gözde. Bu sene de, bundan sonraki her sene de. Ama en çok bugün — çünkü bugün dünyanın seni kazandığı gün. Ve ben, dünyanın en şanslı insanıyım. Çünkü bütün bu insanlar arasında, senin kalbinde bir yerim var.' },

  { type: 'closing', text: 'Yakında kavuşacağız. Ve o gün gelene kadar, bu mektup sana sarılsın benim yerime. Her kelimesi bir öpücük, her satırı bir kucaklama olsun.' },
];



// ===== Page =====
export default function letter(container) {
  markVisited('/letter');

  // Starfield
  const canvas = document.createElement('canvas');
  canvas.classList.add('sky__canvas');
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);
  const starfield = createStarfield(canvas, document.body);

  let heartsSystem = null;

  container.innerHTML = `
    <div class="page letter">
      <div class="letter__wrap">

        <!-- Letter Paper Section -->
        <div class="letter__paper-section letter__paper-section--visible" id="letter-content">
          <div class="letter__paper">
            <div class="letter__paper-edge"></div>
            <div class="letter__paper-inner">
              <div class="letter__date-row">
                <span class="letter__date-line"></span>
                <span class="letter__date">24 Şubat 2025</span>
                <span class="letter__date-line"></span>
              </div>

              ${LETTER.map((item, i) => {
    if (item.type === 'greeting') {
      return `<p class="letter__greeting" data-reveal>${item.text}</p>`;
    } else if (item.type === 'closing') {
      return `<p class="letter__text letter__text--closing" data-reveal>${item.text}</p>`;
    } else {
      return `<p class="letter__text" data-reveal>${item.text}</p>`;
    }
  }).join('')}

              <div class="letter__sig" data-reveal>
                <div class="letter__sig-line"></div>
                <p class="letter__sig-love">Seni dünyanın tüm yıldızlarından daha çok seviyorum,</p>
                <p class="letter__sig-name">— Sadık</p>
              </div>
            </div>
          </div>

          <div class="letter__actions" data-reveal>
            <button class="btn btn--ghost" id="share-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              Paylaş
            </button>
            <button class="btn btn--ghost" id="copy-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              Kopyala
            </button>
          </div>
        </div>

      </div>

      <footer class="page-footer">
        <button class="secret-star" id="secret-star-letter" aria-label="Gizli sayfa">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
        </button>
      </footer>
    </div>
  `;

  const letterContent = container.querySelector('#letter-content');

  // Start floating hearts immediately
  heartsSystem = createFloatingHearts(container.querySelector('.letter__wrap'));

  // Stagger reveal each paragraph using IntersectionObserver
  const reveals = letterContent.querySelectorAll('[data-reveal]');
  let delayIndex = 0;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('letter__revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
    observer.observe(el);
    // Auto-reveal the first few elements immediately for visual feedback
    if (i < 4) {
      setTimeout(() => el.classList.add('letter__revealed'), 100 + i * 150);
    }
  });

  // ===== Share / Copy =====
  const shareBtn = container.querySelector('#share-btn');
  const copyBtn = container.querySelector('#copy-btn');
  const fullText = LETTER.map(l => l.text).join('\n\n') + '\n\nSeni dünyanın tüm yıldızlarından daha çok seviyorum,\n— Sadık';

  shareBtn?.addEventListener('click', async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'İyi ki Doğdun Gözde', text: fullText }); }
      catch (e) { }
    } else {
      await navigator.clipboard?.writeText(fullText);
      shareBtn.textContent = 'Kopyalandı!';
      setTimeout(() => { shareBtn.innerHTML = 'Paylaş'; }, 2000);
    }
  });

  copyBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(fullText);
      copyBtn.textContent = 'Kopyalandı ✓';
      setTimeout(() => { copyBtn.innerHTML = 'Kopyala'; }, 2000);
    } catch (e) { }
  });

  // Secret star
  let cc = 0, ct = null;
  const ss = container.querySelector('#secret-star-letter');
  if (ss) ss.addEventListener('click', () => {
    cc++; clearTimeout(ct);
    if (cc >= 5) { cc = 0; window.location.hash = '/secret'; }
    ct = setTimeout(() => cc = 0, 2000);
  });

  return () => {
    if (heartsSystem) heartsSystem.destroy();
    starfield.destroy();
    canvas.remove();
  };
}
