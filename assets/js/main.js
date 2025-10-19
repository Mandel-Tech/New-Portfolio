// Theme toggle and persist
(function() {
  const toggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') root.setAttribute('data-theme', 'dark');

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      if (isDark) {
        root.removeAttribute('data-theme');
        localStorage.removeItem('theme');
      } else {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }
})();

// Mobile menu toggle
(function() {
  const navToggle = document.getElementById('navToggle');
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('nav a');

  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navbar.classList.toggle('mobile-open');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navbar.classList.remove('mobile-open');
      });
    });
  }
})();

// Nav shrink on scroll
(function() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const onScroll = () => {
    if (window.scrollY > 10) navbar.classList.add('nav-shrink');
    else navbar.classList.remove('nav-shrink');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Scrollspy using aria-current
(function() {
  const links = Array.from(document.querySelectorAll('nav a[href^="#"]'));
  const sections = links
    .map(l => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);

  const update = () => {
    const pos = window.scrollY + 100;
    sections.forEach((sec, idx) => {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      const link = links[idx];
      if (pos >= top && pos < bottom) {
        links.forEach(l => l.removeAttribute('aria-current'));
        link.setAttribute('aria-current', 'page');
      }
    });
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// Back to top button
(function() {
  const backToTopBtn = document.getElementById('backToTop');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();

// Copy to clipboard for contact
(function() {
  document.querySelectorAll('[data-copy-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSel = btn.getAttribute('data-copy-target');
      const el = document.querySelector(targetSel);
      if (!el) return;
      const text = el.textContent.trim();
      navigator.clipboard.writeText(text).then(() => {
        btn.classList.add('copied');
        const old = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.classList.remove('copied'); btn.textContent = old; }, 1500);
      });
    });
  });
})();

// Contact form handling
(function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };
      
      // Show success message
      const submitBtn = contactForm.querySelector('.form-submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '✓ Message Sent!';
      submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
      
      // Reset form
      contactForm.reset();
      
      // Restore button after 3 seconds
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
      }, 3000);
      
      console.log('Form submitted:', formData);
    });
  }
})();

// Smooth scrolling for navigation links
(function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      // Ignore if href is just '#'
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Animate skill meters when skills section enters view
  const metersRoot = document.getElementById('skills');
  if (metersRoot) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.skill-meter .bar > span').forEach(span => {
            const cls = Array.from(span.classList).find(c => c.startsWith('w-'));
            if (cls) {
              // Width is already set by class; trigger transition by forcing layout
              const width = getComputedStyle(span).width; // force style calc
              span.style.width = ''; // reset
              span.classList.add('animate');
            }
          });
          // Set final widths directly to allow CSS transition
          document.querySelectorAll('.skill-meter .bar > span').forEach(span => {
            const classWidth = Array.from(span.classList).find(c => c.startsWith('w-'));
            if (classWidth) {
              const numeric = classWidth.split('w-')[1];
              span.style.width = numeric + '%';
            }
          });
          io.disconnect();
        }
      });
    }, { threshold: 0.2 });
    io.observe(metersRoot);
  }

  // Add animation on scroll using IntersectionObserver
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease-out';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.project-card, .skill-card, .timeline-item, .experience-card').forEach(el => {
    observer.observe(el);
  });

  // Update active nav link on scroll (legacy color approach kept for compatibility)
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll('nav a').forEach(link => {
          link.style.color = 'white';
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.style.color = 'var(--accent)';
          }
        });
      }
    });
  }, { passive: true });
})();

// Back to top button
(function() {
  const backToTopBtn = document.getElementById('backToTop');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();

// Contact form handling
(function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };
      
      // Show success message
      const submitBtn = contactForm.querySelector('.form-submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '✓ Message Sent!';
      submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
      
      // Reset form
      contactForm.reset();
      
      // Restore button after 3 seconds
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
      }, 3000);
      
      console.log('Form submitted:', formData);
    });
  }
})();

// Smooth scrolling for navigation links
(function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      // Ignore if href is just '#'
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Add animation on scroll using IntersectionObserver
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease-out';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.project-card, .skill-card, .timeline-item').forEach(el => {
    observer.observe(el);
  });

  // Update active nav link on scroll (passive listener for performance)
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll('nav a').forEach(link => {
          link.style.color = 'white';
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.style.color = 'var(--accent)';
          }
        });
      }
    });
  }, { passive: true });
})();