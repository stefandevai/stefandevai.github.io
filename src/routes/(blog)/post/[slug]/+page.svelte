<script lang="ts">
	import type { PageData } from './$types';
	import { title, postUrlSection } from '$lib/config';
	import Content from './content.svelte';
	import BackToPostsButton from '$lib/components/back-to-posts-button.svelte';
	import TwoLinePattern from '$lib/components/two-line-pattern.svelte';
	import TagContainer from '$lib/components/tag-container.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.post.title} | {title}</title>
</svelte:head>

<TwoLinePattern />
<main>
	<article>
		<header>
			<BackToPostsButton />
			<h1>{data.post.title} <span class="brand-diamond">◆</span></h1>
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
			<span>{data.post.featuredImageCaption}</span>
		</header>
		<Content postContent={data.component} />
		<span class="dot-separator">◆ ◆ ◆</span>
		<TagContainer
			tags={[data.post.language, ...data.post.tags]}
			style="padding-bottom: 2rem; border-bottom: 1px solid var(--color-border);"
		/>
		<div class="other-posts">
			<a href="/{postUrlSection}/{data.post.previous.slug}">⟵<br />{data.post.previous.title}</a>
			<a href="/{postUrlSection}/{data.post.next.slug}">⟶<br />{data.post.next.title}</a>
		</div>
	</article>
</main>

<style>
	header {
		margin-bottom: 2rem;
		font-size: 18px;
	}

	header > span {
		display: block;
		margin-top: 0.3rem;
		font-size: var(--font-size-small);
		color: var(--color-gray1);
		text-align: center;
	}

	@supports (initial-letter: normal) {
		article :global(p:first-of-type::first-letter) {
			color: var(--color-drop-cap);
			margin-right: 6px;
			initial-letter: 2;
		}
	}
	@supports not (initial-letter: normal) {
		article :global(p:first-of-type::first-letter) {
			color: var(--color-drop-cap);
			margin-right: 3px;
			font-size: 3.89rem;
			margin-top: 10px;
			float: left;
		}
	}

	h1 {
		font-size: var(--font-size-large);
		margin-bottom: 2rem;
		margin-top: 0.5rem;
	}

	img {
		width: 100%;
		height: auto;
	}

	.brand-diamond {
		color: var(--color-red2);
		font-size: var(--font-size-medium);
		font-weight: 600;
	}

	.dot-separator {
		display: block;
		font-size: var(--font-size-normal);
		text-align: center;
		color: var(--color-gray3);
		margin-bottom: 2rem;
	}

	.other-posts {
		margin-top: 2rem;
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
