// motion.js — Scroll animations and smooth behavior

(function() {
  'use strict';

  // --- Smooth scroll anchor links ---
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // --- Nav background on scroll ---
  function initNavScroll() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    function updateNav() {
      if (window.scrollY > 60) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  // --- Scroll reveal animations ---
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  }

  // --- Stagger children ---
  function initStagger() {
    document.querySelectorAll('.stagger-children').forEach(parent => {
      Array.from(parent.children).forEach((child, i) => {
        child.style.transitionDelay = `${i * 0.1}s`;
        child.classList.add('reveal');
      });
    });
  }

  // --- Hero entry animation ---
  function initHeroAnimation() {
    const heroReveal = document.querySelectorAll('.hero-reveal');
    heroReveal.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 150 + i * 120);
    });
  }

  // --- Subtle parallax for hero ---
  function initParallax() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroImage = heroSection.querySelector('.hero-image');
      if (heroImage && scrollY < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrollY * 0.06}px)`;
      }
    }, { passive: true });
  }

  // --- Page load fade in ---
  function initPageFade() {
    document.body.style.opacity = '0';
    window.addEventListener('load', () => {
      document.body.style.transition = 'opacity 0.4s ease';
      document.body.style.opacity = '1';
    });
  }

  // Initialize everything
  document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initNavScroll();
    initStagger();
    initScrollReveal();
    initHeroAnimation();
    initParallax();
  });

  initPageFade();

  window.PortfolioMotion = { initScrollReveal };
})();
