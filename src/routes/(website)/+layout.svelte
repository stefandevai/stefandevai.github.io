<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import '$src/app.css';
</script>

<div>
	<Header />
	<slot />
	<Footer />
</div>

<style>
	:global(main) {
		margin-top: 2rem;
	}
</style>
