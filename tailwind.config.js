/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(109.6deg, rgb(0, 0, 0) 41.2%, rgb(11, 132, 145) 91.1%)',
        'custom-gradient-reverse': 'linear-gradient(280.6deg, rgb(0, 0, 0) 41.2%, rgb(11, 132, 145) 91.1%);',
      },
    },
  },
  plugins: [],
}

