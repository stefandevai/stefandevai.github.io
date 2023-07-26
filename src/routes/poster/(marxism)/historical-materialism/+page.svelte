<script lang="ts">
	import { title } from '$lib/config';
	import MarxismLayout from '../marxism.layout.svelte';
	import fragmentShaderSource from './shader.fs';
	import vertexShaderSource from './shader.vs';
</script>

<svelte:head>
	<title>Historical Materialism | {title}</title>
</svelte:head>

<MarxismLayout
	{vertexShaderSource}
	{fragmentShaderSource}
	borderStyle="background: linear-gradient(to right, #21c26f, #0c7861);"
	enableDerivatives={true}
>
	<h1>Historical<br />Materialism</h1>
	<p>
		The materialist conception of history starts from the proposition that the production of the
		means to support human life and, next to production, the exchange of things produced, is the
		basis of all social structure; that in every society that has appeared in history, the manner in
		which wealth is distributed and society divided into classes or orders is dependent upon what is
		produced, how it is produced, and how the products are exchanged. From this point of view, the
		final causes of all social changes and political revolutions are to be sought, not in men's
		brains, not in men's better insights into eternal truth and justice, but in changes in the modes
		of production and exchange.
		<span class="bottom-decoration">• • •</span>
	</p>
	<div class="kapital-wrap">
		<div class="kapital">
			<div class="line" />
			<div class="text">2/3 · F. ENGELS · SOCIALISM: UTOPIAN AND SCIENTIFIC</div>
		</div>
	</div>
</MarxismLayout>

<style>
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
		text-wrap: balance;
	}

	@media (max-width: 450px) {
		h1 {
			font-size: 4.8rem;
			grid-column: 2 / span 5;
			grid-row: 2 / span 3;
		}
		p {
			grid-column: 2 / span 9;
			grid-row: 6 / span 9;
		}
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
