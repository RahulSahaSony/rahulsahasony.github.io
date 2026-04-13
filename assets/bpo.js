// bpo.js — NexaCore Solutions BPO Website JS

// ── Navigation ──────────────────────────────────────────────
(function initNav() {
  const nav = document.querySelector('nav');
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('nav-menu');
  const links = menu ? menu.querySelectorAll('.nav-link') : [];

  function setNavScrolled() {
    if (!nav) return;
    nav.classList.toggle('nav-scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', setNavScrolled, { passive: true });
  setNavScrolled();

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('active');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '✕' : '☰';
    });
    links.forEach(l => l.addEventListener('click', () => {
      menu.classList.remove('active');
      toggle.textContent = '☰';
    }));
    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && menu.classList.contains('active')) {
        menu.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      }
    });
  }
})();

// ── Back to Top ──────────────────────────────────────────────
(function initBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M18 15l-6-6-6 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > 400), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ── Scroll Reveal ────────────────────────────────────────────
(function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
})();

// ── Stagger Children Reveal ──────────────────────────────────
(function initStagger() {
  document.querySelectorAll('.stagger').forEach(parent => {
    const children = Array.from(parent.children);
    children.forEach(child => child.classList.add('reveal'));
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    children.forEach(c => io.observe(c));
  });
})();

// ── Animated Counter ─────────────────────────────────────────
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  function animateCount(el) {
    const target = parseFloat(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 2000;
    const isFloat = target % 1 !== 0;
    const start = performance.now();

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function update(now) {
      const elapsed = Math.min((now - start) / duration, 1);
      const eased = easeOutExpo(elapsed);
      const current = isFloat
        ? (eased * target).toFixed(1)
        : Math.floor(eased * target);
      el.textContent = prefix + current + suffix;
      if (elapsed < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => io.observe(c));
})();

// ── Typewriter Effect ────────────────────────────────────────
function typewriter(el, words, speed = 90, pause = 2200) {
  if (!el) return;
  let wIdx = 0, cIdx = 0, deleting = false;

  function tick() {
    const word = words[wIdx];
    if (deleting) {
      cIdx--;
      el.textContent = word.slice(0, cIdx);
      if (cIdx === 0) {
        deleting = false;
        wIdx = (wIdx + 1) % words.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, speed / 2);
    } else {
      cIdx++;
      el.textContent = word.slice(0, cIdx);
      if (cIdx === word.length) {
        setTimeout(() => { deleting = true; tick(); }, pause);
        return;
      }
      setTimeout(tick, speed);
    }
  }
  tick();
}

document.addEventListener('DOMContentLoaded', () => {
  const tw = document.getElementById('typewriter-target');
  if (tw) {
    typewriter(tw, [
      'Business Excellence.',
      'Sustainable Growth.',
      'Global Reach.',
      'Proven Results.'
    ]);
  }

  // Contact form
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const msg = document.getElementById('form-success');
      btn.disabled = true;
      btn.textContent = 'Sending…';
      setTimeout(() => {
        btn.textContent = 'Message Sent!';
        if (msg) msg.classList.add('show');
        form.reset();
        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = 'Send Inquiry';
          if (msg) msg.classList.remove('show');
        }, 4000);
      }, 1200);
    });
  }
});
