<script lang="ts">
	import { onMount } from 'svelte';
	import * as background from './background';

	let canvas;

	onMount(() => {
		const gl = canvas.getContext('webgl');

		if (gl === null) {
			console.error('Unable to initialize WebGL. Your browser or machine may not support it.');
			return;
		}

		background.init(gl);

		/* const resizeObserver = new ResizeObserver(() => { */
		/* 	background.resize(gl); */
		/* }); */
		/* resizeObserver.observe(canvas); */

		let frame;
		let previousTimeStamp = 0;

		const animate = (timeStamp: number) => {
			if (previousTimeStamp !== timeStamp) {
				const delta = timeStamp - previousTimeStamp;
				background.animate(gl, delta);
			}

			previousTimeStamp = timeStamp;
			frame = requestAnimationFrame(animate);
		};

		frame = requestAnimationFrame(animate);

		return () => {
			background.clear();
			cancelAnimationFrame(frame);
			/* resizeObserver.unobserve(canvas); */
		};
	});
</script>

<canvas bind:this={canvas} />

<style>
	canvas {
		background-color: #111;
		height: calc(70vh + var(--nav-height));
		width: 100vw;
	}
</style>
