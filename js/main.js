// ============================================================================
// APM AGENTA - Premium Performance Marketing JavaScript Engine
// Clean, Professional Frontend Implementation
// ============================================================================

// ============================================================================
// 1. MOBILE MENU HANDLER
// ============================================================================

function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  // Toggle mobile menu visibility
  mobileToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
  });

  // Close mobile menu when any link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobile);
  });
}

function closeMobile() {
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileToggle = document.getElementById('mobileToggle');
  mobileMenu.classList.remove('active');
  mobileToggle.classList.remove('active');
}

// ============================================================================
// 2. NAVBAR SCROLL HANDLER
// ============================================================================

function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  let lastScrollTop = 0;

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}

// ============================================================================
// 3. DYNAMIC FAQ ACCORDION ENGINE
// ============================================================================

const faqData = [
  {
    question: "Wie unterscheidet sich das APM Growth Framework von klassischen Agenturen?",
    answer: "Klassische Agenturen verwalten meist nur Budgets und reporten wertlose Klicks. Wir bauen geschlossene Daten-Infrastrukturen mit Server-Side Attribution und produzieren performante Video-Assets In-House. Sie zahlen keinen prozentualen Aufschlag auf Ihren Media-Spend."
  },
  {
    question: "Ist die strategische Beratung durch die BAFA förderungsfähig?",
    answer: "Ja, APM Agenta ist als zertifizierte Unternehmensberatung beim Bundesamt für Wirtschaft und Ausfuhrkontrolle gelistet. Je nach Bundesland und Unternehmensgröße können bis zu 50% der strategischen Beratungskosten staatlich bezuschusst werden."
  },
  {
    question: "Wer besitzt die Daten und Werbeaccounts während der Zusammenarbeit?",
    answer: "Zu jedem Zeitpunkt verbleiben alle Werbekonten (Meta, Google, LinkedIn), eingerichteten Pixel, Tracking-Server und produzierten Creative-Assets zu 100% im uneingeschränkten Eigentum Ihres Unternehmens. Wir arbeiten vollkommen transparent."
  },
  {
    question: "Wie läuft der kostenlose Strategie- und Tracking-Audit ab?",
    answer: "Nach Einreichung Ihrer Anfrage analysieren unsere Daten-Spezialisten Ihre aktuellen Tracking-Verluste und Kampagnen-Strukturen vorab. Im 30-minütigen C-Level Sync zeigen wir Ihnen die mathematischen Hebel zur Senkung Ihrer Akquisitionskosten (CPA) auf."
  }
];

function initFaqAccordion() {
  const faqList = document.getElementById('faq-list');

  if (!faqList) return;

  // Build FAQ HTML
  faqData.forEach((item, index) => {
    const faqItem = document.createElement('div');
    faqItem.className = 'faq-item';
    faqItem.innerHTML = `
      <div class="faq-question" data-faq-index="${index}">
        <span class="faq-q-text">${item.question}</span>
        <span class="faq-toggle-icon"></span>
      </div>
      <div class="faq-answer" data-faq-index="${index}" style="display: none;">
        <p>${item.answer}</p>
      </div>
    `;
    faqList.appendChild(faqItem);
  });

  // Attach click handlers to all FAQ questions
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', toggleFaqAnswer);
  });
}

function toggleFaqAnswer(event) {
  const question = event.currentTarget;
  const index = question.getAttribute('data-faq-index');
  const answer = document.querySelector(`.faq-answer[data-faq-index="${index}"]`);
  const isOpen = answer.style.display !== 'none';

  // Close all other FAQ items
  document.querySelectorAll('.faq-answer').forEach(item => {
    item.style.display = 'none';
  });
  document.querySelectorAll('.faq-question').forEach(item => {
    item.classList.remove('active');
  });

  // Toggle current FAQ item
  if (!isOpen) {
    answer.style.display = 'block';
    question.classList.add('active');
  }
}

// ============================================================================
// 4. SMOOTH SCROLL BEHAVIOR
// ============================================================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ============================================================================
// 5. FORM VALIDATION & HANDLING
// ============================================================================

function initFormHandling() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    if (!validateForm()) {
      e.preventDefault();
    }
  });
}

function validateForm() {
  const form = document.getElementById('contact-form');
  const nameField = document.getElementById('fname');
  const emailField = document.getElementById('femail');
  const messageField = document.getElementById('fmessage');
  const consentField = document.getElementById('fconsent');

  let isValid = true;

  // Clear previous errors
  clearFormErrors();

  // Name validation
  if (!nameField.value.trim()) {
    showFieldError('name', 'Bitte geben Sie Ihren Namen ein.');
    isValid = false;
  }

  // Email validation
  if (!emailField.value.trim() || !isValidEmail(emailField.value)) {
    showFieldError('email', 'Bitte geben Sie eine gültige E-Mail-Adresse ein.');
    isValid = false;
  }

  // Message validation
  if (!messageField.value.trim()) {
    showFieldError('message', 'Bitte beschreiben Sie Ihre Wachstumsziele.');
    isValid = false;
  }

  // Consent validation
  if (!consentField.checked) {
    showFieldError('consent', 'Bitte akzeptieren Sie die Datenschutzerklärung.');
    isValid = false;
  }

  return isValid;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showFieldError(fieldName, errorMessage) {
  const errorElement = document.getElementById(`${fieldName}-error`);
  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.style.display = 'block';
  }
}

function clearFormErrors() {
  document.querySelectorAll('.ferr').forEach(error => {
    error.textContent = '';
    error.style.display = 'none';
  });
}

// ============================================================================
// 6. COOKIE CONSENT HANDLER
// ============================================================================

function initCookieConsent() {
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('ck-accept');
  const declineBtn = document.getElementById('ck-decline');

  if (!cookieBanner) return;

  // Check if user has already made a choice
  if (localStorage.getItem('cookie-consent')) {
    cookieBanner.style.display = 'none';
  }

  acceptBtn.addEventListener('click', function() {
    localStorage.setItem('cookie-consent', 'accepted');
    cookieBanner.style.display = 'none';
  });

  declineBtn.addEventListener('click', function() {
    localStorage.setItem('cookie-consent', 'declined');
    cookieBanner.style.display = 'none';
  });
}

// ============================================================================
// 7. INITIALIZATION - DOM READY
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initNavbarScroll();
  initFaqAccordion();
  initSmoothScroll();
  initFormHandling();
  initCookieConsent();
});