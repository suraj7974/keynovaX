import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { TypingTest, ResultsCard } from './components'
import type { Stats } from './utils/types'
import './App.css'

function App() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isTestComplete, setIsTestComplete] = useState(false);

  const handleTestComplete = (testStats: Stats) => {
    setStats(testStats);
    setIsTestComplete(true);
  };

  const handleReset = () => {
    setStats(null);
    setIsTestComplete(false);
  };

  return (
    <div className="min-h-screen bg-[#1e1810] text-gray-300 flex flex-col items-center justify-center p-4 sm:p-8">
      <AnimatePresence mode="wait">
        {!isTestComplete ? (
          <TypingTest key="test" onComplete={handleTestComplete} />
        ) : (
          <ResultsCard key="results" stats={stats} onReset={handleReset} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
