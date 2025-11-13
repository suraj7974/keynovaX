import { motion } from 'framer-motion';
import { useTheme, themes, type ThemeName } from '../contexts/ThemeContext';

export const ThemeSelector = () => {
  const { currentTheme, setTheme } = useTheme();

  const handleThemeClick = (e: React.MouseEvent, themeName: ThemeName) => {
    e.preventDefault();
    e.stopPropagation();
    setTheme(themeName);
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-row gap-2">
      {Object.values(themes).map((theme) => (
        <motion.button
          key={theme.name}
          onMouseDown={(e) => {
            e.preventDefault();
            handleThemeClick(e, theme.name as ThemeName);
          }}
          className={`relative group w-20 h-12 rounded-lg transition-all overflow-hidden ${
            currentTheme.name === theme.name
              ? 'scale-105'
              : 'hover:scale-105 opacity-80'
          }`}
          style={{
            backgroundColor: theme.colors.cardBg,
            border: 'none',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={theme.displayName}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-[10px] font-bold tracking-tight"
              style={{
                color: theme.colors.text,
              }}
            >
              {theme.displayName}
            </span>
          </div>
        </motion.button>
      ))}
    </div>
  );
};
