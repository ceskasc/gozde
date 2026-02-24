// ===== NAVBAR COMPONENT =====
import { navigate, getCurrentRoute, onNavigate } from '../utils/router.js';
import { getVisited, getProgress } from '../utils/storage.js';

const NAV_LINKS = [
    { path: '/', label: 'Ana', short: '✦' },
    { path: '/sky', label: 'Gökyüzü' },
    { path: '/pisces', label: 'Burç' },
    { path: '/reasons', label: 'Nedenler' },
    { path: '/letter', label: 'Mektup' },
    { path: '/coupon', label: 'Kupon' },
    { path: '/studio', label: 'Stüdyo' },
];

let secretClickCount = 0;
let secretTimer = null;

export function createNavbar(container) {
    container.innerHTML = '';
    container.classList.add('navbar');

    // Brand
    const brand = document.createElement('a');
    brand.href = '#';
    brand.classList.add('navbar__brand');
    brand.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="navbar__brand-icon">
            <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="var(--c-accent)" />
            <circle cx="12" cy="12" r="3" fill="var(--c-bg)" />
        </svg>
        <span class="navbar__brand-text">Gözde'm</span>
    `;
    brand.addEventListener('click', (e) => {
        e.preventDefault();
        navigate('/');
    });

    // Desktop links (collapsed on mobile via CSS)
    const actions = document.createElement('div');
    actions.classList.add('navbar__actions');

    NAV_LINKS.forEach(link => {
        const a = document.createElement('button');
        a.classList.add('navbar__link');
        a.textContent = link.label;
        a.setAttribute('role', 'link');
        a.setAttribute('aria-label', `${link.label} sayfasına git`);
        if (getCurrentRoute() === link.path) a.classList.add('navbar__link--active');
        a.addEventListener('click', () => navigate(link.path));
        actions.appendChild(a);
    });




    container.appendChild(brand);
    container.appendChild(actions);

    // Progress bar
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress');
    progressBar.setAttribute('role', 'progressbar');
    progressBar.setAttribute('aria-label', 'İlerleme');
    document.body.appendChild(progressBar);

    function updateProgress() {
        const p = getProgress();
        progressBar.style.width = `${p * 100}%`;
        progressBar.setAttribute('aria-valuenow', Math.round(p * 100));
    }

    function updateActiveLink(route) {
        actions.querySelectorAll('.navbar__link').forEach((a, i) => {
            a.classList.toggle('navbar__link--active', NAV_LINKS[i].path === route);
        });
        updateProgress();
    }

    updateProgress();

    const cleanup = onNavigate(updateActiveLink);

    return { updateProgress, cleanup: () => { cleanup(); progressBar.remove(); } };
}
