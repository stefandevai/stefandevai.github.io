<script lang="ts">
	import { onMount } from 'svelte';
	import { animateBackground } from '$lib/background';

	let canvas;

	onMount(() => {
		const gl = canvas.getContext('webgl');

		if (gl === null) {
			console.error('Unable to initialize WebGL. Your browser or machine may not support it.');
			return;
		}

		animateBackground(gl);
	});
</script>

<canvas bind:this={canvas} />

<style>
	canvas {
		background-color: #111;
		height: 70vh;
		width: 100vw;
	}
</style>
