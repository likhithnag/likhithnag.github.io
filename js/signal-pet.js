// Codex Ninja — frame animator: idle loop, jump-on-load, continuous wave-on-hover
(function(){
  const host = document.getElementById('navPet');
  if(!host) return;

  const ANIMS = {
    idle: { path: i => `assests/ninja-pet/idle-${i}.png`, frames: 6, fps: 5,  loop: true  },
    wave: { path: i => `assests/ninja-pet/wave-${i}.png`, frames: 4, fps: 8,  loop: true  },
    jump: { path: i => `assests/ninja-pet/jump-${i}.png`, frames: 5, fps: 10, loop: false }
  };

  let current = null, frame = 0, timer = null;

  function draw(){
    host.src = ANIMS[current].path(frame);
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

  // startup: punch/kick burst plays as the "jump", with a real upward
  // hop layered on via CSS, then settle into idle
  host.classList.add('ninja-jump');
  play('jump', () => {
    host.classList.remove('ninja-jump');
    play('idle');
  }, false);

  host.addEventListener('mouseenter', () => play('wave', null, true));
  host.addEventListener('mouseleave', () => play('idle'));
  host.addEventListener('click', () => play('wave', () => play('idle'), false));
})();