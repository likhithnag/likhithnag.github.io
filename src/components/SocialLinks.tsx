import { GitBranch, Camera, Briefcase, Mail, Phone, Globe } from 'lucide-react';
import type { SocialLinks } from '../types/portfolio';

interface SocialLinksProps {
  links: SocialLinks;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const socialConfig = [
  { key: 'github' as const, icon: GitBranch, label: 'GitHub' },
  { key: 'instagram' as const, icon: Camera, label: 'Instagram' },
  { key: 'linkedin' as const, icon: Briefcase, label: 'LinkedIn' },
  { key: 'email' as const, icon: Mail, label: 'Email' },
  { key: 'phone' as const, icon: Phone, label: 'Phone' },
  { key: 'website' as const, icon: Globe, label: 'Website' },
] as const;

const sizeClasses = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
};

export function SocialLinksComponent({ links, size = 'md', className = '' }: SocialLinksProps) {
  const validLinks = socialConfig.filter(({ key }) => links[key]);

  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      {validLinks.map(({ key, icon: Icon, label }) => {
        const href = links[key];
        if (!href) return null;
        
        const isExternal = key !== 'email' && key !== 'phone';
        
        return (
          <a
            key={key}
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            aria-label={label}
            className={`
              ${sizeClasses[size]} 
              flex items-center justify-center 
              rounded-xl 
              bg-card border border-border 
              text-chrome-light/80 hover:text-white 
              hover:border-chrome-dark/50 
              hover:bg-card/80 
              transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-purple-500/50
            `}
          >
            <Icon className="w-5 h-5" aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}