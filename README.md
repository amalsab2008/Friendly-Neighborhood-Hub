# Friendly Neighborhood Hub 🎓

> A modern, responsive, student-friendly college event discovery platform where campus students can explore upcoming hackathons, workshops, cultural festivals, technical competitions, athletic tournaments, and guest seminars.

---

## 🌟 Key Features

1. **Navigation Bar**
   - Branded college crest logo & title.
   - Smooth navigation links: *Home*, *Explore Events*, *Categories*, *About*.
   - Prominent "Explore Events" call-to-action button.
   - Responsive mobile navigation drawer with animated hamburger toggle.
   - Sticky backdrop blur header with scroll shadow.

2. **Hero Section**
   - High-energy headline: *"Discover What's Happening on Campus"*.
   - Call-to-action button linking directly to the events schedule.
   - Dynamic floating event cards with live badges and gentle floating animations.
   - Quick stats banner (*50+ Events*, *4.8k Students Joined*, *100% Free*).

3. **Curated Campus Events (8 Diverse Cards)**
   - **HackNova 2026**: 36-Hour Campus Hackathon (Hackathon)
   - **Full-Stack Next.js & AI Mastery Workshop**: Practical web dev & LLMs (Workshop)
   - **Inter-Department Premier Football League**: 7-a-side championship (Sports)
   - **Rhythm & Beats**: Annual Cultural Fest with battle of the bands (Cultural)
   - **Future of Generative AI & Autonomous Agents**: Keynote seminar (Seminar)
   - **RoboWars**: 15kg & 30kg Combat Robotics Championship (Technical)
   - **UI/UX Design Sprint & Portfolio Critique**: Figma & design systems (Workshop)
   - **Echoes of Literature**: Poetry slam, storytelling, and book swap (Cultural)

4. **Dynamic Search & Filtering**
   - Real-time search filter matching title, description, venue, organizer, and category.
   - One-click Category Pills: *All Events*, *Hackathons*, *Technical*, *Workshops*, *Cultural*, *Sports*, *Seminars*.
   - Sorting options: *Upcoming Date*, *Later Date*, *Title (A to Z)*, *Seats Remaining*.
   - Active filter tags with individual clear buttons.
   - Dynamic Empty State with a "Reset All Filters" action when no results match.

5. **Interactive Registration & Digital Pass**
   - Clicking **Register** opens an accessible modal dialog pre-filled with the chosen event.
   - Form validation for student name, university email, student ID, academic year, department, and terms.
   - On submission:
     - Confetti particle burst animation.
     - Generates a fictional digital pass ticket with a unique confirmation code (e.g., `FNH-94812`).
     - Real-time card button updates to `Registered ✓` (disabled to prevent duplicates).
     - Print / Save Pass button triggering printer styles.
     - Non-intrusive toast notifications.

6. **Accessibility & Responsive Design**
   - Semantic HTML5 structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
   - Accessible keyboard controls (Esc closes modal, visible focus indicators).
   - Fully responsive across desktop (1200px+), tablet (768px - 1024px), and mobile (320px - 480px).

---

## 📁 Project Structure

```text
mentor/
├── index.html        # Semantic HTML5 page layout and modal templates
├── style.css         # Modern CSS3 styling, animations, and media queries
├── script.js         # Vanilla JavaScript event store, filtering, modals & confetti
├── test_suite.js     # Comprehensive automated test suite (42 unit/DOM tests)
└── README.md         # Documentation and local setup instructions
```

---

## 🚀 How to Run Locally

You can run this project locally using any of the following methods without installing heavy frameworks:

### Method 1: Double-Click (Direct in Browser)
1. Navigate to the project folder:
   ```text
   c:\Users\amals\OneDrive\Desktop\Amal info\mentor\
   ```
2. Double-click `index.html` to open it immediately in your default web browser (Edge, Chrome, Firefox, Safari).

---

### Method 2: Python Built-in HTTP Server (Recommended)
1. Open PowerShell or Command Prompt in this folder.
2. Run:
   ```powershell
   python -m http.server 8080
   ```
3. Open your browser and visit:
   ```text
   http://localhost:8080
   ```

---

### Method 3: VS Code Live Server Extension
1. Open the folder in Visual Studio Code.
2. Install the **Live Server** extension if you haven't already.
3. Right-click `index.html` and click **"Open with Live Server"**.

---

### Method 4: Node.js (npx serve)
1. In PowerShell/terminal, run:
   ```powershell
   npx serve .
   ```
2. Open the URL shown in the console (typically `http://localhost:3000`).

---

## 🧪 Running the Automated Test Suite

An automated test suite (`test_suite.js`) is included to verify all functionality (search, filters, empty states, registration validation, pass generation, bookmarking, and mobile menu).

To run the tests:
```powershell
node test_suite.js
```

All 42 test cases validate client-side behavior with zero failures!
