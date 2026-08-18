import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ServicesSection } from './components/ServicesSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ServicesSection />
        <SkillsSection />
        <ProjectsSection />
        <TestimonialsSection />
        <Footer />
      </main>
    </>
  );
}

export default App;