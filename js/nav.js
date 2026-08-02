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