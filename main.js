/* =========================================================
   main.js — interactivity for the portfolio
   - smooth jump nav + mobile menu
   - scroll-reveal of sections
   - project cards injected from data
   - contact form validation + feedback
   ========================================================= */

/* ---------- 1. NAV: jump to sections ---------- */
function jumpTo(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.querySelectorAll('.navjump').forEach(btn => {
  btn.addEventListener('click', () => {
    jumpTo(btn.dataset.target);
    closeMenu();
  });
});

/* mobile hamburger */
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.topbar__nav');
function closeMenu(){
  nav.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}
hamburger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(open));
});

/* ---------- 2. SCROLL REVEAL ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ---------- 3. PROJECTS ---------- */
/* Each project: title, blurb, tags, screenshot (or null = "not available"),
   and a repo link (null = project not yet public). */
const projects = [
  {
    title: 'SecureBank Dashboard',
    desc: 'A security-themed banking dashboard concept — transactions, 2FA status, fraud monitoring, and a feedback loop. Built to practice clean component layout and auth-aware UI.',
    tags: ['React', 'Tailwind', 'Auth'],
    shot: 'assets/securebankdash72ecd3f1.jpg',
    repo: 'https://github.com/'
  },
  {
    title: 'NetDash — Network Monitor',
    desc: 'A homelab dashboard that surfaces switch, VLAN, and device health at a glance. Ties my telecom field work to a software front end.',
    tags: ['Python', 'Networking', 'Homelab'],
    shot: 'assets/netdashlandingf0e35e6e.png',
    repo: 'https://github.com/'
  },
  {
    title: 'ATS Résumé Screener',
    desc: 'An AI wrapper that scores a résumé against a job posting and flags gaps — a riff on tools like Set79, built to understand how applicant tracking actually parses text.',
    tags: ['Python', 'LLM API', 'NLP'],
    shot: 'assets/atsscreenerlanding7260b709.png',
    repo: 'https://github.com/'
  },
  {
    title: 'Axelot',
    desc: 'A self-hosted, open alternative to mem-0 — persistent memory for AI agents. My biggest build; storage, retrieval, and an API layer.',
    tags: ['Python', 'Vector DB', 'API'],
    shot: 'assets/axelotlanding228c1735.png',
    repo: 'https://github.com/'
  },
  {
    title: 'RA-Noti-Bot',
    desc: 'A bot that watches Resident Advisor for new techno events and pings me before tickets sell out. Small, useful, and very on-brand.',
    tags: ['Python', 'Bash', 'Automation'],
    shot: null,
    repo: 'https://github.com/'
  },
  {
    title: 'Untitled (SonicPi)',
    desc: 'A techno track written entirely in code with SonicPi — four-to-the-floor kick, acid line, and a slowly opening filter. Where the music and the engineering meet.',
    tags: ['SonicPi', 'Ruby', 'Audio'],
    shot: null,
    repo: null
  }
];

const grid = document.getElementById('projectGrid');
projects.forEach(p => {
  const card = document.createElement('article');
  card.className = 'card';

  const shot = p.shot
    ? `<img class="card__shot" src="${p.shot}" alt="Screenshot of ${p.title}" loading="lazy" />`
    : `<div class="card__shot--empty">project not available — coming soon</div>`;

  const tags = p.tags.map(t => `<span>${t}</span>`).join('');

  const link = p.repo
    ? `<a class="card__link" href="${p.repo}" target="_blank" rel="noopener">View on GitHub ↗</a>`
    : `<span class="card__link card__link--off">repo not yet public</span>`;

  card.innerHTML = `
    ${shot}
    <div class="card__body">
      <h3 class="card__title">${p.title}</h3>
      <p class="card__desc">${p.desc}</p>
      <div class="card__tags">${tags}</div>
      ${link}
    </div>`;
  grid.appendChild(card);
});

/* ---------- 4. CONTACT FORM ---------- */
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = (data.get('name') || '').toString().trim();
  const email = (data.get('email') || '').toString().trim();
  const message = (data.get('message') || '').toString().trim();

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if(!name || !emailOk || !message){
    status.textContent = 'Fill in your name, a valid email, and a message.';
    status.className = 'formstatus err';
    return;
  }

  /* No backend on GitHub Pages — open the user's mail client with the message prefilled.
     Swap this for a Formspree/EmailJS endpoint to receive submissions directly. */
  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:gurtejpal@example.com?subject=${subject}&body=${body}`;

  status.textContent = `Thanks ${name} — your mail app should be opening now.`;
  status.className = 'formstatus ok';
  form.reset();
});

/* ---------- 5. FOOTER YEAR ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
