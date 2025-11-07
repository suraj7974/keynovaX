import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Header } from './Header';
import { Timer } from './Timer';
import { TypingArea } from './TypingArea';
import { generateWords } from '../utils/wordGenerator';
import type { TestDuration, Stats, CharState } from '../utils/types';

interface TypingTestProps {
  onComplete: (stats: Stats) => void;
}

export const TypingTest = ({ onComplete }: TypingTestProps) => {
  const [duration, setDuration] = useState<TestDuration>(30);
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const [isTestActive, setIsTestActive] = useState(false);
  const [charStates, setCharStates] = useState<CharState[][]>([]);
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
    setCharStates(newWords.map(word => Array(word.length).fill('pending')));
    inputRef.current?.focus();
  };

  const startTest = () => {
    if (!isTestActive) {
      setIsTestActive(true);
    }
  };

  const endTest = () => {
    setIsTestActive(false);
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

    const stats = {
      wpm,
      accuracy: Math.round(accuracy),
      correctChars,
      incorrectChars,
    };

    onComplete(stats);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isTestActive) {
      startTest();
    }

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

  return (
    <motion.div
      key="test"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-5xl"
    >
      <Header 
        duration={duration} 
        isTestActive={isTestActive} 
        onDurationChange={handleChangeDuration} 
      />
      
      <Timer timeLeft={timeLeft} />

      <TypingArea 
        words={words}
        currentWordIndex={currentWordIndex}
        currentInput={currentInput}
        charStates={charStates}
      />

      <input
        ref={inputRef}
        type="text"
        value={currentInput}
        onChange={handleInputChange}
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
  );
};
