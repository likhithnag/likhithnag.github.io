import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';

const bentoCategories = [
  {
    title: 'Core Languages',
    badge: 'FOUNDATION',
    stat: '7 LANGUAGES',
    colSpan: 'lg:col-span-6',
  },
  {
    title: 'Frameworks & Platforms',
    badge: 'CORE PILLAR',
    stat: '14 FRAMEWORKS',
    colSpan: 'lg:col-span-6',
  },
  {
    title: 'AI/ML & Data',
    badge: 'INTELLIGENCE',
    stat: '10 TECHNOLOGIES',
    colSpan: 'lg:col-span-12',
  },
  {
    title: 'Testing & Quality',
    badge: 'RELIABILITY',
    stat: '7 PRACTICES',
    colSpan: 'lg:col-span-6',
  },
  {
    title: 'Databases',
    badge: 'PERSISTENCE',
    stat: '5 DATABASES',
    colSpan: 'lg:col-span-6',
  },
  {
    title: 'Cloud & DevOps',
    badge: 'INFRASTRUCTURE',
    stat: '12 TOOLS',
    colSpan: 'lg:col-span-12',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function SkillsSection() {
  const { skills } = usePortfolio();

  return (
    <section
      id="skills"
      className="relative w-full bg-background text-white font-kanit pt-20 pb-24 px-6 md:px-12 lg:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-7"
        >
          <span className="text-xs font-mono text-purple-500 tracking-widest uppercase">
            03 / TECH MATRIX
          </span>
          <div className="w-20 h-px bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <h2 className="hero-heading font-kanit font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
            <span className="block">TECHNOLOGY</span>
            <span className="block">STACK.</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {skills.categories.map((category, idx) => {
            const bentoMeta = bentoCategories[idx] || { 
              badge: 'SKILL', 
              stat: `${category.items.length} ITEMS`, 
              colSpan: 'lg:col-span-4' 
            };
            
            return (
              <motion.div
                key={category.name}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className={`${bentoMeta.colSpan} relative p-6 md:p-8 rounded-2xl border border-border bg-card/80 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-purple-500/50 hover:shadow-[0_16px_45px_rgba(168,85,247,0.14)] group`}
              >
                {/* Top Accent Border */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Corner Brackets */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-purple-500/40 group-hover:border-purple-500 transition-colors duration-300" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-purple-500/40 group-hover:border-purple-500 transition-colors duration-300" />

                {/* Card Meta Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono tracking-widest uppercase text-purple-500 group-hover:text-purple-400 transition-colors">
                    {bentoMeta.badge}
                  </span>
                  <span className="text-xs font-mono px-2.5 py-0.5 border border-purple-500/30 text-chrome-light/70 bg-background/50 group-hover:border-purple-500/50 group-hover:text-white transition-all">
                    {bentoMeta.stat}
                  </span>
                </div>

                {/* Title */}
                <h3 className="hero-heading font-kanit font-bold text-2xl md:text-3xl text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {category.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-chrome-light/60 font-light leading-relaxed mb-6 max-w-xl group-hover:text-chrome-light transition-colors no-wrap-words">
                  {category.items.length} technologies mastered across production systems.
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                  {category.items.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium tracking-wider uppercase rounded border border-purple-500/20 bg-background/50 text-chrome-light/80 group-hover:border-purple-500/50 group-hover:bg-purple-500/10 group-hover:text-white transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}