<script lang="ts">
	import type { Post } from '$lib/server/posts';
	export let post: Post;
</script>

<div class="wrapper">
	<header>
		<span>{post.date}</span>
		<a href={`p/${post.slug}`}>
			<h2>{post.title}</h2>
		</a>
		<div>
			<span class="language">{post.language}</span>
			{#if post.tags}
				{#each post.tags as tag}
					<span class="tag">{tag}</span>
				{/each}
			{/if}
		</div>
	</header>
	<p>
		{post.excerpt}…
	</p>
</div>

<style>
	.wrapper {
		padding: 1rem 0;
	}

	header {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 1rem;
	}

	header > span {
		font-size: var(--font-size-very-small);
		color: var(--color-gray2);
		font-style: italic;
	}

	header > a {
		color: inherit;
		text-decoration: none;
	}

	h2 {
		font-size: var(--font-size-medium);
		color: var(--color-black);
		margin-bottom: 0.5rem;
	}

	header > div {
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	header > div > span {
		font-size: var(--font-size-very-small);
		color: var(--color-white);
		padding: 0 0.5rem;
	}

	header > div > span:not(:first-child) {
		margin-left: 0.5rem;
	}

	.language {
		background-color: var(--color-black);
	}

	.tag {
		background-color: var(--color-red);
	}

	p {
		color: var(--color-black);
		padding: 0 1rem 1rem 1rem;
		margin: 0;
	}

</style>
