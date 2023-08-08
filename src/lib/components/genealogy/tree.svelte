<script lang="ts">
	import type { Person, DiagramColors, DiagramDimensions } from './types';
	export let data: Person;
	export let colors: DiagramColors;
	export let dimensions: DiagramDimensions;
	export let x = 0;
	export let y = 0;
	const triangleSideFactor = 0.0669873;

	const getColor = (): string => {
		if (data.name === '') {
			return colors.unknown;
		}
		if (data.gender === 'f') {
			return colors.female;
		}
		return colors.male;
	};

	/* <polygon */
	/* 	points={`${x + dimensions.containerWidth/2},${y + dimensions.containerHeight*triangleSideFactor} ${x},${y + dimensions.containerHeight - dimensions.containerHeight*triangleSideFactor} ${x + dimensions.containerWidth},${y + dimensions.containerHeight - dimensions.containerHeight*triangleSideFactor}`} */
	/* 	style={`fill:white`} */
	/* 	stroke={colors.female} */
	/* 	stroke-width="4" */
	/* /> */
</script>

{#if data.father && data.mother}
	<line
		x1={x + dimensions.containerWidth / 2}
		x2={x + dimensions.containerWidth / 2}
		y1={y + dimensions.containerHeight / 2}
		y2={y - dimensions.verticalSpacing - dimensions.containerHeight / 2}
		stroke={colors.line}
		stroke-width={dimensions.lineWidth}
	/>
	<line
		x1={x - dimensions.horizontalSpacing / 2}
		x2={x + dimensions.containerWidth + dimensions.horizontalSpacing / 2}
		y1={y - dimensions.verticalSpacing - dimensions.containerHeight / 2}
		y2={y - dimensions.verticalSpacing - dimensions.containerHeight / 2}
		stroke={colors.line}
		stroke-width={dimensions.lineWidth}
	/>
{/if}

{#if data.spouse}
	<line
		x1={x + dimensions.containerWidth / 2}
		x2={x + dimensions.containerWidth + dimensions.horizontalSpacing}
		y1={y + dimensions.containerHeight / 2}
		y2={y + dimensions.containerHeight / 2}
		stroke={colors.line}
		stroke-width={dimensions.lineWidth}
	/>
{/if}

<rect
	{x}
	{y}
	width={dimensions.containerWidth}
	height={dimensions.containerHeight}
	fill={getColor()}
	rx="2"
/>
<text
	x={x + dimensions.containerWidth / 2}
	y={y + dimensions.containerHeight / 2}
	text-anchor="middle"
	dominant-baseline="middle"
	style={`font-size: ${dimensions.fontSize}px; fill: ${colors.text}; font-weight: bold;`}
>
	{data.name === '' ? '?' : data.name}
</text>

{#if data.spouse}
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
