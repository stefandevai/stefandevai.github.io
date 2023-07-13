<script lang="ts">
	import { title } from '$lib/config';
	import PostList from '$lib/components/post-list.svelte';
	import Hero from './hero.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<Hero />

<main>
	<PostList posts={data.posts} />
</main>
