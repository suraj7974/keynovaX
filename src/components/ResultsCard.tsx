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
      className="w-full max-w-3xl relative z-10"
    >
      <div className="rounded-3xl p-10 sm:p-14 shadow-2xl border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--color-accent)' + '33' }}>
        <h2 className="text-4xl font-bold text-center mb-10" style={{ color: 'var(--color-accent)' }}>
          Test Results
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <motion.div
            className="rounded-2xl p-8 text-center border transition-all"
            style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--color-accent)' + '4D' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-6xl font-bold mb-3" style={{ color: 'var(--color-accent)' }}>
              {stats?.wpm || 0}
            </div>
            <div className="text-sm font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Words Per Minute</div>
          </motion.div>

          <motion.div
            className="rounded-2xl p-8 text-center border transition-all"
            style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--color-correct)' + '4D' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-6xl font-bold mb-3" style={{ color: 'var(--color-correct)' }}>
              {stats?.accuracy || 0}%
            </div>
            <div className="text-sm font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Accuracy</div>
          </motion.div>

          <motion.div
            className="rounded-2xl p-6 text-center border"
            style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--color-correct)' + '33' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-4xl font-bold mb-2" style={{ color: 'var(--color-correct)' }}>{stats?.correctChars || 0}</div>
            <div className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Correct</div>
          </motion.div>

          <motion.div
            className="rounded-2xl p-6 text-center border"
            style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--color-incorrect)' + '33' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-4xl font-bold mb-2" style={{ color: 'var(--color-incorrect)' }}>{stats?.incorrectChars || 0}</div>
            <div className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Incorrect</div>
          </motion.div>
        </div>

        <motion.button
          onClick={onReset}
          className="w-full font-semibold py-4 rounded-xl transition-all shadow-lg transform"
          style={{ backgroundColor: 'var(--color-accent)', color: 'var(--bg-primary)' }}
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
