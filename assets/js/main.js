/* ===================================================================
   OKIKI NELSON PORTFOLIO — 2026 EDITION — INTERACTIVE JS
   =================================================================== */

const PORTFOLIO_CONFIG = {
  projects: [
    {
      featured: true,
      title: 'Skiflux Backend',
      description: 'Backend service powering the Skiflux platform.',
      status: 'Project',
      highlights: [],
      tags: ['Backend'],
      links: {},
    },
    {
      title: 'Job Board',
      description: 'Job board application.',
      status: 'Project',
      highlights: [],
      tags: ['Web'],
      links: { github: 'https://github.com/maandel/job_board' },
    },
    {
      title: 'Event Ticket',
      description: 'Event ticketing application.',
      status: 'Project',
      highlights: [],
      tags: ['Web'],
      links: { github: 'https://github.com/maandel/event_ticket' },
    },
    {
      title: 'E‑Library',
      description: 'E‑library application.',
      status: 'Project',
      highlights: [],
      tags: ['Web'],
      links: { github: 'https://github.com/maandel/E-Library' },
    },
    {
      title: 'Hotel Booking',
      description: 'Hotel booking application.',
      status: 'Project',
      highlights: [],
      tags: ['Web'],
      links: { github: 'https://github.com/maandel/hotel_booking' },
    },
    {
      title: 'New Portfolio',
      description: 'Personal portfolio site.',
      status: 'Live',
      highlights: [],
      tags: ['Portfolio'],
      links: { github: 'https://github.com/maandel/New-Portfolio' },
    },
  ],
  chatbot: {
    enabled: true,
  },
};

window.PORTFOLIO_CONFIG = window.PORTFOLIO_CONFIG || PORTFOLIO_CONFIG;

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
  const overlay = document.getElementById('navOverlay');
  const navLinks = document.querySelectorAll('#navMenu a');

  if (!navToggle || !navbar) return;

  const closeMenu = () => {
    navbar.classList.remove('mobile-open');
    navToggle.setAttribute('aria-expanded', 'false');
    if (overlay) overlay.hidden = true;
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    navbar.classList.add('mobile-open');
    navToggle.setAttribute('aria-expanded', 'true');
    if (overlay) overlay.hidden = false;
    document.body.style.overflow = 'hidden';
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navbar.classList.contains('mobile-open');
    if (isOpen) closeMenu();
    else openMenu();
  });

  if (overlay) overlay.addEventListener('click', closeMenu);

  navLinks.forEach((link) => link.addEventListener('click', closeMenu));

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbar.classList.contains('mobile-open')) closeMenu();
  });
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

(function () {
  const grid = document.getElementById('projectsGrid');
  const empty = document.getElementById('projectsEmpty');
  if (!grid) return;

  const cfg = window.PORTFOLIO_CONFIG?.projects ?? PORTFOLIO_CONFIG.projects;
  const projects = Array.isArray(cfg) ? cfg : [];

  const createEl = (tag, attrs = {}) => {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else el.setAttribute(k, v);
    });
    return el;
  };

  const folderIcon = () =>
    `<svg class="folder-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>`;

  const iconLink = (href, label, iconSvg) => {
    if (!href) return null;
    const a = createEl('a', {
      href,
      target: '_blank',
      rel: 'noreferrer',
      'aria-label': label,
      class: 'project-icon-link',
    });
    a.innerHTML = iconSvg;
    return a;
  };

  const createCard = (p, idx) => {
    const card = createEl('div', { class: `project-card${p.featured || idx === 0 ? ' featured' : ''}` });

    const header = createEl('div', { class: 'project-card-header' });
    const top = createEl('div', { class: 'project-card-top' });

    const iconWrap = createEl('div');
    iconWrap.innerHTML = folderIcon();
    top.appendChild(iconWrap.firstElementChild);

    const links = createEl('div', { class: 'project-card-links' });
    const gh = iconLink(
      p.links?.github,
      'GitHub',
      `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`
    );
    const demo = iconLink(
      p.links?.demo,
      'Live demo',
      `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" /></svg>`
    );
    if (demo) links.appendChild(demo);
    if (gh) links.appendChild(gh);
    top.appendChild(links);
    header.appendChild(top);

    if (p.status) {
      const status = createEl('span', { class: 'project-status live' });
      status.appendChild(createEl('span', { class: 'live-dot' }));
      status.appendChild(createEl('span', { text: ` ${p.status}` }));
      header.appendChild(status);
    }

    card.appendChild(header);

    card.appendChild(createEl('h3', { class: 'project-card-title', text: p.title || 'Project' }));
    card.appendChild(
      createEl('p', { class: 'project-card-desc', text: p.description || 'Add a short description.' })
    );

    const highlights = createEl('div', { class: 'project-highlights' });
    (Array.isArray(p.highlights) ? p.highlights : []).slice(0, 4).forEach((h) => {
      highlights.appendChild(createEl('span', { text: String(h) }));
    });
    if (highlights.childElementCount) card.appendChild(highlights);

    const tags = createEl('div', { class: 'project-card-tags' });
    (Array.isArray(p.tags) ? p.tags : []).slice(0, 6).forEach((t) => {
      tags.appendChild(createEl('span', { text: String(t) }));
    });
    if (tags.childElementCount) card.appendChild(tags);

    return card;
  };

  if (!projects.length) {
    if (empty) empty.hidden = false;
    return;
  }

  if (empty) empty.hidden = true;
  grid.replaceChildren();
  projects.slice(0, 6).forEach((p, idx) => grid.appendChild(createCard(p, idx)));
})();

(function () {
  const enabled = window.PORTFOLIO_CONFIG?.chatbot?.enabled ?? PORTFOLIO_CONFIG.chatbot.enabled;
  if (!enabled) return;

  const launcher = document.getElementById('chatbotLauncher');
  const panel = document.getElementById('chatbotPanel');
  const closeBtn = document.getElementById('chatbotClose');
  const form = document.getElementById('chatbotForm');
  const input = document.getElementById('chatbotInput');
  const messages = document.getElementById('chatbotMessages');
  const suggestions = document.getElementById('chatbotSuggestions');

  if (!launcher || !panel || !closeBtn || !form || !input || !messages) return;

  panel.hidden = true;
  launcher.setAttribute('aria-expanded', 'false');

  const createBubble = (role, text) => {
    const wrap = document.createElement('div');
    wrap.className = `chatbot-bubble ${role}`;
    wrap.textContent = text;
    return wrap;
  };

  const addAssistant = (text) => {
    messages.appendChild(createBubble('assistant', text));
    messages.scrollTop = messages.scrollHeight;
  };

  const addUser = (text) => {
    messages.appendChild(createBubble('user', text));
    messages.scrollTop = messages.scrollHeight;
  };

  const open = () => {
    panel.hidden = false;
    launcher.setAttribute('aria-expanded', 'true');
    setTimeout(() => input.focus(), 0);
  };

  const close = () => {
    panel.hidden = true;
    launcher.setAttribute('aria-expanded', 'false');
    launcher.focus();
  };

  const getText = (sel) => document.querySelector(sel)?.textContent?.trim() || '';
  const getHref = (sel) => document.querySelector(sel)?.getAttribute('href') || '';

  const respond = (raw) => {
    const msg = String(raw || '').trim();
    const q = msg.toLowerCase();

    if (!msg) return "Ask me about skills, projects, or how to get in touch.";

    if (q.includes('project')) {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      return "Here are my featured projects. Want me to summarize any one of them?";
    }

    if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire')) {
      const email = getHref('a[href^="mailto:"]')?.replace('mailto:', '') || 'nelsonokiki@gmail.com';
      const linkedIn = getHref('a[href*="linkedin.com"]') || '';
      const github = getHref('a[href*="github.com"]') || '';
      const parts = [`Email: ${email}`];
      if (linkedIn) parts.push(`LinkedIn: ${linkedIn}`);
      if (github) parts.push(`GitHub: ${github}`);
      return parts.join('\n');
    }

    if (q.includes('skill') || q.includes('stack') || q.includes('tech')) {
      const pills = Array.from(document.querySelectorAll('.hero-tech-stack .tech-pill'))
        .slice(0, 8)
        .map((el) => el.textContent.trim())
        .filter(Boolean);
      return pills.length
        ? `Core stack: ${pills.join(', ')}.`
        : "Core stack: Python, FastAPI, Django, PostgreSQL, Docker.";
    }

    if (q.includes('who') || q.includes('what do you do') || q.includes('about')) {
      return getText('.hero-description') || "I build scalable backend systems and production-ready APIs in Python.";
    }

    if (q.includes('experience') || q.includes('work') || q.includes('timeline')) {
      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
      const current = Array.from(document.querySelectorAll('#experience .timeline-item .timeline-role'))
        .slice(0, 2)
        .map((el) => el.textContent.trim())
        .filter(Boolean);
      return current.length ? `Recent roles: ${current.join(' • ')}.` : "Check the Experience section for recent roles and impact.";
    }

    return "I’m a portfolio assistant (no AI). I can answer based on what’s on this page: skills, projects, experience, and contact.";
  };

  if (!messages.childElementCount) {
    addAssistant("Hi — I’m the portfolio assistant (demo mode). Ask about projects, skills, or contact.");
  }

  launcher.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    panel.hidden ? open() : close();
  });

  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) close();
  });

  document.addEventListener('click', (e) => {
    if (panel.hidden) return;
    const root = document.getElementById('chatbot');
    if (root && !root.contains(e.target)) close();
  });

  if (suggestions) {
    suggestions.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-chat-suggest]');
      if (!btn) return;
      const text = btn.getAttribute('data-chat-suggest') || '';
      if (!panel.hidden) input.focus();
      input.value = text;
      form.requestSubmit();
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    addUser(value);
    input.value = '';
    const answer = respond(value);
    setTimeout(() => addAssistant(answer), 220);
  });
})();
