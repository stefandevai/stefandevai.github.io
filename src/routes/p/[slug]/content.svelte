<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import './content.css';

	export let postContent: SvelteComponent;
</script>

<svelte:component this={postContent} />
