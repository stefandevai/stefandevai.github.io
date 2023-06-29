<script lang="ts">
	import type { Post } from '$lib/server/posts';
	export let post: Post;
</script>

<div class="wrapper">
	<a href={`p/${post.slug}`} class="image-wrapper">
		<img src={post.featuredImage} alt={post.title} loading="lazy" />
	</a>
	<div class="text-content">
		<header>
			<span>{post.date}</span>
			<a href={`p/${post.slug}`}>
				<h2>{post.title}</h2>
			</a>
			<div>
				<span class="tag">{post.language}</span>
				{#if post.tags}
					{#each post.tags as tag}
						<span class="tag">{tag}</span>
					{/each}
				{/if}
			</div>
		</header>
		<a href={`p/${post.slug}`}>
			<p>
				{post.excerpt}…
			</p>
		</a>
	</div>
</div>

<style>
	.wrapper {
		padding: 1rem;
		display: flex;
		justify-content: center;
	}

	.image-wrapper {
		position: relative;
		width: 250px;
		height: 250px;
	}

	.image-wrapper:after {
		content: '';
		position: absolute;
		display: block;
		top: 0;
		right: 0;
		width: 25px;
		height: 50px;
		background-color: var(--color-red);
	}

	.text-content {
		padding: 0 1rem 1rem 2rem;
	}

	header {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding-bottom: 1rem;
	}

	header > span {
		font-size: var(--font-size-very-small);
		color: var(--color-gray1);
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
		margin-top: 0;
	}

	header > div {
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	p {
		font-size: var(--font-size-small2);
		color: var(--color-black);
		margin: 0;
	}
</style>
