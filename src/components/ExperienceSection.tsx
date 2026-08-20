import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';

export function ExperienceSection() {
  const { experience } = usePortfolio();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 90%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full bg-background text-white font-kanit pt-16 pb-24 px-6 md:px-12 lg:px-16 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-7"
        >
          <span className="text-xs font-mono text-purple-500 tracking-widest uppercase">
            02 / EXPERIENCE
          </span>
          <div className="w-20 h-px bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 className="hero-heading font-kanit font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
            <span className="block">EXPERIENCE &</span>
            <span className="block">MILESTONES.</span>
          </h2>
        </motion.div>

        {/* Route Map */}
        <div className="relative w-full">
          
          {/* Background Track */}
          <div className="absolute left-5 md:left-36 top-4 bottom-8 w-px border-border" />
          
          {/* Animated Track */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-5 md:left-36 top-4 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500 origin-top"
          />

          <div className="space-y-12">
            {experience.map((stop, idx) => (
              <motion.div
                key={stop.company}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: idx * 0.08 }}
                className="relative flex flex-col md:flex-row items-start group"
              >
                {/* Desktop Year (Left side of track) */}
                <div className="hidden md:block w-36 shrink-0 pr-8 pt-1 text-right">
                  <span className="text-xs font-mono text-chrome-dark group-hover:text-chrome-light transition-colors">
                    {stop.period}
                  </span>
                </div>

                {/* Route Node */}
                <div className="absolute left-5 md:left-36 top-2 -translate-x-1/2 flex items-center justify-center">
                  <div className="absolute w-6 h-6 rounded-full border border-purple-500/0 group-hover:border-purple-500/40 group-hover:scale-150 transition-all duration-700 ease-out" />
                  <div className="w-3 h-3 rounded-full bg-background border-2 border-purple-500/50 group-hover:bg-purple-500 group-hover:border-purple-500 group-hover:shadow-[0_0_12px_rgba(168,85,247,0.5)] transition-all duration-300" />
                </div>

                {/* Content (Right side of track) */}
                <div className="ml-10 md:ml-12 pl-2">
                  {/* Mobile Year */}
                  <div className="md:hidden mb-1.5">
                    <span className="text-xs font-mono text-purple-500">{stop.period}</span>
                  </div>

                  <h3 className="hero-heading font-kanit font-bold text-2xl md:text-3xl text-white group-hover:text-purple-400 transition-colors mb-1 leading-tight">
                    {stop.role}
                  </h3>
                  
                  <span className="block text-xs font-medium tracking-widest uppercase text-purple-500 mb-2">
                    {stop.company}
                  </span>
                  
                  <p className="text-sm text-chrome-light/70 leading-relaxed max-w-lg group-hover:text-chrome-light transition-colors no-wrap-words">
                    {stop.summary}
                  </p>

                  {/* Highlights */}
                  <div className="mt-4 space-y-2">
                    {stop.highlights.slice(0, 3).map((highlight, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                        className="text-xs text-chrome-light/60 leading-relaxed no-wrap-words flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 mt-1.5 flex-shrink-0" />
                        {highlight}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}