import { useMemo } from 'react';
import portfolioData from '../data/portfolio.json';
import type { PortfolioData, Project, Testimonial } from '../types/portfolio';

const typedPortfolioData = portfolioData as PortfolioData;

export function usePortfolio() {
  const profile = useMemo(() => typedPortfolioData.profile, []);
  const skills = useMemo(() => typedPortfolioData.skills, []);
  const experience = useMemo(() => typedPortfolioData.experience, []);
  
  const projects = useMemo(() => {
    return [...typedPortfolioData.projects].sort((a, b) => {
      if (a.highlight && !b.highlight) return -1;
      if (!a.highlight && b.highlight) return 1;
      return b.year - a.year;
    });
  }, []);
  
  const education = useMemo(() => typedPortfolioData.education, []);
  const testimonials = useMemo(() => typedPortfolioData.testimonials ?? [], []);

  const getHighlightedProjects = (): Project[] => {
    return projects.filter(p => p.highlight);
  };

  const getRegularProjects = (): Project[] => {
    return projects.filter(p => !p.highlight);
  };

  const getTestimonialsForMarquee = (): Testimonial[] => {
    return [...testimonials, ...testimonials];
  };

  return {
    profile,
    skills,
    experience,
    projects,
    education,
    testimonials,
    getHighlightedProjects,
    getRegularProjects,
    getTestimonialsForMarquee,
  };
}