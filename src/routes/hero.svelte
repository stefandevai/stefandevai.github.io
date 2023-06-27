<script lang="ts">
	import Background from './background.svelte';
</script>

<header>
	<div class="text">
		<h1>Temporal Geometry</h1>
		<p>Stefan Devai's blog about History and programming.</p>
	</div>
	<Background />
</header>

<style>
	header {
		position: relative;
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
	}

	h1 {
		font-size: 4rem;
		margin: 0 0 1.2rem 0;
	}
</style>
