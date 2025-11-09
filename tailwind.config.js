/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    // TAMBAHKAN BLOK INI
    safelist: [
        'animate-scroll',
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
            keyframes: {
                'fade-in-up': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(20px)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
                // INI YANG HARUS ADA DAN TIDAK BOLEH HILANG
                scroll: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
            },
            animation: {
                'fade-in-up': 'fade-in-up 1s ease-out forwards',
                // DAN INI JUGA HARUS ADA DAN TIDAK BOLEH HILANG
                scroll: 'scroll 40s linear infinite',
            },
        },
    },
    plugins: [],
}