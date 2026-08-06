// revolving tech-stack icons around the orbit core
const orbitEl = document.querySelector('.orbit');
const orbitIconsEl = document.getElementById('orbitIcons');

// EDIT THIS ARRAY to change which icons appear — each entry needs an
// icon class (FontAwesome) and a label (used for alt text + hover tooltip)
const stackIcons = [
  { cls: 'fa-brands fa-java',          label: 'Java' },
  { cls: 'fa-brands fa-react',          label: 'React' },
  { cls: 'fa-brands fa-css3-alt',       label: 'CSS3' },
  { cls: 'fa-brands fa-node-js',        label: 'Node.js' },
  { cls: 'fa-brands fa-html5',          label: 'HTML5' },
  { cls: 'fa-brands fa-js',             label: 'JavaScript' },
  { cls: 'fa-brands fa-square-github',  label: 'GitHub' },
  { cls: 'fa-solid fa-diagram-project', label: 'System Design' },
  { cls: 'fa-brands fa-python',         label: 'Python' },
  { cls: 'fa-solid fa-database',        label: 'SQL' }
];

function buildOrbit(){
  if(!orbitEl || !orbitIconsEl) return;

  // Restart the ring's rotation animation right here, in the same tick
  // that we compute each counter's negative animation-delay below.
  // Without this, the ring (which starts spinning the instant the page
  // paints) and the counters (which only start once this function runs,
  // slightly later) drift out of phase — that's what caused the
  // constant tilt on every icon + tooltip.
  orbitIconsEl.style.animation = 'none';
  void orbitIconsEl.offsetWidth; // force reflow so the reset registers
  orbitIconsEl.style.animation = '';

  orbitIconsEl.innerHTML = '';
  const size = orbitEl.getBoundingClientRect().width;
  const iconHalf = 22; // half of the 44px icon badge
  const radius = Math.min(size/2 - 30, (window.innerWidth - iconHalf*2) / 2 - 20);
  const duration = 38; // must match .orbit-icons / .orbit-counter animation-duration in CSS

  stackIcons.forEach(({ cls, label }, idx) => {
    const angle = (360 / stackIcons.length) * idx;

    const item = document.createElement('div');
    item.className = 'orbit-item';
    item.style.transform = `rotate(${angle}deg) translateX(${radius}px)`;

    // .orbit-counter: rotation ONLY (counter-spins to stay upright).
    // Never put scale/hover transforms directly on this element —
    // it already has an active CSS animation on `transform`, and adding
    // another transform here causes matrix-interpolation glitches that
    // tilt the icon/text off-angle. All hover visuals live on the
    // .orbit-badge child instead.
    const counter = document.createElement('div');
    counter.className = 'orbit-counter';
    counter.setAttribute('role', 'img');
    counter.setAttribute('aria-label', label);
    counter.setAttribute('tabindex', '0');

    // pre-offset the counter-spin so it cancels this icon's own placement
    // angle in addition to the ring's rotation, keeping it upright
    counter.style.animationDelay = `${-(angle / 360) * duration}s`;

    // .orbit-badge: the visible circle. No rotation animation on this
    // element at all, so it's safe to scale/glow on hover.
    const badge = document.createElement('div');
    badge.className = 'orbit-badge';

    const icon = document.createElement('i');
    icon.className = cls;
    icon.setAttribute('aria-hidden', 'true');
    badge.appendChild(icon);

    const tooltip = document.createElement('span');
    tooltip.className = 'orbit-tooltip';
    tooltip.textContent = label;

    counter.appendChild(badge);
    counter.appendChild(tooltip);
    item.appendChild(counter);
    orbitIconsEl.appendChild(item);
  });
}

window.addEventListener('load', buildOrbit);
let lastWidth = window.innerWidth;
let resizeTimer;
window.addEventListener('resize', () => {
  if (window.innerWidth === lastWidth) return;
  lastWidth = window.innerWidth;
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(buildOrbit, 200);
});