<script lang="ts">
	import Header from './header.svelte';
	import Footer from './footer.svelte';
	import '$src/app.css';
</script>

<div>
	<Header />
	<slot />
	<Footer />
</div>
