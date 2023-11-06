import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import svgr from 'vite-plugin-svgr';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),
	plugins: [svgr()],

	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		files: {
			hooks:'src/hooks.server.ts',
		},
	},
};

export default config;
