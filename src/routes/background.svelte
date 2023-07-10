<script lang="ts">
	/* import { onMount } from 'svelte'; */
	/* import * as background from './background'; */

	let canvas;

	/* onMount(() => { */
	/* 	const gl = canvas.getContext('webgl'); */

	/* 	if (gl === null) { */
	/* 		console.error('Unable to initialize WebGL. Your browser or machine may not support it.'); */
	/* 		return; */
	/* 	} */

	/* 	background.init(gl); */

	/* 	/1* const resizeObserver = new ResizeObserver(() => { *1/ */
	/* 	/1* 	background.resize(gl); *1/ */
	/* 	/1* }); *1/ */
	/* 	/1* resizeObserver.observe(canvas); *1/ */

	/* 	let frame; */
	/* 	let previousTimeStamp = 0; */

	/* 	const animate = (timeStamp: number) => { */
	/* 		if (previousTimeStamp !== timeStamp) { */
	/* 			const delta = timeStamp - previousTimeStamp; */
	/* 			background.animate(gl, delta); */
	/* 		} */

	/* 		previousTimeStamp = timeStamp; */
	/* 		frame = requestAnimationFrame(animate); */
	/* 	}; */

	/* 	frame = requestAnimationFrame(animate); */

	/* 	return () => { */
	/* 		background.clear(); */
	/* 		cancelAnimationFrame(frame); */
	/* 		/1* resizeObserver.unobserve(canvas); *1/ */
	/* 	}; */
	/* }); */
</script>

<canvas bind:this={canvas} />

<style>
	canvas {
		background-color: #111;
		height: 70vh;
		width: 100vw;
	}
</style>
