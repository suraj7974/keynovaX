import { motion } from 'framer-motion';
import type { TestDuration } from '../utils/types';

interface HeaderProps {
  duration: TestDuration;
  isTestActive: boolean;
  onDurationChange: (duration: TestDuration) => void;
}

export const Header = ({ duration, isTestActive, onDurationChange }: HeaderProps) => {
  return (
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
            onClick={() => onDurationChange(time as TestDuration)}
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
  );
};
