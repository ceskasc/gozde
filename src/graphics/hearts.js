export function createFloatingHearts(container) {
    const heartCanvas = document.createElement('canvas');
    heartCanvas.classList.add('letter__hearts-canvas');
    // ensure it goes behind content but in front of body background
    heartCanvas.style.position = 'absolute';
    heartCanvas.style.top = '0';
    heartCanvas.style.left = '0';
    heartCanvas.style.width = '100%';
    heartCanvas.style.height = '100%';
    heartCanvas.style.pointerEvents = 'none';
    heartCanvas.style.zIndex = '0';

    // Make sure container is relative so hearts stay within it 
    if (getComputedStyle(container).position === 'static') {
        container.style.position = 'relative';
    }
    container.appendChild(heartCanvas);

    const ctx = heartCanvas.getContext('2d');

    let w, h;
    let hearts = [];
    let raf;

    function resize() {
        w = heartCanvas.width = container.offsetWidth;
        h = heartCanvas.height = container.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function spawnHeart() {
        hearts.push({
            x: Math.random() * w,
            y: h + 20,
            size: 6 + Math.random() * 12,
            speed: 0.4 + Math.random() * 0.6,
            drift: (Math.random() - 0.5) * 0.5,
            opacity: 0.1 + Math.random() * 0.15,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.02,
        });
    }

    function drawHeart(x, y, size, rotation, opacity) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        const s = size;
        ctx.moveTo(0, s * 0.3);
        ctx.bezierCurveTo(-s * 0.5, -s * 0.3, -s, s * 0.1, 0, s);
        ctx.bezierCurveTo(s, s * 0.1, s * 0.5, -s * 0.3, 0, s * 0.3);

        // Create a beautiful premium pink/purple gradient for the hearts
        const grad = ctx.createLinearGradient(-s, -s, s, s);
        grad.addColorStop(0, '#ff6b9d');
        grad.addColorStop(1, '#c084fc');
        ctx.fillStyle = grad;

        ctx.fill();
        ctx.restore();
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);

        if (Math.random() < 0.05) spawnHeart();

        hearts = hearts.filter(heart => {
            heart.y -= heart.speed;
            heart.x += heart.drift;
            heart.rotation += heart.rotSpeed;
            heart.opacity *= 0.999;
            if (heart.y < -30 || heart.opacity < 0.01) return false;
            drawHeart(heart.x, heart.y, heart.size, heart.rotation, heart.opacity);
            return true;
        });

        raf = requestAnimationFrame(animate);
    }
    animate();

    return {
        destroy() {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
            heartCanvas.remove();
        }
    };
}
