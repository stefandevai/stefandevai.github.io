<script lang="ts">
	import Lazy from 'svelte-lazy';
</script>

<Lazy>
	<video playsinline muted autoplay loop>
		<slot />
	</video>
</Lazy>

<style>
	:global(.svelte-lazy) {
		line-height: 0;
		margin: 1.5rem 0;
	}
</style>
