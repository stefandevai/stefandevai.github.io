<script lang="ts">
	import Picture from '$lib/components/picture/picture.svelte';

	export let src: string;
	export let alt: string;
	export let title: string;
	export let caption: string;
</script>

<figure>
	<Picture {src} {alt} {...$$restProps} />
	{#if $$slots.default}
		<figcaption>
			<slot />
		</figcaption>
	{/if}
	{#if (caption || title) && !$$slots.default}
		<figcaption>
			{#if title}
				<strong>{title}</strong>
			{/if}
			{#if caption}
				{caption}
			{/if}
		</figcaption>
	{/if}
</figure>

<style>
	figure {
		width: calc(100% - var(--text-horizontal-margin) * 2);
		max-width: 868px;
		margin: calc(var(--text-vertical-margin) + 0.5rem) auto;
		line-height: 1.8;
		position: relative;
		overflow: hidden;
	}

	figcaption > :global(a) {
		color: var(--color-white);
		text-decoration: underline;
	}

	figcaption {
		/* display: none; */
		font-size: var(--font-size-small);
		color: var(--color-white);
		margin: 0;
		padding: 0.25rem 1rem;
		text-align: left;
		background-color: rgba(0, 0, 0, 0.7);
		position: absolute;
		bottom: 0;
		width: 100%;
		line-height: 1.5;
	}
</style>
