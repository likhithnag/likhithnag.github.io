(function(){
  const timeline = document.querySelector('.exp-timeline');
  if (!timeline) return;

  // header and each card reveal exactly when the spine's fill line
  // reaches their position, and un-reveal when it retreats back past
  // them — fully reversible, same as the spine itself.
  const targets = Array.from(
    document.querySelectorAll('.exp-role-head, .exp-role-cards .exp-card')
  );

  // measure each target's true layout position relative to the timeline,
  // using offsetTop (unaffected by the flip transform) instead of
  // getBoundingClientRect (which shifts once a card is hidden/rotated,
  // breaking the comparison on the next scroll pass)
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
    positions = targets.map(el => offsetRelativeTo(el, timeline));
  }
  measure();
  window.addEventListener('resize', measure);

  function update(){
    const rect = timeline.getBoundingClientRect();
    const viewportMid = window.innerHeight / 2;

    // spine fill, in pixels down from the timeline's top
    const filledPx = Math.min(Math.max(viewportMid - rect.top, 0), rect.height);
    timeline.style.setProperty('--spine-fill', ((filledPx / rect.height) * 100) + '%');

    // toggle each target based on its fixed layout position — no
    // one-time flag, so scrolling back up reverses it just like the spine
    targets.forEach((el, i) => {
      el.classList.toggle('in-view', filledPx >= positions[i]);
    });
  }
  // throttle to once per animation frame — scroll events can fire far
  // more often than the screen can actually repaint, so this collapses
  // any burst of scroll events into a single update per frame instead
  // of running the full calculation on every one of them
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