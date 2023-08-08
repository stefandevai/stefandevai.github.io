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

{#if data.gender === 'm'}
	<circle
		cx={x + dimensions.containerWidth / 2}
		cy={y + dimensions.containerHeight / 2}
		r={dimensions.containerHeight / 2}
		fill={'white'}
		stroke={getColor()}
		stroke-width="4"
	/>
{:else}
	<polygon
		points={`${x + dimensions.containerWidth / 2},${
			y + dimensions.containerHeight * triangleSideFactor
		} ${x},${y + dimensions.containerHeight - dimensions.containerHeight * triangleSideFactor} ${
			x + dimensions.containerWidth
		},${y + dimensions.containerHeight - dimensions.containerHeight * triangleSideFactor}`}
		fill={'white'}
		stroke={getColor()}
		stroke-width="4"
	/>
{/if}

<text
	x={x + dimensions.containerWidth / 2}
	y={y + dimensions.containerHeight + 20}
	text-anchor="middle"
	dominant-baseline="middle"
	style={`font-size: ${dimensions.fontSize}px; fill: ${getColor()}; font-weight: bold;`}
>
	{data.name === '' ? '???' : data.name}
</text>

{#if data.birthDate || data.deathDate}
	<text
		x={x + dimensions.containerWidth / 2}
		y={y + dimensions.containerHeight + 20 + 15}
		text-anchor="middle"
		dominant-baseline="middle"
		style={`font-size:${dimensions.fontSize - 4}px;fill:${getColor()};`}
		class="birth-death"
	>
		{#if data.birthDate}
			<tspan>★</tspan> {data.birthDate}
		{/if}

		{#if data.birthDate && data.deathDate}
			{'    '}
		{/if}

		{#if data.deathDate}
			<tspan>✝</tspan>{'  '}{data.deathDate}
		{/if}
	</text>
{/if}

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
