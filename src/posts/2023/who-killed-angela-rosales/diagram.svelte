<script lang="ts">
	import Lazy from 'svelte-lazy';
	import Genealogy from '$lib/components/genealogy/index.svelte';
	import type { DiagramData } from '$lib/components/genealogy/types';

	export let data: DiagramData;
	const colors = {
		female: '#ef2f1f',
		male: '#111',
		line: '#ccc',
		unknown: '#aaa',
		text: '#555',
	};
</script>

<div>
	<Lazy fadeOption={{ delay: 0, duration: 0 }} height={400}>
		<Genealogy {data} {colors} />
	</Lazy>
</div>

<style>
	div {
		width: 320px;
		margin: 2rem auto;
	}
</style>
