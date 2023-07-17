<script lang="ts">
	import { onMount } from 'svelte';
	import * as background from './background';

	export let vertexShaderSource: string;
	export let fragmentShaderSource: string;
	export let borderStyle: string;

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

		background.init(gl, vertexShaderSource, fragmentShaderSource);

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

<main style={borderStyle}>
	<div class="grid">
		<slot />
	</div>
	<canvas bind:this={canvas} />
</main>

<style>
	@font-face {
		font-family: 'EB Garamond';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: local('EB Garamond Regular'), local('EB-Garamond-Regular'),
			url('/fonts/eb-garamond-regular.woff2') format('woff2');
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
			U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}

	@font-face {
		font-family: 'EB Garamond';
		font-style: normal;
		font-weight: 700;
		font-display: swap;
		src: local('EB Garamond Bold'), local('EB-Garamond-Bold'),
			url('/fonts/eb-garamond-bold.woff2') format('woff2');
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
			U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}

	@font-face {
		font-family: 'EB Garamond';
		font-style: italic;
		font-weight: 400;
		font-display: swap;
		src: local('EB Garamond Italic'), local('EB-Garamond-Italic'),
			url('/fonts/eb-garamond-italic.woff2') format('woff2');
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
			U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}

	@font-face {
		font-family: 'Old London';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: local('Old London'), local('Old-London'), url('/fonts/old-london.woff2') format('woff2');
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
			U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}

	main {
		--border-width: 8px;
		--font-family-heading: 'Old London', sans-serif;

		color: #243040;
		overflow: hidden;
		width: 100vw;
		height: 100dvh;
		font-family: 'EB Garamond', serif;
		font-weight: 400;

		display: grid;
		grid-template-columns: var(--border-width) 1fr var(--border-width);
		grid-template-rows: var(--border-width) 1fr var(--border-width);
	}

	canvas {
		background-color: #d9d2ca;
		grid-column: 2 / 3;
		grid-row: 2 / 3;
		width: 100%;
		height: 100%;
	}

	.grid {
		grid-column: 2 / 3;
		grid-row: 2 / 3;

		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: repeat(16, 1fr);
		z-index: 1;
		margin: 1.4rem;
	}
</style>
