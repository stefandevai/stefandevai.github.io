<script lang="ts">
	import OneLinePattern from '$lib/components/one-line-pattern.svelte';
	import Background from './background.svelte';
	import { setMousePosition } from './background';

	let header;

	const handleMouseMove = (event: MouseEvent) => {
		const rect = header.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = rect.bottom - event.clientY;
		setMousePosition(x, y);
	};
</script>

<OneLinePattern />
<header bind:this={header} on:mousemove={handleMouseMove} role="none">
	<Background />
	<div class="text">
		<h1>
			<span class="brand-diamond">◆</span>Temporal Geometry<span class="brand-diamond">◆</span>
		</h1>
		<p>Stefan Devai's blog about History and programming.</p>
	</div>
</header>

<style>
	header {
		position: relative;
		line-height: 0;
	}

	.brand-diamond {
		color: var(--color-red);
		font-size: var(--font-size-medium);
		font-weight: 600;
	}

	.text {
		position: absolute;
		top: 0;
		color: var(--color-white);
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		text-align: center;
		z-index: 2;
	}

	p {
		margin: 0;
		font-size: 1.2rem;
	}

	h1 {
		font-size: 4rem;
		margin: 0 0 1.2rem 0;
	}
</style>
