import React, { useEffect, useRef, useState } from 'react';
import HeroSection from './components/HeroSection';
import CharactersSection from './components/CharactersSection';
import QuestsSection from './components/QuestsSection';
import InteractiveMapSection from './components/InteractiveMapSection';
import FinaleSection from './components/FinaleSection';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import { PrologueIcon } from './components/Icons';

const useScrollFadeIn = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.2
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return [ref, isVisible] as const;
};

const useScrollSpy = (sectionIds: string[]) => {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
  
    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-40% 0px -60% 0px',
                threshold: 0
            }
        );
  
        const { current: observer } = observerRef;
        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                observer?.observe(element);
            }
        });
  
        return () => {
            observer?.disconnect();
        };
    }, [sectionIds]);
  
    return activeSection;
};


const PrologueSection: React.FC = () => {
    return (
      <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto p-8 border border-teal-500/20 bg-slate-900/50 rounded-lg shadow-[0_0_15px_rgba(20,220,190,0.1)]">
          <div className="flex justify-center mb-6">
            <PrologueIcon />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-teal-300 mb-4 uppercase tracking-widest">Mission Log: Entry 01</h2>
          <p className="text-lg text-slate-300 leading-relaxed font-mono">
            [2053] Chandrayaan 32. Comms down. Stranded. Encountered... something. Calls itself 'Chandamama'. The Moon. It's telling me a story to pass the time. A distraction. A fantasy of a cursed king, and four souls trapped in a cosmic loop. Logging this is... unconventional. But it's all I have.
          </p>
        </div>
      </section>
    );
};

const SECTIONS = [
    { id: 'prologue', title: 'Prologue' },
    { id: 'characters', title: 'Characters' },
    { id: 'quests', title: 'Quests' },
    { id: 'map', title: 'Map' },
    { id: 'finale', title: 'Finale' },
];

const App: React.FC = () => {
  const Section: React.FC<{ children: React.ReactNode, id: string }> = ({ children, id }) => {
    const [ref, isVisible] = useScrollFadeIn();
    return (
      <div id={id} ref={ref as React.RefObject<HTMLDivElement>} className={`scroll-fade-in ${isVisible ? 'is-visible' : ''}`}>
        {children}
      </div>
    );
  };
  
  const activeSection = useScrollSpy(SECTIONS.map(s => s.id));
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > window.innerHeight * 0.8) {
            setShowNav(true);
        } else {
            setShowNav(false);
        }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Navigation sections={SECTIONS} activeSection={activeSection} isVisible={showNav} />
      <main>
        <Section id="hero"><HeroSection /></Section>
        <Section id="prologue"><PrologueSection /></Section>
        <Section id="characters"><CharactersSection /></Section>
        <Section id="quests"><QuestsSection /></Section>
        <Section id="map"><InteractiveMapSection /></Section>
        <Section id="finale"><FinaleSection /></Section>
      </main>
      <Footer />
    </div>
  );
};

export default App;