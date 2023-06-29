<script lang="ts">
	import Header from './header.svelte';
	import Footer from './footer.svelte';

	import '$src/app.css';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="1" />
	<link
		href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,400;0,700;1,400;1,700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div>
	<Header />
	<slot />
	<Footer />
</div>
