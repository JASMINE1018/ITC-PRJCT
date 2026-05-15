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
