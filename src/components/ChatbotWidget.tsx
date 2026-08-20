import { useEffect } from 'react';

export function ChatbotWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://portfolio-chatbot.portfoliobot.workers.dev/widget.js';
    script.async = true;
    script.id = 'portfolio-chatbot-widget';
    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById('portfolio-chatbot-widget');
      if (existingScript) {
        existingScript.remove();
      }
      // Clean up widget if it was created
      const widget = document.getElementById('portfolio-chat-widget');
      if (widget) {
        widget.remove();
      }
    };
  }, []);

  return null;
}