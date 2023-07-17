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

		const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
			background.resize(gl, entries[0]);
		});
		resizeObserver.observe(canvas);

		background.init(gl);

		let frame;

		const animate = () => {
			background.animate(gl);
			frame = requestAnimationFrame(animate);
		};

		frame = requestAnimationFrame(animate);

		return () => {
			background.clear();
			cancelAnimationFrame(frame);
			resizeObserver.unobserve(canvas);
		};
	});
</script>

<canvas bind:this={canvas} />

<style>
	canvas {
		height: 70vh;
		width: 100vw;
	}
</style>
