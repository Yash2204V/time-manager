import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        // adapter-static ko 'index.html' fallback ke sath use karo (For SPA)
        adapter: adapter({
            fallback: 'index.html' 
        }),
        output: {
            // Capacitor ka local server HTTP/1 use karta hai, isliye concurrent 
            // connections ki limit se bachne ke liye bundle strategy 'single' karte hain [1]
            bundleStrategy: 'single'
        }
    }
};

export default config;
