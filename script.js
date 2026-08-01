// Signal — Codex pet sprite animator
  (function(){
  const host = document.getElementById('navPet');
  if(!host) return;

  const ANIMS = {
    idle: { frames: 6, fps: 5, loop: true },
    wave: { frames: 4, fps: 7, loop: false }
  };

  let current = null, frame = 0, timer = null;

  function draw(){
    host.src = `signal-frames/${current}-${frame}.png`;
  }

  function play(name, onDone, forceLoop){
    const a = ANIMS[name];
    const loop = forceLoop !== undefined ? forceLoop : a.loop;
    current = name;
    frame = 0;
    clearInterval(timer);
    draw();
    timer = setInterval(() => {
      frame++;
      if(frame >= a.frames){
        if(loop){ frame = 0; }
        else { clearInterval(timer); if(onDone) onDone(); return; }
      }
      draw();
    }, 1000 / a.fps);
  }

  play('idle');

  host.addEventListener('mouseenter', () => play('wave', null, true));
  host.addEventListener('mouseleave', () => play('idle'));
  host.addEventListener('click', () => play('wave', () => play('idle'), false));
})();


  // mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // typing effect
  const roleEl = document.getElementById('typedRole');
  const roleText = "A Curious Guy with a... <br> Software Engineering Degree ;)";
  let i = 0;
  function type(){
    if(i <= roleText.length){
      roleEl.innerHTML = roleText.slice(0,i) + '<span class="cursor">&nbsp;</span>';
      i++;
      setTimeout(type, 55);
    }
  }
  type();

  

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
    const radius = size/2 - 30;
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
  buildOrbit();
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildOrbit, 200);
  });


  // scroll reveal
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  }, {threshold:.15});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // sparkles
  const sparklePositions = [
    {top:'8%',left:'92%'},{top:'22%',left:'4%'},{top:'70%',left:'96%'},{top:'85%',left:'3%'}
  ];
  sparklePositions.forEach((pos,idx)=>{
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.style.top = pos.top; s.style.left = pos.left;
    s.style.animationDelay = (idx*0.7)+'s';
    s.innerHTML = '<i class="fa-solid fa-asterisk"></i>';
    document.querySelector('.hero').appendChild(s);
  });
