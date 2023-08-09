<script lang="ts">
	export let src: string;
	export let alt: string;
	export let loading = 'lazy';
	export let style = '';
	export let placeholderSrc: string | null = null;

	const getSrcset = (images): string => {
		images.sort((a, b) => b.w - a.w);

		if (images.length < 1) {
			return '';
		}

		return images.reduce((a, b) => `${a}, ${b.src} ${b.w}w`, `${images[0].src} ${images[0].w}w`);
	};

	const getSizes = (images): string => {
		images.sort((a, b) => a.w - b.w);
		return images.map((i) => i.w).reduce((a, b, i) => `${a}, (max-width: ${b}px) ${b}px`, '');
	};
</script>

<picture>
	{#each Object.entries(src.sources) as [format, images]}
		<source srcset={getSrcset(images)} sizes={getSizes(images)} type={`image/${format}`} />
	{/each}

	<img
		src={placeholderSrc ?? src.img.src}
		{alt}
		{loading}
		class={$$props.class}
		style={`background:url(${placeholderSrc ?? src.img.src}) no-repeat;${style}`}
	/>
</picture>
