import React from 'react';

interface NavSection {
    id: string;
    title: string;
}

interface NavigationProps {
    sections: NavSection[];
    activeSection: string | null;
    isVisible: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ sections, activeSection, isVisible }) => {
    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center h-16 bg-slate-950/80 backdrop-blur-sm rounded-b-lg border-b border-slate-700/50 shadow-lg">
                    <div className="flex flex-wrap items-baseline justify-center gap-x-1 sm:gap-x-2">
                        <a 
                            href="#hero" 
                            className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium font-mono uppercase tracking-widest"
                            aria-label="Back to top"
                        >
                            ETA
                        </a>
                        {sections.map((section) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                className={`
                                    px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium font-mono uppercase tracking-widest
                                    transition-colors duration-200 text-center
                                    ${activeSection === section.id 
                                        ? 'bg-slate-700 text-teal-300' 
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}
                                `}
                                aria-current={activeSection === section.id ? 'page' : undefined}
                            >
                                {section.title}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;