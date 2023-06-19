<script lang="ts">
	import type { PageData } from './$types';
	import { title } from '$lib/config';
	import Background from './components/background.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<Background />

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
