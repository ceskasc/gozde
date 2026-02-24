// ===== HASH-BASED SPA ROUTER =====

const routes = new Map();
let currentCleanup = null;
let currentRoute = null;
let onNavigateCallbacks = [];

export function registerRoute(path, handler) {
    routes.set(path, handler);
}

export function navigate(path) {
    if (path === currentRoute) return;
    window.location.hash = path === '/' ? '' : path;
}

export function getCurrentRoute() {
    return currentRoute || '/';
}

export function onNavigate(cb) {
    onNavigateCallbacks.push(cb);
    return () => {
        onNavigateCallbacks = onNavigateCallbacks.filter(fn => fn !== cb);
    };
}

async function handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const handler = routes.get(hash);

    if (!handler) {
        const fallback = routes.get('/');
        if (fallback) {
            window.location.hash = '';
        }
        return;
    }

    const app = document.getElementById('app');

    // Exit animation
    if (currentCleanup) {
        app.querySelector('.page')?.classList.add('page-exit');
        await new Promise(r => setTimeout(r, 280));
        currentCleanup();
        currentCleanup = null;
    }

    app.innerHTML = '';
    currentRoute = hash;

    // Notify callbacks
    onNavigateCallbacks.forEach(cb => cb(hash));

    // Enter
    const cleanup = await handler(app);
    currentCleanup = cleanup || (() => { });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
}

export function initRouter() {
    window.addEventListener('hashchange', handleRoute);
    handleRoute();
}
