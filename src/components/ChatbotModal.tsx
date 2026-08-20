import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';

const WORKER_URL = 'https://portfolio-chatbot.portfoliobot.workers.dev';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function TypewriterText({ text, onType }: { text: string; onType?: () => void }) {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduceMotion) {
      setDisplayText(text);
      return;
    }
    setDisplayText('');
    setIndex(0);
    const timer = setInterval(() => {
      setIndex((i) => {
        if (i >= text.length) {
          clearInterval(timer);
          return i;
        }
        return i + 1;
      });
    }, 12);
    return () => clearInterval(timer);
  }, [text, reduceMotion]);

  useEffect(() => {
    setDisplayText(text.slice(0, index));
    onType?.();
  }, [index, text, onType]);

  // Handle newlines by splitting and rendering with <br>
  const parts = displayText.split('\n');
  return (
    <span style={{ whiteSpace: 'pre-wrap' }}>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && <br />}
        </React.Fragment>
      ))}
      <span className="typewriter-cursor" />
    </span>
  );
}

export function ChatbotModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const suggestions = [
    'What projects has Likhith built?',
    'Tell me about his SAP experience',
    'What is his tech stack?',
    'How to contact him?',
  ];

  // Handle ESC key & prevent body scroll
useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Simple scroll lock - only overflow hidden, no position fixed
      const style = document.createElement('style');
      style.id = 'chatbot-scroll-lock';
      style.textContent = `
        html, body {
          overflow: hidden !important;
          height: 100% !important;
          width: 100% !important;
        }
      `;
      document.head.appendChild(style);
      // Backup inline styles
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      const style = document.getElementById('chatbot-scroll-lock');
      if (style) style.remove();
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Clear chat history when modal closes
  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setShowSuggestions(true);
    }
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setShowSuggestions(messages.length === 0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages.length]);

  const scrollToBottom = useCallback(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, []);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // Stop wheel events from propagating to body (prevents background scroll lock from blocking modal scroll)
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.stopPropagation();
  }, []);

  // Add custom scrollbar styles
  useEffect(() => {
    if (isOpen) {
      const style = document.createElement('style');
      style.id = 'chatbot-scrollbar-style';
      style.textContent = `
        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }
        .chat-messages::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-messages::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #9b6bff, #ec4899);
          border-radius: 3px;
          border: 2px solid transparent;
          background-clip: content-box;
        }
        .chat-messages::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #a855f7, #f472b6);
          background-clip: content-box;
        }
        .chat-messages {
          scrollbar-width: thin;
          scrollbar-color: #9b6bff transparent;
        }
      `;
      document.head.appendChild(style);
      return () => {
        const style = document.getElementById('chatbot-scrollbar-style');
        if (style) style.remove();
      };
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async (message?: string) => {
    const userMessage = message || input.trim();
    if (!userMessage || isLoading) return;

    setInput('');
    setShowSuggestions(false);
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${WORKER_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages.slice(-10), { role: 'user', content: userMessage }],
        }),
      });

      if (!response.ok) throw new Error('Failed');

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (text: string) => {
    handleSend(text);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
            aria-hidden="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-3xl h-[65vh] max-h-[65vh] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden font-kanit"
              role="dialog"
              aria-modal="true"
              aria-label="Ninjabot chat"
              onClick={(e) => e.stopPropagation()}
            >
{/* Header */}
              <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-border bg-background/95 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
                      <circle cx="8.5" cy="14.5" r="1.5" />
                      <circle cx="15.5" cy="14.5" r="1.5" />
                      <path d="M9.5 18a3.5 3.5 0 0 1 5 0" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-kanit font-semibold text-white">Ninjabot</h3>
                    <p className="text-xs text-chrome-dark">Portfolio Assistant</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-chrome-light/70 hover:text-white hover:bg-card transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div
                ref={messagesContainerRef}
                className="flex-1 min-h-0 overflow-y-auto p-6 space-y-4 chat-messages"
                onWheel={handleWheel}
              >
                <AnimatePresence mode="popLayout">
                  {showSuggestions && messages.length === 0 && (
                    <motion.div
                      key="suggestions"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-3"
                    >
                      <p className="text-xs font-mono text-purple-500 tracking-widest uppercase">
                        Suggested questions
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {suggestions.map((s) => (
                          <motion.button
                            key={s}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSuggestionClick(s)}
                            className="px-4 py-2 rounded-xl bg-card border border-border text-sm text-chrome-light/80 hover:border-purple-500/50 hover:text-white hover:bg-purple-500/10 transition-all duration-300 text-left whitespace-nowrap"
                          >
                            {s}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white rounded-br-md'
                            : 'bg-card border border-border text-chrome-light rounded-bl-md'
                        }`}
                      >
                        {msg.role === 'assistant' ? (
                          <TypewriterText text={msg.content} onType={scrollToBottom} />
                        ) : (
                          <p className="text-sm leading-relaxed no-wrap-words">{msg.content}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-card border border-border p-3 rounded-2xl rounded-bl-md">
                        <div className="flex gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Input */}
              <div className="flex-shrink-0 border-t border-border p-4 bg-background/95 backdrop-blur-sm">
                <form onSubmit={(e) => { e.preventDefault(); handleSend(input.trim()); }} className="flex gap-3">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about experience, projects, skills..."
                    rows={1}
                    className="flex-1 px-4 py-3 bg-card border border-border rounded-xl text-white placeholder-chrome-dark resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                    disabled={isLoading}
                    aria-label="Chat input"
                  />
                  <motion.button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                    aria-label="Send message"
                  >
                    <Send className="w-5 h-5" aria-hidden="true" />
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}