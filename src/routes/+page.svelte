<script lang="ts">
	import type { PageData } from './$types';
	import { title } from '$lib/config';

	export let data: PageData;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h1>All posts</h1>
<ul>
	{#each data.posts as post}
		<li>
			<a href={`p/${post.slug}`}>
				{post.title}
			</a>
		</li>
	{/each}
</ul>
