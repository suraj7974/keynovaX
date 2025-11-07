import { motion } from 'framer-motion';
import type { Stats } from '../utils/types';

interface ResultsCardProps {
  stats: Stats | null;
  onReset: () => void;
}

export const ResultsCard = ({ stats, onReset }: ResultsCardProps) => {
  return (
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
          onClick={onReset}
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
  );
};
