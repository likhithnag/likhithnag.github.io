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