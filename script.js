/**
 * Web Developer Portfolio Interactive Logic
 * Modern ES6+ JavaScript - Vanilla & Dependency-free
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initTheme();
  initNavigation();
  initTypingEffect();
  initSkillsFilter();
  initProjects();
  initCaseStudyModal();
  initPlayground();
  initTerminalCopy();
  initContactForm();
  initTimeWidget();
  initScrollEffects();
});

/* ==========================================================================
   Theme Switcher (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check stored preference or default to dark
  const storedTheme = localStorage.getItem('portfolio-theme');
  if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme);
  } else if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark'); // Default dark
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      showToast(`Switched to ${newTheme} mode`, 'success');
    });
  }
}

/* ==========================================================================
   Navigation & Mobile Menu
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.header');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Header scroll shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isActive = navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isActive);
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scrollspy active links
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);
      
      if (matchingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          matchingLink.classList.add('active');
        } else {
          matchingLink.classList.remove('active');
        }
      }
    });
  });
}

/* ==========================================================================
   Hero Typing Effect
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const roles = [
    'Frontend Engineer',
    'Full-Stack Developer',
    'Creative UI Architect',
    'JavaScript / TypeScript Specialist'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   Skills Matrix: Category Filter & Live Search
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skills-filter-bar .filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');
  const searchInput = document.getElementById('skill-search-input');

  let activeCategory = 'all';
  let searchTerm = '';

  function applySkillFilters() {
    skillCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const skillName = card.querySelector('.skill-name')?.textContent.toLowerCase() || '';
      
      const matchesCategory = activeCategory === 'all' || category === activeCategory;
      const matchesSearch = skillName.includes(searchTerm);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter') || 'all';
      applySkillFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase().trim();
      applySkillFilters();
    });
  }
}

/* ==========================================================================
   Projects Showcase: Category Filtering
   ========================================================================== */
function initProjects() {
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card-interactive');

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   Case Study Modal Data & Handlers
   ========================================================================== */
const caseStudiesData = {
  'restaurant': {
    title: 'Gourmet Haven - Modern Dining Web Experience',
    subtitle: 'Responsive Web Application & Reservation System',
    description: 'A performance-optimized web platform for a culinary brand featuring interactive menus, online table booking, responsive gallery, and an intuitive customer feedback interface.',
    challenges: 'Designing a frictionless mobile booking flow with instant table confirmation while keeping image-heavy menus ultra fast and lightweight under 200ms page load.',
    solutions: 'Implemented responsive image art-direction with WebP/AVIF formats, custom lightweight state machine for table reservations, and smooth CSS micro-interactions.',
    metrics: [
      { value: '99/100', label: 'Lighthouse Performance' },
      { value: '45%', label: 'Increase in Online Bookings' },
      { value: '<0.8s', label: 'First Contentful Paint' }
    ],
    tech: ['HTML5', 'CSS3 / Grid', 'Vanilla JavaScript', 'Local Storage API', 'Form Validation API']
  },
  'ecommerce': {
    title: 'Nova Commerce - Headless E-Storefront',
    subtitle: 'High-Performance E-Commerce Web Architecture',
    description: 'A modular, accessible e-commerce application equipped with live cart persistence, dynamic product filtering, price calculations, customer reviews, and multi-currency formatting.',
    challenges: 'Managing multi-item checkout state and filtering through hundreds of product SKU variations seamlessly without third-party heavy dependencies.',
    solutions: 'Structured an immutable client-side reactive state store using JavaScript Proxy and modern CSS Flexbox/Grid layouts.',
    metrics: [
      { value: '100%', label: 'Accessibility Score' },
      { value: '3.2x', label: 'Faster Cart Interactions' },
      { value: '0', label: 'External Runtime Bloat' }
    ],
    tech: ['ES6+ JavaScript', 'CSS Custom Properties', 'IndexedDB / Storage', 'Responsive Design', 'Web Components']
  },
  'dashboard': {
    title: 'DevPulse - Developer Analytics & Metric Hub',
    subtitle: 'Interactive Data Visualizer & Performance Monitor',
    description: 'An interactive productivity dashboard for software engineers tracking repository commits, task velocity, deploy metrics, and code health in real-time.',
    challenges: 'Visualizing multi-source metrics with dynamic themes and smooth rendering across mobile, tablet, and ultra-wide screens.',
    solutions: 'Engineered reusable SVG chart components, responsive grid layouts, and custom theme tokens for high contrast dark/light readability.',
    metrics: [
      { value: '60fps', label: 'Smooth Animation Rates' },
      { value: '12+', label: 'Interactive Widgets' },
      { value: '100%', label: 'Responsive Coverage' }
    ],
    tech: ['JavaScript ES6+', 'SVG Graphing', 'CSS Grid', 'LocalStorage', 'REST API Integration']
  },
  'auth': {
    title: 'SecureFlow - Auth & Member Portal UI',
    subtitle: 'Modern Security & User Onboarding Flow',
    description: 'A robust client-side authentication system with password strength meters, OTP verification simulation, form accessibility standards, and session handling.',
    challenges: 'Providing instant visual feedback for complex password criteria and biometric auth simulation without layout shifts.',
    solutions: 'Built regex-based real-time strength evaluators and accessible ARIA live regions for assistive technologies.',
    metrics: [
      { value: 'WCAG AA', label: 'Compliance Level' },
      { value: '100%', label: 'Keyboard Navigable' },
      { value: 'Instant', label: 'Real-time Validation' }
    ],
    tech: ['HTML5 Validation', 'CSS Transitions', 'Vanilla JS', 'ARIA Standards']
  }
};

function initCaseStudyModal() {
  const modalOverlay = document.getElementById('case-study-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const caseStudyBtns = document.querySelectorAll('.case-study-btn');

  if (!modalOverlay) return;

  function openModal(studyKey) {
    const data = caseStudiesData[studyKey];
    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-subtitle').textContent = data.subtitle;
    document.getElementById('modal-desc').textContent = data.description;
    document.getElementById('modal-challenge').textContent = data.challenges;
    document.getElementById('modal-solution').textContent = data.solutions;

    // Metrics
    const metricsContainer = document.getElementById('modal-metrics');
    metricsContainer.innerHTML = data.metrics.map(m => `
      <div class="modal-metric-card">
        <div class="modal-metric-value">${m.value}</div>
        <div class="modal-metric-label">${m.label}</div>
      </div>
    `).join('');

    // Tech Tags
    const techContainer = document.getElementById('modal-tech');
    techContainer.innerHTML = data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  caseStudyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const studyKey = btn.getAttribute('data-study');
      openModal(studyKey);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   Interactive Code Playground / Glassmorphism Lab
   ========================================================================== */
function initPlayground() {
  const opacityInput = document.getElementById('glass-opacity');
  const blurInput = document.getElementById('glass-blur');
  const radiusInput = document.getElementById('glass-radius');
  
  const opacityVal = document.getElementById('opacity-val');
  const blurVal = document.getElementById('blur-val');
  const radiusVal = document.getElementById('radius-val');

  const glassTarget = document.getElementById('glass-target');
  const codeOutput = document.getElementById('generated-css-code');
  const copyBtn = document.getElementById('copy-css-btn');
  const presetBtns = document.querySelectorAll('.preset-btn');
  const previewSurface = document.getElementById('preview-surface');

  if (!glassTarget || !codeOutput) return;

  let currentOpacity = 0.2;
  let currentBlur = 12;
  let currentRadius = 16;
  let currentColor = 'rgba(255, 255, 255, ';

  function updateGlassStyle() {
    const bgColor = `${currentColor}${currentOpacity})`;
    const backdropFilter = `blur(${currentBlur}px)`;
    const borderRadius = `${currentRadius}px`;
    const border = `1px solid rgba(255, 255, 255, ${Math.min(currentOpacity + 0.15, 0.4)})`;
    const boxShadow = `0 8px 32px 0 rgba(0, 0, 0, 0.25)`;

    glassTarget.style.backgroundColor = bgColor;
    glassTarget.style.backdropFilter = backdropFilter;
    glassTarget.style.webkitBackdropFilter = backdropFilter;
    glassTarget.style.borderRadius = borderRadius;
    glassTarget.style.border = border;
    glassTarget.style.boxShadow = boxShadow;

    const cssString = `.glassmorphism-card {\n  background: ${bgColor};\n  backdrop-filter: ${backdropFilter};\n  -webkit-backdrop-filter: ${backdropFilter};\n  border-radius: ${borderRadius};\n  border: ${border};\n  box-shadow: ${boxShadow};\n}`;
    codeOutput.textContent = cssString;
  }

  if (opacityInput && opacityVal) {
    opacityInput.addEventListener('input', (e) => {
      currentOpacity = parseFloat(e.target.value);
      opacityVal.textContent = currentOpacity;
      updateGlassStyle();
    });
  }

  if (blurInput && blurVal) {
    blurInput.addEventListener('input', (e) => {
      currentBlur = parseInt(e.target.value, 10);
      blurVal.textContent = `${currentBlur}px`;
      updateGlassStyle();
    });
  }

  if (radiusInput && radiusVal) {
    radiusInput.addEventListener('input', (e) => {
      currentRadius = parseInt(e.target.value, 10);
      radiusVal.textContent = `${currentRadius}px`;
      updateGlassStyle();
    });
  }

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const gradient = btn.getAttribute('data-gradient');
      if (previewSurface && gradient) {
        previewSurface.style.background = gradient;
      }
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(codeOutput.textContent).then(() => {
        showToast('CSS copied to clipboard!', 'success');
      }).catch(() => {
        showToast('Failed to copy CSS', 'error');
      });
    });
  }

  updateGlassStyle();
}

/* ==========================================================================
   Developer Terminal Copy
   ========================================================================== */
function initTerminalCopy() {
  const terminalCopyBtn = document.getElementById('terminal-copy-btn');
  if (terminalCopyBtn) {
    terminalCopyBtn.addEventListener('click', () => {
      const devProfile = {
        name: "Dhanush",
        title: "Web Developer & Frontend Specialist",
        status: "Available for projects",
        coreSkills: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive UI", "Web APIs"],
        focus: ["Modern Architecture", "Speed & Performance", "Accessible Design"],
        location: "India (UTC+5:30)"
      };

      navigator.clipboard.writeText(JSON.stringify(devProfile, null, 2)).then(() => {
        showToast('Developer profile JSON copied!', 'success');
      }).catch(() => {
        showToast('Failed to copy profile', 'error');
      });
    });
  }
}

/* ==========================================================================
   Email Configuration & Real Mail Sender
   ========================================================================== */
// Change this email to your actual email address to receive messages directly in your inbox!
const RECIPIENT_EMAIL = 'dhanushk7039@gmail.com';

function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const emailCopyBtn = document.getElementById('copy-email-btn');

  // Copy direct email button
  if (emailCopyBtn) {
    emailCopyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(RECIPIENT_EMAIL).then(() => {
        showToast(`Email copied: ${RECIPIENT_EMAIL}`, 'success');
      }).catch(() => {
        showToast('Failed to copy email', 'error');
      });
    });
  }

  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = contactForm.querySelector('.submit-btn');

    let isValid = true;

    function validateField(input, errorId, condition) {
      const errorEl = document.getElementById(errorId);
      if (!condition) {
        input.classList.add('error');
        if (errorEl) errorEl.classList.add('visible');
        isValid = false;
      } else {
        input.classList.remove('error');
        if (errorEl) errorEl.classList.remove('visible');
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    validateField(nameInput, 'name-error', nameInput.value.trim().length >= 2);
    validateField(emailInput, 'email-error', emailRegex.test(emailInput.value.trim()));
    validateField(subjectInput, 'subject-error', subjectInput.value.trim().length >= 3);
    validateField(messageInput, 'message-error', messageInput.value.trim().length >= 10);

    if (!isValid) {
      showToast('Please correct the highlighted errors before sending', 'error');
      return;
    }

    const originalButtonHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="btn-icon" style="animation: spin 1s linear infinite" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
      Sending Real Email...
    `;

    const payload = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      _subject: `[Portfolio Inquiry] ${subjectInput.value.trim()}`,
      message: messageInput.value.trim(),
      _captcha: 'false',
      _template: 'table'
    };

    try {
      const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(RECIPIENT_EMAIL)}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && (result.success === 'true' || result.success === true || result.message)) {
        showToast('Message sent! Check your inbox for confirmation.', 'success');
        contactForm.reset();
      } else {
        // Fallback for custom domains or unactivated emails
        showToast(result.message || 'Message sent! (Activation may be needed on first use)', 'success');
        contactForm.reset();
      }
    } catch (error) {
      console.warn('Direct fetch failed, offering mailto fallback:', error);
      showToast('Opening default mail client as backup...', 'error');
      
      // Automatic mailto fallback
      const mailtoLink = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(payload._subject)}&body=${encodeURIComponent(`From: ${payload.name} (${payload.email})\n\nMessage:\n${payload.message}`)}`;
      window.open(mailtoLink, '_blank');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalButtonHtml;
    }
  });
}

/* ==========================================================================
   Live Timezone Clock
   ========================================================================== */
function initTimeWidget() {
  const clockElement = document.getElementById('live-time-clock');
  if (!clockElement) return;

  function updateClock() {
    const now = new Date();
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    clockElement.textContent = now.toLocaleTimeString('en-US', options);
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   Scroll Effects & Back to Top
   ========================================================================== */
function initScrollEffects() {
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   Toast Notification System
   ========================================================================== */
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const iconSvg = type === 'success' 
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

  toast.innerHTML = `
    ${iconSvg}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
