import { motion } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';
import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  const { getTestimonialsForMarquee } = usePortfolio();
  const testimonials = getTestimonialsForMarquee();

  return (
    <section
      id="testimonials"
      className="py-24 md:py-32 px-6 relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" aria-hidden="true" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-pink-500/10 via-transparent to-transparent" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-mono text-purple-500 tracking-widest uppercase">05</span>
          <h2 id="testimonials-heading" className="hero-heading font-kanit font-bold text-4xl md:text-5xl lg:text-6xl mt-2 mb-6 leading-tight">
            Testimonials
          </h2>
          <p className="text-lg text-chrome-light/60 max-w-2xl mx-auto no-wrap-words">
            What colleagues and leaders say about working together.
          </p>
        </motion.div>

        <div className="relative" role="region" aria-label="Testimonials carousel">
          <div className="flex gap-8 overflow-hidden" style={{ width: 'max-content' }}>
            <div 
              className="flex gap-8 animate-marquee"
              aria-hidden="true"
              style={{ width: 'max-content', flexShrink: 0 }}
            >
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>

          <div 
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent" />
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-4 text-chrome-dark" aria-hidden="true">
          <Quote className="w-8 h-8 opacity-30" />
          <Quote className="w-8 h-8 opacity-50" />
          <Quote className="w-8 h-8 opacity-30" />
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: { id: string; quote: string; name: string; role: string; avatarColor: string } }) {
  const initial = testimonial.name.charAt(0).toUpperCase();

  return (
    <motion.div
      className="flex-shrink-0 w-96 md:w-[380px] p-8 rounded-2xl bg-card border border-border hover:border-chrome-dark/50 transition-colors duration-300"
      role="article"
      aria-label={`Testimonial by ${testimonial.name}`}
    >
      <div className="flex items-center gap-2 mb-4" aria-hidden="true">
        <Star className="w-5 h-5 text-yellow-400 fill-current" />
        <Star className="w-5 h-5 text-yellow-400 fill-current" />
        <Star className="w-5 h-5 text-yellow-400 fill-current" />
        <Star className="w-5 h-5 text-yellow-400 fill-current" />
        <Star className="w-5 h-5 text-yellow-400 fill-current" />
      </div>

      <blockquote className="mb-6">
        <p className="text-lg md:text-xl text-chrome-light/80 leading-relaxed italic no-wrap-words relative">
          <span className="absolute -top-2 -left-2 text-chrome-dark/20 text-6xl font-serif leading-none" aria-hidden="true">"</span>
          {testimonial.quote}
        </p>
      </blockquote>

      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center font-kanit font-bold text-white text-xl flex-shrink-0"
          style={{ backgroundColor: testimonial.avatarColor }}
          aria-hidden="true"
        >
          {initial}
        </div>
        <div>
          <p className="font-kanit font-semibold text-white uppercase tracking-wider">{testimonial.name}</p>
          <p className="text-sm text-chrome-dark">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
}