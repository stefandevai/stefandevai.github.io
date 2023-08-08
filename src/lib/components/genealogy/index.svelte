<script lang="ts">
	import Tree from './tree.svelte';
	import { getDepth, getXData, getYData } from './util';
	import type { Person, DiagramColors, DiagramDimensions } from './types';

	export let data: Person;
	export let colors: DiagramColors = {
		female: 'red',
		male: 'black',
		line: 'gray',
	};
	export let dimensions: DiagramDimensions = {
		containerHeight: 40,
		containerWidth: 40,
		verticalSpacing: 35,
		horizontalSpacing: 15,
	};

	const depth = getDepth(data);
	const [x, width] = getXData(depth, dimensions, data);
	const [y, height] = getYData(depth, dimensions);
</script>

<svg viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
	<Tree {data} {x} {y} {colors} {dimensions} />
</svg>
