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
    <div className="rounded-3xl p-8 sm:p-12 mb-6 shadow-2xl border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--color-accent)' + '33' }}>
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
              let charStyle = {};
              let charClass = 'transition-colors duration-100 ';
              
              if (wordIndex === currentWordIndex && charIndex === currentInput.length) {
                charClass += 'border-l-2 animate-pulse ';
                charStyle = { borderColor: 'var(--color-accent)' };
              }
              
              if (state === 'correct') {
                charStyle = { ...charStyle, color: 'var(--color-correct)' };
              } else if (state === 'incorrect') {
                charStyle = { ...charStyle, color: 'var(--color-incorrect)' };
                charClass += 'rounded px-0.5 ';
              } else {
                charStyle = { ...charStyle, color: 'var(--text-secondary)' };
              }
              
              return (
                <span
                  key={charIndex}
                  className={charClass}
                  style={charStyle}
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
