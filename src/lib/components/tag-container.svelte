<script lang="ts">
	import { tagUrlSection } from '$lib/config';

	export let tags: string[];
	export let style = '';
</script>

<ul class="list" {style}>
	{#if tags}
		{#each tags as tag}
			<li><a href="/{tagUrlSection}/{tag}">{tag}</a></li>
		{/each}
	{/if}
</ul>

<style>
	ul.list {
		list-style-type: none;
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	a {
		display: block;
		background-color: var(--color-gray2);
		color: var(--color-gray1);
		font-size: var(--font-size-very-small);
		padding: 0 0.5rem;
	}
</style>
