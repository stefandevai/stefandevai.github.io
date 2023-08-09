<script lang="ts">
	import Component from './component.svelte';

	export let src: string;
	export let style = '';
	export let alt: string;
	export let loading = 'lazy';
	export let placeholderSrc: string | null = null;
	export let original = '';
</script>

{#if original !== ''}
	<a href={original} target="_blank" rel="noopener noreferer" aria-label="see original image">
		<svelte:component
			this={Component}
			{src}
			{alt}
			{loading}
			style={`${style}`}
			class={$$props.class}
			{placeholderSrc}
		/>
	</a>
{:else}
	<svelte:component
		this={Component}
		{src}
		{alt}
		{loading}
		style={`${style}`}
		class={$$props.class}
		{placeholderSrc}
	/>
{/if}
