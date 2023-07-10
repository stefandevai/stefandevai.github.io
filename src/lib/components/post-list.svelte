<script lang="ts">
	import type { Post } from '$lib/server/posts';
	import PostCard from './post-card.svelte';

	export let posts: Post[];
	let totalPages = 1;
</script>

<div class="wrapper">
	<ul>
		{#each posts as post}
			<li>
				<PostCard {post} />
			</li>
		{/each}
	</ul>

	{#if totalPages > 1}
		<div class="pagination">
			<span>Newer</span>
			<span>1</span>
			<span>Older</span>
		</div>
	{/if}
</div>

<style>
	.wrapper {
		background-color: var(--color-white);
	}

	.pagination {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2rem 0 1rem 0;
		border-top: 1px solid var(--color-border);
	}

	.pagination > span {
		display: inline-block;
		width: 60px;
	}

	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	li:not(:last-child) {
		border-bottom: 1px solid var(--color-border);
	}
</style>
