import { motion } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';

export function SkillsSection() {
  const { skills } = usePortfolio();

  return (
    <section
      id="skills"
      className="py-24 md:py-32 px-6"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-mono text-purple-500 tracking-widest uppercase">03</span>
          <h2 id="skills-heading" className="hero-heading font-kanit font-bold text-4xl md:text-5xl lg:text-6xl mt-2 mb-6 leading-tight">
            Skills
          </h2>
          <p className="text-lg text-chrome-light/60 max-w-2xl mx-auto no-wrap-words">
            Technologies and tools I work with daily to build robust, scalable software.
          </p>
        </motion.div>

        <div className="space-y-12">
          {skills.categories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: catIndex * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-kanit font-bold text-chrome-dark/50 w-10">
                  {String(catIndex + 1).padStart(2, '0')}
                </span>
                <h3 className="hero-heading font-kanit font-bold text-xl">
                  {category.name}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.items.map((item, itemIndex) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 + itemIndex * 0.03 }}
                    className="px-4 py-2 rounded-xl bg-card border border-border text-chrome-light/80 hover:text-white hover:border-chrome-dark/50 transition-colors font-medium"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}