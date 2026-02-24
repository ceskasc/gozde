# 🎂 Gözde Birthday Experience

Gözde Güngör için hazırlanmış premium doğum günü deneyimi.

## 🚀 Kurulum

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:3000` açılır.

## 📦 Build & Deploy (GitHub Pages)

```bash
npm run build
```

`dist/` klasörünü GitHub Pages'a deploy edin:

1. GitHub repo → Settings → Pages  
2. Source: `Deploy from a branch` → `main` → `/dist` (veya GitHub Actions)
3. Alternatif: `dist/` içeriğini `gh-pages` branch'ine push edin.

## 📁 Proje Yapısı

```
src/
├── components/    # Navbar, MusicControl
├── graphics/      # Aurora, Starfield, Metaballs, Confetti, Sparkle
├── pages/         # 8 sayfa modülü
├── styles/        # tokens.css, base.css, components.css, pages.css
├── utils/         # Router, Storage, Motion, Canvas helpers
└── main.js        # Entry point
```

## 🎨 Kişiselleştirme

| Ne | Nerede |
|---|---|
| İsim / Metin | `src/pages/*.js` içindeki string'ler |
| Doğum tarihi | `src/pages/sky.js` → `birthDate` |
| Renkler | `src/styles/tokens.css` → CSS variables |
| Kupon seçenekleri | `src/pages/coupon.js` → `COUPONS` array |
| Mektup içeriği | `src/pages/letter.js` → HTML string |
| Müzik playlist | `src/components/MusicControl.js` → `PLAYLIST_ID` |

## 🎵 Müzik

YouTube IFrame API ile playlist çalar. Tarayıcı autoplay politikası nedeniyle sayfa açılınca sessiz başlar. Sağ alttaki mini-player'dan sesi açabilirsiniz.

## ✨ Özellikler

- 8 sayfa + gizli sayfa (footer'daki yıldıza 5 kez tıkla)
- Aurora, starfield, metaballs, confetti efektleri
- Zarf açma animasyonu
- 3 generative poster + PNG indirme
- Hediye kuponu + localStorage
- Noir / Aurora tema geçişi
- `prefers-reduced-motion` desteği
- Laptop üzerinde mobil uyumlu
