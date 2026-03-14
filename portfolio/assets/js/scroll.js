/* ================================================================
   scroll.js — Smooth scrolling, active nav & scroll reveal
   ================================================================
   WHAT IT DOES:
   1. scrollToSection() — smooth scrolls to any section,
      accounting for the fixed navbar height
   2. Active nav — highlights the correct nav link as you scroll
   3. Scroll reveal — fades in elements with class="reveal"
      when they enter the viewport
   4. Skill bar animation — animates bars when skills scroll into view

   HOW TO EDIT:
   - Nav offset extra padding  →  change NAV_EXTRA_OFFSET
   - Reveal threshold          →  change REVEAL_THRESHOLD (0–1)
   - Add a new section to nav  →  add its id to NAV_SECTION_IDS
   ================================================================ */

const NAV_EXTRA_OFFSET = 24; // extra px gap below navbar when scrolling to section
const REVEAL_THRESHOLD = 0.12; // how much of element must be visible to trigger reveal

/* ── Section IDs that correspond to nav links ─────────────────
   Keep this in sync with the href values in your navbar links.
   ─────────────────────────────────────────────────────────────── */
const NAV_SECTION_IDS = [
  "about",
  "experience",
  "skills",
  "projects",
  "connect",
];

/* ----------------------------------------------------------------
   1. SMOOTH SCROLL TO SECTION
   Called via onclick="scrollToSection('skills', event)" in HTML.
   ---------------------------------------------------------------- */
function scrollToSection(sectionId, event) {
  if (event) event.preventDefault();

  const target = document.getElementById(sectionId);
  const navbar = document.querySelector(".navbar");

  if (!target || !navbar) return;

  const navbarHeight = navbar.offsetHeight;
  const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
  const scrollTo = targetTop - navbarHeight - NAV_EXTRA_OFFSET;

  window.scrollTo({ top: scrollTo, behavior: "smooth" });
}

// Expose globally so inline onclick attributes can call it
window.scrollToSection = scrollToSection;

/* ----------------------------------------------------------------
   2. ACTIVE NAV LINK ON SCROLL
   Adds .is-active to whichever nav link matches the current section.
   ---------------------------------------------------------------- */
(function initActiveNav() {
  const navLinks = document.querySelectorAll(".navbar__link");
  const navbar = document.querySelector(".navbar");

  if (!navLinks.length || !navbar) return;

  function updateActiveLink() {
    const navHeight = navbar.offsetHeight;
    let currentId = "";

    NAV_SECTION_IDS.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;

      const sectionTop = section.offsetTop - navHeight - 100;
      if (window.scrollY >= sectionTop) {
        currentId = id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href"); // e.g. "#skills"
      link.classList.toggle("is-active", href === "#" + currentId);
    });
  }

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink(); // run once on page load
})();

/* ----------------------------------------------------------------
   3. SCROLL REVEAL
   Observes all .reveal elements. When one enters the viewport
   it gets the .is-visible class (CSS handles the fade-up).
   ---------------------------------------------------------------- */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");

        /* ── 4. Also trigger skill bar animations ─────────────
           Any .skill-item__bar-fill inside a revealed element
           gets .is-animated which triggers its CSS fill transition.
           ─────────────────────────────────────────────────────── */
        entry.target
          .querySelectorAll(".skill-item__bar-fill")
          .forEach((bar) => bar.classList.add("is-animated"));

        // Stop observing once revealed (performance)
        observer.unobserve(entry.target);
      });
    },
    { threshold: REVEAL_THRESHOLD },
  );

  revealEls.forEach((el) => observer.observe(el));
})();
