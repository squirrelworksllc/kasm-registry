/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
"./pages/**/*.{js,jsx,ts,tsx}",
"./components/**/*.{js,jsx,ts,tsx}",
"./app/**/*.{js,jsx,ts,tsx}",
],
theme: {
extend: {
colors: {
// Neutral brand palette for a grayscale look
brand: {
50: '#f9fafb',
100: '#f3f4f6',
200: '#e5e7eb',
300: '#d1d5db',
400: '#9ca3af',
500: '#6b7280',
600: '#4b5563',
700: '#374151',
800: '#1f2937',
900: '#111827',
},
},
},
},
plugins: [],
};