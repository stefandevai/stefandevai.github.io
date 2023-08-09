<script lang="ts">
	import type { PageData } from './$types';
	import { title, postUrlSection } from '$lib/config';
	import Content from './content.svelte';
	import TwoLinePattern from '$lib/components/two-line-pattern.svelte';
	import TagContainer from '$lib/components/tag-container.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.post.title} | {title}</title>
	<meta name="description" content={data.post.excerpt} />
</svelte:head>

<TwoLinePattern />
<header>
	<div>
		<span class="date">
			{data.post.date}
		</span>
		<h1>{data.post.title}</h1>
		<p>{data.post.excerpt}</p>
	</div>
	<figure>
		<picture>
			{#each Object.entries(data.post.featuredImage.sources) as [format, images]}
				<source
					srcset={`${images[0].src} 868w, ${images[1].src} 736w, ${images[2].src} 382w`}
					sizes={`(max-width: 414px) 382px, (max-width: 768px) 736px, 868w`}
					type={`image/${format}`}
				/>
			{/each}
			<img
				style={`background:url(${data.post.featuredImageFallback}) no-repeat;`}
				src={data.post.featuredImageFallback}
				alt={data.post.featuredImageCaption}
				loading="lazy"
			/>
		</picture>
		<figcaption class="image-credits">{data.post.featuredImageCaption}</figcaption>
	</figure>
</header>

<span class="dot-separator">◈ ◈ ◈</span>

<main>
	<article>
		<Content postContent={data.component} />
		<TagContainer
			tags={[data.post.language, ...data.post.tags]}
			style="padding-bottom:1rem;margin-left:var(--text-horizontal-margin)"
		/>
		<div class="other-posts">
			<a href="/{postUrlSection}/{data.post.previous.slug}">⟵<br />{data.post.previous.title}</a>
			<a href="/{postUrlSection}/{data.post.next.slug}">⟶<br />{data.post.next.title}</a>
		</div>
	</article>
</main>

<style>
	header {
		color: var(--color-black);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 2rem 4rem 0 4rem;
		height: calc(100dvh - var(--nav-height) - 4rem);
	}

	header > div {
		max-width: 600px;
	}

	span.date {
		font-size: var(--font-size-small);
		color: var(--color-gray1);
		display: block;
		margin-bottom: 0.5rem;
	}

	header h1 {
		margin: 0;
		font-size: var(--font-size-large2);
		line-height: 1.3;
	}

	header p {
		font-weight: 700;
		line-height: 1.4;
		margin-top: 1rem;
		color: var(--color-gray1);
	}

	figure {
		max-width: 450px;
		height: 100%;
	}

	header img {
		width: 100%;
		aspect-ratio: 1 / 1;
	}

	.image-credits {
		display: block;
		margin-top: 0.3rem;
		font-size: var(--font-size-small);
		color: var(--color-gray1);
		text-align: center;
	}

	@supports (initial-letter: normal) {
		article > :global(p:first-of-type::first-letter) {
			color: var(--color-drop-cap);
			margin-right: 8px;
			initial-letter: 3;
		}
	}
	@supports not (initial-letter: normal) {
		article > :global(p:first-of-type::first-letter) {
			color: var(--color-drop-cap);
			margin-right: 3px;
			font-size: 6.82rem;
			margin-top: 11px;
			float: left;
			line-height: 0.7;
		}
	}

	article > :global(:where(h1, h2, h3, h4, p, .svelte-lazy)) {
		margin-left: var(--text-horizontal-margin);
		margin-right: var(--text-horizontal-margin);
	}

	article > :global(ul) {
		margin-left: calc(var(--text-horizontal-margin) + var(--text-vertical-margin));
		margin-right: var(--text-horizontal-margin);
		list-style-position: inside;
		list-style-type: square;
	}

	article > :global(ul > li) {
		margin-bottom: 0.5rem;
		margin-top: 0.5rem;
	}

	h1 {
		font-size: var(--font-size-large);
		margin: 0.5rem 0 2rem 0;
		margin-bottom: 2rem;
		margin-top: 0.5rem;
	}

	.dot-separator {
		display: block;
		font-size: var(--font-size-normal);
		text-align: center;
		color: var(--color-gray3);
		margin-bottom: 2rem;
	}

	.other-posts {
		border-top: 1px solid var(--color-border);
		padding-top: 2rem;
		margin-bottom: 1rem;
		font-size: var(--font-size-very-small);
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	.other-posts > a {
		max-width: 40%;
	}

	.other-posts > a:last-child {
		text-align: right;
	}
</style>
