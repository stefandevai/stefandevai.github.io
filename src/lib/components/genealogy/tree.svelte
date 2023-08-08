<script lang="ts">
	import type { Person, DiagramColors, DiagramDimensions } from './types';
	export let data: Person;
	export let colors: DiagramColors;
	export let dimensions: DiagramDimensions;
	export let x = 0;
	export let y = 0;

	/* <polygon points={`${x + dimensions.containerWidth/2},${y} ${x},${y + dimensions.containerHeight} ${x + dimensions.containerWidth},${y + dimensions.containerHeight}`} /> */
</script>

{#if data.gender === 'f'}
	<rect
		{x}
		{y}
		width={dimensions.containerWidth}
		height={dimensions.containerHeight}
		style={`fill:${colors.female}`}
	/>
{:else}
	<rect
		{x}
		{y}
		width={dimensions.containerWidth}
		height={dimensions.containerHeight}
		style={`fill:${colors.male}`}
	/>
{/if}

{#if data.father && data.mother}
	<line
		x1={x + dimensions.containerWidth / 2}
		x2={x + dimensions.containerWidth / 2}
		y1={y}
		y2={y - dimensions.verticalSpacing - dimensions.containerHeight / 2}
		stroke={colors.line}
	/>
	<line
		x1={x + dimensions.containerWidth / 2 - dimensions.horizontalSpacing / 2}
		x2={x + dimensions.containerWidth / 2 + dimensions.horizontalSpacing / 2}
		y1={y - dimensions.verticalSpacing - dimensions.containerHeight / 2}
		y2={y - dimensions.verticalSpacing - dimensions.containerHeight / 2}
		stroke={colors.line}
	/>
{/if}

{#if data.spouse}
	<line
		x1={x + dimensions.containerWidth}
		x2={x + dimensions.containerWidth + dimensions.horizontalSpacing}
		y1={y + dimensions.containerHeight / 2}
		y2={y + dimensions.containerHeight / 2}
		stroke={colors.line}
	/>
	<svelte:self
		data={data.spouse}
		x={x + dimensions.containerWidth + dimensions.horizontalSpacing}
		{y}
		{colors}
		{dimensions}
	/>
{/if}

{#if data.father}
	<svelte:self
		data={data.father}
		x={x - dimensions.containerWidth / 2 - dimensions.horizontalSpacing / 2}
		y={y - dimensions.verticalSpacing - dimensions.containerHeight}
		{colors}
		{dimensions}
	/>
{/if}

{#if data.mother}
	<svelte:self
		data={data.mother}
		x={x + dimensions.containerWidth / 2 + dimensions.horizontalSpacing / 2}
		y={y - dimensions.verticalSpacing - dimensions.containerHeight}
		{colors}
		{dimensions}
	/>
{/if}
