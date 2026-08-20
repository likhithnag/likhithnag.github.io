import { motion } from 'framer-motion';
import { Mail, Phone, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { SocialLinksComponent } from './SocialLinks';
import { ResumeButton } from './ResumeButton';
import { usePortfolio } from '../hooks/usePortfolio';

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
] as const;

export function Footer() {
  const { profile } = usePortfolio();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.social.email?.replace('mailto:', '') || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative bg-card border-t border-border"
      role="contentinfo"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.a
              href="#hero"
              className="inline-block"
              onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Go to homepage"
            >
              <span className="hero-heading font-kanit font-bold text-3xl md:text-4xl">
                {profile.shortName}
              </span>
            </motion.a>
            <p className="text-chrome-light/60 max-w-xs no-wrap-words">
              {profile.specialization}
            </p>
            <p className="text-chrome-dark flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" aria-hidden="true" />
              {profile.location}
            </p>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            aria-label="Footer navigation"
          >
            <h3 className="text-sm font-mono text-purple-500 tracking-widest uppercase mb-6">Navigate</h3>
            <ul className="space-y-3" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="text-chrome-light/70 hover:text-chrome-light transition-colors text-left font-medium hover:underline"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-sm font-mono text-purple-500 tracking-widest uppercase mb-6">Reach Out</h3>
            
            <div className="space-y-4">
              <button
                onClick={copyEmail}
                className="group flex items-center gap-3 w-full text-left p-3 rounded-xl bg-background border border-border hover:border-chrome-dark/50 transition-colors"
                aria-label={copied ? 'Email copied to clipboard' : 'Copy email address'}
              >
                <Mail className="w-5 h-5 text-chrome-dark group-hover:text-purple-400 transition-colors flex-shrink-0" aria-hidden="true" />
                <span className="text-chrome-light/70 group-hover:text-chrome-light transition-colors flex-1 truncate">
                  {profile.social.email?.replace('mailto:', '')}
                </span>
                {copied ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="flex items-center gap-1 text-green-400"
                  >
                    <Check className="w-4 h-4" aria-hidden="true" />
                    <span className="text-sm font-medium">Copied!</span>
                  </motion.div>
                ) : (
                  <Copy className="w-5 h-5 text-chrome-dark group-hover:text-purple-400 transition-colors flex-shrink-0" aria-hidden="true" />
                )}
              </button>

              {profile.social.phone && (
                <a
                  href={`tel:${profile.social.phone.replace(/\D/g, '')}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border hover:border-chrome-dark/50 transition-colors"
                  aria-label="Call phone number"
                >
                  <Phone className="w-5 h-5 text-chrome-dark" aria-hidden="true" />
                  <span className="text-chrome-light/70 hover:text-chrome-light transition-colors">
                    {profile.social.phone}
                  </span>
                </a>
              )}

              <ResumeButton
                href={profile.social.resume}
                size="md"
                variant="secondary"
                className="w-full sm:w-auto"
              />

              <div className="pt-2">
                <SocialLinksComponent links={profile.social} size="md" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-chrome-dark text-sm">
            © {currentYear} {profile.name}. All rights reserved.
          </p>
          <p className="text-chrome-dark text-sm">
            Built with React, TypeScript, Tailwind CSS & Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  );
}