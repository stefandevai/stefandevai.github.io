<script lang="ts">
	import { onMount } from 'svelte';
	import Background from './background.svelte';

	let mounted = false;
	onMount(() => (mounted = true));
</script>

<header>
	{#if mounted}
		<div class="text">
			<h1>
				<span class="brand-diamond">◆</span>Temporal Geometry<span class="brand-diamond">◆</span>
			</h1>
			<p>Stefan Devai's blog about History and programming.</p>
		</div>
	{/if}
	<Background />
</header>

<style>
	header {
		position: relative;
	}

	.brand-diamond {
		font-size: var(--font-size-medium);
		font-weight: 600;
		color: var(--color-red);
	}

	.text {
		position: absolute;
		color: #fff;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		text-align: center;
	}

	p {
		margin: 0;
		font-size: 1.2rem;
		animation: fadein 500ms;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
	}

	h1 {
		font-size: 4rem;
		margin: 0 0 1.2rem 0;
		animation: fadein 500ms;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
	}

	@keyframes fadein {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
