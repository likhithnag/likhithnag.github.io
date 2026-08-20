import { motion } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import { usePortfolio } from '../hooks/usePortfolio';

export function ProjectsSection() {
  const { projects } = usePortfolio();

  const scrollStackProjects = projects.map((project) => ({
    number: String(projects.indexOf(project) + 1).padStart(2, '0'),
    title: project.title,
    category: project.subtitle.toUpperCase(),
    description: project.description,
    githubUrl: project.link || '#',
    tech: project.stack,
    metrics: [
      { label: 'ROLE', value: project.role },
      { label: 'YEAR', value: String(project.year) },
      { label: 'HIGHLIGHT', value: project.highlight ? 'FEATURED' : 'STANDARD' },
    ],
  }));

  return (
    <section
      id="projects"
      className="relative w-full bg-background text-white font-kanit pt-20 pb-84 px-6 md:px-12 lg:px-16"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-5"
        >
          <span className="text-xs font-mono text-purple-500 tracking-widest uppercase">
            04 / PROJECTS
          </span>
          <div className="w-20 h-px bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16"
        >
          <h2 className="hero-heading font-kanit font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
            <span className="block">SELECTED</span>
            <span className="block">WORK.</span>
          </h2>

          <p className="text-sm text-chrome-light/60 max-w-sm mt-4 md:mt-0 leading-relaxed no-wrap-words">
            Scroll to explore project cards. Featured projects appear first, sorted by recency.
          </p>
        </motion.div>

        {/* Stacking Deck */}
        <ScrollStack
          itemDistance={24}
          itemScale={0.035}
          itemStackDistance={32}
          stackPosition="15%"
          scaleEndPosition="6%"
          baseScale={0.88}
          useWindowScroll={true}
        >
          {scrollStackProjects.map((project) => (
            <ScrollStackItem key={project.title}>
              <div className="relative w-full rounded-2xl border border-border bg-card p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group overflow-hidden transition-colors duration-500 hover:border-purple-500/50">
                
                {/* Top Accent Border */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

                {/* Corner Brackets */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-500/50 group-hover:border-purple-500 transition-colors" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-500/50 group-hover:border-purple-500 transition-colors" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-500/50 group-hover:border-purple-500 transition-colors" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-500/50 group-hover:border-purple-500 transition-colors" />

                {/* Background Number */}
                <span
                  className="absolute -bottom-6 -right-3 text-7xl md:text-8xl font-bold text-chrome-dark/10 select-none pointer-events-none leading-none"
                >
                  {project.number}
                </span>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                  
                  {/* Left Column (7 Cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-xs font-mono font-bold text-purple-500">
                          {project.number} //
                        </span>
                        <span className="text-[10px] font-mono tracking-wider uppercase text-chrome-dark">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="hero-heading font-kanit font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-white mb-4 group-hover:text-purple-400 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-sm text-chrome-light/70 leading-relaxed mb-8 max-w-2xl no-wrap-words">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 pt-6 border-t border-border">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 text-xs font-medium tracking-wider uppercase rounded border border-purple-500/20 bg-background/50 text-chrome-light/80 group-hover:border-purple-500/50 group-hover:text-white transition-all duration-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column (5 Cols) */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 lg:pl-6 lg:border-l lg:border-border">
                    <div className="space-y-3">
                      <span className="text-[9px] font-mono tracking-widest uppercase text-purple-500 block mb-2">
                        // METRICS
                      </span>
                      {project.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="p-3 rounded border border-border bg-background/50 flex items-center justify-between"
                        >
                          <span className="text-xs font-mono text-chrome-light/60">
                            {m.label}
                          </span>
                          <span className="text-xs font-mono font-medium text-white">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-3 px-6 py-3 border border-purple-500/50 bg-background hover:bg-purple-500/10 hover:border-purple-500 text-white text-xs font-medium tracking-widest uppercase transition-all duration-300"
                    >
                      <span>VIEW ON GITHUB</span>
                      <span className="text-xs">↗</span>
                    </a>
                  </div>

                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>

      </div>
    </section>
  );
}