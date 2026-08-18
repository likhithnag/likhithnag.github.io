# Likhith — Senior Software Engineer Portfolio

A modern, performant personal portfolio website built with React 18, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Features

- **Dark-first design** with `#0C0C0C` background
- **Chrome/silver gradient headlines** for striking typography
- **Purple-magenta-orange gradient accents** on interactive elements
- **Smooth animations** powered by Framer Motion
- **Horizontal marquee testimonials** with reduced-motion support
- **Fully responsive** across all device sizes
- **Accessible** with proper ARIA labels and semantic HTML
- **Content-driven** — all data lives in `src/data/portfolio.json`

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS v4** for utility-first styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Kanit** font family

## Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.tsx       # Fixed navigation with smooth scroll
│   ├── SocialLinks.tsx  # Reusable social link pills
│   ├── HeroSection.tsx  # Full-viewport hero
│   ├── AboutSection.tsx # Bio + stats
│   ├── ExperienceSection.tsx # Numbered experience rows
│   ├── ServicesSection.tsx   # Service offerings (TODO: move to JSON)
│   ├── SkillsSection.tsx     # Categorized skill tags
│   ├── ProjectsSection.tsx   # Sticky project cards grid
│   ├── ProjectCard.tsx       # Individual project card
│   ├── TestimonialsSection.tsx # Horizontal marquee carousel
│   └── Footer.tsx      # 3-column footer with contact
├── hooks/
│   └── usePortfolio.ts # Typed data access hook
├── types/
│   └── portfolio.ts    # TypeScript interfaces
├── data/
│   └── portfolio.json  # All portfolio content
├── App.tsx             # Root component
├── main.tsx            # Entry point
└── index.css           # Global styles + Tailwind v4 theme
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts the Vite dev server at `http://localhost:5173`

### Build

```bash
npm run build
```

Production build outputs to `dist/`

### Preview Production Build

```bash
npm run preview
```

## Editing Content

All portfolio content is centralized in `src/data/portfolio.json`. Edit this file to update:

- **Profile**: name, tagline, bio, avatar SVG, social links
- **Skills**: categories and items
- **Experience**: company, role, period, highlights
- **Projects**: title, description, stack, links, highlight flag
- **Education**: degree, institution, year
- **Testimonials**: quote, author, role, avatar color

The `usePortfolio()` hook provides typed access to all data with helper methods:
- `getHighlightedProjects()` — featured projects sorted first
- `getRegularProjects()` — remaining projects
- `getTestimonialsForMarquee()` — duplicated array for infinite scroll

### Adding/Removing Social Links

Edit the `social` object in `portfolio.json`. Empty strings are automatically hidden.

```json
"social": {
  "github": "https://github.com/username",
  "linkedin": "https://linkedin.com/in/username",
  "email": "mailto:you@example.com",
  "phone": "+1-555-123-4567",
  "website": "https://yourdomain.com",
  "instagram": ""
}
```

### Customizing Theme

Edit `src/index.css` to modify:
- Color palette (`--color-*` CSS variables)
- Font family (`--font-kanit`)
- Animation keyframes
- Reduced-motion preferences

## Key Implementation Details

### Smooth Scroll Navigation

Navbar links and footer navigation use smooth scroll with `scroll-margin-top: 80px` on sections (via `scroll-behavior: smooth` on `html`).

### Marquee Testimonials

CSS-only infinite horizontal scroll using `animate-marquee` keyframe. Duplicates testimonial array for seamless loop. Pauses on hover. Respects `prefers-reduced-motion` via media query fallback to `scroll-snap`.

### No Mid-Word Breaks

About section uses `overflow-wrap: normal; word-break: normal` via `.no-wrap-words` utility class.

### Empty Link Handling

Social links and project "LIVE PROJECT" buttons are conditionally rendered only when URLs are present.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint (if configured) |

## Performance

- Lazy-loaded project images
- Optimized bundle with Vite
- Minimal runtime dependencies
- CSS-only animations where possible

## Accessibility

- Semantic HTML5 structure
- ARIA labels on interactive elements
- Focus-visible outlines
- Reduced motion support
- Sufficient color contrast
- Keyboard navigable

## License

MIT — feel free to use as a template for your own portfolio.