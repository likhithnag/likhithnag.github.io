import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Project } from '../types/portfolio';

interface ProjectCardProps {
  project: Project;
  index: number;
  isHighlight?: boolean;
}

export function ProjectCard({ project, index, isHighlight = false }: ProjectCardProps) {
  const displayNumber = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
      className={`
        relative group flex flex-col h-full
        rounded-2xl bg-card border border-border
        overflow-hidden
        ${isHighlight ? 'ring-1 ring-purple-500/30' : ''}
      `}
      role="listitem"
    >
      <div className="relative aspect-video overflow-hidden bg-background">
        {project.image ? (
          <motion.img
            src={project.image}
            alt=""
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            aria-hidden="true"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/20 via-background to-pink-500/20">
            <span className="hero-heading font-kanit font-bold text-3xl md:text-4xl lg:text-5xl opacity-50">
              {project.title}
            </span>
          </div>
        )}

        {isHighlight && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 left-4"
          >
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium">
              Featured
            </span>
          </motion.div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-baseline gap-3 mb-3">
          <span className="text-2xl font-kanit font-bold text-chrome-dark/50">
            {displayNumber}
          </span>
          <h3 className="hero-heading font-kanit font-bold text-xl flex-1">
            {project.title}
          </h3>
        </div>

        <p className="text-sm text-purple-400 font-medium mb-3">{project.subtitle}</p>

        <p className="text-chrome-light/60 leading-relaxed no-wrap-words mb-4 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-lg bg-background border border-border text-xs text-chrome-light/70 font-mono"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 6 && (
            <span className="px-2.5 py-1 rounded-lg bg-background border border-border text-xs text-chrome-dark font-mono">
              +{project.stack.length - 6}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="text-sm text-chrome-dark">{project.role} • {project.year}</span>
          
          {project.link && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white text-sm font-medium hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 transition-all duration-300 shadow-lg shadow-purple-500/25"
              aria-label={`View ${project.title} live project`}
            >
              <span>LIVE PROJECT</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  );
}