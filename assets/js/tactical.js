document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const switchBtn = document.getElementById('protocolSwitch');
  const protocolText = document.getElementById('protocolText');

  const darkBg = body.dataset.bgDark;
  const redBg = body.dataset.bgRed;

  const applyTheme = (mode) => {
    if (mode === 'red') {
      body.style.backgroundImage = `linear-gradient(rgba(15, 25, 35, 0.45), rgba(15, 25, 35, 0.65)), url('${redBg}')`;
      protocolText.textContent = 'BG: RED';
      body.dataset.mode = 'red';
    } else {
      body.style.backgroundImage = `linear-gradient(rgba(11, 18, 26, 0.72), rgba(11, 18, 26, 0.84)), url('${darkBg}')`;
      protocolText.textContent = 'BG: DARK';
      body.dataset.mode = 'dark';
    }
  };

  applyTheme('dark');

  switchBtn.addEventListener('click', () => {
    const nextMode = body.dataset.mode === 'dark' ? 'red' : 'dark';
    applyTheme(nextMode);
  });

  // Project Filter
  const filterTabs = document.querySelectorAll('.filter-tab');
  const buildCards = document.querySelectorAll('.build-card');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.dataset.filter;
      buildCards.forEach((card) => {
        const match = target === 'all' || card.dataset.category === target;
        card.classList.toggle('hidden', !match);
      });
    });
  });

  // Scrollspy Navigation
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let activeId = '';
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 160) {
        activeId = sec.id;
      }
    });

    if (activeId) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
      });
    }
  });
});
