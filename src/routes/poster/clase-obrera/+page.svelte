<script lang="ts">
	import { createParticleGenerator } from './particle-generator';
	import { onMount } from 'svelte';
	import { title } from '$lib/config';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const generator = createParticleGenerator(100, 100, 'REVOLUCIÓN');

		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
		const ctx = canvas.getContext('2d');
		ctx.font = '30px EB Garamond';
		ctx.save();

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillText('R', 100, 100);
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
			<span>si la</span>
			<span>clase</span>
			<span>obrera</span>
			<span>todo lo produce,</span>
		</p>

		<p>
			<span>a la</span>
			<span>clase</span>
			<span>obrera</span>
			<span>todo le pertenece.</span>
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

	span {
		display: block;
	}
</style>
