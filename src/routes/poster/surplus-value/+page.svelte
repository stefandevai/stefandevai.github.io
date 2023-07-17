<script lang="ts">
	import { onMount } from 'svelte';
	import { title } from '$lib/config';
	import * as surplusValue from './surplus-value';

	let canvas;

	onMount(() => {
		const gl = canvas.getContext('webgl');

		if (gl === null) {
			console.error('Unable to initialize WebGL. Your browser or machine may not support it.');
			return;
		}

		const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
			surplusValue.resize(gl, entries[0]);
		});
		resizeObserver.observe(canvas);

		surplusValue.init(gl);

		let frame;

		const animate = () => {
			surplusValue.animate(gl);
			frame = requestAnimationFrame(animate);
		};

		frame = requestAnimationFrame(animate);

		return () => {
			surplusValue.clear();
			cancelAnimationFrame(frame);
			resizeObserver.unobserve(canvas);
		};
	});
</script>

<svelte:head>
	<title>Surplus Value | {title}</title>
</svelte:head>

<main>
	<div class="full-border">
		<div class="grid-wrap">
			<div class="grid">
				<span class="mcm">M—C—M</span>
				<h1>Surplus<br />Value</h1>
				<p>
					The value of labour-power, and the value which that labour-power creates in the
					labour-process, are two entirely different magnitudes; and this difference of the two
					values was what the capitalist had in view, when he was purchasing the labour-power. The
					useful qualities that labour-power possesses, and by virtue of which it makes yarn or
					boots, were to him nothing more than a conditio sine qua non; for in order to create
					value, labour must be expended in a useful manner. What really influenced him was the
					specific use-value which this commodity possesses of being
					<em> a source not only of value, but of more value than it has itself </em>
					.
					<span class="bottom-decoration">• • •</span>
				</p>
				<div class="kapital-wrap">
					<div class="kapital">
						<div class="line" />
						<div class="text">01 · KARL MARX · DAS KAPITAL · MDCCCLXVII</div>
					</div>
				</div>
			</div>
		</div>
		<canvas bind:this={canvas} />
	</div>
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
		--grid-outer-padding: 1.4rem;
		--color-text: #243040;
		--font-family-heading: 'Old London', sans-serif;

		color: var(--color-text);
		overflow: hidden;
		width: 100vw;
		height: 100vh;
		font-family: 'EB Garamond';
		font-weight: 400;
	}

	canvas {
		background-color: #d9d2ca;
		position: absolute;
		top: 0;
		left: 0;
		width: calc(100vw - var(--border-width) * 2);
		height: calc(100vh - var(--border-width) * 2);
		z-index: -1;
		box-sizing: border-box;
		margin-left: var(--border-width);
		margin-top: var(--border-width);
	}

	.full-border {
		position: relative;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: var(--border-width);
		z-index: -2;
		background: linear-gradient(to right, #44aecf, #3478d1);
	}

	.grid-wrap {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: var(--grid-outer-padding);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: repeat(16, 1fr);
		width: 100%;
		height: 100%;
	}

	span.mcm {
		font-size: 0.8rem;
		grid-column: 2 / span 1;
		grid-row: 2 / span 1;
		font-weight: 400;
		display: flex;
		align-items: flex-end;
		letter-spacing: 2px;
		margin-left: 3px;
		margin-bottom: 8px;
	}

	h1 {
		font-size: 6.8rem;
		grid-column: 2 / span 5;
		grid-row: 3 / span 5;
		margin: 0;
		font-weight: 400;
		line-height: 0.85;
		font-family: var(--font-family-heading);
		letter-spacing: 4px;
		margin-left: -3px;
	}

	p {
		font-size: 1rem;
		margin: 1rem 0 0 0;
		grid-column: 2 / span 4;
		grid-row: 8 / span 9;
		line-height: 1.5;
	}

	.kapital-wrap {
		grid-column: 12 / span 1;
		grid-row: 1 / -1;
		display: flex;
		justify-content: flex-end;
	}

	.kapital {
		height: 100%;
		font-size: 0.7rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.text {
		font-weight: 700;
		text-align: right;
		letter-spacing: 3px;
		writing-mode: vertical-rl;
	}

	.line {
		background-color: var(--color-text);
		width: 1px;
		height: 100%;
		flex: 1;
		margin-bottom: 20px;
	}

	p > .bottom-decoration {
		display: block;
		margin-top: 1rem;
	}
</style>
