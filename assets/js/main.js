/* ===================================================================
   OKIKI NELSON PORTFOLIO — 2026 EDITION — INTERACTIVE JS
   =================================================================== */

// ─── Theme Toggle ───
(function () {
  const toggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');

  // Default to dark, allow light
  if (saved === 'light') root.setAttribute('data-theme', 'light');

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isLight = root.getAttribute('data-theme') === 'light';
      if (isLight) {
        root.removeAttribute('data-theme');
        localStorage.removeItem('theme');
      } else {
        root.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    });
  }
})();

// ─── Mobile Menu ───
(function () {
  const navToggle = document.getElementById('navToggle');
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('#navMenu a');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navbar.classList.toggle('mobile-open');
      document.body.style.overflow = navbar.classList.contains('mobile-open')
        ? 'hidden'
        : '';
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navbar.classList.remove('mobile-open');
        document.body.style.overflow = '';
      });
    });
  }
})();

// ─── Nav Shrink on Scroll ───
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const onScroll = () => {
    navbar.classList.toggle('nav-shrink', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ─── Scroll Spy ───
(function () {
  const links = Array.from(document.querySelectorAll('#navMenu a[href^="#"]'));
  const sections = links
    .map((l) => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);

  const update = () => {
    const pos = window.scrollY + 120;
    links.forEach((l) => l.removeAttribute('aria-current'));
    for (let i = sections.length - 1; i >= 0; i--) {
      if (pos >= sections[i].offsetTop) {
        links[i].setAttribute('aria-current', 'page');
        break;
      }
    }
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ─── Smooth Scrolling ───
(function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-height')
      );
      const top = target.offsetTop - (navH || 72);
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

// ─── Back to Top ───
(function () {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener(
    'scroll',
    () => {
      btn.classList.toggle('show', window.scrollY > 400);
    },
    { passive: true }
  );

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ─── Cursor Glow ───
(function () {
  const glow = document.getElementById('cursorGlow');
  if (!glow || window.innerWidth < 768) return;

  let mouseX = 0,
    mouseY = 0,
    glowX = 0,
    glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }

  animateGlow();
})();

// ─── Count-Up Animation for Hero Stats ───
(function () {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 1500;
        const start = performance.now();

        function step(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased);
          if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
        io.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((c) => io.observe(c));
})();

// ─── Reveal on Scroll (IntersectionObserver) ───
(function () {
  const items = document.querySelectorAll(
    '.skill-card, .project-card, .timeline-item, .bento-card, .contact-card'
  );

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // Stagger animation
          entry.target.style.transitionDelay = `${idx * 0.05}s`;
          entry.target.classList.add('reveal', 'visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  items.forEach((el) => {
    el.classList.add('reveal');
    io.observe(el);
  });
})();

// ─── Skill Meter Animation ───
(function () {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document
            .querySelectorAll('.skill-meter-bar > span')
            .forEach((bar) => {
              const w = bar.style.getPropertyValue('--w');
              if (w) bar.style.width = w;
            });
          io.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );

  io.observe(skillsSection);
})();

// ─── Scroll Indicator Hide ───
(function () {
  const indicator = document.getElementById('scrollIndicator');
  if (!indicator) return;

  window.addEventListener(
    'scroll',
    () => {
      indicator.style.opacity = window.scrollY > 100 ? '0' : '1';
    },
    { passive: true }
  );
})();