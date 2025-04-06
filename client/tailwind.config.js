/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Светлая тема
        light: {
          background: '#ffffff',
          secondary: '#f9fafb',
          text: '#111827',
          textSecondary: '#4b5563',
          accent: '#4338ca',
          border: '#e5e7eb',
        },
        // Темная тема
        dark: {
          background: '#1f2937',
          secondary: '#111827',
          text: '#f9fafb',
          textSecondary: '#9ca3af',
          accent: '#818CF8',
          border: '#374151',
        },
        // Badges
        badge: {
          admin: '#ef4444',
          core: '#3b82f6',
          member: '#10b981',
          premium: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              color: 'var(--tw-prose-links)',
              '&:hover': {
                color: 'var(--tw-prose-links-hover)',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 