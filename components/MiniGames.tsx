import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CHARACTERS } from '../constants';

// --- UTILS & HELPERS ---
const useGameLoop = (callback: (deltaTime: number) => void, isRunning: boolean) => {
    // FIX: Initialize useRef with undefined. The original code `useRef<number>()` caused an error because no initial value was provided.
    const requestRef = useRef<number | undefined>(undefined);
    // FIX: Initialize useRef with undefined. The original code `useRef<number>()` caused an error because no initial value was provided.
    const previousTimeRef = useRef<number | undefined>(undefined);

    const loop = useCallback((time: number) => {
        if (previousTimeRef.current !== undefined) {
            const deltaTime = time - previousTimeRef.current;
            callback(deltaTime);
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(loop);
    }, [callback]);

    useEffect(() => {
        if (isRunning) {
            requestRef.current = requestAnimationFrame(loop);
        }
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [isRunning, loop]);
};

// --- GAME COMPONENTS ---

const KingFishingGame: React.FC = () => {
    const [score, setScore] = useState(0);
    const [linePos, setLinePos] = useState({ x: 50, y: 0 });
    const [hookPos, setHookPos] = useState({ x: 50, y: 20 });
    const [isCasting, setIsCasting] = useState(false);
    const [fish, setFish] = useState(() =>
        Array.from({ length: 5 }).map((_, i) => ({
            id: i,
            x: Math.random() * 80 + 10,
            y: Math.random() * 40 + 55,
            caught: false,
        }))
    );

    const castLine = (e: React.MouseEvent) => {
        if (isCasting) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        setIsCasting(true);
        setLinePos({ x, y: 0 });
        setHookPos({ x, y: 80 });

        setTimeout(() => {
            // Check for catch
            const caughtFish = fish.find(f => !f.caught && Math.abs(f.x - x) < 5 && Math.abs(f.y - 80) < 5);
            if (caughtFish) {
                setScore(s => s + 1);
                setFish(fishes => fishes.map(f => f.id === caughtFish.id ? { ...f, caught: true } : f));
            }
            setHookPos({ x, y: 20 });
            setIsCasting(false);
        }, 1500);
    };

    return (
        <div className="text-center font-mono">
            <p className="text-lg mb-2">Score: {score}</p>
            <div className="relative w-full aspect-video bg-blue-900/50 border-2 border-yellow-400 rounded-lg overflow-hidden cursor-pointer" onClick={castLine}>
                {/* Water */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-800/70"></div>
                {/* Fish */}
                {fish.map(f => !f.caught && (
                    <div key={f.id} className="absolute text-2xl" style={{ left: `${f.x}%`, top: `${f.y}%`, animation: `fish-swim ${2 + Math.random() * 3}s ease-in-out infinite` }}>🐟</div>
                ))}
                {/* Fishing Line */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 overflow-visible">
                    <line x1={linePos.x} y1={linePos.y} x2={hookPos.x} y2={hookPos.y} stroke="white" strokeWidth="0.5" style={{ transition: 'all 1s ease-out' }} />
                    <text x={hookPos.x - 1} y={hookPos.y + 2} style={{ transition: 'all 1s ease-out', fontSize: '4px' }}>🎣</text>
                </svg>
            </div>
            <p className="mt-2 text-sm text-yellow-300">Click on the water to cast your line!</p>
        </div>
    );
};

const SamratDuckHuntGame: React.FC = () => {
    const [ducks, setDucks] = useState<{ id: number; y: number; speed: number; shot: boolean }[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    
    useEffect(() => {
        if (gameOver) return;
        const interval = setInterval(() => {
            setDucks(prev => [
                ...prev,
                { id: Date.now(), y: Math.random() * 60 + 10, speed: Math.random() * 5 + 5, shot: false },
            ]);
        }, 1500);
        setTimeout(() => {
            setGameOver(true);
            clearInterval(interval);
        }, 20000); // 20 second game
        return () => clearInterval(interval);
    }, [gameOver]);

    const shootDuck = (id: number) => {
        if(gameOver) return;
        setScore(s => s + 10);
        setDucks(ducks => ducks.map(d => d.id === id ? {...d, shot: true} : d));
        setTimeout(() => setDucks(ducks => ducks.filter(d => d.id !== id)), 1000);
    };

    return (
        <div className="text-center font-mono">
            <p className="text-lg mb-2">Score: {score}</p>
            <div className="relative w-full aspect-video bg-sky-800/50 border-2 border-red-400 rounded-lg overflow-hidden cursor-crosshair">
                <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-sky-700"></div>
                {ducks.map(duck => (
                    <div
                        key={duck.id}
                        className="absolute text-4xl cursor-pointer"
                        style={{ top: `${duck.y}%`, animation: duck.shot ? `duck-fall 1s forwards` : `duck-fly ${duck.speed}s linear` }}
                        onClick={() => !duck.shot && shootDuck(duck.id)}
                    >
                        {duck.shot ? '💥' : '🦆'}
                    </div>
                ))}
            </div>
            {gameOver && <p className="mt-2 text-lg text-red-300">Time's up! Final Score: {score}</p>}
        </div>
    );
};

const MantraDoveGame: React.FC = () => {
    const [orbs, setOrbs] = useState(Array(9).fill(false));
    const [score, setScore] = useState(0);

    const transformOrb = (index: number) => {
        if (orbs[index]) return;
        setScore(s => s + 1);
        setOrbs(orbs => orbs.map((orb, i) => i === index ? true : orb));
    };

    return (
        <div className="text-center font-mono">
            <p className="text-lg mb-2">Doves Freed: {score}</p>
            <div className="relative grid grid-cols-3 gap-4 w-full aspect-square p-4 border-2 border-emerald-400 rounded-lg">
                {orbs.map((isTransformed, i) => (
                    <div key={i} className="w-full h-full flex items-center justify-center cursor-pointer" onClick={() => transformOrb(i)}>
                        {isTransformed ? (
                            <div className="text-5xl" style={{animation: 'dove-fly-away 1.5s forwards'}}>🕊️</div>
                        ) : (
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-500 shadow-[var(--glow-emerald)] animate-pulse"></div>
                        )}
                    </div>
                ))}
            </div>
             <button onClick={() => { setOrbs(Array(9).fill(false)); setScore(0); }} className="mt-4 px-4 py-2 bg-emerald-600 rounded">Reset</button>
        </div>
    );
};

const FransisFindThingsGame: React.FC = () => {
    const items = useRef([
        { id: 'compass', name: 'Compass', pos: { top: '75%', left: '15%' }, found: false, emoji: '🧭' },
        { id: 'scroll', name: 'Scroll', pos: { top: '25%', left: '80%' }, found: false, emoji: '📜' },
        { id: 'gem', name: 'Gem', pos: { top: '55%', left: '55%' }, found: false, emoji: '💎' },
    ]).current;
    const [foundCount, setFoundCount] = useState(0);
    const [uiItems, setUiItems] = useState(items);

    const findItem = (id: string) => {
        const item = uiItems.find(i => i.id === id);
        if (item && !item.found) {
            setFoundCount(c => c + 1);
            setUiItems(items => items.map(i => i.id === id ? { ...i, found: true } : i));
        }
    };

    return (
        <div className="text-center font-mono">
            <div className="flex justify-center gap-6 mb-2">
                {uiItems.map(item => <p key={item.id} className={item.found ? 'line-through text-slate-500' : 'text-amber-300'}>{item.name} {item.emoji}</p>)}
            </div>
            <div className="relative w-full aspect-video border-2 border-amber-400 rounded-lg overflow-hidden bg-[url('https://images.unsplash.com/photo-1599596395729-9e81a38515c0?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center">
                {uiItems.map(item => (
                    <div key={item.id}
                        className={`absolute text-4xl cursor-pointer transition-all duration-500`}
                        style={{ 
                            ...item.pos, 
                            animation: item.found ? 'item-found 1s' : 'discoverable-pulse 2s infinite'
                        }}
                        onClick={() => findItem(item.id)}
                    >
                       {item.emoji}
                    </div>
                ))}
            </div>
            {foundCount === items.length && <p className="mt-2 text-lg text-amber-200">Excellent work, you've found them all!</p>}
        </div>
    );
};

const HeroRoadRunnerGame: React.FC = () => {
    const playerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState(50); // percentage
    const [obstacles, setObstacles] = useState<{ id: number; x: number; y: number }[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const movePlayer = useCallback((e: KeyboardEvent) => {
        if (gameOver) return;
        setPosition(p => {
            if (e.key === 'ArrowLeft') return Math.max(0, p - 5);
            if (e.key === 'ArrowRight') return Math.min(100, p + 5);
            return p;
        });
    }, [gameOver]);

    useEffect(() => {
        window.addEventListener('keydown', movePlayer);
        return () => window.removeEventListener('keydown', movePlayer);
    }, [movePlayer]);

    useGameLoop(() => {
        if (gameOver) return;
        setScore(s => s + 1);
        // Move obstacles and add new ones
        setObstacles(obs => {
            const newObs = obs
                .map(o => ({ ...o, y: o.y + 2 })) // speed
                .filter(o => o.y < 100);
            if (Math.random() < 0.05) { // spawn rate
                newObs.push({ id: Date.now(), x: Math.random() * 90 + 5, y: -10 });
            }
            return newObs;
        });
        // Collision check
        if(playerRef.current) {
            const playerRect = playerRef.current.getBoundingClientRect();
            for(const ob of obstacles) {
                 const obEl = document.getElementById(`ob-${ob.id}`);
                 if(obEl) {
                     const obRect = obEl.getBoundingClientRect();
                      if (playerRect.left < obRect.right && playerRect.right > obRect.left &&
                          playerRect.top < obRect.bottom && playerRect.bottom > obRect.top) {
                         setGameOver(true);
                     }
                 }
            }
        }
    }, !gameOver);

    return (
        <div className="text-center font-mono">
            <p className="text-lg mb-2">Distance: {score}</p>
            <div className="relative w-full h-[70vh] bg-gray-800 border-2 border-slate-400 rounded-lg overflow-hidden">
                {/* Road lines */}
                <div className="absolute h-full w-2 bg-yellow-400 left-1/2 -translate-x-1/2" style={{backgroundImage: `linear-gradient(white 25%, transparent 25%, transparent 50%, white 50%, white 75%, transparent 75%, transparent 100%)`, backgroundSize: '100% 80px', animation: `scanline ${2 - (score/1000)}s linear infinite`}}></div>
                {/* Player */}
                <div ref={playerRef} className="absolute bottom-4 w-10 h-16 bg-red-600 rounded-t-lg transition-all duration-100" style={{ left: `${position}%`, transform: 'translateX(-50%)', animation: gameOver ? 'car-crash 0.5s forwards' : '' }}>🚕</div>
                {/* Obstacles */}
                {obstacles.map(ob => (
                    <div id={`ob-${ob.id}`} key={ob.id} className="absolute w-10 h-10 bg-blue-500 rounded" style={{ left: `${ob.x}%`, top: `${ob.y}%`, transform: 'translateX(-50%)' }}></div>
                ))}
            </div>
             {gameOver ? <p className="mt-2 text-lg text-red-400">CRASH! Final Distance: {score}</p> : <p className="mt-2 text-sm text-slate-300">Use Arrow Keys to move!</p>}
        </div>
    );
};

export const RocketLaunchGame: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'counting' | 'launched'>('idle');
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (status === 'counting' && countdown > 0) {
            const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
            return () => clearTimeout(timer);
        }
        if (countdown === 0) {
            setStatus('launched');
        }
    }, [status, countdown]);

    const startLaunch = () => {
        if (status === 'idle') {
            setStatus('counting');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 border-2 border-teal-500/30 bg-slate-900 rounded-lg max-w-sm mx-auto">
            <div className="relative h-48 w-24">
                <div 
                    className={`text-6xl transition-transform duration-2000 ease-in ${status === 'counting' ? 'animate-[rocket-shake_0.2s_infinite]' : ''}`}
                    style={{ animation: status === 'launched' ? 'rocket-launch 3s ease-in forwards' : '' }}
                >
                    🚀
                </div>
            </div>
            <button
                onClick={startLaunch}
                disabled={status !== 'idle'}
                className="w-full mt-4 px-6 py-3 text-lg font-bold uppercase tracking-widest rounded bg-teal-600 text-white disabled:bg-slate-700 disabled:cursor-not-allowed transition-all hover:bg-teal-500 hover:shadow-[0_0_15px_rgba(20,220,190,0.4)]"
            >
                {status === 'idle' && 'Initiate Launch'}
                {status === 'counting' && `T- ${countdown}`}
                {status === 'launched' && 'Mission Away!'}
            </button>
        </div>
    );
};


// --- MODAL WRAPPER ---
interface GameModalProps {
    gameName: string;
    onClose: () => void;
}

export const GameModal: React.FC<GameModalProps> = ({ gameName, onClose }) => {
    const character = CHARACTERS.find(c => c.name === gameName);
    if (!character) return null;

    const gameComponents: { [key: string]: React.FC } = {
        'THE KING': KingFishingGame,
        'SAMRAT': SamratDuckHuntGame,
        'MANTRA': MantraDoveGame,
        'FRANSIS R Jr': FransisFindThingsGame,
        'HERO': HeroRoadRunnerGame,
    };
    const GameComponent = gameComponents[gameName];
    
    const colorVariants = {
        slate: 'border-slate-400 text-slate-300',
        amber: 'border-amber-400 text-amber-300',
        red: 'border-red-400 text-red-300',
        emerald: 'border-emerald-400 text-emerald-300',
        yellow: 'border-yellow-400 text-yellow-300',
    };
    const colorClass = colorVariants[character.color as keyof typeof colorVariants];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" style={{ animation: 'flicker-in 0.3s ease-out forwards' }} onClick={onClose}>
            <div className={`relative w-11/12 max-w-2xl p-6 bg-slate-900/90 border-2 ${colorClass} rounded-lg shadow-2xl`} onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-2 right-4 text-slate-400 hover:text-white text-4xl font-mono">&times;</button>
                <h3 className={`text-2xl font-bold mb-4 uppercase tracking-wider ${colorClass.split(' ')[1]}`}>
                    {character.name}'s Challenge
                </h3>
                {GameComponent ? <GameComponent /> : <p>This game is not yet available.</p>}
            </div>
        </div>
    );
};