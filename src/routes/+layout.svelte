<script lang="ts">
	import Header from './components/header.svelte';
	import Footer from './components/footer.svelte';

	import '$src/app.css';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
</svelte:head>

<div class="layout">
	<Header />

	<slot />

	<Footer />
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Bodoni Moda', serif;
	}
</style>
