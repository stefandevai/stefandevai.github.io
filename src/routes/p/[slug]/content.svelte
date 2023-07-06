<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	export let postContent: SvelteComponent;
</script>

<svelte:component this={postContent} />
