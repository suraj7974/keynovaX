import { motion } from 'framer-motion';

interface TimerProps {
  timeLeft: number;
}

export const Timer = ({ timeLeft }: TimerProps) => {
  const getTimerStyle = () => {
    if (timeLeft <= 5) return { color: 'var(--color-incorrect)' };
    if (timeLeft <= 10) return { color: 'var(--color-accent)' };
    return { color: 'var(--color-accent)' };
  };

  return (
    <motion.div
      className="text-6xl font-bold text-center mb-12 transition-colors duration-300"
      style={getTimerStyle()}
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
  );
};
