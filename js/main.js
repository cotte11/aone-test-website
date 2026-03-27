/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */
const PHOTO_BASE = null; // photos loaded individually below

const PLAYERS = [
  { num:'01', name:'Thomas Ortega',       team:'Quilmes',          age:22, pos:'Delantero',      nat:'Argentina', height:'1.80 m', foot:'Derecho',   liga:'Primera Nacional',        pj:18, goles:7, ast:3, bio:'Delantero explosivo con gran capacidad de definición en área. Se incorporó a la primera de Independiente Rivadavia a los 20 años, consolidándose como una de las promesas más destacadas del ascenso argentino.', bg:'radial-gradient(ellipse at 40% 30%, #1a2e1a, #080808)', photo:'WEBSITE IMAGES/Fotos A One/Thomas Ortega - Quilmes.jpeg' },
  { num:'02', name:'Tomás Adoryan',        team:'Banfield',         age:20, pos:'Mediocampista',  nat:'Argentina', height:'1.76 m', foot:'Izquierdo', liga:'Primera División',         pj:14, goles:2, ast:6, bio:'Mediocampista creativo con visión de juego y gran técnica individual. Titular indiscutido en Banfield, con capacidad para asociarse en espacios reducidos y llegar al gol desde segunda línea.', bg:'radial-gradient(ellipse at 40% 30%, #181828, #080808)', photo:'WEBSITE IMAGES/Fotos A One/Tomás Adoryan - Banfield.jpeg' },
  { num:'03', name:'Franco Bergés',        team:'Güemes',           age:19, pos:'Defensor',       nat:'Argentina', height:'1.84 m', foot:'Derecho',   liga:'Primera B Metropolitana', pj:21, goles:1, ast:2, bio:'Defensor central con gran dominio aéreo y personalidad para salir jugando desde el fondo. A sus 19 años ya acumula más de 20 partidos en el ascenso.', bg:'radial-gradient(ellipse at 40% 30%, #281818, #080808)', photo:'WEBSITE IMAGES/Fotos A One/Franco Bergés - Guemes.jpeg' },
  { num:'04', name:'Román Suárez',         team:'Alianza Sullana',  age:22, pos:'Mediocampista',  nat:'Argentina', height:'1.75 m', foot:'Derecho',   liga:'Liga 1 — Perú',           pj:15, goles:2, ast:3, bio:'Mediocampista con proyección internacional que decidió dar el salto al fútbol peruano de la mano de AONE.', bg:'radial-gradient(ellipse at 40% 30%, #152020, #080808)', photo:'WEBSITE IMAGES/Fotos A One/Román Suárez - Alianza Sullana.jpeg' },
  { num:'05', name:'Bautista Degregorio',  team:'C.A. Estudiantes', age:20, pos:'Arquero',        nat:'Argentina', height:'1.88 m', foot:'Derecho',   liga:'Primera B Metropolitana', pj:20, goles:0, ast:0, bio:'Arquero de gran envergadura y reflejos. Con 1.88 m y una presencia dominante bajo los tres palos, Degregorio se perfila como uno de los porteros más prometedores de su generación.', bg:'radial-gradient(ellipse at 40% 30%, #181020, #080808)', photo:'WEBSITE IMAGES/Fotos A One/Bautista Degregorio - Club Atlético Estudiantes.jpeg' },
];

/* ══════════════════════════════════════════════════════════
   INJECT PLAYER PHOTOS
══════════════════════════════════════════════════════════ */
document.querySelectorAll('.card').forEach((card, i) => {
  const fig = card.querySelector('.card-fig');
  const img = document.createElement('img');
  img.src = PLAYERS[i].photo;
  img.alt = PLAYERS[i].name;
  img.draggable = false;
  fig.appendChild(img);
});

/* ══════════════════════════════════════════════════════════
   ABOUT — HEADLINE BUILD
══════════════════════════════════════════════════════════ */
(function() {
  const hl = document.getElementById('abt-hl');
  const chunks = [
    ['Construyendo un ',          false],
    ['ecosistema integral',       true],
    [' donde cada atleta no solo compite,', false],
    [' sino que crece como ',     false],
    ['líder global.',              true],
  ];
  chunks.forEach(([text, green], i) => {
    const wrap = document.createElement('span');
    wrap.className = 'hl-wrap';
    const inner = document.createElement('span');
    inner.className = 'hl-inner' + (green ? ' em-green' : '');
    inner.style.transitionDelay = (i * 70) + 'ms';
    inner.textContent = text;
    wrap.appendChild(inner);
    hl.appendChild(wrap);
  });
})();

/* ══════════════════════════════════════════════════════════
   TALENTOS — TITLE BUILD
══════════════════════════════════════════════════════════ */
const T_WORDS = ['ALGUNOS DE', 'NUESTROS TALENTOS'];
['t-line1','t-line2'].forEach((id, wi) => {
  const el = document.getElementById(id);
  T_WORDS[wi].split('').forEach((ch, li) => {
    const s = document.createElement('span');
    s.textContent = ch === ' ' ? '\u00A0' : ch;
    s.style.transitionDelay = `${(wi * T_WORDS[0].length + li) * 32}ms`;
    el.appendChild(s);
  });
});

/* ══════════════════════════════════════════════════════════
   COUNTER
══════════════════════════════════════════════════════════ */
function counter(el, to, dur = 1100) {
  let t0 = null;
  const tick = ts => {
    if (!t0) t0 = ts;
    const p = Math.min((ts - t0) / dur, 1);
    el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * to);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ══════════════════════════════════════════════════════════
   ACCORDION
══════════════════════════════════════════════════════════ */
function toggleAcc(id) {
  const item = document.getElementById(id);
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.acc-item').forEach(el => {
    el.classList.remove('open');
    el.querySelector('.acc-btn').setAttribute('aria-expanded', 'false');
  });
  if (!isOpen) {
    item.classList.add('open');
    item.querySelector('.acc-btn').setAttribute('aria-expanded', 'true');
  }
}

/* ══════════════════════════════════════════════════════════
   INTERSECTION OBSERVERS
══════════════════════════════════════════════════════════ */
const d = (fn, ms) => setTimeout(fn, ms);

// — ABOUT —
let aboutFired = false;
new IntersectionObserver(entries => {
  if (!entries[0].isIntersecting || aboutFired) return;
  aboutFired = true;
  d(() => document.getElementById('abt-spine').classList.add('grow'), 0);
  d(() => document.getElementById('abt-lbl').classList.add('on'), 80);
  d(() => document.querySelectorAll('.hl-inner').forEach(el => el.classList.add('on')), 200);
  d(() => document.getElementById('abt-rule').classList.add('on'), 500);
  d(() => document.getElementById('abt-p1').classList.add('on'), 640);
  d(() => document.getElementById('abt-p2').classList.add('on'), 760);
  d(() => document.getElementById('abt-acc').classList.add('on'), 700);
  [['ap1',800],['ap2',940],['ap3',1080]].forEach(([id,ms]) => d(() => document.getElementById(id).classList.add('on'), ms));
}, { threshold: 0.08 }).observe(document.getElementById('about'));

// — TALENTOS —
let talFired = false;
new IntersectionObserver(entries => {
  if (!entries[0].isIntersecting || talFired) return;
  talFired = true;
  d(() => document.getElementById('t-lbl').classList.add('on'), 80);
  d(() => document.querySelectorAll('#t-line1 span, #t-line2 span').forEach(s => s.classList.add('on')), 200);
  d(() => document.getElementById('t-desc').classList.add('on'), 360);
  d(() => document.getElementById('t-stats').classList.add('on'), 420);
  d(() => document.getElementById('t-rule').classList.add('on'), 500);
  document.querySelectorAll('.card').forEach((c, i) =>
    d(() => c.classList.add('on'), 580 + i * 85)
  );
  d(() => document.getElementById('t-bbar').classList.add('on'), 780);
  d(() => document.getElementById('track-nav').classList.add('on'), 500);
  d(() => {
    document.querySelectorAll('.stat-n[data-to]').forEach(el => counter(el, +el.dataset.to));
  }, 460);
}, { threshold: 0.08 }).observe(document.getElementById('talentos'));

/* ══════════════════════════════════════════════════════════
   DRAG TO SCROLL
══════════════════════════════════════════════════════════ */
const track = document.getElementById('track');
let drag = false, startX, sl, didDrag = false;
track.addEventListener('mousedown', e => { drag=true; didDrag=false; startX=e.pageX-track.offsetLeft; sl=track.scrollLeft; });
track.addEventListener('mousemove', e => { if(!drag)return; didDrag=true; track.scrollLeft=sl-(e.pageX-track.offsetLeft-startX)*1.4; });
['mouseup','mouseleave'].forEach(ev => track.addEventListener(ev, () => drag=false));

/* ══════════════════════════════════════════════════════════
   TRACK — ARROWS + PROGRESS
══════════════════════════════════════════════════════════ */
(function() {
  const trackEl   = document.getElementById('track');
  const prevBtn   = document.getElementById('track-prev');
  const nextBtn   = document.getElementById('track-next');
  const fill      = document.getElementById('track-progress-fill');
  const CARD_W    = 255 + 14; // card width + gap

  function scrollBy(dir) {
    trackEl.scrollBy({ left: dir * CARD_W * 2, behavior: 'smooth' });
  }

  function updateUI() {
    const max = trackEl.scrollWidth - trackEl.clientWidth;
    const pct = max > 0 ? (trackEl.scrollLeft / max) * 100 : 0;
    fill.style.width = pct + '%';
    prevBtn.disabled = trackEl.scrollLeft <= 0;
    nextBtn.disabled = trackEl.scrollLeft >= max - 1;
  }

  prevBtn.addEventListener('click', () => scrollBy(-1));
  nextBtn.addEventListener('click', () => scrollBy(1));
  trackEl.addEventListener('scroll', updateUI, { passive: true });
  updateUI();
})();

/* ══════════════════════════════════════════════════════════
   MODAL
══════════════════════════════════════════════════════════ */
const overlay = document.getElementById('modal-overlay');
const mFig    = document.getElementById('modal-fig');
const allCards = document.querySelectorAll('.card');
document.getElementById('modal-total').textContent = PLAYERS.length;
let currentIdx = 0;

function openModal(idx) {
  currentIdx = idx;
  const p = PLAYERS[idx];
  mFig.innerHTML = `<img src="${p.photo}" alt="${p.name}">`;
  document.getElementById('modal-left-bg').style.background = p.bg;
  document.getElementById('modal-num-bg').textContent = p.num;
  document.getElementById('m-name').textContent = p.name;
  document.getElementById('m-club').textContent = p.team;
  document.getElementById('modal-cur').textContent = idx + 1;
  document.getElementById('m-tags').innerHTML = `
    <span class="modal-tag highlight">${p.pos}</span>
    <span class="modal-tag">${p.nat}</span>
    <span class="modal-tag">${p.liga}</span>`;
  document.getElementById('m-attrs').innerHTML = `
    <div><div class="modal-attr-label">Edad</div><div class="modal-attr-value">${p.age} años</div></div>
    <div><div class="modal-attr-label">Altura</div><div class="modal-attr-value">${p.height}</div></div>
    <div><div class="modal-attr-label">Pie hábil</div><div class="modal-attr-value">${p.foot}</div></div>
    <div><div class="modal-attr-label">Nacionalidad</div><div class="modal-attr-value">${p.nat}</div></div>`;
  const isGK = p.pos === 'Arquero';
  const labels = isGK ? ['Partidos','Imbatido','Atajadas'] : ['Partidos','Goles','Asistencias'];
  const vals   = isGK ? [p.pj, Math.round(p.pj*.45), p.pj*3] : [p.pj, p.goles, p.ast];
  document.getElementById('m-stats').innerHTML = vals.map((v,i) =>
    `<div class="modal-stat-box"><span class="modal-stat-n">${v}</span><span class="modal-stat-l">${labels[i]}</span></div>`
  ).join('');
  document.getElementById('m-bio').textContent = p.bio;

  // Reset row animations
  document.querySelectorAll('.modal-row').forEach(r => {
    r.style.transition = 'none';
    r.style.opacity = '0';
    r.style.transform = 'translateX(14px)';
  });
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => {
    document.querySelectorAll('.modal-row').forEach(r => {
      r.style.transition = '';
      r.style.opacity = '';
      r.style.transform = '';
    });
  });
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function navigate(dir) {
  const next = (currentIdx + dir + PLAYERS.length) % PLAYERS.length;
  document.querySelectorAll('.modal-row').forEach(r => {
    r.style.opacity = '0';
    r.style.transform = `translateX(${dir * 14}px)`;
  });
  mFig.style.opacity = '0';
  mFig.style.transform = 'scale(.9)';
  setTimeout(() => {
    mFig.style.transition = '';
    mFig.style.opacity = '';
    mFig.style.transform = '';
    openModal(next);
  }, 200);
}

// Modal deshabilitado temporalmente — sin estadísticas disponibles
// allCards.forEach(card => {
//   card.addEventListener('click', () => {
//     if (didDrag) return;
//     openModal(+card.dataset.idx);
//   });
// });

document.getElementById('modal-close').addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.getElementById('modal-prev').addEventListener('click', () => navigate(-1));
document.getElementById('modal-next').addEventListener('click', () => navigate(1));
  /* ══════════════════════════════════════════════════════════
     AREAS — SCROLL ANIMATIONS + TOUCH FLIP
  ══════════════════════════════════════════════════════════ */
  let areasFired = false;
  new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting || areasFired) return;
    areasFired = true;
    d(() => document.getElementById('areas-hdr-rule').classList.add('on'), 0);
    d(() => document.getElementById('areas-hdr-label').classList.add('on'), 120);
    d(() => document.querySelectorAll('.areas-hdr-title .ahl span').forEach(el => el.classList.add('on')), 200);
    d(() => document.getElementById('areas-hdr-right').classList.add('on'), 300);
    d(() => document.getElementById('areas-hdr-bottom-rule').classList.add('on'), 450);
    document.querySelectorAll('.acard').forEach((c, i) =>
      d(() => c.classList.add('on'), 560 + i * 100)
    );
  }, { threshold: 0.1 }).observe(document.getElementById('areas'));

  // Touch / click flip for mobile
  document.querySelectorAll('.acard').forEach(card => {
    card.addEventListener('click', () => {
      // Only toggle on mobile (touch) — hover handles desktop
      if (window.matchMedia('(hover: none)').matches) {
        card.classList.toggle('flipped');
      }
    });
  });

document.addEventListener('keydown', e => {
  if (!overlay.classList.contains('open')) return;
  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowRight') navigate(1);
  if (e.key === 'ArrowLeft')  navigate(-1);
});

/* ══════════════════════════════════════════════════════════
   MARQUEE — BUILD TRACK
══════════════════════════════════════════════════════════ */
(function() {
  const track = document.getElementById('mq-track');
  if (!track) return;
  const BRANDS = [
    'The Messi Experience', '✦', 'Sport Summit', '✦',
    'Elite Training Camp', '✦', 'Aone Agency', '✦',
  ];
  // Duplicate for seamless loop
  const all = [...BRANDS, ...BRANDS];
  all.forEach(name => {
    const item = document.createElement('span');
    item.className = 'mq-item';
    if (name === '✦') {
      item.style.cssText = 'font-size:14px;padding:0 20px;';
      item.textContent = '✦';
    } else {
      item.style.cssText = 'font-family:"Funnel Sans",sans-serif;font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;padding:0 40px;';
      item.textContent = name;
    }
    track.appendChild(item);
  });
})();

/* ══════════════════════════════════════════════════════════
   ABOUT — PARALLAX BACKGROUND
══════════════════════════════════════════════════════════ */
(function() {
  const parallaxEl = document.getElementById('abt-parallax');
  const section    = document.getElementById('about');
  if (!parallaxEl || !section) return;

  let ticking = false;

  function updateParallax() {
    const rect    = section.getBoundingClientRect();
    const viewH   = window.innerHeight;
    // Normalized progress: 0 = section bottom at viewport bottom, 1 = section top at viewport top
    const progress = (viewH - rect.top) / (viewH + rect.height);
    const clamped  = Math.max(0, Math.min(1, progress));
    // Travel range: -60px (entering) → +60px (leaving) — image moves slower than scroll
    const offset   = (clamped - 0.5) * -220;
    parallaxEl.style.transform = `translateY(${offset}px)`;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(updateParallax); ticking = true; }
  }, { passive: true });

  updateParallax(); // init on load
})();

/* ══════════════════════════════════════════════════════════
   CTA — SCROLL ANIMATION
══════════════════════════════════════════════════════════ */
new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    entries[0].target.classList.add('on');
  }
}, { threshold: 0.2 }).observe(document.getElementById('cta-inner'));

/* ══════════════════════════════════════════════════════════
   ALIANZAS — CAROUSEL
══════════════════════════════════════════════════════════ */
(function() {
  const track      = document.getElementById('al-track');
  const slides     = track.querySelectorAll('.al-slide');
  const dotsWrap   = document.getElementById('al-dots');
  const prevBtn    = document.getElementById('al-prev');
  const nextBtn    = document.getElementById('al-next');
  const bar        = document.getElementById('al-progress-bar');
  const total      = slides.length;
  const DURATION   = 5000; // ms per slide

  let current  = 0;
  let timer    = null;
  let barAnim  = null;
  let touchX   = null;

  // ── Build dots ──────────────────────────────────────────
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'al-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function getDots() { return dotsWrap.querySelectorAll('.al-dot'); }

  // ── Go to slide ─────────────────────────────────────────
  function goTo(idx) {
    slides[current].classList.remove('active');
    getDots()[current].classList.remove('active');

    current = (idx + total) % total;

    slides[current].classList.add('active');
    getDots()[current].classList.add('active');
    track.style.transform = `translateX(-${current * 100}%)`;

    resetBar();
    startTimer();
  }

  // ── Progress bar ─────────────────────────────────────────
  function resetBar() {
    cancelAnimationFrame(barAnim);
    bar.style.transition = 'none';
    bar.style.width = '0%';
    // Force reflow
    bar.getBoundingClientRect();
    bar.style.transition = `width ${DURATION}ms linear`;
    bar.style.width = '100%';
  }

  // ── Auto-play ────────────────────────────────────────────
  function startTimer() {
    clearTimeout(timer);
    timer = setTimeout(() => goTo(current + 1), DURATION);
  }

  // ── Arrow buttons ────────────────────────────────────────
  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // ── Touch / swipe ────────────────────────────────────────
  track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
    touchX = null;
  });

  // ── Pause on hover ───────────────────────────────────────
  const section = document.getElementById('alianzas');
  section.addEventListener('mouseenter', () => {
    clearTimeout(timer);
    cancelAnimationFrame(barAnim);
    bar.style.transition = 'none';
  });
  section.addEventListener('mouseleave', () => {
    resetBar();
    startTimer();
  });

  // ── Init ─────────────────────────────────────────────────
  slides[0].classList.add('active');
  resetBar();
  startTimer();
})();

/* ══════════════════════════════════════════════════════════
   HAMBURGER MENU
══════════════════════════════════════════════════════════ */
(function() {
  const burger = document.getElementById('nav-burger');
  const menu   = document.getElementById('nav-mobile-menu');
  if (!burger || !menu) return;

  function toggleMenu(open) {
    burger.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  burger.addEventListener('click', () => toggleMenu(!burger.classList.contains('open')));

  // Close on link click
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => toggleMenu(false));
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggleMenu(false);
  });
})();