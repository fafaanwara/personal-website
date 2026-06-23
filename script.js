// ===========================================================
// PREMIUM INTERACTIVE EFFECTS
// ===========================================================

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const numberOfParticles = 30;
    
    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 10 + 's';
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random color
        const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
}

// Smooth scroll reveal animation
function revealOnScroll() {
    const cards = document.querySelectorAll('.skill-card, .service-card, .social-btn');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Tilt effect on cards
function addTiltEffect() {
    const cards = document.querySelectorAll('.skill-card, .service-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Typewriter effect for motto
function typewriterEffect() {
    const motto = document.querySelector('.motto');
    if (!motto) return;
    
    const text = motto.textContent;
    motto.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            motto.textContent += text.charAt(i);
            i++;
            setTimeout(type, 30);
        }
    }
    
    // Start after 1 second
    setTimeout(type, 1000);
}

// Counter animation for stats
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = stat.textContent;
        const isPlus = target.includes('+');
        const number = parseInt(target);
        
        if (isNaN(number)) return;
        
        let current = 0;
        const increment = number / 50;
        const duration = 1500;
        const stepTime = duration / 50;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= number) {
                stat.textContent = isPlus ? number + '+' : number;
                clearInterval(counter);
            } else {
                stat.textContent = isPlus ? Math.floor(current) + '+' : Math.floor(current);
            }
        }, stepTime);
    });
}

// Mouse parallax effect on gradient orbs
function parallaxEffect() {
    document.addEventListener('mousemove', (e) => {
        const orbs = document.querySelectorAll('.gradient-orb');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    addTiltEffect();
    parallaxEffect();
    
    // Small delay for animations
    setTimeout(() => {
        typewriterEffect();
        animateStats();
    }, 500);
    
    // Reveal elements on scroll
    revealOnScroll();
});

// Console welcome message
console.log('%c✨ Welcome to Premium Bio! %c🚀',
    'font-size: 20px; font-weight: bold; color: #60A5FA;',
    'font-size: 14px;');
console.log('%cDesigned with ❤️ and modern aesthetics',
    'color: #94A3B8; font-style: italic;');