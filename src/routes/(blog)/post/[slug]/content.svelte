<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import 'prism-themes/themes/prism-lucario.css';
	import './content.css';

	export let postContent: SvelteComponent;
</script>

<svelte:component this={postContent} />
