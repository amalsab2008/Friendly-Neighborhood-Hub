/**
 * ============================================================================
 * Friendly Neighborhood Hub — script.js
 * Comprehensive client-side logic for campus event discovery, dynamic filtering,
 * interactive registration flow, digital pass generation, and mobile navigation.
 * ============================================================================
 */

'use strict';

/* ============================================================================
   1. DATA MODEL: Fictional Campus Events
   ============================================================================ */
const CAMPUS_EVENTS = [
  {
    id: 'event-1',
    title: 'HackNova 2026: 36-Hour Campus Hackathon',
    category: 'Hackathon',
    date: 'Nov 14 - 16, 2026 • 9:00 AM',
    timestamp: new Date('2026-11-14T09:00:00').getTime(),
    venue: 'Student Tech Center & Arena',
    description: 'Build game-changing AI, Web3, and climate solutions with 400+ student developers. Free food, mentor workshops, sponsor booths, and $5,000 in prizes!',
    seatsLeft: 42,
    seatsTotal: 250,
    organizer: 'ACM Student Chapter',
    badgeClass: 'badge-hackathon',
    gradient: 'linear-gradient(135deg, #312E81 0%, #4F46E5 60%, #818CF8 100%)',
    icon: 'fa-laptop-code',
    registered: false,
    bookmarked: false
  },
  {
    id: 'event-2',
    title: 'Full-Stack Next.js & AI Mastery Workshop',
    category: 'Workshop',
    date: 'Nov 20, 2026 • 2:00 PM - 5:30 PM',
    timestamp: new Date('2026-11-20T14:00:00').getTime(),
    venue: 'Lab 402, Computer Science Wing',
    description: 'Hands-on practical bootcamp on modern web development with Next.js, Tailwind CSS, and integrating LLM APIs into production-ready web applications.',
    seatsLeft: 18,
    seatsTotal: 60,
    organizer: 'Web Dev Club',
    badgeClass: 'badge-workshop',
    gradient: 'linear-gradient(135deg, #78350F 0%, #D97706 60%, #FBBF24 100%)',
    icon: 'fa-chalkboard-user',
    registered: false,
    bookmarked: false
  },
  {
    id: 'event-3',
    title: 'Inter-Department Premier Football League',
    category: 'Sports',
    date: 'Nov 28 - Dec 2, 2026 • 4:00 PM',
    timestamp: new Date('2026-11-28T16:00:00').getTime(),
    venue: 'University Stadium Turf',
    description: 'Annual 7-a-side inter-department championship cup. Register your department squad or join the stadium crowd to cheer for your classmates!',
    seatsLeft: 6,
    seatsTotal: 16,
    organizer: 'Athletic Association',
    badgeClass: 'badge-sports',
    gradient: 'linear-gradient(135deg, #064E3B 0%, #059669 60%, #34D399 100%)',
    icon: 'fa-futbol',
    registered: false,
    bookmarked: false
  },
  {
    id: 'event-4',
    title: 'Rhythm & Beats: Annual Cultural Festival',
    category: 'Cultural',
    date: 'Dec 4 - 6, 2026 • 5:00 PM Onwards',
    timestamp: new Date('2026-12-04T17:00:00').getTime(),
    venue: 'Main Open Air Amphitheatre',
    description: 'Three electrifying nights of battle of the bands, classical & hip-hop dance face-offs, food carnivals, street theater, and an international DJ concert.',
    seatsLeft: 350,
    seatsTotal: 1500,
    organizer: 'Cultural Council',
    badgeClass: 'badge-cultural',
    gradient: 'linear-gradient(135deg, #581C87 0%, #9333EA 60%, #C084FC 100%)',
    icon: 'fa-masks-theater',
    registered: false,
    bookmarked: false
  },
  {
    id: 'event-5',
    title: 'Future of Generative AI & Autonomous Agents',
    category: 'Seminar',
    date: 'Dec 10, 2026 • 11:00 AM - 1:00 PM',
    timestamp: new Date('2026-12-10T11:00:00').getTime(),
    venue: 'Ramanujan Memorial Auditorium',
    description: 'Keynote address by industry researchers exploring the next generation of foundation models, multi-agent reasoning, ethics, and career paths in AI.',
    seatsLeft: 85,
    seatsTotal: 300,
    organizer: 'AI & Robotics Society',
    badgeClass: 'badge-seminar',
    gradient: 'linear-gradient(135deg, #881337 0%, #E11D48 60%, #FB7185 100%)',
    icon: 'fa-lightbulb',
    registered: false,
    bookmarked: false
  },
  {
    id: 'event-6',
    title: 'RoboWars: Combat Robotics Championship',
    category: 'Technical',
    date: 'Dec 15, 2026 • 10:00 AM',
    timestamp: new Date('2026-12-15T10:00:00').getTime(),
    venue: 'Mechanical Engineering Quad',
    description: 'Custom-built 15kg and 30kg remote combat bots enter an enclosed bulletproof arena to clash with spinning blades, flippers, and pneumatic hammers.',
    seatsLeft: 14,
    seatsTotal: 32,
    organizer: 'Robotics Club',
    badgeClass: 'badge-technical',
    gradient: 'linear-gradient(135deg, #0C4A6E 0%, #0284C7 60%, #38BDF8 100%)',
    icon: 'fa-robot',
    registered: false,
    bookmarked: false
  },
  {
    id: 'event-7',
    title: 'UI/UX Design Sprint & Portfolio Critique',
    category: 'Workshop',
    date: 'Dec 18, 2026 • 3:00 PM - 6:00 PM',
    timestamp: new Date('2026-12-18T15:00:00').getTime(),
    venue: 'Design Innovation Studio (Hall B)',
    description: 'Fast-paced collaborative sprint on design systems, micro-interactions in Figma, and personalized 1-on-1 portfolio feedback from visiting product designers.',
    seatsLeft: 22,
    seatsTotal: 45,
    organizer: 'Design Syndicate',
    badgeClass: 'badge-workshop',
    gradient: 'linear-gradient(135deg, #9A3412 0%, #EA580C 60%, #FB923C 100%)',
    icon: 'fa-palette',
    registered: false,
    bookmarked: false
  },
  {
    id: 'event-8',
    title: 'Echoes of Literature: Campus Poetry Slam & Book Swap',
    category: 'Cultural',
    date: 'Dec 22, 2026 • 6:00 PM - 8:30 PM',
    timestamp: new Date('2026-12-22T18:00:00').getTime(),
    venue: 'Central Library Terrace Garden',
    description: 'An acoustic candlelit evening of original student poetry, short storytelling, live acoustic guitar sets, hot cider, and an open community book exchange.',
    seatsLeft: 38,
    seatsTotal: 80,
    organizer: 'Literary Guild',
    badgeClass: 'badge-cultural',
    gradient: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 60%, #A78BFA 100%)',
    icon: 'fa-feather-pointed',
    registered: false,
    bookmarked: false
  }
];

/* ============================================================================
   2. APPLICATION STATE
   ============================================================================ */
const AppState = {
  events: [...CAMPUS_EVENTS],
  selectedCategory: 'all',
  searchQuery: '',
  sortBy: 'date-asc',
  currentRegisterEvent: null,
  registeredEvents: new Set()
};

/* ============================================================================
   3. DOM ELEMENT REFERENCES
   ============================================================================ */
const DOM = {
  // Navigation & Header
  header: document.getElementById('header'),
  menuToggle: document.getElementById('menuToggle'),
  mobileNav: document.getElementById('mobileNav'),
  navLinks: document.querySelectorAll('.nav-link, .mobile-nav-link'),
  
  // Filter & Search Controls
  searchInput: document.getElementById('eventSearchInput'),
  clearSearchBtn: document.getElementById('clearSearchBtn'),
  categoryPills: document.querySelectorAll('.filter-pill'),
  sortSelect: document.getElementById('eventSortSelect'),
  resultsCount: document.getElementById('visibleCount'),
  activeFilterTags: document.getElementById('activeFilterTags'),
  
  // Events Feed
  eventsGrid: document.getElementById('eventsGrid'),
  emptyState: document.getElementById('emptyState'),
  resetFiltersBtn: document.getElementById('resetFiltersBtn'),
  
  // Category quick-click cards in Categories section
  categoryCards: document.querySelectorAll('.category-card'),
  footerCategoryLinks: document.querySelectorAll('.footer-category-link'),
  
  // Registration Modal
  regModalBackdrop: document.getElementById('registrationModalBackdrop'),
  closeModalBtn: document.getElementById('closeModalBtn'),
  cancelModalBtn: document.getElementById('cancelModalBtn'),
  doneModalBtn: document.getElementById('doneModalBtn'),
  modalStepForm: document.getElementById('modalStepForm'),
  modalStepSuccess: document.getElementById('modalStepSuccess'),
  registrationForm: document.getElementById('registrationForm'),
  registerEventId: document.getElementById('registerEventId'),
  modalEventTitle: document.getElementById('modalEventTitle'),
  modalEventCategory: document.getElementById('modalEventCategory'),
  modalEventDate: document.getElementById('modalEventDate'),
  modalEventVenue: document.getElementById('modalEventVenue'),
  
  // Ticket fields
  ticketCategoryBadge: document.getElementById('ticketCategoryBadge'),
  ticketEventTitle: document.getElementById('ticketEventTitle'),
  ticketAttendeeName: document.getElementById('ticketAttendeeName'),
  ticketStudentId: document.getElementById('ticketStudentId'),
  ticketEventDate: document.getElementById('ticketEventDate'),
  ticketEventVenue: document.getElementById('ticketEventVenue'),
  ticketRefCode: document.getElementById('ticketRefCode'),
  printTicketBtn: document.getElementById('printTicketBtn'),

  // Host Event Modal
  hostEventBtn: document.getElementById('hostEventBtn'),
  hostEventModalBackdrop: document.getElementById('hostEventModalBackdrop'),
  closeHostModalBtn: document.getElementById('closeHostModalBtn'),
  closeHostModalOkBtn: document.getElementById('closeHostModalOkBtn'),
  
  // Newsletter & Toast
  newsletterForm: document.getElementById('newsletterForm'),
  newsletterEmail: document.getElementById('newsletterEmail'),
  newsletterStatus: document.getElementById('newsletterStatus'),
  toastContainer: document.getElementById('toastContainer')
};

/* ============================================================================
   4. INITIALIZATION
   ============================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileNav();
  initEventFiltering();
  initRegistrationModal();
  initHostEventModal();
  initNewsletter();
  renderEvents();
});

/* ============================================================================
   5. NAVIGATION & SCROLL MANAGEMENT
   ============================================================================ */
/**
 * Adds a shadow to navbar when scrolled down
 */
function initNavbarScroll() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      DOM.header.classList.add('scrolled');
    } else {
      DOM.header.classList.remove('scrolled');
    }
    updateActiveNavLink();
  }, { passive: true });
}

/**
 * Updates active navigation link based on scroll position
 */
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPosition >= top && scrollPosition < top + height) {
      DOM.navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/**
 * Toggles mobile drawer menu and handles smooth closing
 */
function initMobileNav() {
  DOM.menuToggle.addEventListener('click', () => {
    const isOpen = DOM.mobileNav.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close mobile nav when clicking any nav link
  document.querySelectorAll('.mobile-nav-link, .mobile-cta').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close on window resize if enlarged to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && DOM.mobileNav.classList.contains('open')) {
      closeMobileMenu();
    }
  });
}

function openMobileMenu() {
  DOM.mobileNav.classList.add('open');
  DOM.mobileNav.setAttribute('aria-hidden', 'false');
  DOM.menuToggle.classList.add('open');
  DOM.menuToggle.setAttribute('aria-expanded', 'true');
}

function closeMobileMenu() {
  DOM.mobileNav.classList.remove('open');
  DOM.mobileNav.setAttribute('aria-hidden', 'true');
  DOM.menuToggle.classList.remove('open');
  DOM.menuToggle.setAttribute('aria-expanded', 'false');
}

/* ============================================================================
   6. EVENT FILTERING, SEARCH & SORT LOGIC
   ============================================================================ */
function initEventFiltering() {
  // Live Search Input
  DOM.searchInput.addEventListener('input', (e) => {
    AppState.searchQuery = e.target.value.trim().toLowerCase();
    DOM.clearSearchBtn.style.display = AppState.searchQuery ? 'flex' : 'none';
    renderEvents();
  });

  // Clear Search Button
  DOM.clearSearchBtn.addEventListener('click', () => {
    DOM.searchInput.value = '';
    AppState.searchQuery = '';
    DOM.clearSearchBtn.style.display = 'none';
    DOM.searchInput.focus();
    renderEvents();
  });

  // Category Filter Pills
  DOM.categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const selected = pill.getAttribute('data-category');
      setCategoryFilter(selected);
    });
  });

  // Category Cards in Category Showcase Section
  DOM.categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const category = card.getAttribute('data-category');
      setCategoryFilter(category);
      smoothScrollToEvents();
    });
  });

  // Footer Category Links
  DOM.footerCategoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const category = link.getAttribute('data-category');
      setCategoryFilter(category);
      smoothScrollToEvents();
    });
  });

  // Sort Selection Dropdown
  DOM.sortSelect.addEventListener('change', (e) => {
    AppState.sortBy = e.target.value;
    renderEvents();
  });

  // Reset Filters Button in Empty State
  DOM.resetFiltersBtn.addEventListener('click', resetAllFilters);
}

/**
 * Activates a specific category filter, updating pill state and rendering
 */
function setCategoryFilter(category) {
  AppState.selectedCategory = category;

  // Update pills UI
  DOM.categoryPills.forEach(pill => {
    if (pill.getAttribute('data-category') === category) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });

  renderEvents();
}

/**
 * Resets search, category pills, and sort dropdown to default state
 */
function resetAllFilters() {
  AppState.searchQuery = '';
  AppState.selectedCategory = 'all';
  AppState.sortBy = 'date-asc';

  DOM.searchInput.value = '';
  DOM.clearSearchBtn.style.display = 'none';
  DOM.sortSelect.value = 'date-asc';

  DOM.categoryPills.forEach(pill => {
    pill.classList.toggle('active', pill.getAttribute('data-category') === 'all');
  });

  renderEvents();
  showToast('Filters reset to show all events', 'info');
}

/**
 * Helper to smoothly scroll down to the events section
 */
function smoothScrollToEvents() {
  const eventsSec = document.getElementById('events');
  if (eventsSec) {
    eventsSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Filters and sorts the master events list based on AppState
 * @returns {Array} Filtered and sorted events
 */
function getFilteredAndSortedEvents() {
  let list = AppState.events.filter(event => {
    // 1. Category check
    const matchesCategory = 
      AppState.selectedCategory === 'all' || 
      event.category.toLowerCase() === AppState.selectedCategory.toLowerCase();

    if (!matchesCategory) return false;

    // 2. Search check (title, description, venue, organizer, category)
    if (AppState.searchQuery) {
      const q = AppState.searchQuery;
      const titleMatch = event.title.toLowerCase().includes(q);
      const descMatch = event.description.toLowerCase().includes(q);
      const venueMatch = event.venue.toLowerCase().includes(q);
      const orgMatch = event.organizer.toLowerCase().includes(q);
      const catMatch = event.category.toLowerCase().includes(q);

      return titleMatch || descMatch || venueMatch || orgMatch || catMatch;
    }

    return true;
  });

  // Sort logic
  list.sort((a, b) => {
    switch (AppState.sortBy) {
      case 'date-asc':
        return a.timestamp - b.timestamp;
      case 'date-desc':
        return b.timestamp - a.timestamp;
      case 'name-asc':
        return a.title.localeCompare(b.title);
      case 'seats-asc':
        return a.seatsLeft - b.seatsLeft;
      default:
        return 0;
    }
  });

  return list;
}

/**
 * Renders event cards dynamically into the DOM
 */
function renderEvents() {
  const filtered = getFilteredAndSortedEvents();

  // Update visible count in UI
  DOM.resultsCount.textContent = filtered.length;

  // Update active filter meta tags
  renderActiveFilterTags();

  // Handle empty state vs populated grid
  if (filtered.length === 0) {
    DOM.eventsGrid.innerHTML = '';
    DOM.emptyState.style.display = 'block';
    return;
  }

  DOM.emptyState.style.display = 'none';

  // Build HTML for each card
  const cardsHtml = filtered.map(event => {
    const isRegistered = AppState.registeredEvents.has(event.id);
    const isBookmarked = event.bookmarked;

    const seatsPillClass = event.seatsLeft <= 20 ? 'seats-alert' : 'seats-open';
    const seatsLabel = event.seatsLeft <= 10 
      ? `🔥 Only ${event.seatsLeft} spots left!` 
      : `${event.seatsLeft} spots remaining`;

    const registerBtnHtml = isRegistered
      ? `<button type="button" class="btn btn-sm registered-btn" disabled>
           <i class="fa-solid fa-circle-check"></i>
           <span>Registered ✓</span>
         </button>`
      : `<button type="button" class="btn btn-primary btn-sm register-btn" data-event-id="${event.id}">
           <i class="fa-solid fa-ticket"></i>
           <span>Register</span>
         </button>`;

    return `
      <article class="event-card" id="card-${event.id}" data-category="${event.category}">
        <div class="card-banner" style="background: ${event.gradient};">
          <span class="banner-badge ${event.badgeClass}">${event.category}</span>
          <button 
            type="button" 
            class="bookmark-btn ${isBookmarked ? 'saved' : ''}" 
            data-bookmark-id="${event.id}" 
            aria-label="${isBookmarked ? 'Remove from bookmarks' : 'Bookmark this event'}"
          >
            <i class="${isBookmarked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}"></i>
          </button>
          <div class="banner-date-overlay">
            <i class="fa-regular fa-calendar"></i>
            <span>${event.date}</span>
          </div>
        </div>

        <div class="card-content">
          <h3 class="card-title">${escapeHtml(event.title)}</h3>
          
          <div class="card-venue">
            <i class="fa-solid fa-location-dot"></i>
            <span>${escapeHtml(event.venue)}</span>
          </div>

          <p class="card-desc">${escapeHtml(event.description)}</p>

          <div class="card-meta-pills">
            <span class="meta-pill ${seatsPillClass}">
              <i class="fa-solid fa-users"></i> ${seatsLabel}
            </span>
          </div>

          <div class="card-footer">
            <div class="organizer-info" title="Organized by ${escapeHtml(event.organizer)}">
              <span class="organizer-avatar">
                <i class="fa-solid ${event.icon}"></i>
              </span>
              <span class="organizer-name">${escapeHtml(event.organizer)}</span>
            </div>
            ${registerBtnHtml}
          </div>
        </div>
      </article>
    `;
  }).join('');

  DOM.eventsGrid.innerHTML = cardsHtml;

  // Attach button event listeners to new cards
  attachCardActionListeners();
}

/**
 * Renders badges for currently active search and category filters
 */
function renderActiveFilterTags() {
  const tags = [];

  if (AppState.selectedCategory !== 'all') {
    tags.push(`
      <span class="filter-tag">
        Category: ${escapeHtml(AppState.selectedCategory)}
        <button type="button" aria-label="Remove category filter" onclick="window.clearCategoryTag()">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </span>
    `);
  }

  if (AppState.searchQuery) {
    tags.push(`
      <span class="filter-tag">
        Search: "${escapeHtml(AppState.searchQuery)}"
        <button type="button" aria-label="Clear search filter" onclick="window.clearSearchTag()">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </span>
    `);
  }

  DOM.activeFilterTags.innerHTML = tags.join('');
}

// Global tag clear handlers for active filter chips
window.clearCategoryTag = () => {
  setCategoryFilter('all');
};

window.clearSearchTag = () => {
  DOM.searchInput.value = '';
  AppState.searchQuery = '';
  DOM.clearSearchBtn.style.display = 'none';
  renderEvents();
};

/**
 * Attaches click handlers to dynamically rendered Register and Bookmark buttons
 */
function attachCardActionListeners() {
  // Register Buttons
  document.querySelectorAll('.register-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const eventId = btn.getAttribute('data-event-id');
      openRegistrationModal(eventId);
    });
  });

  // Bookmark Buttons
  document.querySelectorAll('.bookmark-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const eventId = btn.getAttribute('data-bookmark-id');
      toggleBookmark(eventId);
    });
  });
}

/**
 * Toggles bookmark status for an event
 */
function toggleBookmark(eventId) {
  const target = AppState.events.find(ev => ev.id === eventId);
  if (!target) return;

  target.bookmarked = !target.bookmarked;
  renderEvents();

  if (target.bookmarked) {
    showToast(`Saved "${target.title.split(':')[0]}" to your bookmarks!`, 'success');
  } else {
    showToast(`Removed from bookmarks`, 'info');
  }
}

/* ============================================================================
   7. REGISTRATION MODAL & CONFIRMATION FLOW
   ============================================================================ */
function initRegistrationModal() {
  // Close modal via close button (x)
  DOM.closeModalBtn.addEventListener('click', closeRegistrationModal);
  
  // Close modal via cancel button
  DOM.cancelModalBtn.addEventListener('click', closeRegistrationModal);

  // Close modal via "Done" button on success screen
  DOM.doneModalBtn.addEventListener('click', closeRegistrationModal);

  // Close modal when clicking outside dialog (on backdrop)
  DOM.regModalBackdrop.addEventListener('click', (e) => {
    if (e.target === DOM.regModalBackdrop) {
      closeRegistrationModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && DOM.regModalBackdrop.classList.contains('open')) {
      closeRegistrationModal();
    }
  });

  // Handle Form Submission
  DOM.registrationForm.addEventListener('submit', handleRegistrationSubmit);

  // Print Pass Handler
  DOM.printTicketBtn.addEventListener('click', () => {
    window.print();
  });
}

/**
 * Opens registration modal pre-populated with target event's data
 */
function openRegistrationModal(eventId) {
  const event = AppState.events.find(ev => ev.id === eventId);
  if (!event) return;

  AppState.currentRegisterEvent = event;

  // Populate Event Header Information
  DOM.registerEventId.value = event.id;
  DOM.modalEventTitle.textContent = event.title;
  DOM.modalEventCategory.textContent = event.category;
  DOM.modalEventDate.textContent = event.date;
  DOM.modalEventVenue.textContent = event.venue;

  // Reset form inputs and clear validation errors
  DOM.registrationForm.reset();
  clearValidationErrors();

  // Ensure Step 1 (form) is displayed, Step 2 (ticket) is hidden
  DOM.modalStepForm.style.display = 'block';
  DOM.modalStepSuccess.style.display = 'none';

  // Open backdrop
  DOM.regModalBackdrop.classList.add('open');
  DOM.regModalBackdrop.setAttribute('aria-hidden', 'false');

  // Trap focus to first input
  setTimeout(() => {
    const firstInput = document.getElementById('studentName');
    if (firstInput) firstInput.focus();
  }, 100);
}

/**
 * Closes registration modal and cleans up
 */
function closeRegistrationModal() {
  DOM.regModalBackdrop.classList.remove('open');
  DOM.regModalBackdrop.setAttribute('aria-hidden', 'true');
  AppState.currentRegisterEvent = null;
}

/**
 * Validates registration form inputs
 */
function validateRegistrationForm() {
  let isValid = true;
  clearValidationErrors();

  const name = document.getElementById('studentName');
  const email = document.getElementById('studentEmail');
  const studentId = document.getElementById('studentId');
  const year = document.getElementById('studentYear');
  const dept = document.getElementById('studentDept');
  const terms = document.getElementById('termsCheck');

  // Name check
  if (!name.value.trim()) {
    showError(name, 'nameError', 'Please enter your full name.');
    isValid = false;
  }

  // Email check
  const emailVal = email.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailVal || !emailPattern.test(emailVal)) {
    showError(email, 'emailError', 'Please enter a valid student email address.');
    isValid = false;
  }

  // Student ID check
  if (!studentId.value.trim()) {
    showError(studentId, 'idError', 'Please enter your student ID or roll number.');
    isValid = false;
  }

  // Year check
  if (!year.value) {
    showError(year, 'yearError', 'Please select your current academic year.');
    isValid = false;
  }

  // Department check
  if (!dept.value.trim()) {
    showError(dept, 'deptError', 'Please enter your major or department.');
    isValid = false;
  }

  // Terms check
  if (!terms.checked) {
    const termsErr = document.getElementById('termsError');
    if (termsErr) termsErr.classList.add('visible');
    isValid = false;
  }

  return isValid;
}

function showError(inputEl, errorId, message) {
  inputEl.classList.add('is-invalid');
  const errEl = document.getElementById(errorId);
  if (errEl) {
    if (message) errEl.textContent = message;
    errEl.classList.add('visible');
  }
}

function clearValidationErrors() {
  document.querySelectorAll('.form-input, .form-select').forEach(el => {
    el.classList.remove('is-invalid');
  });
  document.querySelectorAll('.form-error').forEach(el => {
    el.classList.remove('visible');
  });
}

/**
 * Handles form submission: validates, creates pass, updates card state, and shows ticket
 */
function handleRegistrationSubmit(e) {
  e.preventDefault();

  if (!validateRegistrationForm()) {
    return;
  }

  const event = AppState.currentRegisterEvent;
  if (!event) return;

  // Retrieve entered attendee details
  const attendeeName = document.getElementById('studentName').value.trim();
  const attendeeEmail = document.getElementById('studentEmail').value.trim();
  const studentId = document.getElementById('studentId').value.trim();

  // Generate a random fictional pass reference code (e.g. FNH-83921)
  const randomRef = 'FNH-' + Math.floor(10000 + Math.random() * 90000);

  // Populate Step 2: Digital Pass Ticket Details
  DOM.ticketCategoryBadge.textContent = event.category;
  DOM.ticketEventTitle.textContent = event.title;
  DOM.ticketAttendeeName.textContent = attendeeName;
  DOM.ticketStudentId.textContent = studentId;
  DOM.ticketEventDate.textContent = event.date;
  DOM.ticketEventVenue.textContent = event.venue;
  DOM.ticketRefCode.textContent = randomRef;

  // Mark event as registered in AppState
  AppState.registeredEvents.add(event.id);
  event.registered = true;
  if (event.seatsLeft > 0) {
    event.seatsLeft -= 1;
  }

  // Switch modal view to Confirmation Step
  DOM.modalStepForm.style.display = 'none';
  DOM.modalStepSuccess.style.display = 'block';

  // Trigger celebratory confetti effect
  createConfettiBurst();

  // Display celebratory toast
  showToast(`Spot reserved for ${event.title.split(':')[0]}!`, 'success');

  // Re-render the events grid to show updated "Registered ✓" button state
  renderEvents();
}

/* ============================================================================
   8. HOST EVENT MODAL
   ============================================================================ */
function initHostEventModal() {
  DOM.hostEventBtn.addEventListener('click', () => {
    DOM.hostEventModalBackdrop.classList.add('open');
    DOM.hostEventModalBackdrop.setAttribute('aria-hidden', 'false');
  });

  const closeHost = () => {
    DOM.hostEventModalBackdrop.classList.remove('open');
    DOM.hostEventModalBackdrop.setAttribute('aria-hidden', 'true');
  };

  DOM.closeHostModalBtn.addEventListener('click', closeHost);
  DOM.closeHostModalOkBtn.addEventListener('click', closeHost);
  DOM.hostEventModalBackdrop.addEventListener('click', (e) => {
    if (e.target === DOM.hostEventModalBackdrop) closeHost();
  });
}

/* ============================================================================
   9. NEWSLETTER SUBSCRIPTION
   ============================================================================ */
function initNewsletter() {
  DOM.newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = DOM.newsletterEmail.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailPattern.test(email)) {
      DOM.newsletterStatus.textContent = 'Please enter a valid email address.';
      DOM.newsletterStatus.className = 'newsletter-status error';
      return;
    }

    DOM.newsletterStatus.textContent = 'Subscribed! You will receive the weekly digest.';
    DOM.newsletterStatus.className = 'newsletter-status success';
    DOM.newsletterEmail.value = '';
    showToast('Subscribed to weekly campus digest!', 'success');

    setTimeout(() => {
      DOM.newsletterStatus.textContent = '';
      DOM.newsletterStatus.className = 'newsletter-status';
    }, 4500);
  });
}

/* ============================================================================
   10. TOAST NOTIFICATIONS
   ============================================================================ */
/**
 * Displays a non-intrusive floating toast message
 * @param {string} message - Message text to display
 * @param {'success'|'info'|'warning'} type - Toast theme type
 */
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' 
    ? '<i class="fa-solid fa-circle-check toast-icon"></i>'
    : '<i class="fa-solid fa-circle-info toast-icon"></i>';

  toast.innerHTML = `
    ${icon}
    <span>${escapeHtml(message)}</span>
  `;

  DOM.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}

/* ============================================================================
   11. CELEBRATORY CONFETTI BURST (Vanilla Canvas)
   ============================================================================ */
function createConfettiBurst() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }
  canvas.width = window.innerWidth || 1000;
  canvas.height = window.innerHeight || 800;

  const particles = [];
  const colors = ['#4F46E5', '#FF6B4A', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

  for (let i = 0; i < 70; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height * 0.45,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.7) * 16,
      rotation: Math.random() * 360,
      vRotation: (Math.random() - 0.5) * 10,
      opacity: 1
    });
  }

  let animationFrame;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.4; // gravity
      p.rotation += p.vRotation;
      p.opacity -= 0.015;

      if (p.opacity > 0) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
        ctx.restore();
      }
    });

    if (alive) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationFrame);
      canvas.remove();
    }
  }

  animate();
}

/* ============================================================================
   12. UTILITY HELPERS
   ============================================================================ */
/**
 * Safely escapes HTML characters to prevent XSS
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
