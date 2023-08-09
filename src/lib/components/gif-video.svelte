<script lang="ts">
	import Lazy from 'svelte-lazy';
</script>

<Lazy fadeOption={{ delay: 0, duration: 0 }}>
	<video playsinline muted autoplay loop>
		<slot />
	</video>
</Lazy>

<style>
	:global(.svelte-lazy) {
		line-height: 0;
		margin: var(--text-vertical-margin) 0;
	}
</style>
