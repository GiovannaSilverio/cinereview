import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pipoca': "url('/img/hero.jpg')",
      },
      colors:{
        gray:"#1D1D1D",
        lightgray:"#B5B5B5",
        red:"#CC1914",
        redhover:"#A41A16",
        yellow:"#FCBD00",
      },
      fontFamily: {
        heavitas: ['Heavitas'],
        jura: ['Jura']
      },
    },
  },
  plugins: [],
};
export default config;
