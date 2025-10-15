import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0EA5E9',
        accent: '#2563EB',
        surface: '#F8FAFC',
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
        card: '0 12px 24px -18px rgba(15, 23, 42, 0.25)',
        elevated: '0 16px 40px -24px rgba(37, 99, 235, 0.35)'
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
