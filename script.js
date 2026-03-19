/* ================================================
   NEVERMISSALEAD — Scripts v2
   ================================================ */

// ---- Scroll Animations (Intersection Observer) ----
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, {
    threshold: 0.08,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

// ---- Navbar: Solid on Scroll ----
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('nav--scrolled');
    } else {
        nav.classList.remove('nav--scrolled');
    }
}, { passive: true });

// ---- Mobile Nav Toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('is-open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
    });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        navLinks.classList.remove('is-open');
    }
});

// ---- Floating Call Button: Show after scrolling past hero ----
const floatingCall = document.getElementById('floatingCall');
if (floatingCall) {
    const heroSection = document.querySelector('.hero');
    const floatingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Show button when hero is NOT intersecting (scrolled past)
            if (!entry.isIntersecting && window.innerWidth <= 768) {
                floatingCall.style.display = 'flex';
            } else {
                floatingCall.style.display = 'none';
            }
        });
    }, { threshold: 0 });

    if (heroSection) floatingObserver.observe(heroSection);
}

// ---- Contact Form ----
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Facebook Pixel lead event
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                content_name: 'Demo Request',
                content_category: data.industry
            });
        }

        // Show success state
        contactForm.innerHTML = `
            <div class="form--success">
                <div>
                    <div class="form__success-msg">We've Got Your Info!</div>
                    <p class="form__success-sub">We'll reach out within 1 business hour to get you set up.</p>
                </div>
            </div>
        `;
    });
}

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
