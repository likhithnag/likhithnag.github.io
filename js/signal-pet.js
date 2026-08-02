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