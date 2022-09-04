import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const config = defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 3000
	},
	preview: {
		port: 3000
	}
});

export default config;
