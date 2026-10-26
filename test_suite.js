/**
 * Automated Test Suite for Friendly Neighborhood Hub
 * Validates DOM rendering, search filtering, category filtering,
 * registration flow, validation, and modal interactions.
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8')
  .replace('<script src="script.js"></script>', '');
const scriptContent = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');

const dom = new JSDOM(htmlContent, {
  runScripts: 'dangerously'
});

const { window } = dom;
const { document } = window;

// Polyfill window.scrollTo, window.print, and scrollIntoView for tests
window.scrollTo = () => {};
window.print = () => { window.__printed = true; };
window.Element.prototype.scrollIntoView = () => {};

// Evaluate script.js in DOM context
const scriptEl = document.createElement('script');
scriptEl.textContent = scriptContent;
document.body.appendChild(scriptEl);

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    testsPassed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    testsFailed++;
  }
}

console.log('\n=== RUNNING FRIENDLY NEIGHBORHOOD HUB TEST SUITE ===\n');

// Trigger DOMContentLoaded
window.document.dispatchEvent(new window.Event('DOMContentLoaded'));

// --- TEST 1: Initial Render ---
console.log('Test Group 1: Initial State & DOM Rendering');
const initialCards = document.querySelectorAll('.event-card');
assert(initialCards.length === 8, `Expected 8 initial event cards, found ${initialCards.length}`);

const visibleCountEl = document.getElementById('visibleCount');
assert(visibleCountEl.textContent === '8', `Expected visible count to show '8', got '${visibleCountEl.textContent}'`);

const emptyState = document.getElementById('emptyState');
assert(emptyState.style.display === 'none', 'Empty state should be hidden initially');

// --- TEST 2: Search Functionality ---
console.log('\nTest Group 2: Live Search Filtering');
const searchInput = document.getElementById('eventSearchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');

// Search for 'hackathon'
searchInput.value = 'hackathon';
searchInput.dispatchEvent(new window.Event('input'));

let cards = document.querySelectorAll('.event-card');
assert(cards.length === 1, `Expected 1 card for 'hackathon' search, got ${cards.length}`);
assert(cards[0].querySelector('.card-title').textContent.includes('HackNova'), 'Card title matches HackNova');
assert(clearSearchBtn.style.display === 'flex', 'Clear search button is visible when searching');

// Search for 'workshop' (matches Next.js workshop, UI/UX workshop, and HackNova mentor workshops)
searchInput.value = 'workshop';
searchInput.dispatchEvent(new window.Event('input'));
cards = document.querySelectorAll('.event-card');
assert(cards.length === 3, `Expected 3 cards for 'workshop' search (includes descriptions), got ${cards.length}`);

// Search for 'football'
searchInput.value = 'football';
searchInput.dispatchEvent(new window.Event('input'));
cards = document.querySelectorAll('.event-card');
assert(cards.length === 1, `Expected 1 card for 'football' search, got ${cards.length}`);

// Clear search
clearSearchBtn.click();
cards = document.querySelectorAll('.event-card');
assert(cards.length === 8, `Expected 8 cards after clearing search, got ${cards.length}`);
assert(searchInput.value === '', 'Search input is reset to empty string');

// Search non-existent
searchInput.value = 'supercalifragilistic123';
searchInput.dispatchEvent(new window.Event('input'));
cards = document.querySelectorAll('.event-card');
assert(cards.length === 0, `Expected 0 cards for non-existent search, got ${cards.length}`);
assert(emptyState.style.display === 'block', 'Empty state is displayed when no matches found');

// Click Reset Filters button
const resetBtn = document.getElementById('resetFiltersBtn');
resetBtn.click();
cards = document.querySelectorAll('.event-card');
assert(cards.length === 8, `Expected 8 cards after clicking Reset Filters, got ${cards.length}`);

// --- TEST 3: Category Filtering ---
console.log('\nTest Group 3: Category Filter Pills & Showcase');
const culturalPill = Array.from(document.querySelectorAll('.filter-pill')).find(p => p.getAttribute('data-category') === 'Cultural');
assert(culturalPill !== undefined, 'Cultural filter pill exists');
culturalPill.click();

cards = document.querySelectorAll('.event-card');
assert(cards.length === 2, `Expected 2 Cultural events, got ${cards.length}`);
assert(culturalPill.classList.contains('active'), 'Cultural pill has .active class');

const sportsPill = Array.from(document.querySelectorAll('.filter-pill')).find(p => p.getAttribute('data-category') === 'Sports');
sportsPill.click();
cards = document.querySelectorAll('.event-card');
assert(cards.length === 1, `Expected 1 Sports event, got ${cards.length}`);

// Category card in showcase section
const techCard = Array.from(document.querySelectorAll('.category-card')).find(c => c.getAttribute('data-category') === 'Technical');
techCard.click();
cards = document.querySelectorAll('.event-card');
assert(cards.length === 1, `Expected 1 Technical event after clicking category card, got ${cards.length}`);

// Reset to All
const allPill = Array.from(document.querySelectorAll('.filter-pill')).find(p => p.getAttribute('data-category') === 'all');
allPill.click();
cards = document.querySelectorAll('.event-card');
assert(cards.length === 8, `Expected 8 events after selecting All Events, got ${cards.length}`);

// --- TEST 4: Registration Modal & Validation ---
console.log('\nTest Group 4: Registration Flow & Ticket Pass Generation');
const firstRegisterBtn = document.querySelector('.register-btn');
assert(firstRegisterBtn !== null, 'Found Register button on card');

firstRegisterBtn.click();
const regModal = document.getElementById('registrationModalBackdrop');
assert(regModal.classList.contains('open'), 'Registration modal opened with .open class');

const modalTitle = document.getElementById('modalEventTitle').textContent;
assert(modalTitle.includes('HackNova'), `Modal populated with event title, got: ${modalTitle}`);

// Attempt submitting empty form
const regForm = document.getElementById('registrationForm');
regForm.dispatchEvent(new window.Event('submit', { cancelable: true }));

const nameError = document.getElementById('nameError');
assert(nameError.classList.contains('visible'), 'Name validation error displayed on empty submission');

// Fill valid form fields
document.getElementById('studentName').value = 'Jordan Lee';
document.getElementById('studentEmail').value = 'jordan.lee@university.edu';
document.getElementById('studentId').value = 'ENG-2024-889';
document.getElementById('studentYear').value = '3rd Year';
document.getElementById('studentDept').value = 'Electrical Engineering';
document.getElementById('termsCheck').checked = true;

// Submit valid registration
regForm.dispatchEvent(new window.Event('submit', { cancelable: true }));

const modalStepForm = document.getElementById('modalStepForm');
const modalStepSuccess = document.getElementById('modalStepSuccess');
assert(modalStepForm.style.display === 'none', 'Form step is hidden after successful submission');
assert(modalStepSuccess.style.display === 'block', 'Success step is displayed after registration');

// Check Digital Pass Ticket content
const ticketAttendee = document.getElementById('ticketAttendeeName').textContent;
const ticketRefCode = document.getElementById('ticketRefCode').textContent;
assert(ticketAttendee === 'Jordan Lee', `Ticket shows correct attendee: ${ticketAttendee}`);
assert(ticketRefCode.startsWith('FNH-'), `Ticket has valid pass ref code: ${ticketRefCode}`);

// Print ticket check
document.getElementById('printTicketBtn').click();
assert(window.__printed === true, 'Print ticket triggers window.print()');

// Click Done button to close modal
document.getElementById('doneModalBtn').click();
assert(!regModal.classList.contains('open'), 'Modal closed after clicking Done');

// Verify Event Card button is updated to Registered
const updatedFirstCard = document.getElementById('card-event-1');
const registeredBadgeBtn = updatedFirstCard.querySelector('.registered-btn');
assert(registeredBadgeBtn !== null, 'Event 1 button is updated to .registered-btn');
assert(registeredBadgeBtn.disabled === true, 'Registered button is disabled to prevent duplicate RSVP');
assert(registeredBadgeBtn.textContent.includes('Registered ✓'), 'Registered button shows "Registered ✓"');

// --- TEST 5: Bookmarking / Favoriting ---
console.log('\nTest Group 5: Bookmark Interaction');
let firstBookmarkBtn = document.querySelector('.bookmark-btn');
firstBookmarkBtn.click();
firstBookmarkBtn = document.querySelector('.bookmark-btn');
assert(firstBookmarkBtn.classList.contains('saved'), 'Bookmark button toggled to .saved');

firstBookmarkBtn.click();
firstBookmarkBtn = document.querySelector('.bookmark-btn');
assert(!firstBookmarkBtn.classList.contains('saved'), 'Bookmark button toggled back from .saved');

// --- TEST 6: Mobile Navigation Drawer ---
console.log('\nTest Group 6: Mobile Navigation Menu');
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

menuToggle.click();
assert(mobileNav.classList.contains('open'), 'Mobile nav opened after clicking hamburger toggle');
assert(menuToggle.getAttribute('aria-expanded') === 'true', 'aria-expanded is true when open');

menuToggle.click();
assert(!mobileNav.classList.contains('open'), 'Mobile nav closed after toggling again');
assert(menuToggle.getAttribute('aria-expanded') === 'false', 'aria-expanded is false when closed');

// --- TEST 7: Newsletter Subscription ---
console.log('\nTest Group 7: Newsletter Subscription');
const newsletterForm = document.getElementById('newsletterForm');
const newsletterEmail = document.getElementById('newsletterEmail');
const newsletterStatus = document.getElementById('newsletterStatus');

newsletterEmail.value = 'invalid-email';
newsletterForm.dispatchEvent(new window.Event('submit', { cancelable: true }));
assert(newsletterStatus.classList.contains('error'), 'Shows error for invalid email');

newsletterEmail.value = 'student@campus.edu';
newsletterForm.dispatchEvent(new window.Event('submit', { cancelable: true }));
assert(newsletterStatus.classList.contains('success'), 'Shows success for valid email');

// --- TEST 8: Host Event Modal ---
console.log('\nTest Group 8: Host Event Modal');
const hostBtn = document.getElementById('hostEventBtn');
const hostModal = document.getElementById('hostEventModalBackdrop');
const closeHostBtn = document.getElementById('closeHostModalBtn');

hostBtn.click();
assert(hostModal.classList.contains('open'), 'Host Event modal opened');

closeHostBtn.click();
assert(!hostModal.classList.contains('open'), 'Host Event modal closed');

console.log('\n===================================================');
console.log(`TOTAL TESTS: ${testsPassed + testsFailed} | PASSED: ${testsPassed} | FAILED: ${testsFailed}`);
console.log('===================================================\n');

if (testsFailed > 0) {
  process.exit(1);
} else {
  console.log('ALL AUTOMATED TESTS PASSED SUCCESSFULLY! 🎉\n');
}
