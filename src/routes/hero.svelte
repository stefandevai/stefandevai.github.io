<script lang="ts">
	import Background from './background.svelte';
</script>

<header>
	<div class="background">
		<Background />
	</div>
	<div class="background-space" />
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
	}

	.brand-diamond {
		font-size: var(--font-size-medium);
		font-weight: 600;
		color: var(--color-red);
	}

	.text {
		position: absolute;
		top: 0;
		color: #fff;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		text-align: center;
	}

	.background {
		position: fixed;
		z-index: -1;
	}

	.background-space {
		height: calc(70vh + var(--nav-height));
		width: 100vw;
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
