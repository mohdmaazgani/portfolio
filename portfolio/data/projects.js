/* ================================================================
   data/projects.js — All your project data lives here
   ================================================================
   HOW TO ADD A NEW PROJECT:
   1. Copy the object block between the --- markers below
   2. Paste it inside the PROJECTS array (before the closing ] )
   3. Fill in your details — that's it! The page updates automatically.

   AVAILABLE TAG COLOURS:
   'cyan' | 'purple' | 'pink' | 'gold' | 'green'
   (Add more colours in assets/css/components.css → .tag-- section)

   FIELDS:
   - num         : Display number shown in card corner  e.g. "01"
   - title       : Project name
   - description : Short paragraph about the project
   - tags        : Array of { label, color } objects
   - github      : Full GitHub URL  (set to null to hide button)
   - live        : Full live demo URL (set to null to hide button)
   ================================================================ */

const PROJECTS = [
  /* ── PROJECT 01 ──────────────────────────────────────────── */
  {
    num: "01",
    title: "ONDC × Retail",
    description:
      "A modern retail storefront platform built on top of the Open Network for Digital Commerce (ONDC). Features a clean, responsive UI with Vite builds, ShadCN UI components, and an architecture ready for future ONDC API integration.",
    tags: [
      { label: "React", color: "cyan" },
      { label: "TypeScript", color: "purple" },
      { label: "Tailwind CSS", color: "gold" },
      { label: "ONDC", color: "pink" },
    ],
    github: "https://github.com/mohdmaazgani/ONDC-x-Retail",
    live: "https://ondc-x-retail.netlify.app",
  },

  /* ── PROJECT 02 ──────────────────────────────────────────── */
  {
    num: "02",
    title: "Symptom Scribe",
    description:
      "A smart health tracking and wellness platform with AI-driven symptom analysis, doctor consultation suggestions, brain-enhancing games, and personalized health insights. Built with React + Vite + Supabase for real-time data and auth.",
    tags: [
      { label: "React", color: "pink" },
      { label: "Supabase", color: "purple" },
      { label: "AI / ML", color: "cyan" },
      { label: "MedTech", color: "gold" },
    ],
    github: "https://github.com/mohdmaazgani/symptom-scribe-clean",
    live: "https://symptom-scribe-clean.netlify.app/",
  },

  /* ── PROJECT 03 ──────────────────────────────────────────── */
  {
    num: "03",
    title: "FullStack Social Platform",
    description:
      "A feature-rich social networking app with real-time messaging, JWT authentication, and dynamic feeds built with the MERN stack. Supports user profiles, post interactions, and notifications.",
    tags: [
      { label: "React", color: "cyan" },
      { label: "Node.js", color: "purple" },
      { label: "MongoDB", color: "gold" },
    ],
    github: "https://github.com/mohdmaazgani",
    live: null, // ← no live demo yet, button will be hidden
  },

  /* ── PROJECT 04 ──────────────────────────────────────────── */
  {
    num: "04",
    title: "AI Image Classifier",
    description:
      "A deep learning model trained to classify images with high accuracy using Convolutional Neural Networks. Deployed as a web service with a React frontend and REST API backend in Python.",
    tags: [
      { label: "Python", color: "purple" },
      { label: "AI / ML", color: "pink" },
      { label: "TensorFlow", color: "cyan" },
    ],
    github: "https://github.com/mohdmaazgani",
    live: null,
  },

  /* ── PROJECT 05 ──────────────────────────────────────────── */
  {
    num: "05",
    title: "Pathfinding Visualizer",
    description:
      "An interactive visualization tool for graph traversal algorithms including Dijkstra's, A*, BFS and DFS. Renders algorithm steps in real-time so you can watch the process unfold step by step.",
    tags: [
      { label: "C++", color: "gold" },
      { label: "DSA", color: "cyan" },
    ],
    github: "https://github.com/mohdmaazgani",
    live: null,
  },

  /* ── PROJECT 06 ──────────────────────────────────────────── */
  {
    num: "06",
    title: "REST API Framework",
    description:
      "A production-ready REST API with JWT authentication, rate limiting, role-based access control, input validation, and full Swagger documentation. Designed for scalability from day one.",
    tags: [
      { label: "Node.js", color: "gold" },
      { label: "Express", color: "cyan" },
      { label: "MongoDB", color: "purple" },
    ],
    github: "https://github.com/mohdmaazgani",
    live: null,
  },

  /* ── ADD YOUR NEXT PROJECT HERE ─────────────────────────────
  {
    num:         '07',
    title:       'Your Project Title',
    description: 'What does this project do? What problem does it solve? What tech did you use?',
    tags: [
      { label: 'React',  color: 'cyan'   },
      { label: 'Python', color: 'purple' },
    ],
    github: 'https://github.com/mohdmaazgani/your-repo',
    live:   'https://your-live-site.com',
  },
  ─────────────────────────────────────────────────────────────── */
];

/* ================================================================
   PROJECT RENDERER
   Reads the PROJECTS array above and builds the HTML cards.
   You don't need to edit anything below this line.
   ================================================================ */
(function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((project) => {
    /* Build tag HTML */
    const tagsHTML = project.tags
      .map((t) => `<span class="tag tag--${t.color}">${t.label}</span>`)
      .join("");

    /* Build link buttons HTML — skip if URL is null */
    const githubBtn = project.github
      ? `<a href="${project.github}" class="project-card__link" target="_blank" rel="noopener noreferrer">⬡ GitHub</a>`
      : "";

    const liveBtn = project.live
      ? `<a href="${project.live}" class="project-card__link" target="_blank" rel="noopener noreferrer">↗ Live Demo</a>`
      : "";

    return `
      <div class="project-card reveal">
        <div class="project-card__number">${project.num}</div>

        <div class="project-card__tags">
          ${tagsHTML}
        </div>

        <h3 class="project-card__title">${project.title}</h3>

        <p class="project-card__desc">${project.description}</p>

        <div class="project-card__links">
          ${githubBtn}
          ${liveBtn}
        </div>
      </div>
    `;
  }).join("");

  /* Re-observe newly created .reveal elements for scroll animations.
     scroll.js must be loaded before this file OR we dispatch a custom
     event that scroll.js listens to. Here we use a simple timeout. */
  setTimeout(() => {
    const newCards = grid.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    newCards.forEach((card) => observer.observe(card));
  }, 0);
})();
