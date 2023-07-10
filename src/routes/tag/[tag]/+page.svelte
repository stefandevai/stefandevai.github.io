<script lang="ts">
	import type { PageServerData } from './$types';
	import { title } from '$lib/config';
	import BackToPostsButton from '$lib/components/back-to-posts-button.svelte';
	import PostList from '$lib/components/post-list.svelte';
	import TwoLinePattern from '$lib/components/two-line-pattern.svelte';

	export let data: PageServerData;
</script>

<svelte:head>
	<title>Posts with '{data.tag}' tag | {title}</title>
</svelte:head>

<TwoLinePattern />
<main>
	<BackToPostsButton />
	<h1>Posts with tag '{data.tag}':</h1>
	<PostList posts={data.posts} />
</main>

<style>
	h1 {
		margin-top: 0.5rem;
	}
</style>
