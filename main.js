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

/* ---------- CDJ: jog wheel + track readout ---------- */
/* The platter rotation maps to scroll position (like a CDJ showing track
   progress), and the readout/links light up the section currently in view. */
(function cdj(){
  const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  const wheel   = document.querySelector('.jogwheel');
  const platter = document.querySelector('.jog-platter');
  const readout = document.querySelector('.topbar__readout');
  const trkNum  = document.getElementById('trackNum');
  const trkName = document.getElementById('trackName');
  const navBtns = [...document.querySelectorAll('.topbar__nav .navjump')];

  // Track list: section id -> display number + short name (matches section labels)
  const tracks = [
    { id:'about',          num:'01', name:'ABOUT' },
    { id:'skills',         num:'02', name:'SKILLS' },
    { id:'certifications', num:'03', name:'CERTS' },
    { id:'projects',       num:'04', name:'PROJECTS' },
    { id:'experience',     num:'05', name:'EXPERIENCE' },
    { id:'contact',        num:'06', name:'CONTACT' }
  ];
  const sections = tracks
    .map(t => ({ ...t, el: document.getElementById(t.id) }))
    .filter(t => t.el);

  if(wheel && platter && !reduce) wheel.classList.add('is-driven');

  let current = null;
  let ticking = false;

  function setActive(id){
    if(id === current) return;
    current = id;
    const t = tracks.find(x => x.id === id);
    if(readout){
      readout.classList.toggle('is-playing', !!t);
      if(trkNum)  trkNum.textContent  = t ? t.num  : '00';
      if(trkName) trkName.textContent = t ? t.name : '—';
    }
    navBtns.forEach(b =>
      b.classList.toggle('is-playing', !!t && b.dataset.target === id)
    );
  }

  function update(){
    ticking = false;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const prog = max > 0 ? Math.min(window.scrollY / max, 1) : 0;

    // Scroll-driven rotation: a few full turns across the whole page.
    if(platter && !reduce){
      platter.style.setProperty('--spin', (prog * 1080).toFixed(1) + 'deg');
    }

    // Which section is "playing": the last one whose top has passed the
    // readout line (a bit below the sticky bar).
    const line = window.innerHeight * 0.28;
    let active = null;
    for(const s of sections){
      if(s.el.getBoundingClientRect().top <= line) active = s.id;
    }
    setActive(active);
  }

  function onScroll(){
    if(!ticking){ ticking = true; requestAnimationFrame(update); }
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  window.addEventListener('resize', onScroll, { passive:true });
  update();
})();

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


const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));


const projects = [
  {
    title: 'Axelot',
    desc: 'A self-hosted, open alternative to Mem0 that gives AI agents persistent memory. Our teams biggest build: storage, retrieval, and an API layer to write and recall context across sessions.',
    tags: ['Python', 'Vector DB', 'API'],
    glyph: 'AX',
    stamp: 'live',
    repo: null
  },
  {
    title: 'ATS Resume Screener',
    desc: 'An AI wrapper that scores a resume against a job posting and flags the gaps, built to understand how applicant tracking systems actually parse and rank text.',
    tags: ['Python', 'LLM API', 'NLP'],
    glyph: 'ATS',
    stamp: 'live',
    repo: null
  },
  {
    title: 'RA-Noti-Bot',
    desc: 'A bot that watches event listings for new techno shows and pings me before tickets sell out. Small, useful, and very on brand.',
    tags: ['Python', 'Bash', 'Automation'],
    glyph: 'RA',
    stamp: 'live',
    repo: 'https://github.com/gurtejpalg/RA-Noti-Bot'
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
      <span class="card__caption">[ preview ]</span>
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

/* ---------- CERTIFICATIONS: inject cards with progress meters ---------- */
/* pct is study/exam progress; done:true flips a cert to "earned" styling.
   Edit these as you sit exams — bump pct, set done:true when you pass. */
const certs = [
  { name: 'CCNA',        issuer: 'Cisco',    pct: 65, done: false },
  { name: 'Security+',   issuer: 'CompTIA',  pct: 40, done: false },
  { name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', pct: 30, done: false },
  { name: 'AZ-900 Azure Fundamentals', issuer: 'Microsoft', pct: 20, done: false }
];

const certGrid = document.getElementById('certGrid');
certs.forEach(c => {
  const el = document.createElement('div');
  el.className = 'cert ' + (c.done ? 'cert--done' : 'cert--wip');
  el.style.setProperty('--pct', c.pct + '%');
  el.innerHTML = `
    <div class="cert__head">
      <div>
        <div class="cert__name">${c.name}</div>
        <div class="cert__issuer">${c.issuer}</div>
      </div>
      <div class="cert__readout">
        <span class="cert__pct">${c.done ? '✓' : c.pct + '%'}</span>
        <span class="cert__status">${c.done ? 'earned' : 'in progress'}</span>
      </div>
    </div>
    <div class="cert__track"><div class="cert__fill"></div></div>`;
  certGrid.appendChild(el);
});

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

  const subject = encodeURIComponent('Portfolio contact from ' + name);
  const body = encodeURIComponent(message + '\n\nfrom ' + name + ' (' + email + ')');
  window.location.href = 'mailto:gurtejpal@gmail.com?subject=' + subject + '&body=' + body;

  status.textContent = 'Thanks ' + name + ', your mail app should be opening now.';
  status.className = 'formstatus ok';
  form.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();