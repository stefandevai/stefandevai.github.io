<script lang="ts">
	import { title } from '$lib/config';
	import MarxismLayout from '../marxism.layout.svelte';
	import fragmentShaderSource from './shader.fs';
	import vertexShaderSource from './shader.vs';
</script>

<svelte:head>
	<title>Class Struggle | {title}</title>
</svelte:head>

<MarxismLayout
	{vertexShaderSource}
	{fragmentShaderSource}
	borderStyle="background: linear-gradient(to right, #cf3047, #b0305a);"
>
	<h1>Class<br />Struggle</h1>
	<p>
		The history of all hitherto existing society is the history of class struggles. Freeman and
		slave, patrician and plebeian, lord and serf, guild-master and journeyman, in a word, oppressor
		and oppressed, stood in constant opposition to one another, carried on an uninterrupted, now
		hidden, now open fight, a fight that each time ended, either in a revolutionary reconstitution
		of society at large, or in the common ruin of the contending classes.
		<span class="bottom-decoration">• • •</span>
	</p>
	<div class="kapital-wrap">
		<div class="kapital">
			<div class="line" />
			<div class="text">1/3 · K. MARX, F. ENGELS · THE COMMUNIST MANIFESTO</div>
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
