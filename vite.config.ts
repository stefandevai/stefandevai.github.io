import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { importAssets } from 'svelte-preprocess-import-assets'

export default defineConfig({
	plugins: [sveltekit({ preprocess: [importAssets()] })]
});
