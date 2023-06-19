<script lang="ts">
	import Header from './components/header.svelte';
	import Footer from './components/footer.svelte';

	import '$src/app.css';
</script>

<div class="layout">
	<Header />

	<slot />

	<Footer />
</div>

<style>
	body {
		margin: 0;
	}
</style>
