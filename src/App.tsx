import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateWords } from './wordGenerator'
import './App.css'

type TestDuration = 15 | 30 | 60;

interface Stats {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
}

function App() {
  const [duration, setDuration] = useState<TestDuration>(30);
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const [isTestActive, setIsTestActive] = useState(false);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [charStates, setCharStates] = useState<('correct' | 'incorrect' | 'pending')[][]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    resetTest();
  }, [duration]);

  useEffect(() => {
    if (isTestActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isTestActive, timeLeft]);

  const resetTest = () => {
    const newWords = generateWords(100);
    setWords(newWords);
    setCurrentWordIndex(0);
    setCurrentInput('');
    setTimeLeft(duration);
    setIsTestActive(false);
    setIsTestComplete(false);
    setStats(null);
    setCharStates(newWords.map(word => Array(word.length).fill('pending')));
    inputRef.current?.focus();
  };

  const startTest = () => {
    if (!isTestActive && !isTestComplete) {
      setIsTestActive(true);
    }
  };

  const endTest = () => {
    setIsTestActive(false);
    setIsTestComplete(true);
    calculateStats();
  };

  const calculateStats = () => {
    let correctChars = 0;
    let incorrectChars = 0;

    charStates.forEach((wordStates, wordIndex) => {
      if (wordIndex < currentWordIndex) {
        wordStates.forEach((state) => {
          if (state === 'correct') correctChars++;
          else if (state === 'incorrect') incorrectChars++;
        });
      } else if (wordIndex === currentWordIndex && currentInput.length > 0) {
        const word = words[wordIndex];
        for (let i = 0; i < currentInput.length; i++) {
          if (i < word.length && currentInput[i] === word[i]) {
            correctChars++;
          } else {
            incorrectChars++;
          }
        }
      }
    });

    const totalChars = correctChars + incorrectChars;
    const accuracy = totalChars > 0 ? (correctChars / totalChars) * 100 : 0;
    const timeElapsed = (duration - timeLeft) / 60;
    const wpm = timeElapsed > 0 ? Math.round((correctChars / 5) / timeElapsed) : 0;

    setStats({
      wpm,
      accuracy: Math.round(accuracy),
      correctChars,
      incorrectChars,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isTestActive && !isTestComplete) {
      startTest();
    }

    if (isTestComplete) return;

    const value = e.target.value;
    
    if (value.endsWith(' ')) {
      handleSpace();
      return;
    }

    setCurrentInput(value);

    const word = words[currentWordIndex];
    const newCharStates = [...charStates];
    const currentWordStates = Array(word.length).fill('pending');

    for (let i = 0; i < value.length; i++) {
      if (i < word.length) {
        currentWordStates[i] = value[i] === word[i] ? 'correct' : 'incorrect';
      }
    }

    newCharStates[currentWordIndex] = currentWordStates;
    setCharStates(newCharStates);
  };

  const handleSpace = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex((prev) => prev + 1);
      setCurrentInput('');
    }
  };

  const handleChangeDuration = (newDuration: TestDuration) => {
    setDuration(newDuration);
  };

  const getTimerColor = () => {
    if (timeLeft <= 5) return 'text-red-500';
    if (timeLeft <= 10) return 'text-orange-400';
    return 'text-orange-500';
  };

  return (
    <div className="min-h-screen bg-[#1e1810] text-gray-300 flex flex-col items-center justify-center p-4 sm:p-8">
      <AnimatePresence mode="wait">
        {!isTestComplete ? (
          <motion.div
            key="test"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-5xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
              <motion.h1 
                className="text-3xl font-bold text-orange-500"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                KeynovaX
              </motion.h1>
              
              <div className="flex gap-2">
                {[15, 30, 60].map((time) => (
                  <button
                    key={time}
                    onClick={() => handleChangeDuration(time as TestDuration)}
                    disabled={isTestActive}
                    className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                      duration === time
                        ? 'bg-orange-500 text-gray-900 font-semibold'
                        : 'bg-[#2d2415] text-gray-400 hover:bg-[#3d3520] hover:text-gray-200'
                    } ${isTestActive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {time}s
                  </button>
                ))}
              </div>
            </div>

            {/* Timer */}
            <motion.div
              className={`text-6xl font-bold text-center mb-12 ${getTimerColor()} transition-colors duration-300`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: timeLeft <= 5 ? [1, 1.05, 1] : 1, 
                opacity: 1 
              }}
              transition={{ 
                scale: { repeat: timeLeft <= 5 ? Infinity : 0, duration: 0.5 } 
              }}
              key={timeLeft}
            >
              {timeLeft}
            </motion.div>

            {/* Typing Area */}
            <div className="bg-[#2d2415] rounded-3xl p-8 sm:p-12 mb-6 shadow-2xl border border-orange-900/20">
              <div className="text-2xl sm:text-3xl leading-relaxed flex flex-wrap gap-3 font-mono select-none">
                {words.slice(0, 50).map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    className={`transition-all duration-200 ${
                      wordIndex === currentWordIndex 
                        ? 'opacity-100' 
                        : wordIndex < currentWordIndex 
                        ? 'opacity-30' 
                        : 'opacity-50'
                    }`}
                  >
                    {word.split('').map((char, charIndex) => {
                      const state = charStates[wordIndex]?.[charIndex] || 'pending';
                      return (
                        <span
                          key={charIndex}
                          className={`transition-colors duration-100 ${
                            wordIndex === currentWordIndex && charIndex === currentInput.length
                              ? 'border-l-2 border-orange-500 animate-pulse'
                              : ''
                          } ${
                            state === 'correct'
                              ? 'text-orange-400'
                              : state === 'incorrect'
                              ? 'text-red-400 bg-red-400/10 rounded px-0.5'
                              : 'text-gray-500'
                          }`}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </span>
                ))}
              </div>
            </div>

            {/* Hidden Input */}
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={handleInputChange}
              disabled={isTestComplete}
              className="w-full bg-transparent border-none outline-none text-transparent caret-transparent absolute opacity-0"
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />

            {!isTestActive && (
              <motion.p
                className="text-center text-gray-500 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Click anywhere and start typing to begin the test...
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-3xl"
          >
            <div className="bg-[#2d2415] rounded-3xl p-10 sm:p-14 shadow-2xl border border-orange-900/20">
              <h2 className="text-4xl font-bold text-center mb-10 text-orange-500">
                Test Results
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <motion.div
                  className="bg-[#1e1810] rounded-2xl p-8 text-center border border-orange-900/30 hover:border-orange-700/50 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="text-6xl font-bold text-orange-500 mb-3">
                    {stats?.wpm || 0}
                  </div>
                  <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">Words Per Minute</div>
                </motion.div>

                <motion.div
                  className="bg-[#1e1810] rounded-2xl p-8 text-center border border-emerald-900/30 hover:border-emerald-700/50 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-6xl font-bold text-emerald-400 mb-3">
                    {stats?.accuracy || 0}%
                  </div>
                  <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">Accuracy</div>
                </motion.div>

                <motion.div
                  className="bg-[#1e1810] rounded-2xl p-6 text-center border border-emerald-900/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-4xl font-bold text-emerald-400 mb-2">{stats?.correctChars || 0}</div>
                  <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">Correct</div>
                </motion.div>

                <motion.div
                  className="bg-[#1e1810] rounded-2xl p-6 text-center border border-red-900/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-4xl font-bold text-red-400 mb-2">{stats?.incorrectChars || 0}</div>
                  <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">Incorrect</div>
                </motion.div>
              </div>

              <motion.button
                onClick={resetTest}
                className="w-full bg-orange-500 text-gray-900 font-semibold py-4 rounded-xl hover:bg-orange-400 transition-all shadow-lg hover:shadow-orange-500/50 transform hover:scale-[1.02]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Try Again
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
