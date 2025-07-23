/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
            animation: {
          "fade-in-up": "fadeInUp 1s ease-out",
          "pulse-glow": "pulseGlow 1.5s ease-in-out infinite",
          "grow": "grow 0.5s ease-out",
          'bounce-slow': 'bounce 3s infinite',
        },
        keyframes: {
          fadeInUp: {
            "0%": { opacity: 0, transform: "translateY(20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
          pulseGlow: {
            "0%, 100%": { opacity: 0.6 },
            "50%": { opacity: 1 },
          },
          grow: {
            "0%": { transform: "scale(0.9)", opacity: 0 },
            "100%": { transform: "scale(1)", opacity: 1 },
          },
        },
    },
  },
  plugins: [],
}