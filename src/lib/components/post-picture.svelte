<script lang="ts">
	import Picture from '$lib/components/picture/picture.svelte';

	export let src: string;
	export let alt: string;
</script>

<div>
	<Picture {src} {alt} width="868;768;414" object-fit="cover" {...$$restProps} />
</div>

<style>
	div {
		width: calc(100% - var(--text-horizontal-margin) * 2);
		max-width: 868px;
		margin: calc(var(--text-vertical-margin) + 0.5rem) auto;
		line-height: 1.8;
	}
</style>
