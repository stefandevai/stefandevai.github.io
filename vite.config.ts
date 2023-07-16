import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import glslify from 'rollup-plugin-glslify';

export default defineConfig({
	plugins: [imagetools(), glslify(), sveltekit()],
});
