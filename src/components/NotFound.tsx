import { motion } from 'framer-motion';
import { ArrowLeft, Home, Search } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';

export function NotFound() {
  const { profile } = usePortfolio();

  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="hero-heading font-kanit font-bold text-6xl md:text-8xl mb-4"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-xl text-chrome-light/70 mb-8"
        >
          Page not found. The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#hero"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-medium hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 transition-all duration-300 shadow-lg shadow-purple-500/25"
          >
            <Home className="w-5 h-5" aria-hidden="true" />
            <span>Back to Home</span>
          </motion.a>

          <motion.button
            onClick={() => window.history.back()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border text-chrome-light/80 hover:border-purple-500/50 hover:text-white hover:bg-purple-500/10 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            <span>Go Back</span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 p-6 rounded-2xl bg-card border border-border"
        >
          <p className="text-sm text-chrome-light/60 mb-4">
            Looking for something specific? Try searching:
          </p>
          <form
            action="https://github.com/search"
            method="GET"
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-2"
          >
            <input
              type="hidden"
              name="q"
              value={`repo:likhithnag/likhithnag.github.io `}
            />
            <input
              type="search"
              name="q"
              placeholder="Search this site..."
              className="flex-1 px-4 py-2 bg-background border border-border rounded-xl text-white placeholder-chrome-dark focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-colors flex items-center gap-2"
            >
              <Search className="w-5 h-5" aria-hidden="true" />
            </button>
          </form>
          <p className="text-xs text-chrome-dark mt-3">
            Searches {profile.name}&apos;s GitHub repository
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 text-sm text-chrome-dark"
        >
          <a
            href="mailto:{profile.social.email?.replace('mailto:', '')}"
            className="text-purple-500 hover:underline"
          >
            Contact {profile.shortName}
          </a>
          {' '}if you think this is a mistake.
        </motion.p>
      </motion.div>
    </section>
  );
}