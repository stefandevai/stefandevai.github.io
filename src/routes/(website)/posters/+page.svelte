<script>
	import { title } from '$lib/config';
	import TwoLinePattern from '$lib/components/two-line-pattern.svelte';
	import PosterList from './poster-list.svelte';
</script>

<svelte:head>
	<title>Posters | {title}</title>
</svelte:head>

<TwoLinePattern />
<main>
	<h1>Posters <span class="brand-diamond">◆</span></h1>
	<PosterList />
	<p>
		These web posters are visual experiments with generative art elements. More often than not,
		generative art is criticized for its lack of emotional depth and impersonal results, filling a
		mere ornamental function. Hence, to avoid this central issue, I try express concrete ideas and
		concepts having generative art elements to serve a supportive role.
	</p>
	<p>
		My workflow usually starts with a quick sketch of the general idea on Adobe Illustrator, so I
		can have a high level picture of the composition I want to achieve. Then I implement everything
		with WebGL or Canvas2D, depending on the complexity of the piece, incorporating new ideas that
		come up during the process.
	</p>
</main>
