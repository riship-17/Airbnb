/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Listing page tokens
        brand: '#FF385C',
        'brand-hover': '#E31C5F',
        'ink-primary': '#222222',
        'ink-secondary': '#717171',
        'ink-light': '#B0B0B0',
        'border-light': '#DDDDDD',
        'surface-gray': '#F7F7F7',
        // Stitch/homepage tokens
        'brand-coral': '#FF385C',
        'surface': '#fbf9f9',
        'on-surface': '#1b1c1c',
        'secondary': '#5e5e5e',
        'outline-variant': '#e5bdbe',
        'surface-container-low': '#f5f3f3',
        'surface-container-lowest': '#ffffff',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Nunito Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        gallery: '12px',
        card: '12px',
        btn: '8px',
      },
      boxShadow: {
        card: '0 6px 16px rgba(0,0,0,0.12)',
        'card-hover': '0 8px 28px rgba(0,0,0,0.18)',
        booking: 'rgba(0,0,0,0.12) 0px 6px 16px',
      },
    },
  },
  plugins: [],
}
