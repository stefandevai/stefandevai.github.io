<script lang="ts">
	import { title } from '$lib/config';
	import MarxismLayout from '../marxism.layout.svelte';
	import fragmentShaderSource from './main.fs';
	import vertexShaderSource from './main.vs';
</script>

<svelte:head>
	<title>Surplus Value | {title}</title>
</svelte:head>

<MarxismLayout {vertexShaderSource} {fragmentShaderSource}>
	<span class="mcm">M—C—M</span>
	<h1>Surplus<br />Value</h1>
	<p>
		The value of labour-power, and the value which that labour-power creates in the labour-process,
		are two entirely different magnitudes; and this difference of the two values was what the
		capitalist had in view, when he was purchasing the labour-power. The useful qualities that
		labour-power possesses, and by virtue of which it makes yarn or boots, were to him nothing more
		than a conditio sine qua non; for in order to create value, labour must be expended in a useful
		manner. What really influenced him was the specific use-value which this commodity possesses of
		being
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
</MarxismLayout>

<style>
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

	.bottom-decoration {
		display: block;
		margin-top: 1rem;
	}
</style>
