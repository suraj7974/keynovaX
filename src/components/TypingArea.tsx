import type { CharState } from '../utils/types';

interface TypingAreaProps {
  words: string[];
  currentWordIndex: number;
  currentInput: string;
  charStates: CharState[][];
}

export const TypingArea = ({ 
  words, 
  currentWordIndex, 
  currentInput, 
  charStates 
}: TypingAreaProps) => {
  return (
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
  );
};
