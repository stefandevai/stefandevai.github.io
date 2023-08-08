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
		containerHeight: 50,
		containerWidth: 50,
		verticalSpacing: 65,
		horizontalSpacing: 55,
		fontSize: 12,
		safeZone: 20,
		lineWidth: 3,
	};

	const depth = getDepth(data);
	const [x, width] = getXData(depth, dimensions, data);
	const [y, height] = getYData(depth, dimensions, data);
</script>

<svg viewBox={`0 0 ${width} ${height}`} style="width:100%;height:100%;">
	<style>
		.birth-death > tspan {
			font-weight: 500;
		}
	</style>
	<Tree {data} {x} {y} {colors} {dimensions} />
</svg>
