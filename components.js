/**
 * components.js
 * Laadt header.html en footer.html dynamisch in elke pagina.
 * Gebruik: loadComponents('index' | 'diensten' | 'contact')
 */
async function loadComponents(activePage) {

    // ── Laad header ──────────────────────────────────────────
    try {
        const hRes = await fetch('header.html');
        const hHTML = await hRes.text();
        document.getElementById('header-placeholder').innerHTML = hHTML;
        setActiveNav(activePage);
        initHeader();
    } catch (e) {
        console.error('Kon header.html niet laden:', e);
    }

    // ── Laad footer ──────────────────────────────────────────
    try {
        const fRes = await fetch('footer.html');
        const fHTML = await fRes.text();
        document.getElementById('footer-placeholder').innerHTML = fHTML;
    } catch (e) {
        console.error('Kon footer.html niet laden:', e);
    }

    // ── Scroll reveal initialiseren ──────────────────────────
    initReveal();
}

/**
 * Markeert de actieve navigatielink op basis van de paginanaam.
 */
function setActiveNav(page) {
    const links = document.querySelectorAll('#nav-menu a[data-page]');
    links.forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });
}

/**
 * Initialiseert header-gedrag: scroll-schaduw + hamburger menu.
 */
function initHeader() {
    const header = document.getElementById('site-header');
    const burger = document.getElementById('hamburger');
    const menu   = document.getElementById('nav-menu');

    if (!header || !burger || !menu) return;

    // Schaduw bij scrollen
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Hamburger toggle
    burger.addEventListener('click', () => {
        const open = menu.classList.toggle('open');
        burger.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', open);
        document.body.style.overflow = open ? 'hidden' : '';
    });

    // Sluit menu bij klik op nav-link
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
            burger.classList.remove('open');
            burger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Sluit menu bij klik buiten header
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && menu.classList.contains('open')) {
            menu.classList.remove('open');
            burger.classList.remove('open');
            burger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Scroll-reveal via IntersectionObserver.
 * Werkt voor .reveal en .reveal-stagger elementen.
 */
function initReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => observer.observe(el));
}