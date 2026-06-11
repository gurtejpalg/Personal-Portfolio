# Gurtejpal Singh Gurm — Portfolio

A personal portfolio site built from scratch (HTML / CSS / vanilla JS). The visual
language is a **90s underground techno rave flyer** — specifically the deep-purple,
stark-white DJ Rolando / Underground Resistance flyers from London, Ontario — applied
to a clean, professional content structure inspired by sunnypatel.net.

---

## Project overview
A single-page portfolio that lands on a flyer-style hero, then scrolls (or jumps via
the nav) through About, Skills, Certifications, Projects, Experience, and Contact. The
goal is to present my telecom and aspiring-cloud profile to employers while letting my
personality (techno, boxing, underground design) carry the brand.

## Target audience
Employers and co-op coordinators — people deciding whether to interview me for a
telecom, networking, or junior cloud/DevOps role.

## Content strategy
Minimalist in the same way as the DJ Rolando techno 90's flyer. Each section says one thing plainly: who I am, whatI can do, what I've built, where I've worked, and how to reach me. The flyer framing("currently ON AIR", "get on the list", "put me on the bill") carries the theme withoutburying the real information.

## Information organization
- **Hero / flyer** — name, current role, the headline pitch, and a call to action.
- **About** — short bio + career goal, alongside a large grayscale portrait that fills
  the height of the text column.
- **Skills** — four columns: Telecom, Networking, Code, Cloud (learning) + a logo wall.
- **Certifications** — one meter per cert (CCNA, Security+, AWS, Azure). In-progress
  certs show a dashed "tape" bar with a percentage; earned certs flip to a solid bar
  with a ✓ and an "earned" stamp.
- **Projects** — card grid; each card has a shot, blurb, tech tags, and a GitHub link.
  Incomplete projects show "project not available" and "repo not yet public".
- **Experience** — a short ruled timeline.
- **Contact** — pitch + links (GitHub, LinkedIn, résumé PDF) + a working contact form.

## Visual design
- **Palette:** purple `#4a157e`, deep purple `#2c0c4d`, bright purple `#6b1fb0`,
  warm white `#f4f0fa`, muted purple-white `#b9a9d4`. Pulled straight from the flyer;
  stark white on bright purple gives the high contrast the brief asked for.
- **Type:** Archivo Black (display headlines), Archivo (body/utility), Spectral italic
  (the flyer's serif accent voice). Three faces, matching the brief's "2–3 fonts like
  the Rolando flyer".
- **Signature element:** the right-angle connector rules and rotated info strips that
  join text blocks on the original flyer, recreated in CSS.
- **Texture:** a faint screenprint grain over the hero to echo a photocopied flyer.
- Wireframe: see `wireframe.txt` (replace with your hand-drawn or digital wireframe).

## Interaction / functionality
- **CDJ navigation** — the header is styled after a DJ CDJ player. A small SVG jog wheel
  sits next to the GSG wordmark: it idles with a slow spin, then rotates with scroll so
  its marker tracks your position down the page. A digital readout shows the current
  "track" (`TRK ## · NAME`) with a blinking `CUE` pip, and the nav link for the section
  in view lights up with a cue dot and underline. The links stay ordinary click-to-jump
  navigation; the CDJ behavior is layered on top.
- **Jump navigation** — nav buttons smooth-scroll to each section; mobile hamburger menu.
- **Scroll reveal** — sections fade/slide in as they enter the viewport (IntersectionObserver).
- **Certification meters** — progress bars animate from zero to each cert's value when the
  section scrolls into view; generated from a data array in `main.js`.
- **Project cards** — generated from a data array in `main.js`; easy to add/edit projects.
- **Contact form** — client-side validation with inline feedback; on success it opens the
  visitor's mail client pre-filled (no backend needed for GitHub Pages). Swap the mailto
  for a Formspree/EmailJS endpoint to receive submissions directly.
- **Micro-feedback** — underline-grow nav hovers, card lift with hard offset shadow,
  logo-wall hover.

## Technical overview
- Plain `index.html`, `styles.css`, `main.js` — 
- CSS custom properties for the whole palette/type system; CSS grid + flexbox layout.
- Responsive at 860px (stacked columns, mobile menu) and 480px (single column).
- Accessibility: skip link, visible keyboard focus, alt text, `aria-live` form status,
  `prefers-reduced-motion` respected (the CDJ jog wheel holds still for those users while
  the readout and active-link tracking still work), AA-contrast white-on-purple.

## Timeline / milestones
1. Content gathering & wireframe — done
2. Flyer hero + design system — done
3. Sections (about → contact) — done
4. Interactivity (nav, reveal, form) — done
5. Deploy to GitHub Pages + add real résumé/links — done

---

## External resources
- Fonts: Google Fonts (Archivo, Archivo Black, Spectral)
- Design reference: DJ Rolando / Underground Resistance flyer; sunnypatel.net (structure)

---

## Assignment questions & answers

### Part 1 — Content
1. **Name:** Gurtejpal Singh Gurm.
2. **Purpose:** Showcase telecom skills, software projects, and ongoing certs — with personality (techno, boxing) to stand out to recruiters.
3. **Audience:** Employers.
4. **Skills highlighted:** Telecom (cabling, AP/switch install, RJ45 termination, analog/VoIP), networking (homelab, CCNA), programming (Python, Bash, frameworks), aspiring cloud (AWS, Azure, Docker, Kubernetes, Terraform).
5. **Projects:** RA-Noti-Bot, Axelot (mem-0 alternative), ATS résumé screener (AI wrapper), a SonicPi techno track, plus networking and cloud showcases.
6. **Bio:** Current telecom technician (1 yr+) and student working through Security+, AWS, and CCNA.
7. **Pages/sections:** Single-page: flyer hero, About, Skills, Certifications, Projects, Experience, Contact.
8. **Career goal:** Cloud Network Engineer, DevOps, or Cloud Engineer.
9. **Technologies:** Python, Bash, React/Tailwind; learning AWS, Azure, Docker, Kubernetes, Terraform.
10. **Experience worth highlighting:** Telecom technician, 1 year+.
11. **Call to action:** Contact / hire me.
12. **Résumé:** Included as PDF.
13. **Links:** GitHub, LinkedIn.

### Part 2 — Design
1. **Style:** Minimalist content, creative theme/interactivity.
2. **Colors:** Purple + white, from the DJ Rolando flyer.
3. **Fonts:** Archivo Black / Archivo / Spectral — flyer-style serif + sans mix.
4. **Personality:** Underground techno rave flyer aesthetic.
5. **Homepage layout:** Lands on a flyer; nav links jump to each section.
6. **Project layout:** Header + image + brief description + GitHub link; "project not available" when incomplete.
7. **Mobile:** Responsive — stacks columns, hamburger menu at 860px.
8. **Visual hierarchy:** Large white headings that link to sections.
9. **Consistency:** One purple/white system and three fonts across all sections.
10. **Accessibility/contrast:** Stark white on bright purple; skip link, focus rings, reduced-motion, alt text.
11. **Imagery:** Tech logos, project screenshots, cert/company images.
12. **Inspiration:** sunnypatel.net.

### Part 3 — Interactivity
1. **Interactive elements:** Click-to-jump nav from the landing page to each section, with a CDJ-style jog wheel and track readout in the header that follow scroll position.
2. **Contact form:** Name/email/message with validation; opens a pre-filled email (or wire to Formspree/EmailJS to receive messages directly).
3. **JS features:** Smooth-scroll nav, mobile menu, IntersectionObserver scroll reveal, scroll-driven CDJ jog wheel + section readout, data-driven project and certification cards, form validation.
4. **Feedback:** Cursor/hover states, section reveals, card lift, inline form status messages.
5. **Why:** Interactivity keeps the visitor engaged and feeling in control of the experience.
