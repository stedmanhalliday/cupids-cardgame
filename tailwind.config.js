module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}', './public/index.html"],
    darkMode: false, // or "media' or 'class"
    theme: {
        extend: {},
        fontFamily: {
            "serif": ["Suranna", "Georgia", "ui-serif", "serif"],
        },
        boxShadow: {
            sm: '0 1px 2px 0 rgba(131, 24, 67, 0.05)',
            DEFAULT: '0 1px 3px 0 rgba(131, 24, 67, 0.1), 0 1px 2px 0 rgba(131, 24, 67, 0.06)',
            md: '0 4px 6px -1px rgba(131, 24, 67, 0.1), 0 2px 4px -1px rgba(131, 24, 67, 0.06)',
            lg: '0 10px 15px -3px rgba(131, 24, 67, 0.1), 0 4px 6px -2px rgba(131, 24, 67, 0.05)',
            xl: '0 20px 25px -5px rgba(131, 24, 67, 0.1), 0 10px 10px -5px rgba(131, 24, 67, 0.04)',
            '2xl': '0 25px 50px -12px rgba(131, 24, 67, 0.25)',
            inner: 'inset 0 2px 4px 0 rgba(131, 24, 67, 0.06)',
            none: 'none',
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
