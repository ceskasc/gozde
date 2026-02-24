// ===== MAIN ENTRY POINT =====
import './styles/base.css';
import './styles/components.css';
import './styles/pages.css';

import { registerRoute, initRouter } from './utils/router.js';
import { createNavbar } from './components/Navbar.js';
import { initMusic, createMusicControl } from './components/MusicControl.js';

// Lazy page imports
const pages = {
    '/': () => import('./pages/landing.js'),
    '/sky': () => import('./pages/sky.js'),
    '/pisces': () => import('./pages/pisces.js'),
    '/reasons': () => import('./pages/reasons.js'),
    '/letter': () => import('./pages/letter.js'),
    '/coupon': () => import('./pages/coupon.js'),
    '/studio': () => import('./pages/studio.js'),
    '/secret': () => import('./pages/secret.js'),
};



// Register routes
Object.entries(pages).forEach(([path, loader]) => {
    registerRoute(path, async (container) => {
        const module = await loader();
        return module.default(container);
    });
});

// Init navbar
const navContainer = document.getElementById('navbar');
const navbar = createNavbar(navContainer);

// Init music
const musicContainer = document.getElementById('music-control');
initMusic().then(() => {
    createMusicControl(musicContainer);
});

// Start router
initRouter();
