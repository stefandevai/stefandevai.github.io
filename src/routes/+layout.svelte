<script lang="ts">
	import Header from './header.svelte';
	import Footer from './footer.svelte';
	import '$src/app.css';
</script>

<svelte:head>
	<meta name="description" content="Stefan Devai's blog about History and programming." />
</svelte:head>

<div>
	<Header />
	<slot />
	<Footer />
</div>
