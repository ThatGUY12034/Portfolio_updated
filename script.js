// Enhanced Portfolio with 3D Interactions & Lazy Loading

// Project Data with enhanced details
const projects = [
  {
  "title": "QChat - Real-Time Messenger",
  "desc": "Full-stack chat application with real-time messaging, user authentication, online status tracking, and media sharing. Features instant message delivery with Socket.io and secure image uploads via Cloudinary.",
  "tags": ["ReactJS", "NodeJS", "MongoDB", "Socket.io", "JWT", "Cloudinary", "Vercel"],
  "code": "https://github.com/ThatGUY12034/QChat",
  "live": "https://qchat12.vercel.app/",
  "features": [
    "Real-time messaging with Socket.io",
    "JWT authentication & user profiles",
    "Online/offline status indicators",
    "Image sharing via Cloudinary",
    "Message read receipts",
    "Responsive chat interface"
  ]
},
  {
    title: "CtrlAI - AI SaaS Platform",
    desc: "Full-stack AI application with authentication, premium features, image processing, resume analysis, and community interactions. Deployed on Vercel with real-time AI capabilities.",
    tags: ["ReactJS", "NodeJS", "Postgres", "Clerk", "OpenAI", "Stripe"],
    code: "https://github.com/ThatGUY12034/CtrlAI",
    live: "https://ctrl-ai-alpha.vercel.app/",
    features: [
      "User authentication & authorization",
      "AI-powered image processing",
      "Resume analysis and optimization",
      "Community interactions",
      "Premium subscription model",
      "Real-time AI responses"
    ]
  },
  {
    title: "Ground Water Monitoring System",
    desc: "AI-based dashboard to predict groundwater risk using ML models, React Native, and interactive visualizations. Includes automated alerts and reporting.",
    tags: ["React Native", "Python", "ML/AI", "Dashboard", "Predictive Analytics"],
    code: "https://github.com/ThatGUY12034/Ground_Water_Prototype",
    features: [
      "ML-powered risk prediction",
      "Interactive data visualization",
      "Automated alert system",
      "Mobile-first responsive design",
      "Real-time data processing"
    ]
  },
  {
    title: "Inventory Management System",
    desc: "Comprehensive inventory management system with clean frontend and Firebase-backed modules for members, orders, and reports management.",
    tags: ["HTML", "CSS", "JavaScript", "Firebase", "CRUD Operations"],
    code: "https://github.com/ThatGUY12034/Inventory_Management-Flask-",
    features: [
      "Real-time inventory tracking",
      "Order management system",
      "User authentication",
      "Data visualization",
      "Report generation"
    ]
  },
  {
    title: "AI Trading Bot",
    desc: "Advanced trading bot project with rule-based logic, machine learning models, and automation workflows for strategy execution.",
    tags: ["Python", "Machine Learning", "Automation", "Finance", "Data Analysis"],
    code: "https://github.com/ThatGUY12034/Trading_bot",
    features: [
      "Rule-based trading strategies",
      "ML price prediction",
      "Automated execution",
      "Risk management",
      "Performance analytics"
    ]
  },
  {
    title: "Snake Game",
    desc: "Classic Snake game built with Python Turtle using OOP principles with collision detection, scoring logic, and smooth animations.",
    tags: ["Python", "OOP", "Game Development", "Turtle Graphics"],
    code: "https://github.com/ThatGUY12034/Snake_Game",
    features: [
      "Object-oriented design",
      "Collision detection",
      "Score tracking",
      "Smooth animations",
      "Game state management"
    ]
  },
  {
    title: "Minion Talk Translator",
    desc: "Fun web app that converts English input into Minion language using Fun Translations API with interactive UI and animations.",
    tags: ["HTML", "CSS", "JavaScript", "API", "Animation"],
    code: "https://github.com/ThatGUY12034/Minion_Talk-",
    features: [
      "Real-time translation",
      "Interactive UI",
      "Text-to-speech",
      "Responsive design",
      "Fun animations"
    ]
  },
  {
    title: "The College Canteen",
    desc: "Food ordering application built using modern React and Node.js with Firebase backend integration and payment gateway.",
    tags: ["React", "Node.js", "Firebase", "API", "Payment Gateway"],
    status: "Private / Coming Soon",
    features: [
      "Food ordering system",
      "User authentication",
      "Payment integration",
      "Order tracking",
      "Restaurant management"
    ]
  }
];

// DOM Utility
function $(id) {
  return document.getElementById(id);
}

// URL Validation
function isValidUrl(url) {
  return typeof url === "string" && url.trim().startsWith("http");
}

// Render Projects with 3D effects
function renderProjects() {
  const grid = $("projectsGrid");

  if (!grid) return;

  grid.innerHTML = projects
    .map((p, index) => {
      const liveLink = isValidUrl(p.live)
        ? `<a href="${p.live}" target="_blank" rel="noreferrer" class="project-link">
            <i class="fas fa-external-link-alt"></i> Live Demo
          </a>`
        : "";

      const codeLink = isValidUrl(p.code)
        ? `<a href="${p.code}" target="_blank" rel="noreferrer" class="project-link">
            <i class="fas fa-code"></i> View Code
          </a>`
        : "";

      const statusBadge = p.status
        ? `<div class="badge">
            <i class="fas fa-clock"></i> ${p.status}
           </div>`
        : "";

      return `
        <article class="card project reveal" data-index="${index}">
          <h3><i class="fas fa-project-diagram"></i> ${p.title}</h3>
          <p>${p.desc}</p>
          
          <div class="tags">
            ${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
            ${statusBadge}
          </div>
          
          <div class="project-links">
            ${liveLink}
            ${codeLink}
            <button class="project-link view-details" data-index="${index}">
              <i class="fas fa-info-circle"></i> Details
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  // Update project count with animation
  const projectCount = $("projectCount");
  if (projectCount) {
    animateCounter(projectCount, projects.length, 1000);
  }

  // Add click handlers for details
  document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const index = parseInt(e.target.dataset.index || e.target.closest('.view-details').dataset.index);
      openProjectModal(index);
    });
  });

  // Add click handlers for entire project cards
  document.querySelectorAll('.project').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.project-link')) {
        const index = parseInt(card.dataset.index);
        openProjectModal(index);
      }
    });
  });
}

// Animate Counter
function animateCounter(element, target, duration) {
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Theme Management
function setupTheme() {
  const saved = localStorage.getItem("theme");
  const themeBtn = $("themeBtn");
  const themeFab = $("themeFab");

  if (saved === "light") {
    document.body.classList.add("light");
    if (themeBtn) themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    if (themeFab) themeFab.innerHTML = '<i class="fas fa-sun"></i>';
  }

  const toggleTheme = () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");

    if (themeBtn) themeBtn.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    if (themeFab) themeFab.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

    // Add rotation effect
    themeBtn.style.transform = 'rotate(360deg)';
    themeFab.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      themeBtn.style.transform = 'rotate(0deg)';
      themeFab.style.transform = 'rotate(0deg)';
    }, 300);
  };

  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
  if (themeFab) themeFab.addEventListener("click", toggleTheme);
}

// Copy Link Functionality
function setupCopyLink() {
  const copyBtn = $("copyLinkBtn");
  if (!copyBtn) return;

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      const originalHTML = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      copyBtn.style.background = '#4CAF50';

      setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
        copyBtn.style.background = '';
      }, 2000);
    } catch {
      alert("Copy failed. Please copy the URL from the address bar.");
    }
  });
}

// Update Year
function setupYear() {
  const yearElement = $("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// ===== SPLINE LAZY LOADING (BEST FOR MOBILE) =====
function initSplineLazyLoad() {
  const splineContainer = document.querySelector('.spline-container');
  const splineViewer = document.querySelector('spline-viewer');

  if (!splineContainer || !splineViewer) return;

  // Check if on mobile
  const isMobile = window.innerWidth < 768;

  // Mobile: Reduce opacity and delay loading
  if (isMobile) {
    splineViewer.style.opacity = '0.25'; // Reduced from 0.4

    // Load Spline after 2 seconds on mobile (not blocking)
    setTimeout(() => {
      console.log('📱 Lazy loading Spline on mobile...');
      splineViewer.setAttribute('data-loaded', 'true');
    }, 2000);

    return; // Skip intersection observer on mobile
  }

  // Desktop: Use intersection observer for lazy loading
  console.log('🖥️ Spline lazy loading with intersection observer...');

  const splineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!splineViewer.hasAttribute('data-loaded')) {
          splineViewer.setAttribute('data-loaded', 'true');
          console.log('✅ Spline is now visible and loaded');
        }
        // Unobserve once loaded to save resources
        splineObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,     // Load when 10% visible
    rootMargin: '50px'  // Start loading 50px before visible
  });

  splineObserver.observe(splineContainer);
}

// ===== OPTIMIZED PARALLAX (DESKTOP ONLY) =====
function initParallaxEffect() {
  // Desktop only - skip on mobile
  if (window.innerWidth < 768) {
    console.log('⚡ Parallax disabled on mobile for performance');
    return;
  }

  const splineScene = document.querySelector('.spline-scene');
  if (!splineScene) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3; // Reduced from -0.5 for better performance

        splineScene.style.transform = `translateY(${rate}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  console.log('✅ Parallax effect enabled (desktop only)');
}

// Custom Cursor
function initCustomCursor() {
  // Disable custom cursor on mobile (touch devices)
  if (window.innerWidth < 768 || window.matchMedia('(hover: none)').matches) {
    console.log('⚡ Custom cursor disabled on mobile');
    return;
  }

  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  if (!cursorDot || !cursorOutline) return;

  window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;

    cursorOutline.animate({
      left: `${e.clientX}px`,
      top: `${e.clientY}px`
    }, { duration: 300, fill: 'forwards' });
  });

  // Interactive elements
  const interactiveElements = ['a', 'button', '.project', '.card', '.btn', '.chip', '.tag'];

  interactiveElements.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.borderColor = 'var(--accent)';
      });

      el.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.borderColor = 'var(--accent)';
      });
    });
  });

  // Click effect
  document.addEventListener('click', () => {
    cursorDot.style.transform = 'translate(-50%, -50%) scale(0.8)';
    cursorOutline.style.transform = 'translate(-50%, -50%) scale(0.8)';

    setTimeout(() => {
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 100);
  });

  console.log('✅ Custom cursor enabled (desktop)');
}

// Scroll Progress Bar
function initScrollProgress() {
  const progressBar = document.querySelector('.progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    progressBar.style.width = `${scrolled}%`;
  }, { passive: true });
}

// Animated Counters
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current);
          }
        }, 16);

        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// Scroll Reveal Animation
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(reveal => revealObserver.observe(reveal));
}

// Skill Bars Animation
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  if (!skillBars.length) return;

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = `${width}%`;
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => barObserver.observe(bar));
}

// Timeline Animation
function initTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (!timelineItems.length) return;

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });

  timelineItems.forEach(item => timelineObserver.observe(item));
}

// Project Modal
// Project Modal Functionality
function initProjectModal() {
  const modal = document.querySelector('.project-modal');
  const modalBody = document.querySelector('.modal-body');
  const closeBtn = document.querySelector('.modal-close');

  if (!modal || !modalBody || !closeBtn) {
    console.error('Modal elements not found!');
    return;
  }

  // Global function to open modal
  window.openProjectModal = function (index) {
    const project = projects[index];

    // Build modal content
    modalBody.innerHTML = `
      <div class="modal-header">
        <h2><i class="fas fa-project-diagram"></i> ${project.title}</h2>
        <div class="modal-tags">
          ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
      
      <div class="modal-content-inner">
        <p class="modal-desc">${project.desc}</p>
        
        ${project.features ? `
          <div class="modal-features">
            <h3><i class="fas fa-star"></i> Key Features</h3>
            <ul>
              ${project.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        
        <div class="modal-links">
          ${project.live ? `
            <a href="${project.live}" class="btn" target="_blank" rel="noreferrer">
              <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
          ` : ''}
          
          ${project.code ? `
            <a href="${project.code}" class="btn ghost" target="_blank" rel="noreferrer">
              <i class="fas fa-code"></i> View Code
            </a>
          ` : ''}
        </div>
      </div>
    `;

    // Show modal
    modal.style.display = 'flex';
    setTimeout(() => {
      modal.classList.add('active');
    }, 10);
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
    document.body.style.overflow = 'auto';
  });

  // Close when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
      document.body.style.overflow = 'auto';
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      modal.classList.remove('active');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
      document.body.style.overflow = 'auto';
    }
  });

  console.log('✅ Project modal initialized');
}

// Also update the renderProjects function to add event listeners properly:
function renderProjects() {
  const grid = document.getElementById('projectsGrid');

  if (!grid) return;

  grid.innerHTML = projects
    .map((p, index) => {
      const liveLink = isValidUrl(p.live)
        ? `<a href="${p.live}" target="_blank" rel="noreferrer" class="project-link">
            <i class="fas fa-external-link-alt"></i> Live Demo
          </a>`
        : '';

      const codeLink = isValidUrl(p.code)
        ? `<a href="${p.code}" target="_blank" rel="noreferrer" class="project-link">
            <i class="fas fa-code"></i> View Code
          </a>`
        : '';

      const statusBadge = p.status
        ? `<div class="badge">
            <i class="fas fa-clock"></i> ${p.status}
           </div>`
        : '';

      return `
        <article class="card project reveal" data-index="${index}">
          <h3><i class="fas fa-project-diagram"></i> ${p.title}</h3>
          <p>${p.desc}</p>
          
          <div class="tags">
            ${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}
            ${statusBadge}
          </div>
          
          <div class="project-links">
            ${liveLink}
            ${codeLink}
            <button class="btn btn-small btn-secondary view-details-btn" data-index="${index}">
              <i class="fas fa-info-circle"></i> Details
            </button>
          </div>
        </article>
      `;
    })
    .join('');

  // Update project count
  const projectCount = document.getElementById('projectCount');
  if (projectCount) {
    animateCounter(projectCount, projects.length, 1000);
  }

  // Add click handlers for details buttons
  setTimeout(() => {
    const detailButtons = document.querySelectorAll('.view-details-btn');
    detailButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const index = parseInt(button.dataset.index);
        console.log('Opening project modal for index:', index);
        if (window.openProjectModal) {
          window.openProjectModal(index);
        } else {
          console.error('openProjectModal function not found!');
        }
      });
    });
  }, 100);

  // Optional: Add click handler for entire card
  document.querySelectorAll('.project').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger if clicking on links or buttons
      if (!e.target.closest('.project-link') && !e.target.closest('.view-details-btn')) {
        const index = parseInt(card.dataset.index);
        if (window.openProjectModal) {
          window.openProjectModal(index);
        }
      }
    });
  });
}

// Magnetic Buttons
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn-magnetic');

  buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      button.style.setProperty('--x', `${x}px`);
      button.style.setProperty('--y', `${y}px`);
    });
  });
}

// Typewriter Effect
function initTypewriter() {
  const typingText = document.querySelector('.typing-text');
  if (!typingText) return;

  const texts = [];
  let count = 0;
  let index = 0;
  let currentText = '';
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    currentText = texts[count];

    if (isDeleting) {
      typingText.textContent = currentText.substring(0, index - 1);
      index--;
      typingSpeed = 50;
    } else {
      typingText.textContent = currentText.substring(0, index + 1);
      index++;
      typingSpeed = 100;
    }

    if (!isDeleting && index === currentText.length) {
      isDeleting = true;
      typingSpeed = 1500; // Pause at end
    } else if (isDeleting && index === 0) {
      isDeleting = false;
      count = (count + 1) % texts.length;
      typingSpeed = 500; // Pause before next word
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 1000);
}

// Smooth Scrolling with Offset
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// 3D Card Interactions
function init3DCardEffects() {
  // Disable on mobile for performance
  if (window.innerWidth < 768) {
    console.log('⚡ 3D card effects disabled on mobile');
    return;
  }

  const cards = document.querySelectorAll('.card-3d');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = (x - centerX) / 25;
      const rotateX = (centerY - y) / 25;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      setTimeout(() => {
        card.style.transform = '';
      }, 300);
    });
  });

  console.log('✅ 3D card effects enabled (desktop only)');
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Portfolio initializing...');

  // Core functionality
  renderProjects();
  setupTheme();
  setupCopyLink();
  setupYear();

  // Enhanced features
  initCustomCursor();       // Desktop only (auto-disabled on mobile)
  initScrollProgress();
  initCounters();
  initScrollReveal();
  initSkillBars();
  initTimeline();
  initProjectModal();
  initMagneticButtons();
  initTypewriter();
  initSmoothScroll();

  // ✅ SPLINE LAZY LOADING (OPTIMIZED FOR MOBILE)
  initSplineLazyLoad();     // Lazy loads Spline only when needed

  // ✅ PERFORMANCE OPTIMIZED
  initParallaxEffect();     // Desktop only (auto-disabled on mobile)
  init3DCardEffects();      // Desktop only (auto-disabled on mobile)

  // Add loading animation removal
  setTimeout(() => {
    document.body.classList.add('loaded');
    console.log('✅ Portfolio loaded!');
  }, 500);
});

// Export for debugging
window.portfolio = {
  projects,
  renderProjects,
  setupTheme,
  setupCopyLink,
  setupYear
};