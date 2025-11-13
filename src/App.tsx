import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { TypingTest, ResultsCard, ThemeSelector } from './components'
import { useTheme } from './contexts/ThemeContext'
import type { Stats } from './utils/types'
import './App.css'

function App() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const { currentTheme } = useTheme();

  const handleTestComplete = (testStats: Stats) => {
    setStats(testStats);
    setIsTestComplete(true);
  };

  const handleReset = () => {
    setStats(null);
    setIsTestComplete(false);
  };

  const getBackgroundEffects = () => {
    if (currentTheme.name === 'starry') {
      return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                backgroundColor: currentTheme.colors.accent,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.2,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      );
    }
    
    if (currentTheme.name === 'sakura') {
      return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50% 0 50% 0',
                backgroundColor: currentTheme.colors.accent,
                top: `${-10 - Math.random() * 20}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3,
                animation: `sakuraFall ${Math.random() * 5 + 8}s linear infinite`,
                animationDelay: `${Math.random() * 8}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      );
    }
    
    if (currentTheme.name === 'matrix') {
      return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute font-mono text-sm opacity-70"
              style={{
                color: currentTheme.colors.accent,
                top: `${-10 - Math.random() * 20}%`,
                left: `${Math.random() * 100}%`,
                animation: `matrixFall ${Math.random() * 5 + 8}s linear infinite`,
                animationDelay: `${Math.random() * 8}s`,
              }}
            >
              {String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))}
            </div>
          ))}
        </div>
      );
    }
    
    if (currentTheme.name === 'navy') {
      return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                width: '2px',
                height: `${Math.random() * 100 + 50}px`,
                background: `linear-gradient(180deg, transparent, ${currentTheme.colors.accent}40, transparent)`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3 + 0.1,
                animation: `navyScan ${Math.random() * 8 + 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="min-h-screen text-gray-300 flex flex-col items-center justify-center p-4 sm:p-8 pb-20 relative" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {getBackgroundEffects()}
      <div className="relative z-10 w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isTestComplete ? (
            <TypingTest key="test" onComplete={handleTestComplete} />
          ) : (
            <ResultsCard key="results" stats={stats} onReset={handleReset} />
          )}
        </AnimatePresence>
      </div>
      <ThemeSelector />
    </div>
  )
}

export default App
