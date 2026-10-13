/**
 * ===================================================================
 * KHUSHI VINAYKUMAR - PERSONAL PORTFOLIO SCRIPT
 * Vanilla JavaScript (ES6+) | Interactive Features & Animation
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initTypewriter();
  initNavbar();
  initMobileDrawer();
  initSkillsFilter();
  initProjectsFilter();
  initProjectModal();
  initEmailCopy();
  initContactForm();
  initFooterYear();
});

/* ===================================================================
   1. TYPEWRITER EFFECT
=================================================================== */
function initTypewriter() {
  const typewriterEl = document.getElementById('typewriter');
  if (!typewriterEl) return;

  const roles = [
    'B.Tech Student',
    'AI & Technology Enthusiast',
    'Modern Web Developer',
    'Generative AI Explorer',
    'Digital Productivity Builder'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at end of word
      isDeleting = true;
      typingSpeed = 1800;
    } else if (isDeleting && charIndex === 0) {
      // Move to next word
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ===================================================================
   2. NAVBAR SCROLL & ACTIVE SECTION HIGHLIGHTING (SCROLL SPY)
=================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('main section');

  // Sticky header blur effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // IntersectionObserver for active section highlighting
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => observer.observe(sec));
}

/* ===================================================================
   3. MOBILE DRAWER MENU
=================================================================== */
function initMobileDrawer() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!hamburgerBtn || !mobileDrawer) return;

  function toggleMenu() {
    hamburgerBtn.classList.toggle('active');
    mobileDrawer.classList.toggle('open');
  }

  function closeMenu() {
    hamburgerBtn.classList.remove('active');
    mobileDrawer.classList.remove('open');
  }

  hamburgerBtn.addEventListener('click', toggleMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking outside drawer
  document.addEventListener('click', (e) => {
    if (
      mobileDrawer.classList.contains('open') &&
      !mobileDrawer.contains(e.target) &&
      !hamburgerBtn.contains(e.target)
    ) {
      closeMenu();
    }
  });
}

/* ===================================================================
   4. SKILLS FILTER
=================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Set active button
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });
}

/* ===================================================================
   5. PROJECTS FILTER
=================================================================== */
function initProjectsFilter() {
  const pFilterBtns = document.querySelectorAll('.proj-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  pFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      pFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-pfilter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });
}

/* ===================================================================
   6. PROJECT DETAILS MODAL
=================================================================== */
const projectsDetailsData = {
  1: {
    title: 'Personal Portfolio Website',
    tagline: 'High-performance modern showcase built with HTML5, CSS3, & JS',
    category: 'Web Development',
    description:
      'A custom-built personal portfolio engineered from the ground up to showcase engineering coursework, academic milestones, and hands-on projects. Designed with a dark glassmorphic UI, responsive layouts, accessible markup, and smooth CSS animations.',
    features: [
      'Pure semantic HTML5 with custom dark glassmorphism styling',
      'Interactive typewriter effect for dynamic role presentation',
      'Categorized skills and interactive project filtering system',
      'Interactive modal dialog for in-depth project feature walkthroughs',
      'Direct copy-to-clipboard email function and validated contact form',
      '100% responsive architecture optimized across smartphones, tablets, and desktops'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Font Awesome', 'Google Fonts', 'Responsive Design'],
    github: 'https://github.com'
  },
  2: {
    title: 'AI Website Project',
    tagline: 'Intelligent web experience integrating Generative AI workflows',
    category: 'Artificial Intelligence',
    description:
      'An innovative web application combining modern web interfaces with generative AI models to provide interactive question-answering, prompt-assisted summarization, and cognitive workflows designed to streamline learning and productivity.',
    features: [
      'Prompt-driven conversational interface with instant responses',
      'Python-powered algorithmic logic and backend API communication',
      'Real-time streaming feedback and intelligent context management',
      'Clean modular UI components designed for easy AI model swapping',
      'Robust error handling and intuitive loading status indicators'
    ],
    technologies: ['Artificial Intelligence', 'Generative AI', 'Python', 'REST APIs', 'Modern Web APIs'],
    github: 'https://github.com'
  },
  3: {
    title: 'Student Productivity Project',
    tagline: 'Academic task organizer, focus timer, and dead-line tracker',
    category: 'Productivity & Systems',
    description:
      'A focused digital productivity tool created specifically to address student workload challenges. Enables university students to organize assignment deadlines, maintain structured study sessions with custom timers, and keep comprehensive syllabus logs.',
    features: [
      'Interactive task manager with priority tags and deadline indicators',
      'Pomodoro study focus timer with sound notification triggers',
      'Course-wise progress tracking and quick-capture notes board',
      'Client-side LocalStorage persistence for complete offline functionality',
      'Minimalist, distraction-free user experience tailored for high focus'
    ],
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Digital Productivity', 'LocalStorage API'],
    github: 'https://github.com'
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const closeActionBtn = document.getElementById('modal-close-action');
  const openButtons = document.querySelectorAll('.open-modal-btn');

  const modalCategory = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-title');
  const modalTagline = document.getElementById('modal-tagline');
  const modalDescription = document.getElementById('modal-description');
  const modalFeatures = document.getElementById('modal-features');
  const modalTech = document.getElementById('modal-tech');
  const modalGithub = document.getElementById('modal-github');

  if (!modal) return;

  function openModal(projectId) {
    const data = projectsDetailsData[projectId];
    if (!data) return;

    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalTagline.textContent = data.tagline;
    modalDescription.textContent = data.description;
    modalGithub.setAttribute('href', data.github);

    // Populate features list
    modalFeatures.innerHTML = '';
    data.features.forEach((feat) => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fa-solid fa-check-circle"></i> <span>${feat}</span>`;
      modalFeatures.appendChild(li);
    });

    // Populate technologies
    modalTech.innerHTML = '';
    data.technologies.forEach((tech) => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = tech;
      modalTech.appendChild(span);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project');
      openModal(id);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  closeActionBtn.addEventListener('click', closeModal);

  // Close on outside backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ===================================================================
   7. EMAIL COPY TO CLIPBOARD & TOAST NOTIFICATION
=================================================================== */
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

function initEmailCopy() {
  const copyButtons = [
    document.getElementById('hero-copy-email'),
    document.getElementById('contact-copy-btn')
  ];

  const emailToCopy = 'KHUSHI.26BCON0917@JECRCU.RDU.IN';

  copyButtons.forEach((btn) => {
    if (!btn) return;
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailToCopy);
        showToast('Email copied to clipboard!');

        // Temporary icon transformation
        const originalIcon = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i>';
        setTimeout(() => {
          btn.innerHTML = originalIcon;
        }, 2000);
      } catch (err) {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = emailToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('Email copied to clipboard!');
      }
    });
  });
}

/* ===================================================================
   8. CONTACT FORM VALIDATION & INTERACTIVE SUBMISSION
=================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (!form || !submitBtn) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');

  function clearErrors() {
    nameError.textContent = '';
    emailError.textContent = '';
    subjectError.textContent = '';
    messageError.textContent = '';
  }

  // Clear individual error on user typing
  [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
    if (!input) return;
    input.addEventListener('input', () => {
      clearErrors();
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    // Validate Name
    const nameVal = nameInput.value.trim();
    if (!nameVal) {
      nameError.textContent = 'Please enter your name.';
      isValid = false;
    } else if (nameVal.length < 2) {
      nameError.textContent = 'Name must be at least 2 characters.';
      isValid = false;
    }

    // Validate Email
    const emailVal = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal) {
      emailError.textContent = 'Please enter your email address.';
      isValid = false;
    } else if (!emailRegex.test(emailVal)) {
      emailError.textContent = 'Please enter a valid email address.';
      isValid = false;
    }

    // Validate Subject
    const subjectVal = subjectInput.value.trim();
    if (!subjectVal) {
      subjectError.textContent = 'Please provide a subject.';
      isValid = false;
    }

    // Validate Message
    const messageVal = messageInput.value.trim();
    if (!messageVal) {
      messageError.textContent = 'Please enter your message.';
      isValid = false;
    } else if (messageVal.length < 10) {
      messageError.textContent = 'Message should be at least 10 characters.';
      isValid = false;
    }

    if (!isValid) return;

    // Simulate sending with loading spinner
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      form.reset();
      showToast('Thank you! Your message has been sent successfully.');
    }, 1200);
  });
}

/* ===================================================================
   9. DYNAMIC FOOTER YEAR
=================================================================== */
function initFooterYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
