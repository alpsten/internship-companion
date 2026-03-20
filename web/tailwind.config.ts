import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        accent: '#1E3A8A',
        surface: '#E2E8F0',
        success: '#10B981',
        warning: '#F59E0B',
        info: '#6366F1',
        neutral: '#111827'
      },
      borderRadius: {
        xl: '1rem',
        '3xl': '1.75rem'
      },
      boxShadow: {
        card: '0 10px 22px -18px rgba(15, 23, 42, 0.14)',
        elevated: '0 14px 32px -24px rgba(30, 58, 138, 0.22)'
      },
      spacing: {
        18: '4.5rem'
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      transitionTimingFunction: {
        'in-out-soft': 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
  },
  plugins: []
};

export default config;
