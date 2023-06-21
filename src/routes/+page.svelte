<script lang="ts">
	import type { PageData } from './$types';
	import { title } from '$lib/config';
	import Hero from './components/hero.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<Hero />

<main>
	<ul>
		{#each data.posts as post}
			<li>
				<a href={`p/${post.slug}`}>
					{post.title}
				</a>
			</li>
		{/each}
	</ul>
</main>
