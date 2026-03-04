/* ================================================================
   typing.js — Animated typing effect in the hero section
   ================================================================
   WHAT IT DOES:
   - Cycles through an array of phrases
   - Types each phrase character by character
   - Pauses, then deletes it, then types the next one
   - A blinking cursor | is shown while typing

   HOW TO EDIT:
   ★ TO ADD / REMOVE PHRASES  →  edit the PHRASES array below
   - Type speed              →  change TYPE_SPEED_MS
   - Delete speed            →  change DELETE_SPEED_MS
   - Pause after full phrase →  change PAUSE_MS
   ================================================================ */

/* ── ★ EDIT YOUR PHRASES HERE ───────────────────────────────── */
const PHRASES = [
  "MERN Stack Developer",
  "AI/ML Enthusiast",
  "Python Developer",
  "C++ Programmer",
  "Full-Stack Engineer",
  "Pre-Final Year CSE Student",
];
/* ─────────────────────────────────────────────────────────────── */

const TYPE_SPEED_MS = 50; // ms between each character typed
const DELETE_SPEED_MS = 25; // ms between each character deleted
const PAUSE_MS = 1600; // ms to pause after full phrase is typed

(function initTyping() {
  const textEl = document.getElementById("typed-text");
  const cursorEl = document.getElementById("typed-cursor");

  if (!textEl) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const currentPhrase = PHRASES[phraseIndex];

    if (!isDeleting) {
      // ── Typing forward ────────────────────────────────────
      charIndex++;
      textEl.textContent = currentPhrase.slice(0, charIndex);

      if (charIndex === currentPhrase.length) {
        // Finished typing — pause then start deleting
        isDeleting = true;
        setTimeout(tick, PAUSE_MS);
        return;
      }

      setTimeout(tick, TYPE_SPEED_MS);
    } else {
      // ── Deleting backward ────────────────────────────────
      charIndex--;
      textEl.textContent = currentPhrase.slice(0, charIndex);

      if (charIndex === 0) {
        // Finished deleting — move to next phrase
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % PHRASES.length;
        setTimeout(tick, TYPE_SPEED_MS);
        return;
      }

      setTimeout(tick, DELETE_SPEED_MS);
    }
  }

  // Kick off
  setTimeout(tick, 800); // initial delay before typing starts
})();
