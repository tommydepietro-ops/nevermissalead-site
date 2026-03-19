/* ================================================
   NEVERMISSALEAD — Scripts
   ================================================ */

// ---- Scroll Animations ----
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

// ---- Navbar Scroll Effect ----
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 60) {
        nav.classList.add('nav--scrolled');
    } else {
        nav.classList.remove('nav--scrolled');
    }
    lastScroll = currentScroll;
}, { passive: true });

// ---- Mobile Nav Toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.classList.remove('is-open');
    });
});

// ---- Contact Form ----
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Gather form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Log form submission (replace with real endpoint later)
    console.log('Form submitted:', data);

    // Facebook Pixel lead event
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: 'Demo Request',
            content_category: data.industry
        });
    }

    // Show success state
    contactForm.innerHTML = `
        <div class="form--success" style="grid-column: 1 / -1;">
            <div>
                <div class="form__success-msg">🎉 Demo Request Received!</div>
                <p class="form__success-sub">We'll reach out within 1 business hour to get you set up.</p>
            </div>
        </div>
    `;
});

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
