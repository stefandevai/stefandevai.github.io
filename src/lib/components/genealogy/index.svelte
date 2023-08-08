<script lang="ts">
	import Tree from './tree.svelte';
	import { getDepth, getXData, getYData } from './util';
	import type { Person, DiagramColors, DiagramDimensions } from './types';

	export let data: Person;
	export let colors: DiagramColors = {
		female: 'red',
		male: 'black',
		line: 'gray',
		unknown: 'gray',
		text: 'gray',
	};
	export let dimensions: DiagramDimensions = {
		containerHeight: 40,
		containerWidth: 180,
		verticalSpacing: 65,
		horizontalSpacing: 25,
		fontSize: 10,
		safeZone: 10,
		lineWidth: 3,
	};

	const depth = getDepth(data);
	const [x, width] = getXData(depth, dimensions, data);
	const [y, height] = getYData(depth, dimensions);
</script>

<svg viewBox={`0 0 ${width} ${height}`} style="width:100%;height:100%;">
	<Tree {data} {x} {y} {colors} {dimensions} />
</svg>
