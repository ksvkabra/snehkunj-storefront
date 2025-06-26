import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'holicraft': {
          cream: '#F8F0E6',
          terracotta: '#A04A2A',
          'terracotta-hover': '#8A3F24',
          golden: '#D29922',
          black: '#000000',
          white: '#FFFFFF',
          'gray-light': '#F5F5F5',
          'gray-medium': '#E5E5E5',
          'gray-dark': '#666666',
          mustard: '#D29922',
          hover: '#8A3F24',
          brown: '#A04A2A',
          charcoal: '#333333',
          beige: '#F8F0E6',
        },
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
      spacing: {
        'header-desktop': '80px',
        'header-desktop-scrolled': '64px',
        'header-mobile': '64px',
      },
      maxWidth: {
        'content': '1440px',
      },
      padding: {
        'section-desktop': '64px',
        'section-mobile': '24px',
      },
      transitionDuration: {
        'smooth': '0.3s',
        'bounce': '0.4s',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
  ],
};

export default config; 