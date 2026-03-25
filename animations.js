/* ============================================
   Scroll Reveal Animations
   Uses Intersection Observer for performant
   scroll-triggered animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal with Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animations for siblings
                const siblings = entry.target.parentElement.querySelectorAll('.reveal');
                let staggerIndex = 0;
                siblings.forEach((sibling, i) => {
                    if (sibling === entry.target) staggerIndex = i;
                });

                entry.target.style.transitionDelay = `${staggerIndex * 0.1}s`;
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrolled * 0.4}px`;
        }, { passive: true });
    }

    // Smooth header shadow on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        }, { passive: true });
    }

    // Counter animation for stats (if present)
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 60;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
        counterObserver.observe(counter);
    });

    // Magnetic hover effect for buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // Tilt effect on cards
    document.querySelectorAll('.card, .service-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const tiltX = (y - 0.5) * 8;
            const tiltY = (x - 0.5) * -8;
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});
