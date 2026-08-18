import { motion } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';

export function AboutSection() {
  const { profile } = usePortfolio();

  return (
    <section
      id="about"
      className="py-24 md:py-32 px-6"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-purple-500 tracking-widest uppercase">01</span>
          <h2 id="about-heading" className="hero-heading font-kanit font-bold text-4xl md:text-5xl lg:text-6xl mt-2 mb-6 leading-tight">
            About Me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="space-y-6"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-chrome-light/70 leading-relaxed no-wrap-words"
            >
              {profile.bio.split('\n\n')[0]}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg md:text-xl text-chrome-light/70 leading-relaxed no-wrap-words"
            >
              {profile.bio.split('\n\n')[1] || ''}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg md:text-xl text-chrome-light/70 leading-relaxed no-wrap-words"
            >
              {profile.bio.split('\n\n')[2] || ''}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Years Experience', value: `${profile.yearsOfExperience}+` },
                { label: 'Current Role', value: profile.role },
                { label: 'Location', value: profile.location },
                { label: 'Specialization', value: profile.specialization.split(' • ')[0] },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-chrome-dark/50 transition-colors"
                >
                  <p className="text-3xl md:text-4xl font-kanit font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-chrome-dark uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-mono text-purple-500 tracking-widest uppercase mb-4">Tech Focus</h3>
              <div className="flex flex-wrap gap-3">
                {['Distributed Systems', 'AI/ML Production', 'Developer Experience', 'System Architecture', 'Team Leadership'].map((focus, i) => (
                  <motion.span
                    key={focus}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                    className="px-4 py-2 rounded-xl bg-card border border-border text-sm text-chrome-light/80 hover:text-white hover:border-chrome-dark/50 transition-colors"
                  >
                    {focus}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}