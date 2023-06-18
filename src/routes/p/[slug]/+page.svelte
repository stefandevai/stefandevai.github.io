<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div>
	<article>
		<header>
		<h1>{data.post.title}</h1>
		</header>
		<div>
			<svelte:component this={data.component} />
		</div>
	</article>
</div>
