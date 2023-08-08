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
		height: 400px;
		margin-bottom: 2rem;
	}
</style>
