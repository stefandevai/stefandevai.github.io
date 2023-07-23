<script lang="ts">
	import {
		createParticleGenerator,
		initParticleGenerator,
		updateParticleGenerator,
	} from './particle-generator';
	import { onMount } from 'svelte';
	import { title } from '$lib/config';

	let canvas: HTMLCanvasElement;
	let chimney1: HTMLSpanElement;
	let chimney2: HTMLSpanElement;

	onMount(() => {
		const rect1 = chimney1.getBoundingClientRect();
		const generator1 = createParticleGenerator(rect1.left - 5, rect1.top - 5, 'NÓICULOVER');
		initParticleGenerator(generator1);

		const rect2 = chimney2.getBoundingClientRect();
		const generator2 = createParticleGenerator(rect2.left - 5, rect2.top - 5, 'NÓICULOVER');
		initParticleGenerator(generator2);

		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
		const context = canvas.getContext('2d');
		context.font = '1.8rem Mulish';
		context.fillStyle = '#3b2123';
		context.save();

		let lastTime = 0;

		const animate = (currentTime: number) => {
			if (lastTime === 0) {
				lastTime = currentTime;
			}
			const delta = currentTime - lastTime;
			lastTime = currentTime;

			context.clearRect(0, 0, canvas.width, canvas.height);
			updateParticleGenerator(generator1, context, delta);
			updateParticleGenerator(generator2, context, delta);

			window.requestAnimationFrame(animate);
		};

		const frame = window.requestAnimationFrame(animate);

		return () => {
			window.cancelAnimationFrame(frame);
		};
	});
</script>

<svelte:head>
	<title>Clase Obrera | {title}</title>
</svelte:head>

<main>
	<div class="text-wrap">
		<p>
			si la<br />
			clase<br />
			obrera<br />
			<span bind:this={chimney1}>todo lo produce,</span>
		</p>

		<p>
			a la<br />
			clase<br />
			obrera<br />
			<span bind:this={chimney2}>todo le pertenece.</span>
		</p>
	</div>
	<div class="sun-wrap">
		<div class="sun" />
	</div>
	<div class="factory-floor-wrap">
		<div class="factory-floor" />
	</div>
	<canvas bind:this={canvas} />
</main>

<style>
	@font-face {
		font-family: 'Mulish', 'Helvetica', sans-serif;
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: local('Mulish Regular'), local('Mulish-Regular'),
			url('/fonts/mulish-regular.woff2') format('woff2');
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
			U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}

	main {
		/* --color-white: #eee1cd; */
		/* --color-red: #af3228; */
		/* --color-green: #db5c46; */
		/* --color-black: #1b1412; */

		/* --color-floor: var(--color-white); */
		/* --color-sun: var(--color-green); */
		/* --color-text: var(--color-white); */
		/* --color-background: var(--color-red); */

		--color-white: #eee1cd;
		--color-red: #af3228;
		--color-green: #608653;
		--color-black: #1b1412;

		--color-floor: var(--color-white);
		--color-sun: var(--color-black);
		--color-text: var(--color-white);
		--color-background: var(--color-red);

		--border-width: 3rem;
		--sun-size: 3rem;

		width: 100vw;
		height: 100vh;
		background-color: var(--color-background);
		font-family: 'Mulish', sans-serif;
		color: var(--color-text);

		display: grid;
		grid-template-columns: 2rem 1fr 1fr 1fr 2rem;
		grid-template-rows: 1fr 1fr 1fr;
	}

	canvas {
		grid-column: 1 / -1;
		grid-row: 1 / -1;
		width: 100%;
		height: 100%;
	}

	.text-wrap {
		margin-bottom: calc(var(--sun-size) / 2 - 3px);
		writing-mode: vertical-rl;
		transform: rotate(-180deg);
		grid-column: 2 / span 1;
		grid-row: 2 / span 2;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-start;
		letter-spacing: 1px;
	}

	p {
		margin: 0;
		font-size: 1.8rem;
		line-height: 2rem;
	}

	p:first-child {
		margin-left: 4rem;
	}

	.sun-wrap {
		grid-column: 3 / span 2;
		grid-row: 1 / span 2;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.sun {
		width: var(--sun-size);
		height: var(--sun-size);
		background-color: var(--color-sun);
		border-radius: 50%;
	}

	.factory-floor-wrap {
		grid-column: 1 / -1;
		grid-row: 3 / span 1;
		display: flex;
		align-items: flex-end;
	}

	.factory-floor {
		background-color: var(--color-floor);
		height: calc(var(--sun-size) / 2);
		width: 100%;
		border-top: calc(var(--sun-size) / 2) solid var(--color-sun);
	}
</style>
