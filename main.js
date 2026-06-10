/* =========================================================
   main.js — interactivity for the portfolio
   - smooth jump nav + mobile menu
   - scroll-reveal of sections
   - project cards injected from data (no external screenshots;
     each card uses a coded glyph in the flyer style)
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
/* Each project: title, blurb, tags, a short glyph for the card art,
   a status stamp, and a repo link (null = not yet public). */
const projects = [
  {
    title: 'Axelot',
    desc: 'A self-hosted, open alternative to mem-0 that gives AI agents persistent memory. My biggest build: storage, retrieval, and an API layer to write and recall context across sessions.',
    tags: ['Python', 'Vector DB', 'API'],
    glyph: 'AX',
    stamp: 'live',
    repo: 'https://github.com/'
  },
  {
    title: 'ATS Resume Screener',
    desc: 'An AI wrapper that scores a resume against a job posting and flags the gaps, built to understand how applicant tracking systems actually parse and rank text.',
    tags: ['Python', 'LLM API', 'NLP'],
    glyph: 'ATS',
    stamp: 'live',
    repo: 'https://github.com/'
  },
  {
    title: 'RA-Noti-Bot',
    desc: 'A bot that watches event listings for new techno shows and pings me before tickets sell out. Small, useful, and very on brand.',
    tags: ['Python', 'Bash', 'Automation'],
    glyph: 'RA',
    stamp: 'live',
    repo: 'https://github.com/'
  },
  {
    title: 'NetDash',
    desc: 'A homelab dashboard that surfaces switch, VLAN, and device health at a glance. Ties my telecom field work to a software front end.',
    tags: ['Python', 'Networking', 'Homelab'],
    glyph: 'NET',
    stamp: 'in progress',
    repo: null
  },
  {
    title: 'Untitled (SonicPi)',
    desc: 'A techno track written entirely in code with SonicPi: four-to-the-floor kick, an acid line, and a filter that opens over eight bars. Where the music and the engineering meet.',
    tags: ['SonicPi', 'Ruby', 'Audio'],
    glyph: '♪',
    stamp: 'in progress',
    repo: null
  },
  {
    title: 'Cloud Lab',
    desc: 'An AWS sandbox where I deploy and tear down small networked environments to study for certification. A space to practice what the exams only describe.',
    tags: ['AWS', 'Docker', 'Linux'],
    glyph: 'CLD',
    stamp: 'in progress',
    repo: null
  }
];

const grid = document.getElementById('projectGrid');
projects.forEach(p => {
  const card = document.createElement('article');
  card.className = 'card';

  const off = p.repo ? '' : ' card__art--off';
  const art = `<div class="card__art${off}">
      <span class="glyph">${p.glyph}</span>
      <span class="stamp">${p.stamp}</span>
    </div>`;

  const tags = p.tags.map(t => `<span>${t}</span>`).join('');

  const link = p.repo
    ? `<a class="card__link" href="${p.repo}" target="_blank" rel="noopener">View on GitHub</a>`
    : `<span class="card__link card__link--off">repo not yet public</span>`;

  card.innerHTML = `
    ${art}
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

  /* No backend on GitHub Pages, so this opens the visitor's mail client
     with the message prefilled. Swap for a Formspree or EmailJS endpoint
     to receive submissions directly. */
  const subject = encodeURIComponent('Portfolio contact from ' + name);
  const body = encodeURIComponent(message + '\n\nfrom ' + name + ' (' + email + ')');
  window.location.href = 'mailto:gurtejpal@example.com?subject=' + subject + '&body=' + body;

  status.textContent = 'Thanks ' + name + ', your mail app should be opening now.';
  status.className = 'formstatus ok';
  form.reset();
});

/* ---------- 5. FOOTER YEAR ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
