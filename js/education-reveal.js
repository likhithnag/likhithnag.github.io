(function(){
  const timeline = document.querySelector('.edu-timeline');
  if (!timeline) return;

  // each icon+card pair reveals exactly when the spine's fill line
  // reaches its position, and un-reveals when it retreats back past —
  // fully reversible, same mechanism as the Experience timeline. This
  // one really is chronological (two real degrees, real dates), so a
  // literal connecting line is honest to use here.
  const items = Array.from(document.querySelectorAll('.edu-item'));

  function offsetRelativeTo(el, ancestor){
    let top = 0, node = el;
    while (node && node !== ancestor) {
      top += node.offsetTop;
      node = node.offsetParent;
    }
    return top;
  }
  let positions = [];
  function measure(){
    positions = items.map(el => offsetRelativeTo(el, timeline));
  }
  measure();
  window.addEventListener('resize', measure);

  function update(){
    const rect = timeline.getBoundingClientRect();
    const viewportMid = window.innerHeight / 2;

    const filledPx = Math.min(Math.max(viewportMid - rect.top, 0), rect.height);
    timeline.style.setProperty('--edu-spine-fill', ((filledPx / rect.height) * 100) + '%');

    items.forEach((el, i) => {
      el.classList.toggle('in-view', filledPx >= positions[i]);
    });
  }
  // throttle to once per animation frame — same reasoning as experience-reveal.js
  let ticking = false;
  function onScroll(){
    if (!ticking) {
      requestAnimationFrame(() => { update(); ticking = false; });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', update);
  update();
})();
