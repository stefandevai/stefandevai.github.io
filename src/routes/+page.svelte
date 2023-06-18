<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

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
