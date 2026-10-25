/**
 * REHANA KABIR MIM - FULL-STACK LARAVEL SPECIALIST PORTFOLIO
 * Modern Interactive Logic & Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. THEME TOGGLE (DARK / LIGHT MODE)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Always default to sleek 'dark' theme (black/obsidian)
  // Check if user explicitly set a preference, otherwise force 'dark'
  const savedTheme = localStorage.getItem('rkm_theme_v2') || 'dark';
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      showToast(`Switched to ${newTheme} theme`);
    });
  }

  function setTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('rkm_theme_v2', theme);
    if (themeToggleBtn) {
      const nextTheme = theme === 'dark' ? 'light' : 'dark';
      themeToggleBtn.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
    }
  }

  // --------------------------------------------------------------------------
  // 2. MOBILE NAVIGATION DRAWER
  // --------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const mobileResumeBtn = document.getElementById('mobile-resume-btn');

  function openDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    if (drawerOverlay) drawerOverlay.classList.add('active');
    if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (closeDrawerBtn) closeDrawerBtn.focus();
  }

  function closeDrawer(restoreFocus = true) {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    if (drawerOverlay) drawerOverlay.classList.remove('active');
    if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (restoreFocus && hamburgerBtn) {
      hamburgerBtn.focus();
    }
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', () => closeDrawer(true));
  if (drawerOverlay) drawerOverlay.addEventListener('click', () => closeDrawer(true));

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => closeDrawer(false));
  });

  // --------------------------------------------------------------------------
  // 3. ARCHITECTURE SPOTLIGHT TABS
  // --------------------------------------------------------------------------
  const archTabBtns = document.querySelectorAll('.arch-tab-btn');
  const archTabContents = document.querySelectorAll('.arch-tab-content');

  archTabBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      archTabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      archTabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });

    // WAI-ARIA Keyboard navigation across tabs (ArrowLeft / ArrowRight)
    btn.addEventListener('keydown', (e) => {
      let nextIndex = null;
      if (e.key === 'ArrowRight') {
        nextIndex = (index + 1) % archTabBtns.length;
      } else if (e.key === 'ArrowLeft') {
        nextIndex = (index - 1 + archTabBtns.length) % archTabBtns.length;
      }
      if (nextIndex !== null) {
        e.preventDefault();
        archTabBtns[nextIndex].focus();
        archTabBtns[nextIndex].click();
      }
    });
  });

  // --------------------------------------------------------------------------
  // 4. TECHNICAL SKILLS FILTER
  // --------------------------------------------------------------------------
  const skillFilterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');
  const skillsEmptyState = document.getElementById('skills-empty-state');

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      skillFilterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      let visibleCount = 0;
      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          visibleCount++;
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });

      if (skillsEmptyState) {
        skillsEmptyState.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  });

  // --------------------------------------------------------------------------
  // 5. PROJECT ARCHITECTURE DEEP DIVE MODALS
  // --------------------------------------------------------------------------
  const projectModal = document.getElementById('project-modal');
  const closeProjectModalBtn = document.getElementById('close-project-modal');
  const modalProjectTitle = document.getElementById('modal-project-title');
  const modalProjectCategory = document.getElementById('modal-project-category');
  const modalProjectBody = document.getElementById('modal-project-body');
  const modalTriggers = document.querySelectorAll('.modal-trigger');

  const projectDetails = {
    'ali-pacino': {
      title: 'Ali Pacino – Multi-Branch Restaurant ERP & AI Intelligence',
      category: 'Enterprise SaaS • Laravel 12 • pacinos.uk',
      html: `
        <div class="modal-detail-content">
          <h4>System Overview & Engineering Scope</h4>
          <p>
            Ali Pacino is a production multi-branch restaurant ERP platform deployed in the United Kingdom. Built with <strong>89 Eloquent models, 84 controllers, and 96 migrations</strong>, it manages multi-branch ordering, kitchen operations, and multi-location inventory.
          </p>

          <h4 style="margin-top: 18px;">Role & Responsibilities</h4>
          <p>
            <strong>Project Lead & Backend Developer:</strong> Coordinated development tasks across team members, conducted code reviews, communicated directly with the client, and engineered core database and transaction workflows.
          </p>
          
          <h4 style="margin-top: 18px;">Key Architectural Decisions</h4>
          <ul style="padding-left: 20px; margin-top: 8px;">
            <li><strong>Row-Level Locking for Inventory:</strong> Implemented <code>DB::transaction()</code> combined with pessimistic locking (<code>lockForUpdate()</code>) during POS order deduction to prevent race conditions and negative inventory under peak cashier loads.</li>
            <li><strong>Branch Data Isolation:</strong> Enforced multi-branch data segregation using scoped queries and an 8-role granular RBAC system so branch managers, kitchen staff, and drivers only access their designated location.</li>
            <li><strong>Kitchen Display System (KDS):</strong> Integrated <strong>Laravel Reverb WebSockets</strong> to broadcast live order status updates directly to kitchen Kanban displays without polling overhead.</li>
            <li><strong>Asynchronous AI Analytics:</strong> Integrated Google Gemini AI via background queued workers with Redis caching to analyze sales trends and provide automated supply forecasts.</li>
          </ul>

          <h4 style="margin-top: 18px;">Tech Stack</h4>
          <p><code>Laravel 12</code> <code>PHP 8.2+</code> <code>MySQL</code> <code>Laravel Reverb</code> <code>Redis</code> <code>Firebase FCM</code> <code>Google Gemini AI</code> <code>Stripe</code> <code>Twilio</code></p>

          <div style="margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap;">
            <a href="https://pacinos.uk/" target="_blank" rel="noopener" class="btn btn-primary-sm">
              <span>Visit Live pacinos.uk</span>
            </a>
          </div>
        </div>
      `
    },
    'biovue': {
      title: 'BioVue Digital Wellness – AI-Driven Health & Wellness Platform',
      category: 'Healthcare & Wellness • Web & Mobile • biovuedigitalwellness.com',
      html: `
        <div class="modal-detail-content">
          <h4>System Overview & Engineering Scope</h4>
          <p>
            BioVue Digital Wellness is a telehealth and wellness platform connecting users with certified practitioners for biometric assessments, personalized supplement stacks, and recurring memberships.
          </p>

          <h4 style="margin-top: 18px;">Role & Responsibilities</h4>
          <p>
            <strong>Project Lead & Backend Developer:</strong> Led technical execution, API design, authentication, and payment architecture, while liaising directly with clients during sprint milestones.
          </p>
          
          <h4 style="margin-top: 18px;">Key Architectural Decisions</h4>
          <ul style="padding-left: 20px; margin-top: 8px;">
            <li><strong>RESTful API Architecture:</strong> Developed versioned REST endpoints secured with Laravel Sanctum tokens, custom rate-limiting middleware, and strict request validation.</li>
            <li><strong>Stripe Subscription Engine:</strong> Managed multi-tier recurring memberships with free trial periods, automated plan upgrades, payment failures, and webhook reconciliation with signature verification.</li>
            <li><strong>Biometric Scoring:</strong> Processed user health data algorithms to generate body projection graphs and tailored supplement recommendations.</li>
            <li><strong>Real-Time Communication:</strong> Configured Laravel Reverb WebSockets for consultation messaging paired with Firebase Cloud Messaging (FCM) for mobile push alerts.</li>
          </ul>

          <h4 style="margin-top: 18px;">Tech Stack</h4>
          <p><code>Laravel 12</code> <code>Next.js</code> <code>MySQL</code> <code>Laravel Sanctum</code> <code>Stripe Subscriptions</code> <code>Laravel Reverb</code> <code>Firebase FCM</code></p>

          <div style="margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap;">
            <a href="https://biovuedigitalwellness.com/" target="_blank" rel="noopener" class="btn btn-primary-sm">
              <span>Visit biovuedigitalwellness.com</span>
            </a>
          </div>
        </div>
      `
    },
    'neumera': {
      title: 'Connect to Inspect – Property Inspection & Service Marketplace',
      category: 'FinTech Marketplace • Mobile & Web • Google Play & App Store',
      html: `
        <div class="modal-detail-content">
          <h4>System Overview & Engineering Scope</h4>
          <p>
            Connect to Inspect is an on-demand marketplace connecting property buyers and real estate agents with certified home inspectors across iOS, Android, and Web Admin.
          </p>

          <h4 style="margin-top: 18px;">Role & Responsibilities</h4>
          <p>
            <strong>Project Lead & Backend Developer:</strong> Managed sprint deliverables, team coordination, and architected the automated payment, escrow holding, and payout pipeline.
          </p>
          
          <h4 style="margin-top: 18px;">Key Architectural Decisions</h4>
          <ul style="padding-left: 20px; margin-top: 8px;">
            <li><strong>Stripe Connect Transfers:</strong> Custom split calculation, dynamic platform fee deduction, and automated worker payouts triggered upon inspection report completion.</li>
            <li><strong>Queued Payout Pipeline:</strong> Dispatched via Laravel Queues with idempotency protection to prevent duplicate payouts.</li>
            <li><strong>Geo-Targeted Dispatch:</strong> Uses ZIP code coordinates and haversine distance matching cached in Redis to dispatch push alerts to the nearest certified inspectors.</li>
            <li><strong>Admin Financial Reporting:</strong> Real-time financial ledgers tracking Gross Merchandise Volume (GMV), completed inspection audits, and scheduled PDF report exports.</li>
          </ul>

          <h4 style="margin-top: 18px;">Tech Stack</h4>
          <p><code>Laravel 12</code> <code>Stripe Connect</code> <code>Laravel Queues</code> <code>MySQL</code> <code>Firebase FCM</code> <code>Next.js</code> <code>Dart / Flutter API</code></p>

          <div style="margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap;">
            <a href="https://play.google.com/store/apps/details?id=com.connecttoinspect.app" target="_blank" rel="noopener" class="btn btn-primary-sm">
              <span>Google Play App</span>
            </a>
            <a href="https://apps.apple.com/us/app/connect-to-inspect/id6786938827" target="_blank" rel="noopener" class="btn btn-secondary-sm">
              <span>Apple App Store</span>
            </a>
          </div>
        </div>
      `
    },
    'find-book': {
      title: 'Find & Book – Multi-Vendor Booking & E-Commerce Platform',
      category: 'Booking & Service Marketplace • Sole Backend Developer | Individual Project • Web Admin & Mobile App',
      html: `
        <div class="modal-detail-content">
          <h4>System Overview & Engineering Scope</h4>
          <p>
            Find & Book is a multi-vendor booking and service marketplace available live on both the Apple App Store and Google Play Store, supported by a comprehensive web administration portal.
          </p>

          <h4 style="margin-top: 18px;">Role & Backend Ownership</h4>
          <p>
            <strong>Sole Backend Developer (Individual Project):</strong> Owned and engineered 100% of the Laravel backend, database design, payment integrations, and RESTful APIs powering the mobile applications.
          </p>
          
          <h4 style="margin-top: 18px;">Key Deliverables & Implementation</h4>
          <ul style="padding-left: 20px; margin-top: 8px;">
            <li><strong>REST API Development:</strong> Built and maintained versioned APIs for vendor profiles, service catalog browsing, appointment booking workflows, and subscription plans.</li>
            <li><strong>Booking & Time-Slot Management:</strong> Implemented booking calendar logic with time-slot reservation, buffer periods, and schedule clash prevention.</li>
            <li><strong>Stripe Integration:</strong> Integrated Stripe payment processing and secure webhook listeners to handle transaction events and refunds.</li>
            <li><strong>Admin & Vendor Portals:</strong> Developed vendor earnings ledgers, platform commission splits, and administrative oversight modules for bookings and subscriptions.</li>
          </ul>

          <h4 style="margin-top: 18px;">Tech Stack</h4>
          <p><code>Laravel</code> <code>PHP</code> <code>REST APIs</code> <code>MySQL</code> <code>Stripe</code> <code>Webhooks</code></p>

          <div style="margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap;">
            <a href="https://play.google.com/store/apps/details?id=com.findandbook.sireenshaban" target="_blank" rel="noopener" class="btn btn-primary-sm">
              <span>Google Play</span>
            </a>
            <a href="https://apps.apple.com/us/app/find-book/id6761288062" target="_blank" rel="noopener" class="btn btn-secondary-sm">
              <span>App Store</span>
            </a>
          </div>
        </div>
      `
    },
  };

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectKey = btn.getAttribute('data-project');
      const data = projectDetails[projectKey];

      if (data) {
        modalProjectTitle.textContent = data.title;
        modalProjectCategory.textContent = data.category;
        modalProjectBody.innerHTML = data.html;
        openModal(projectModal);
      }
    });
  });

  if (closeProjectModalBtn) {
    closeProjectModalBtn.addEventListener('click', () => closeModal(projectModal));
  }

  // --------------------------------------------------------------------------
  // 6. RESUME PREVIEW & PRINT MODAL
  // --------------------------------------------------------------------------
  const resumeModal = document.getElementById('resume-modal');
  const viewResumeBtn = document.getElementById('view-resume-btn');
  const openCvModalBtn = document.getElementById('open-cv-modal-btn');
  const closeResumeModalBtn = document.getElementById('close-resume-modal');
  const printResumeBtn = document.getElementById('print-resume-btn');

  if (viewResumeBtn) {
    viewResumeBtn.addEventListener('click', () => openModal(resumeModal));
  }
  if (openCvModalBtn) {
    openCvModalBtn.addEventListener('click', () => openModal(resumeModal));
  }
  if (mobileResumeBtn) {
    mobileResumeBtn.addEventListener('click', () => {
      closeDrawer();
      openModal(resumeModal);
    });
  }
  if (closeResumeModalBtn) {
    closeResumeModalBtn.addEventListener('click', () => closeModal(resumeModal));
  }
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Common Modal Functions with Focus Management & Trapping
  let previousActiveElement = null;

  function openModal(modal) {
    if (!modal) return;
    previousActiveElement = document.activeElement;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus the first interactive element inside the modal
    const focusable = modal.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (focusable.length > 0) {
      setTimeout(() => focusable[0].focus(), 40);
    }
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Restore focus to previously active trigger element
    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      previousActiveElement.focus();
    }
  }

  // Close modals on background overlay click
  [projectModal, resumeModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    }
  });

  // Modal focus trap & Escape key handler
  window.addEventListener('keydown', (e) => {
    const activeModal = document.querySelector('.modal-overlay.active');

    if (e.key === 'Escape') {
      if (activeModal) closeModal(activeModal);
      closeDrawer(true);
      return;
    }

    if (e.key === 'Tab' && activeModal) {
      const focusables = Array.from(activeModal.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )).filter(el => el.offsetParent !== null);

      if (focusables.length === 0) return;

      const firstElement = focusables[0];
      const lastElement = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  });

  // --------------------------------------------------------------------------
  // 7. ONE-CLICK COPY WITH TOAST FEEDBACK
  // --------------------------------------------------------------------------
  const copyButtons = document.querySelectorAll('.copy-btn, #quick-copy-email-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy') || 'rehanakabirmim@gmail.com';
      copyToClipboard(textToCopy);
    });
  });

  function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied to clipboard: ${text}`);
      }).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`Copied to clipboard: ${text}`);
    } catch (err) {
      showToast('Failed to copy. Please manually select and copy.');
    }
    document.body.removeChild(textArea);
  }

  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg style="width: 18px; height: 18px; color: var(--accent-emerald);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // --------------------------------------------------------------------------
  // 8. CONTACT FORM SUBMISSION
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const submitContactBtn = document.getElementById('submit-contact-btn');
  const formStatus = document.getElementById('form-status');
  let isSubmitting = false;

  function showFormStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.className = 'form-status-msg ' + (type === 'success' ? 'success' : type === 'error' ? 'error' : '');
  }

  if (contactForm) {
    // Clear status when typing
    contactForm.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => {
        if (formStatus && formStatus.style.display !== 'none') {
          formStatus.className = 'form-status-msg';
          formStatus.textContent = '';
        }
      });
    });

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (isSubmitting) return;

      const nameInput = document.getElementById('sender-name');
      const emailInput = document.getElementById('sender-email');
      const subjectInput = document.getElementById('sender-subject');
      const messageInput = document.getElementById('sender-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : 'Portfolio Inquiry';
      const message = messageInput ? messageInput.value.trim() : '';

      // Standard email regex format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFormStatus('Please enter a valid email address (e.g. name@domain.com).', 'error');
        showToast('Please enter a valid email address.');
        if (emailInput) emailInput.focus();
        return;
      }

      if (!name || !message) {
        showFormStatus('Please fill in your name and message.', 'error');
        showToast('Please fill in all required fields.');
        return;
      }

      const formAction = contactForm.getAttribute('action');

      if (formAction && !formAction.includes('YOUR_FORMSPREE_ID')) {
        isSubmitting = true;
        const originalBtnText = submitContactBtn.innerHTML;
        submitContactBtn.disabled = true;
        submitContactBtn.innerHTML = '<span>Sending Message...</span>';
        showFormStatus('Connecting securely and sending message...', 'normal');

        try {
          const response = await fetch(formAction, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
          });

          if (response.ok) {
            showFormStatus('Thank you! Your message was delivered directly to Rehana\'s inbox.', 'success');
            showToast('Message sent directly to Rehana\'s inbox! Thank you.');
            contactForm.reset();
          } else {
            const data = await response.json().catch(() => ({}));
            const errDetail = data.errors ? data.errors.map(err => err.message).join(', ') : 'Submission rejected.';
            throw new Error(errDetail);
          }
        } catch (err) {
          showFormStatus('Direct API dispatch unsuccessful. Launching your email client...', 'error');
          showToast('Could not send via direct API. Opening your email app...');
          sendViaMailto(name, email, subject, message);
        } finally {
          isSubmitting = false;
          submitContactBtn.disabled = false;
          submitContactBtn.innerHTML = originalBtnText;
        }
      } else {
        sendViaMailto(name, email, subject, message);
      }
    });
  }

  function sendViaMailto(name, email, subject, message) {
    const mailtoUrl = `mailto:rehanakabirmim@gmail.com?subject=${encodeURIComponent(subject + ' - via Portfolio from ' + name)}&body=${encodeURIComponent(message + '\n\nSender Email: ' + email)}`;
    window.location.href = mailtoUrl;
    showToast('Opening your default email client to send message!');
    if (contactForm) contactForm.reset();
  }

  // --------------------------------------------------------------------------
  // 9. NAVBAR SCROLL SPY & ELEVATION
  // --------------------------------------------------------------------------
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Header shadow
    if (window.scrollY > 40) {
      header.style.boxShadow = 'var(--shadow-md)';
    } else {
      header.style.boxShadow = 'none';
    }

    // Scrollspy (only applies if navigation uses in-page anchor links)
    const hashLinks = Array.from(navLinks).filter(link => {
      const href = link.getAttribute('href');
      return href && href.startsWith('#');
    });

    if (hashLinks.length > 0) {
      let currentSection = '';
      const scrollPos = window.scrollY + 120;

      sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSection = sec.getAttribute('id');
        }
      });

      hashLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // --------------------------------------------------------------------------
  // 10. CURRENT YEAR FOOTER
  // --------------------------------------------------------------------------
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
