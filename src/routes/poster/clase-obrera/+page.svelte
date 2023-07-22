<script lang="ts">
	import { createParticleGenerator, updateParticleGenerator } from './particle-generator';
	import { onMount } from 'svelte';
	import { title } from '$lib/config';

	let canvas: HTMLCanvasElement;
	let chimney1: HTMLSpanElement;
	let chimney2: HTMLSpanElement;

	onMount(() => {
		const rect1 = chimney1.getBoundingClientRect();
		const generator1 = createParticleGenerator(rect1.left, rect1.top, 'NÓICULOVER');

		const rect2 = chimney2.getBoundingClientRect();
		const generator2 = createParticleGenerator(rect2.left, rect2.top, 'NÓICULOVER');

		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
		const context = canvas.getContext('2d');
		context.font = '30px EB Garamond';
		context.fillStyle = '#111111';
		context.save();

		/* context.translate(100, 100); */
		/* context.rotate(Math.PI / 2); */
		/* context.fillText('R', 0, 0); */

		let lastTime = 0;

		const animate = (currentTime: number) => {
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
	<div>
		<p>
			<span>si la</span><br />
			<span>clase</span><br />
			<span>obrera</span><br />
			<span bind:this={chimney1}>todo lo produce,</span><br />
		</p>

		<p>
			<span>a la</span><br />
			<span>clase</span><br />
			<span>obrera</span><br />
			<span bind:this={chimney2}>todo le pertenece.</span><br />
		</p>
	</div>
	<canvas bind:this={canvas} width="100vw" height="512px" />
</main>

<style>
	main {
		--color-white: #eee1cd;
		--color-red: #af3228;
		--color-black: #3b2123;
		--color-gray1: #423431;
		--color-gray2: #7b6a66;

		width: 100vw;
		height: 100vh;
		background-color: var(--color-red);
		display: grid;
		grid-template-columns: 4rem 1fr 4rem;
		grid-template-rows: 2rem 1fr 1fr 2rem;
		font-family: 'Helvetica', sans-serif;
		color: var(--color-white);
	}

	canvas {
		width: 100vw;
		height: 100vh;
		grid-column: 1 / -1;
		grid-row: 1 / -1;
	}

	div {
		writing-mode: vertical-rl;
		transform: rotate(-180deg);
		grid-column: 2 / span 1;
		grid-row: 3 / span 1;
	}

	p {
		font-size: 1.5rem;
		margin-left: 4rem;
	}
</style>
