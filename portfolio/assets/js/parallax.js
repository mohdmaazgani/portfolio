/* ================================================================
   parallax.js — Nebula mouse parallax effect
   ================================================================
   WHAT IT DOES:
   - As the mouse moves, the nebula blobs shift slightly
   - Each blob moves at a different speed (depth illusion)
   - Creates a subtle 3D "depth" feel to the background

   HOW TO EDIT:
   - Parallax strength  →  change PARALLAX_STRENGTH (higher = more movement)
   - Depth per blob     →  change the multiplier values in DEPTH_FACTORS
     (index 0 = nebula-purple, 1 = nebula-cyan, 2 = nebula-pink)
   ================================================================ */

const PARALLAX_STRENGTH = 20;         // max pixel shift at screen edges
const DEPTH_FACTORS     = [0.3, 0.5, 0.8]; // relative depth per nebula

(function initParallax() {
  const nebulas = document.querySelectorAll('.nebula');
  if (!nebulas.length) return;

  let mouseX = 0;
  let mouseY = 0;
  let rafId  = null;

  /* ── Track mouse position ─────────────────────────────────── */
  document.addEventListener('mousemove', (e) => {
    // Normalise to -0.5 … +0.5
    mouseX = (e.clientX / window.innerWidth)  - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;

    // Only schedule a new frame if one isn't already pending
    if (!rafId) {
      rafId = requestAnimationFrame(applyParallax);
    }
  });

  /* ── Apply transform to each nebula ──────────────────────── */
  function applyParallax() {
    nebulas.forEach((nebula, i) => {
      const depth = DEPTH_FACTORS[i] ?? 0.5;
      const tx    = mouseX * PARALLAX_STRENGTH * depth;
      const ty    = mouseY * PARALLAX_STRENGTH * depth;

      nebula.style.transform = `translate(${tx}px, ${ty}px)`;
    });

    rafId = null; // allow next frame to be scheduled
  }
})();
