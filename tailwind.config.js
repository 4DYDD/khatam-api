/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // gagalin: ["Gagalin", "serif"], // 'Gagalin' adalah nama font yang Anda definisikan di @font-face
        capriola: ["Capriola", "sans-serif"], // 'Gagalin' adalah nama font yang Anda definisikan di @font-face
        montserrat: ["Montserrat", "sans-serif"], // 'Gagalin' adalah nama font yang Anda definisikan di @font-face
        rubik: ["Rubik", "sans-serif"], // 'Gagalin' adalah nama font yang Anda definisikan di @font-face
        inter: ["Inter", "sans-serif"], // 'Gagalin' adalah nama font yang Anda definisikan di @font-face
        // Anda bisa menambahkan font custom lainnya di sini
      },
      colors: {
        primary: "#4a7bb3", // Contoh warna primer
        biru: {
          // Nama warna custom Anda
          50: "#e6f2ff", // Biru Muda Sekali
          100: "#cce5ff", // Biru Muda
          200: "#b2d8ff", // Biru Langit
          300: "#99c2ff", // Biru Cerah
          400: "#80aaff", // Biru Sedang
          500: "#6699cc", // Biru Gelap
          600: "#4d79a6", // Biru Tua
          700: "#335c80", // Biru Gelap Sekali
          800: "#1a3959", // Biru Malam
          900: "#001933", // Biru Sangat Gelap
        },
        // secondary: "#7dd3fc", // Contoh warna sekunder
        secondary: "#cce5ff", // Contoh warna sekunder
        light: "#ffffff", // Contoh warna cerah
      },
    },
  },
  plugins: [],
};
