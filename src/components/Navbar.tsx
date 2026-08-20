import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bot } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';

interface NavbarProps {
  onChatOpen: () => void;
}

const navItems = [
  { href: '#hero', label: 'HOME' },
  { href: '#about', label: 'ABOUT' },
  { href: '#experience', label: 'EXPERIENCE' },
  { href: '#skills', label: 'SKILLS' },
  { href: '#projects', label: 'PROJECTS' },
  { href: '#contact', label: 'CONTACT' },
] as const;

export function Navbar({ onChatOpen }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { profile } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`
        fixed top-0 left-0 right-0 z-50
        backdrop-blur-md bg-background/80 border-b border-border
        transition-all duration-300
        ${isScrolled ? 'bg-background/95 shadow-lg' : ''}
      `}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <motion.a
            href="#hero"
            className="font-kanit font-semibold text-xl text-chrome-light hero-heading"
            aria-label="Go to homepage"
            onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {profile.shortName}
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-chrome-light/70 hover:text-chrome-light transition-colors relative py-2"
                onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                whileHover={{ x: 2 }}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          <motion.button
            onClick={onChatOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 transition-all duration-300 shadow-lg shadow-purple-500/25"
            aria-label="Open chat assistant"
          >
            <Bot className="w-5 h-5" aria-hidden="true" />
          </motion.button>

          <button
            className="md:hidden p-2 rounded-lg text-chrome-light hover:text-white hover:bg-card transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-background/95 border-t border-border"
            >
              <div className="py-6 space-y-4 px-6">
                {navItems.map((item) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="block text-lg font-medium text-chrome-light/70 hover:text-chrome-light transition-colors py-2"
                    onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                    whileHover={{ x: 4 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <button
                  onClick={() => { setIsMobileMenuOpen(false); onChatOpen(); }}
                  className="w-full mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-medium hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Bot className="w-5 h-5" />
                  <span>Open Assistant</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}