import { motion } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';
import { ProjectCard } from './ProjectCard';

export function ProjectsSection() {
  const { getHighlightedProjects, getRegularProjects } = usePortfolio();
  const highlightedProjects = getHighlightedProjects();
  const regularProjects = getRegularProjects();

  return (
    <section
      id="projects"
      className="py-24 md:py-32 px-6 bg-card/50 border-y border-border"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-purple-500 tracking-widest uppercase">04</span>
          <h2 id="projects-heading" className="hero-heading font-kanit font-bold text-4xl md:text-5xl lg:text-6xl mt-2 mb-6 leading-tight">
            Selected Work
          </h2>
          <p className="text-lg text-chrome-light/60 max-w-2xl no-wrap-words">
            A collection of projects spanning AI, developer tools, fintech, and real-time systems.
          </p>
        </motion.div>

        {highlightedProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <h3 className="text-sm font-mono text-purple-500 tracking-widest uppercase mb-6">Featured</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlightedProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} isHighlight />
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-sm font-mono text-purple-500 tracking-widest uppercase mb-6">All Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index + highlightedProjects.length} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}