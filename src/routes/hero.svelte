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
		display: flex;
		align-items: center;
		flex-direction: column;
		margin-top: 20vh;
		text-align: center;
	}

	.text > p {
		margin: 0;
		font-size: 1.2rem;
	}

	.text > h1 {
		font-size: 4rem;
		margin: 0 0 1.2rem 0;
	}
</style>
