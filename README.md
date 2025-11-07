# KeynovaX - Minimal Typing Test

A clean and minimal typing test web app inspired by Monkeytype. Built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

✨ **Simple & Clean UI** - Minimal dark theme with smooth animations  
⏱️ **Multiple Test Durations** - Choose between 15s, 30s, or 60s  
📊 **Real-time Feedback** - Green for correct, red for incorrect characters  
📈 **Detailed Statistics** - WPM, accuracy, and character counts  
🎯 **No Distractions** - No login, no database, just type!  
📱 **Mobile Friendly** - Responsive design works on all devices  

## Tech Stack

- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for smooth animations
- **Vite** for blazing fast development

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## How to Use

1. Open the app and select your preferred test duration (15s, 30s, or 60s)
2. Start typing - the timer begins automatically with your first keystroke
3. Type the words as they appear - correct letters turn green, incorrect turn red
4. Press space to move to the next word
5. When time runs out, view your results: WPM, accuracy, and character counts
6. Click "Try Again" to restart with a new set of words

## Features Explained

- **Word Generation**: Random selection from 300+ common English words (lowercase only)
- **Real-time Validation**: Instant feedback on each character typed
- **Accurate WPM Calculation**: Based on correct characters divided by 5 (standard word length)
- **Clean Statistics**: Clear breakdown of performance metrics

## License

MIT

## Acknowledgments

Inspired by [Monkeytype](https://monkeytype.com/) - the best typing test on the web!
