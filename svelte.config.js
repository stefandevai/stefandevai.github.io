import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import remarkFootnotes from 'remark-footnotes';
import { importAssets } from 'svelte-preprocess-import-assets';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	remarkPlugins: [remarkFootnotes]
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions), importAssets()],
	kit: {
		adapter: adapter({ precompress: true }),
		alias: {
			'$src/*': 'src/*'
		}
	}
};

export default config;
