import { motion } from 'framer-motion';
import { ArrowDown, Zap, Brain } from 'lucide-react';
import { ResumeButton } from './ResumeButton';
import { usePortfolio } from '../hooks/usePortfolio';

export function HeroSection() {
  const { profile } = usePortfolio();

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToExperience = () => {
    const element = document.getElementById('experience');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-pink-500/10" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-chrome-dark mb-6"
          >
            <Zap className="w-4 h-4 text-purple-500" aria-hidden="true" />
            <span className="text-chrome-light">Software Engineer</span>
            <span className="text-border mx-1">|</span>
            <Brain className="w-4 h-4 text-pink-500" aria-hidden="true" />
            <span className="text-chrome-light">Gen AI Enthusiast</span>
          </motion.span>

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="hero-heading font-kanit font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6"
          >
            Hi, I&apos;m <span className="text-white">{profile.shortName}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-chrome-light/70 max-w-3xl mx-auto mb-10 leading-relaxed no-wrap-words"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mb-10"
          >
            <img
              src={profile.avatarSvg}
              alt={`${profile.name} avatar`}
              className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full object-cover border-2 border-chrome-dark/30 mx-auto shadow-xl shadow-purple-500/10"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            {/* <SocialLinksComponent links={profile.social} size="lg" /> */}
          </motion.div>

          <motion.button
            onClick={scrollToExperience}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-medium text-base hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 transition-all duration-300 shadow-lg shadow-purple-500/25"
            aria-label="Scroll to experience section"
          >
            <span>Explore My Work</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex items-center"
            >
              <ArrowDown className="w-5 h-5" aria-hidden="true" />
            </motion.div>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
          >
            <ResumeButton
              href={profile.social.resume}
              size="lg"
              variant="outline"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-bounce md:-bottom-4"
        >
          <button
            onClick={scrollToAbout}
            className="p-3 rounded-full bg-card border border-border text-chrome-light/50 hover:text-white hover:border-chrome-dark/50 transition-colors"
            aria-label="Scroll to about section"
          >
            <ArrowDown className="w-6 h-6" aria-hidden="true" />
          </button>
        </motion.div>

        <div className="absolute bottom-20 left-6 right-6 md:left-20 md:right-20 flex justify-between items-end pointer-events-none" aria-hidden="true">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.4, x: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-xs text-chrome-dark font-mono tracking-wider"
          >
            01. ABOUT
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.4, x: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="text-xs text-chrome-dark font-mono tracking-wider text-right"
          >
            02. EXPERIENCE
          </motion.div>
        </div>
      </div>
    </section>
  );
}