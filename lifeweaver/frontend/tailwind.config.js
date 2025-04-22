/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Lora", "serif"],
      },
      colors: {
        primary: {
          50: "#f5f7ff",
          100: "#edf0ff",
          200: "#dee5ff",
          300: "#c6d1ff",
          400: "#a4b4fe",
          500: "#8393fd",
          600: "#5f6cf9",
          700: "#4a57e8",
          800: "#3e47c9",
          900: "#3840a0",
        },
        secondary: {
          50: "#f5fcff",
          100: "#e6f7fe",
          200: "#c7ebfb",
          300: "#a0dbf8",
          400: "#76c6f3",
          500: "#55b0ea",
          600: "#3d94d0",
          700: "#3278aa",
          800: "#2c5c82",
          900: "#274b68",
        },
      },
      boxShadow: {
        glass: "0 4px 30px rgba(0, 0, 0, 0.1)",
        card: "0 10px 30px -5px rgba(0, 0, 0, 0.05)",
        'card-hover': "0 15px 35px -5px rgba(0, 0, 0, 0.1)",
        'card-dark': "0 10px 30px -5px rgba(0, 0, 0, 0.2)",
        'card-dark-hover': "0 15px 35px -5px rgba(0, 0, 0, 0.3)",
        'button': "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        'button-hover': "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        card: "16px",
        'button': "12px",
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.primary.600'),
              '&:hover': {
                color: theme('colors.primary.700'),
              },
            },
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.gray.900'),
              fontWeight: '600',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.200'),
            a: {
              color: theme('colors.primary.400'),
              '&:hover': {
                color: theme('colors.primary.300'),
              },
            },
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}; 