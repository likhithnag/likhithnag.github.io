import { motion } from 'framer-motion';
import { Server, BrainCircuit, Layout, Cloud } from 'lucide-react';

const services = [
  {
    number: '01',
    title: 'Backend Engineering',
    description: 'Scalable APIs, microservices, event-driven architectures, and high-performance data systems. From PostgreSQL optimization to distributed consensus.',
    icon: Server,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    number: '02',
    title: 'AI / LLM Integration',
    description: 'Production RAG systems, agent workflows, model fine-tuning, vector search, and ML ops. Shipping AI features that actually work at scale.',
    icon: BrainCircuit,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    number: '03',
    title: 'Frontend Architecture',
    description: 'React/Next.js at scale, design systems, real-time collaboration, performance optimization, and developer tooling. Pixel-perfect, accessible, fast.',
    icon: Layout,
    gradient: 'from-pink-500 to-orange-500',
  },
  {
    number: '04',
    title: 'Cloud & Infrastructure',
    description: 'AWS/GCP, Kubernetes, Terraform, observability, CI/CD, and platform engineering. Reliable, secure, cost-effective infrastructure as code.',
    icon: Cloud,
    gradient: 'from-orange-500 to-amber-500',
  },
] as const;

// TODO: Move services data to portfolio.json when structure is finalized

export function ServicesSection() {
  return (
    <section
      id="services"
      className="py-24 md:py-32 px-6"
      aria-labelledby="services-heading"
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
          <h2 id="services-heading" className="hero-heading font-kanit font-bold text-4xl md:text-5xl lg:text-6xl mt-2 mb-6 leading-tight">
            Services
          </h2>
          <p className="text-lg text-chrome-light/60 max-w-2xl mx-auto no-wrap-words">
            Core competencies I bring to every engagement — deep expertise across the full stack.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-chrome-dark/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl md:text-3xl font-kanit font-bold text-chrome-dark/50 w-12">
                  {service.number}
                </span>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  transition={{ duration: 0.3 }}
                  className={`p-3 rounded-xl bg-gradient-to-br ${service.gradient}`}
                >
                  <service.icon className="w-6 h-6 text-white" aria-hidden="true" />
                </motion.div>
              </div>

              <h3 className="hero-heading font-kanit font-bold text-xl mb-3 group-hover:text-white transition-colors">
                {service.title}
              </h3>

              <p className="text-chrome-light/60 leading-relaxed no-wrap-words">
                {service.description}
              </p>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute bottom-6 left-6 right-6 h-px bg-gradient-to-r from-transparent via-chrome-dark/20 to-transparent group-hover:via-purple-500/50 transition-all duration-500"
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}