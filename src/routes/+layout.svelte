<script lang="ts">
	import { onMount } from 'svelte';
	import Header from './header.svelte';
	import Footer from './footer.svelte';

	import '$src/app.css';

	onMount(() => {
		const bitterRegular = new FontFace('Bitter', "url('/fonts/bitter-regular.woff2')", {
			weight: 400,
		});
		const bitterItalic = new FontFace('Bitter', "url('/fonts/bitter-italic.woff2')", {
			style: 'italic',
			weight: 400,
		});

		bitterRegular.load();
		bitterItalic.load();

		document.fonts.ready.then(() => {
			document.documentElement.classList.add('fonts-loaded');
		});
	});
</script>

<svelte:head>
	<meta name="description" content="Stefan Devai's blog about History and programming." />
</svelte:head>

<div>
	<Header />
	<slot />
	<Footer />
</div>
