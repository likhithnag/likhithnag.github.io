import { motion } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';

export function ExperienceSection() {
  const { experience } = usePortfolio();

  return (
    <section
      id="experience"
      className="py-24 md:py-32 px-6 bg-card/50 border-y border-border"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-purple-500 tracking-widest uppercase">02</span>
          <h2 id="experience-heading" className="hero-heading font-kanit font-bold text-4xl md:text-5xl lg:text-6xl mt-2 mb-6 leading-tight">
            Experience
          </h2>
        </motion.div>

        <div className="space-y-8" role="list" aria-label="Work experience">
          {experience.map((exp, index) => (
            <motion.article
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
              className="group relative"
              role="listitem"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-3xl md:text-4xl font-kanit font-bold text-chrome-dark/50 w-16 text-right">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="hero-heading font-kanit font-bold text-2xl md:text-3xl leading-tight">
                      {exp.role}
                    </h3>
                    <p className="text-chrome-light/60 mt-1">{exp.company}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end md:items-end text-right">
                  <span className="font-mono text-sm px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 whitespace-nowrap">
                    {exp.period}
                  </span>
                  <p className="text-chrome-dark text-sm mt-2">{exp.location}</p>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-chrome-light/70 leading-relaxed no-wrap-words max-w-4xl mb-6"
              >
                {exp.summary}
              </motion.p>

              <div className="space-y-3" role="list" aria-label="Key achievements">
                {exp.highlights.slice(0, 3).map((highlight, i) => (
                  <motion.div
                    key={highlight}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-border hover:border-chrome-dark/50 transition-colors group"
                    role="listitem"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-chrome-light/80 leading-relaxed no-wrap-words">{highlight}</p>
                  </motion.div>
                ))}
              </div>

              {index < experience.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="absolute bottom-0 left-12 right-6 h-px bg-gradient-to-r from-transparent via-border to-transparent mt-8"
                  aria-hidden="true"
                />
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}