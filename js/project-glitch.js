(function(){
  const cards = document.querySelectorAll('.project-card');
  if (!cards.length) return;

  function restartFlowAnimations(card){
    // .flow-pulse's ring/core animations live on ::before/::after — JS can't
    // reset pseudo-element styles directly, so clone+replace to force a
    // full restart of everything (own animation + both pseudo-elements).
    card.querySelectorAll('.flow-pulse').forEach(el => {
      el.replaceWith(el.cloneNode(true));
    });
    card.querySelectorAll('.flow-step').forEach(el => {
      el.style.animation = 'none';
      void el.offsetWidth; // force reflow so the reset actually registers
      el.style.animation = '';
    });
  }

  function revealGlitch(card){
    card.classList.remove('glitching-out');
    void card.offsetWidth;
    restartFlowAnimations(card); // always replay the flow glow/pulse from t=0
    card.classList.add('revealed', 'glitching');
  }
  function hideGlitch(card){
    card.classList.remove('glitching');
    void card.offsetWidth;
    card.classList.add('glitching-out');
    setTimeout(() => {
      card.classList.remove('revealed', 'glitching-out');
    }, 260);
  }

  let lastScrollY = window.scrollY, scrollDir = 'down';
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y !== lastScrollY) scrollDir = y > lastScrollY ? 'down' : 'up';
    lastScrollY = y;
  }, {passive:true});

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && scrollDir === 'down') {
        revealGlitch(e.target);
      } else if (!e.isIntersecting && scrollDir === 'up') {
        hideGlitch(e.target);
      }
    });
  }, {threshold:.4});

  cards.forEach(c => io.observe(c));

  // touch devices "stick" :hover after the first tap, so CSS :hover alone
  // won't replay the flicker on a second tap without tapping away first.
  // pointerdown fires fresh on every tap (and every mouse click) regardless
  // of hover state, so drive the retrigger from here instead.
  document.querySelectorAll('.project-card-inner').forEach(inner => {
    const heading = inner.querySelector('h3');
    if (!heading) return;
    inner.addEventListener('pointerdown', () => {
      inner.classList.remove('flicker-now');
      void inner.offsetWidth; // force reflow so the class re-add actually restarts the animation
      inner.classList.add('flicker-now');
    });
  });
})();