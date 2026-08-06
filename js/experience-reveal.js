(function(){
  const timeline = document.querySelector('.exp-timeline');
  if (!timeline) return;

  // spine grows once, the first time the whole timeline enters view
  const timelineIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        timeline.classList.add('in-view');
        timelineIO.unobserve(e.target);
      }
    });
  }, {threshold:.1});
  timelineIO.observe(timeline);

  // each role flips in independently as it individually enters view —
  // this naturally happens role-1-then-role-2 since that's real scroll
  // order, not a fabricated stagger
  const roles = document.querySelectorAll('.exp-role');
  const roleIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        roleIO.unobserve(e.target);
      }
    });
  }, {threshold:.25});
  roles.forEach(r => roleIO.observe(r));
})();
