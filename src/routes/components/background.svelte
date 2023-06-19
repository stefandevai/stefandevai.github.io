<script lang="ts">
	import { onMount } from 'svelte';

	let canvas;

	onMount(() => {
		const gl = canvas.getContext('webgl');

		if (!gl) {
			console.error('Unable to initialize WebGL. Your browser or machine may not support it.');
			return;
		}

		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
	});
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		background-color: black;
		height: 70vh;
		width: 100vw;
	}
</style>
