// Navbar underline slider controller
(function () {
  const menu = document.querySelector('.nav-menu');
  if (!menu) return;
  const links = Array.from(menu.querySelectorAll('.nav-link'));

  function setUnderline(el) {
    const left = el.offsetLeft + 'px';
    const width = el.offsetWidth + 'px';
    menu.style.setProperty('--underline-left', left);
    menu.style.setProperty('--underline-width', width);
  }

  // initialize to active link only (do not default to first link). If none, hide underline.
  const active = links.find(l => l.classList.contains('active')) || null;
  if (active) {
    setUnderline(active);
  } else {
    menu.style.setProperty('--underline-width', '0px');
  }

  links.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
      menu.classList.add('nav-hover');
      setUnderline(e.currentTarget);
    });

    link.addEventListener('click', (e) => {
      links.forEach(l => l.classList.remove('active'));
      e.currentTarget.classList.add('active');
      setUnderline(e.currentTarget);
    });
  });

  menu.addEventListener('mouseleave', () => {
    menu.classList.remove('nav-hover');
    const activeLink = links.find(l => l.classList.contains('active')) || null;
    if (activeLink) setUnderline(activeLink);
    else menu.style.setProperty('--underline-width', '0px');
  });

  // handle window resize to reposition underline
  window.addEventListener('resize', () => {
    const activeLink = links.find(l => l.classList.contains('active')) || null;
    if (activeLink) setUnderline(activeLink);
    else menu.style.setProperty('--underline-width', '0px');
  });
})();

// Section Division
const divisions = [
  {
    name: "Programming",
    desc: '"Build the future with code. Master web development, algorithms, and logic-based problem solving."'
  },
  {
    name: "Graphic Design",
    desc: '"Master the art of visual design. Create stunning UI/UX and graphic designs that inspire."'
  }
  // tambah divisi lain di sini
];

function buildDivisions() {
  const container = document.getElementById('divisionList');
  if (!container) return;

  divisions.forEach((div, i) => {
    const item = document.createElement('div');
    item.className = 'division-item' + (i === 0 ? ' active' : '');

    item.innerHTML = `
      <div class="division-item-header">
        <span class="division-item-dot"></span>
        <span class="division-item-name">${div.name}</span>
        <span class="division-item-toggle">∨</span>
      </div>
      <div class="division-item-body${i === 0 ? ' open' : ''}">
        <p>${div.desc}</p>
      </div>
    `;

    item.querySelector('.division-item-header').addEventListener('click', () => {
      const body = item.querySelector('.division-item-body');
      const isOpen = item.classList.contains('active');

      // Tutup semua
      document.querySelectorAll('.division-item').forEach(el => {
        el.classList.remove('active');
        el.querySelector('.division-item-body').classList.remove('open');
      });

      // Buka yang diklik (jika belum terbuka)
      if (!isOpen) {
        item.classList.add('active');
        body.classList.add('open');
      }
    });
    container.appendChild(item);
  });
}
document.addEventListener('DOMContentLoaded', buildDivisions);

// Animate count from 0 to target (e.g., +80)
function animateCount(el, target, duration = 1500) {
  if (!el) return;
  const start = 0;
  const end = parseInt(target, 10) || 0;
  const startTime = performance.now();

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const current = Math.floor(progress * (end - start) + start);
    el.textContent = (current === 0 ? '+' : '+') + current;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = '+' + end; // final value
  }

  requestAnimationFrame(step);
}

// Initialize count on DOM load and when element scrolls into view
document.addEventListener('DOMContentLoaded', () => {
  const countEl = document.querySelector('.division-badge .count');
  if (!countEl) return;
  // extract numeric from initial content (e.g. +80)
  const raw = countEl.textContent || '';
  const num = raw.replace(/[^0-9]/g, '') || '0';

  // if IntersectionObserver available, animate when visible; otherwise animate now
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(countEl, num, 1400);
          obs.disconnect();
        }
      });
    }, { threshold: 0.5 });
    io.observe(countEl);
  } else {
    animateCount(countEl, num, 1400);
  }
});

// Generic fade-in on scroll for several page elements
(function() {
  const selectors = [
    '.hero-text',
    '.main-join',
    '.about-hero',
    '.projects h1',
    '.project-card',
    '.division-item',
    '.division-right',
    '.division-left',
    '.footer-left'
  ];

  const els = Array.from(document.querySelectorAll(selectors.join(',')));
  if (!els.length) return;

  // add base class so elements are initially hidden
  els.forEach((el, i) => {
    el.classList.add('fade-in');
    // stagger small delays for natural appearance
    const delay = Math.min(i * 80, 600);
    el.style.transitionDelay = delay + 'ms';
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    els.forEach(el => io.observe(el));
  } else {
    // fallback: reveal immediately
    els.forEach(el => el.classList.add('visible'));
  }
})();
