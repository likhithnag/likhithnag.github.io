// Terminal Chat Modal - macOS Terminal Style
(function(){
  'use strict';

  const WORKER_URL = 'https://portfolio-chatbot.portfoliobot.workers.dev';

  // State
  let history = [];
  let isLoading = false;
  let isOpen = false;

  // DOM Elements
  const modal = document.getElementById('termModal');
  const backdrop = document.getElementById('termBackdrop');
  const openBtn = document.getElementById('navTermBtn');
  const closeBtn = modal?.querySelector('.term-dot.close');
  const input = document.getElementById('termInput');
  const output = document.getElementById('termOutput');

  if(!modal || !openBtn || !input || !output) return;

  // Initialize
  function init(){
    openBtn.addEventListener('click', () => openModal());
    // GenAI card click → open terminal with auto-question
    const genaiCard = document.getElementById('genaiCard');
    if(genaiCard){
      genaiCard.addEventListener('click', () => openModal('How is the GenAI chatbot deployed in this portfolio?'));
    }
    // All close actions reset chat
    closeBtn?.addEventListener('click', closeAndReset);
    backdrop.addEventListener('click', closeAndReset);
    input.addEventListener('keydown', onKeyDown);

    // ESC to close and reset
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape' && isOpen) closeAndReset();
    });

    // Focus input when modal opens
    modal.addEventListener('transitionend', ()=>{
      if(isOpen) input.focus();
    });
  }

  function openModal(autoQuestion){
    isOpen = true;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    input.focus();
    // Always show welcome on open (history is already cleared)
    appendLine('system', 'Welcome to Ninjabot Terminal v1.0');
    appendLine('system', 'Ask me about Likhith\'s experience, projects, skills, or contact info.');
    appendLine('system', 'Type your question and press Enter.\n');
    if(autoQuestion){
      // Small delay to let welcome messages render
      setTimeout(() => sendMessage(autoQuestion), 300);
    }
  }

  function closeAndReset(){
    isOpen = false;
    modal.classList.remove('open');
    document.body.style.overflow = '';
    history = [];
    output.innerHTML = '';
  }

  function onKeyDown(e){
    if(e.key === 'Enter' && !isLoading){
      const message = input.value.trim();
      if(message){
        input.value = '';
        sendMessage(message);
      }
    }
  }

  // Append a line to terminal output
  function appendLine(type, text, animate = true){
    const line = document.createElement('div');
    line.className = 'term-line ' + type;

    const prompt = document.createElement('span');
    prompt.className = 'term-prompt';
    prompt.textContent = type === 'user' ? '$' : (type === 'system' ? '>' : '$');
    line.appendChild(prompt);

    const content = document.createElement('span');
    if(type === 'user'){
      content.className = 'term-user-input';
      content.textContent = ' ' + text;
      line.appendChild(content);
      output.appendChild(line);
      scrollToBottom();
      return;
    }

    content.className = 'term-bot-response';
    line.appendChild(content);
    output.appendChild(line);
    scrollToBottom();

    if(animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      typewriter(content, text);
    }else{
      content.textContent = text;
    }
  }

  // Typewriter effect
  function typewriter(el, text){
    el.classList.add('term-typing');
    let i = 0;
    function tick(){
      if(i < text.length){
        el.textContent = ' ' + text.slice(0, i + 1);
        scrollToBottom();
        i++;
        setTimeout(tick, 12);
      }else{
        el.classList.remove('term-typing');
      }
    }
    tick();
  }

  function scrollToBottom(){
    output.scrollTop = output.scrollHeight;
  }

  // Send message to worker
  async function sendMessage(message){
    isLoading = true;
    input.disabled = true;

    // Add user message to history and UI
    history.push({ role: 'user', content: message });
    appendLine('user', message, false);

    // Show typing indicator
    const typingLine = document.createElement('div');
    typingLine.className = 'term-line bot term-typing';
    const typingPrompt = document.createElement('span');
    typingPrompt.className = 'term-prompt';
    typingPrompt.textContent = '$';
    const typingContent = document.createElement('span');
    typingContent.className = 'term-bot-response';
    typingLine.appendChild(typingPrompt);
    typingLine.appendChild(typingContent);
    output.appendChild(typingLine);
    scrollToBottom();

    try{
      const response = await fetch(WORKER_URL + '/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...history.slice(-10)] })
      });

      typingLine.remove();

      if(!response.ok) throw new Error('Request failed');

      const data = await response.json();
      const reply = data.reply || 'Sorry, I could not generate a response.';

      // Add bot response to history
      history.push({ role: 'assistant', content: reply });
      appendLine('bot', reply, true);

    }catch(err){
      typingLine.remove();
      appendLine('error', 'Connection error. Please try again.', false);
      console.error('Chat error:', err);
    }finally{
      isLoading = false;
      input.disabled = false;
      if(isOpen) input.focus();
    }
  }

  // Initialize when DOM ready
  if(document.readyState !== 'loading'){
    init();
  }else{
    document.addEventListener('DOMContentLoaded', init);
  }
})();