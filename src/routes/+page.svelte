<script lang="ts">
	import { title } from '$lib/config';
	import Hero from './hero.svelte';
	import PostCard from './post-card.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	let totalPages = 1;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<Hero />

<div class="wrapper">
	<main>
		<ul>
			{#each data.posts as post}
				<li>
					<PostCard {post} />
				</li>
			{/each}
		</ul>

		{#if totalPages > 1}
			<div class="pagination">
				<span>Previous</span>
				<span>1</span>
				<span>Next</span>
			</div>
		{/if}
	</main>
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
