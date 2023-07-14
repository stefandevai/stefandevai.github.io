<script lang="ts">
	import { onMount } from 'svelte';
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

<main>
	<div class="grid">
		<h1>Surplus<br />Value</h1>
		<span class="mcm">M—C—M</span>
		<p>
			<span class="kapital">DAS KAPITAL · MDCCCLXVII</span>
			<em>
				The value of labour-power, and the value which that labour-power creates in the
				labour-process, are two entirely different magnitudes; and this difference of the two values
				was what the capitalist had in view, when he was purchasing the labour-power. The useful
				qualities that labour-power possesses, and by virtue of which it makes yarn or boots, were
				to him nothing more than a conditio sine qua non; for in order to create value, labour must
				be expended in a useful manner. What really influenced him was the specific use-value which
				this commodity possesses of being a source not only of value, but of more value than it has
				itself.
			</em>
		</p>
	</div>
	<canvas bind:this={canvas} />
</main>

<style>
	main {
		color: #111;
		position: relative;
		overflow: scroll;
		width: 100vw;
		height: 100vh;
		font-family: 'EB Garamond';
		font-weight: 300;
	}

	canvas {
		background-color: #d9d2ca;
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -1;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: repeat(16, 1fr);
		width: calc(100vw - 2.8rem);
		height: calc(100vh - 2.8rem);
		margin: 1.4rem;
		margin: 1.4rem;
	}

	h1 {
		font-size: 6.8rem;
		grid-column: 2 / span 5;
		grid-row: 11 / span 5;
		margin: 0;
		font-weight: 400;
		line-height: 0.9;
		font-family: 'Coolvetica';
		letter-spacing: 4px;
	}

	span.mcm {
		font-size: 0.8rem;
		grid-column: 2 / span 1;
		grid-row: 10 / span 1;
		font-weight: 700;
		display: flex;
		align-items: flex-end;
		margin-left: 3px;
	}

	p {
		font-size: 1rem;
		margin: 0;
		grid-column: 6 / span 5;
		grid-row: 1 / span 9;
		line-height: 1.5;
	}

	span.kapital {
		font-size: 0.8rem;
		display: block;
		margin-bottom: 0.5rem;
		text-align: right;
	}
</style>
