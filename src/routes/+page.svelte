<script lang="ts">
	import { title } from '$lib/config';
	import Hero from './hero.svelte';
	import PostCard from './post-card.svelte';
	import type { PageData } from './$types';

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
				<PostCard {post} />
			</li>
		{/each}
	</ul>
</main>
