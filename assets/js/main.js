// DOM Elements
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const currentYear = document.getElementById('current-year');
const filterChips = document.querySelectorAll('.filter-chip');
const projectCards = document.querySelectorAll('.project-card');
const resumeLink = document.getElementById('resume-link');
const resumeDownload = document.getElementById('resume-download');
const contactForm = document.getElementById('contact-form');

// Set current year
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Mobile Navigation Toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const bars = navToggle.querySelectorAll('.nav-toggle-bar');
        bars.forEach(bar => bar.classList.toggle('active'));
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Theme Toggle
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
    } else {
        themeIcon.textContent = '🌙';
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });
}

// Initialize theme on page load
initTheme();

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Reveal on scroll
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// Project filtering
if (filterChips.length > 0 && projectCards.length > 0) {
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Update active chip
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            // Filter projects
            const filter = chip.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    // Trigger reflow to restart animation
                    void card.offsetWidth;
                    card.classList.add('active');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Resume link
if (resumeLink) {
    resumeLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.open('assets/resume.pdf', '_blank');
    });
}

if (resumeDownload) {
    resumeDownload.addEventListener('click', (e) => {
        e.preventDefault();
        window.open('assets/resume.pdf', '_blank');
    });
}

// Contact form
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Create mailto link
        const mailtoLink = `mailto:rahul.saha@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Reset form
        contactForm.reset();
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation to navigation toggle bars
const style = document.createElement('style');
style.textContent = `
    .nav-toggle-bar.active:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle-bar.active:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle-bar.active:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);
