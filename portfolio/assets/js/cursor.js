/* ================================================================
   cursor.js — Custom animated cursor
   ================================================================
   WHAT IT DOES:
   - Moves a glowing cyan dot to follow your mouse
   - A slightly larger ring trails behind with a delay
   - On hovering links/buttons: cursor scales up + turns purple

   HOW TO EDIT:
   - Cursor size      → change .cursor width/height in components.css
   - Cursor color     → change --color-cyan in base.css
   - Hover color      → change HOVER_COLOR constant below
   - Trail delay      → change TRAIL_DELAY_MS below
   ================================================================ */

const HOVER_COLOR   = 'var(--color-purple)';  // cursor color when hovering links
const DEFAULT_COLOR = 'var(--color-cyan)';    // cursor default color
const TRAIL_DELAY_MS = 65;                    // milliseconds trail lags behind

(function initCursor() {
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursor-trail');

  if (!cursor || !trail) return;

  /* ── Track mouse position ─────────────────────────────────── */
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';

    // Trail follows with a slight delay for a smooth feel
    setTimeout(() => {
      trail.style.left = e.clientX + 'px';
      trail.style.top  = e.clientY + 'px';
    }, TRAIL_DELAY_MS);
  });

  /* ── Hover effect on interactive elements ─────────────────── */
  const interactiveEls = document.querySelectorAll('a, button, .project-card');

  interactiveEls.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform  = 'translate(-50%, -50%) scale(2.2)';
      cursor.style.background = HOVER_COLOR;
    });

    el.addEventListener('mouseleave', () => {
      cursor.style.transform  = 'translate(-50%, -50%) scale(1)';
      cursor.style.background = DEFAULT_COLOR;
    });
  });

  /* ── Hide cursor when it leaves the window ────────────────── */
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    trail.style.opacity  = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    trail.style.opacity  = '0.35';
  });
})();
