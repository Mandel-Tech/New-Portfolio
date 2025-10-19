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