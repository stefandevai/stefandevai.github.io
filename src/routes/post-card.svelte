<script lang="ts">
	import type { Post } from '$lib/server/posts';
	export let post: Post;
</script>

<header>
	<span>{post.date}</span>
	<a href={`p/${post.slug}`}>
		<h2>{post.title}</h2>
	</a>
	<div>
		<span>{post.language}</span>
		{#if post.tags}
			{#each post.tags as tag}
				<span>{tag}</span>
			{/each}
		{/if}
	</div>
</header>
<p>
	{post.excerpt}…
</p>
