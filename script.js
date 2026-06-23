// ===========================================================
// AMBIENT CURSOR GLOW — mengikuti gerak mouse, halus & lambat
// ===========================================================
const cursorGlow = document.getElementById('cursorGlow');
let glowX = window.innerWidth / 2;
let glowY = window.innerHeight / 3;
let targetX = glowX;
let targetY = glowY;
const isTouchDevice = window.matchMedia('(hover: none)').matches;

if (cursorGlow && !isTouchDevice) {
    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    function animateGlow() {
        glowX += (targetX - glowX) * 0.08;
        glowY += (targetY - glowY) * 0.08;
        cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px)`;
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
} else if (cursorGlow) {
    cursorGlow.style.display = 'none';
}

// ===========================================================
// REVEAL ON SCROLL — section masuk satu per satu
// ===========================================================
const revealTargets = document.querySelectorAll('.block');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${i * 0.04}s`;
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

// ===========================================================
// AVATAR RING — bereaksi ringan terhadap posisi mouse di area identitas
// ===========================================================
const avatar = document.getElementById('avatar');
const identityPane = document.querySelector('.identity-pane');

if (avatar && identityPane && !isTouchDevice) {
    identityPane.addEventListener('mousemove', (e) => {
        const rect = avatar.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / 18;
        const dy = (e.clientY - cy) / 18;
        avatar.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    identityPane.addEventListener('mouseleave', () => {
        avatar.style.transform = 'translate(0, 0)';
    });
}