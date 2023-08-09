<script lang="ts">
	import { Picture } from 'svelte-picture';

	export let src: string;
	export let alt: string;
</script>

<div>
	<Picture {src} {alt} width="868;768;414" original={true} object-fit="cover" {...$$restProps} />
</div>

<style>
	div {
		width: calc(100% - var(--text-horizontal-margin) * 2);
		max-width: 868px;
		margin: calc(var(--text-vertical-margin) + 0.5rem) auto;
		line-height: 1.8;
	}
</style>
