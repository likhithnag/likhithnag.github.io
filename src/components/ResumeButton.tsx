import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';

interface ResumeButtonProps {
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm gap-2',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-3',
};

const variantClasses = {
  primary: 'bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 shadow-lg shadow-purple-500/25',
  secondary: 'bg-card border border-border text-chrome-light/80 hover:text-white hover:border-chrome-dark/50 hover:bg-card/80',
  outline: 'bg-transparent border-2 border-chrome-dark/50 text-chrome-light/70 hover:border-purple-500 hover:text-white hover:bg-purple-500/10',
};

export function ResumeButton({ 
  href, 
  size = 'md', 
  variant = 'primary', 
  className = '' 
}: ResumeButtonProps) {
  if (!href) return null;

  return (
    <motion.a
      href={href}
      download
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        group inline-flex items-center justify-center ${sizeClasses[size]} ${variantClasses[variant]}
        rounded-xl font-medium transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-purple-500/50
        ${className}
      `}
      aria-label="Download resume"
    >
      <FileText className="w-5 h-5" aria-hidden="true" />
      <span>Resume</span>
      <Download className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${size === 'sm' ? 'w-4 h-4' : ''}`} aria-hidden="true" />
    </motion.a>
  );
}