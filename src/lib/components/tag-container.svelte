<script lang="ts">
	export let tags: string[];
	export let style = '';
</script>

<div {style}>
	{#if tags}
		{#each tags as tag}
			<span>{tag}</span>
		{/each}
	{/if}
</div>

<style>
	div {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	span {
		background-color: var(--color-gray2);
		color: var(--color-gray1);
		font-size: var(--font-size-very-small);
		padding: 0 0.5rem;
	}
</style>
