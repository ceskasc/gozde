// ===== LOCAL STORAGE WRAPPER =====

const PREFIX = 'gbd_';

export function save(key, value) {
    try {
        localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch (e) { /* quota exceeded or disabled */ }
}

export function load(key, fallback = null) {
    try {
        const raw = localStorage.getItem(PREFIX + key);
        return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
        return fallback;
    }
}

export function remove(key) {
    try {
        localStorage.removeItem(PREFIX + key);
    } catch (e) { /* noop */ }
}

// Visited pages tracking
export function markVisited(route) {
    const visited = load('visited', []);
    if (!visited.includes(route)) {
        visited.push(route);
        save('visited', visited);
    }
}

export function getVisited() {
    return load('visited', []);
}

export function getProgress() {
    const total = 8; // landing, sky, pisces, reasons, letter, coupon, studio, secret
    const visited = getVisited().length;
    return Math.min(visited / total, 1);
}

// Theme
export function getTheme() {
    return load('theme', 'aurora');
}

export function setTheme(theme) {
    save('theme', theme);
}

// Music
export function getMusicState() {
    return load('music', { playing: true, muted: true });
}

export function setMusicState(state) {
    save('music', state);
}

// Coupon
export function getSelectedCoupon() {
    return load('coupon', null);
}

export function setSelectedCoupon(id) {
    save('coupon', id);
}
