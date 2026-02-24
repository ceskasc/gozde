// ===== MOTION / ANIMATION UTILITIES =====

export function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Intersection Observer — trigger on visible
export function onVisible(el, callback, options = {}) {
    if (prefersReducedMotion()) {
        callback(el);
        return () => { };
    }

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target);
                if (!options.repeat) obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || '0px',
    });

    obs.observe(el);
    return () => obs.disconnect();
}

// Stagger animation for child elements
export function staggerChildren(parent, selector, delay = 80) {
    if (prefersReducedMotion()) return;
    const items = parent.querySelectorAll(selector);
    items.forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(16px)';
        item.style.transition = `opacity 0.5s ease ${i * delay}ms, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * delay}ms`;
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            });
        });
    });
}

// Tab visibility
let tabHiddenCallbacks = [];

export function onTabHidden(cb) {
    tabHiddenCallbacks.push(cb);
    return () => {
        tabHiddenCallbacks = tabHiddenCallbacks.filter(fn => fn !== cb);
    };
}

document.addEventListener('visibilitychange', () => {
    const hidden = document.hidden;
    tabHiddenCallbacks.forEach(cb => cb(hidden));
});

// Easing functions
export const easing = {
    easeOutCubic: t => 1 - Math.pow(1 - t, 3),
    easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    easeOutExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
    spring: t => 1 - Math.pow(Math.E, -6 * t) * Math.cos(8 * t),
};

// Magnetic effect for buttons
export function magneticEffect(el, strength = 0.3) {
    if (prefersReducedMotion()) return () => { };

    const onMove = (e) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * strength;
        const dy = (e.clientY - cy) * strength;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    const onLeave = () => {
        el.style.transform = 'translate(0, 0)';
        el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    };

    const onEnter = () => {
        el.style.transition = 'transform 0.1s ease-out';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mouseenter', onEnter);

    return () => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
        el.removeEventListener('mouseenter', onEnter);
    };
}

// Tilt card effect
export function tiltEffect(el, maxTilt = 8) {
    if (prefersReducedMotion()) return () => { };

    const onMove = (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const tiltX = (0.5 - y) * maxTilt;
        const tiltY = (x - 0.5) * maxTilt;
        el.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
    };

    const onLeave = () => {
        el.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)';
        el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    };

    const onEnter = () => {
        el.style.transition = 'transform 0.1s ease-out';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mouseenter', onEnter);

    return () => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
        el.removeEventListener('mouseenter', onEnter);
    };
}

// Ripple effect on click
export function addRipple(el) {
    el.addEventListener('click', (e) => {
        if (prefersReducedMotion()) return;
        const rect = el.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        el.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
    });
}

// Counter animation
export function animateCounter(el, target, duration = 1500) {
    const start = performance.now();
    const update = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(easing.easeOutExpo(progress) * target);
        el.textContent = value.toLocaleString('tr-TR');
        if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}
