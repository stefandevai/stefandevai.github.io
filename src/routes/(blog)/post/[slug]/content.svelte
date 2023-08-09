<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	/* import 'prism-themes/themes/prism-lucario.min.css'; */
	/* import 'prism-themes/themes/prism-one-light.min.css'; */
	/* import 'prism-themes/themes/prism-gruvbox-light.min.css'; */
	import 'prism-themes/themes/prism-duotone-light.min.css';
	import './content.css';

	export let postContent: SvelteComponent;
</script>

<svelte:component this={postContent} />
