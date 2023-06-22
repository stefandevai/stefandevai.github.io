<script lang="ts">
	import type { PageData } from './$types';
	import { title } from '$lib/config';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.post.title} | {title}</title>
</svelte:head>

<main>
	<article>
		<header>
			<h1>{data.post.title}</h1>
			<img src={data.post.featuredImage} alt={data.post.featuredImageCaption} />
		</header>
		<div>
			<svelte:component this={data.component} />
		</div>
	</article>
</main>

<style>
	header {
		margin-bottom: 2rem;
		font-size: 18px;
	}

	img {
		width: 100%;
		height: auto;
	}

	h1 {
		font-size: var(--font-size-large);
	}
</style>
