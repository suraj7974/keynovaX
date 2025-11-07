import { motion } from 'framer-motion';

interface TimerProps {
  timeLeft: number;
}

export const Timer = ({ timeLeft }: TimerProps) => {
  const getTimerColor = () => {
    if (timeLeft <= 5) return 'text-red-500';
    if (timeLeft <= 10) return 'text-orange-400';
    return 'text-orange-500';
  };

  return (
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
  );
};
