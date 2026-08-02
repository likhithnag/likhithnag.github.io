// revolving tech-stack icons around the orbit core
  const orbitEl = document.querySelector('.orbit');
  const orbitIconsEl = document.getElementById('orbitIcons');
  const stackIcons = [
    'fa-brands fa-figma','fa-brands fa-react','fa-brands fa-css3-alt',
    'fa-brands fa-node-js','fa-brands fa-html5','fa-brands fa-js',
    'fa-brands fa-square-github','fa-solid fa-diagram-project',
    'fa-brands fa-google','fa-brands fa-adobe'
  ];
  function buildOrbit(){
    if(!orbitEl || !orbitIconsEl) return;
    orbitIconsEl.innerHTML = '';
    const size = orbitEl.getBoundingClientRect().width;
    const iconHalf = 22; // half of the 44px icon badge
    const radius = Math.min(size/2 - 30, (window.innerWidth - iconHalf*2) / 2 - 20);
    stackIcons.forEach((cls, idx) => {
      const angle = (360/stackIcons.length) * idx;
      const item = document.createElement('div');
      item.className = 'orbit-item';
      item.style.transform = `rotate(${angle}deg) translateX(${radius}px)`;
      const counter = document.createElement('div');
      counter.className = 'orbit-counter';
      counter.innerHTML = `<i class="${cls}"></i>`;
      item.appendChild(counter);
      orbitIconsEl.appendChild(item);
      stackIcons.forEach((cls, idx) => {
  const angle = (360/stackIcons.length) * idx;
  const item = document.createElement('div');
  item.className = 'orbit-item';
  item.style.transform = `rotate(${angle}deg) translateX(${radius}px)`;

  const counter = document.createElement('div');
  counter.className = 'orbit-counter';

  // NEW: pre-offset the counter-spin so it cancels this icon's own
  // placement angle in addition to the ring's rotation, keeping it upright
  const duration = 38; // must match .orbit-icons / .orbit-counter animation-duration in CSS
  counter.style.animationDelay = `${-(angle/360) * duration}s`;

  counter.innerHTML = `<i class="${cls}"></i>`;
  item.appendChild(counter);
  orbitIconsEl.appendChild(item);
});
    });
  }
  //buildOrbit();
  window.addEventListener('load', buildOrbit);
  let lastWidth = window.innerWidth;
  let resizeTimer;
  window.addEventListener('resize', () => {
  if (window.innerWidth === lastWidth) return;
  lastWidth = window.innerWidth;
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(buildOrbit, 200);
});
