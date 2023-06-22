<script lang="ts">
	import Header from './header.svelte';
	import Footer from './footer.svelte';

	import '$src/app.css';
	/* <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@100&display=swap" rel="stylesheet"> */
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Bitter:wght@100&family=Bodoni+Moda:ital,wght@0,400;0,700;1,400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="layout">
	<Header />

	<slot />

	<Footer />
</div>
