/* ================================================================
   starfield.js — Animated galaxy starfield (canvas)
   ================================================================
   WHAT IT DOES:
   - Draws hundreds of tiny stars on an HTML canvas
   - Stars slowly drift downward and twinkle in and out
   - On window resize, canvas resizes and stars are rebuilt

   HOW TO EDIT:
   - Number of stars  → change STAR_COUNT
   - Star speed       → change SPEED_MIN / SPEED_MAX
   - Star size        → change SIZE_MIN / SIZE_MAX
   - Star color       → change STAR_COLOR (rgba string)
   - Twinkle speed    → change TWINKLE_MIN / TWINKLE_MAX
   ================================================================ */

const STAR_COUNT   = 300;                         // total number of stars
const SIZE_MIN     = 0.2;                         // minimum star radius (px)
const SIZE_MAX     = 1.7;                         // maximum star radius (px)
const SPEED_MIN    = 0.05;                        // slowest drift speed
const SPEED_MAX    = 0.35;                        // fastest drift speed
const TWINKLE_MIN  = 0.005;                       // slowest twinkle delta
const TWINKLE_MAX  = 0.022;                       // fastest twinkle delta
const STAR_COLOR   = '200, 220, 255';            // RGB values for star colour

(function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let stars  = [];
  let W, H;

  /* ── Resize canvas to fill viewport ──────────────────────── */
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  /* ── Build star array ─────────────────────────────────────── */
  function buildStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x:          Math.random() * W,
        y:          Math.random() * H,
        r:          Math.random() * (SIZE_MAX - SIZE_MIN) + SIZE_MIN,
        opacity:    Math.random(),
        speed:      Math.random() * (SPEED_MAX - SPEED_MIN) + SPEED_MIN,
        twinkle:    Math.random() * (TWINKLE_MAX - TWINKLE_MIN) + TWINKLE_MIN,
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
      });
    }
  }

  /* ── Animation loop ───────────────────────────────────────── */
  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (const s of stars) {
      // Twinkle: oscillate opacity
      s.opacity += s.twinkle * s.twinkleDir;
      if (s.opacity >= 1 || s.opacity <= 0.08) {
        s.twinkleDir *= -1;
      }

      // Drift: move star slowly downward
      s.y += s.speed;
      if (s.y > H) {
        s.y = 0;
        s.x = Math.random() * W;
      }

      // Draw star
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${STAR_COLOR}, ${s.opacity})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  /* ── Init ─────────────────────────────────────────────────── */
  resize();
  buildStars();
  draw();

  // Rebuild on resize so density stays consistent
  window.addEventListener('resize', () => {
    resize();
    buildStars();
  });
})();
