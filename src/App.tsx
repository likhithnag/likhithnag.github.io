import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { Footer } from './components/Footer';
import { ChatbotModal } from './components/ChatbotModal';
import { useState } from 'react';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Navbar onChatOpen={() => setIsChatOpen(true)} />
      <main id="main-content" className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <Footer />
      </main>
      <ChatbotModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}

export default App;