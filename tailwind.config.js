/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            extend: {
                spacing: {
                    '128': '32rem',
                }
            }
        },
    },
    plugins: [],
}

