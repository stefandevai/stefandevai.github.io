<script lang="ts">
	import type { PageData } from './$types';
	import { title } from '$lib/config';
	import 'prism-themes/themes/prism-lucario.css';
	import Content from './content.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.post.title} | {title}</title>
	<link
		href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main>
	<article>
		<header>
			<h1>{data.post.title} <span class="brand-diamond">◆</span></h1>
			<img
				src={data.post.featuredImage}
				alt={data.post.featuredImageCaption}
				loading="lazy"
				style="object-position: center {data.post.featuredImageVerticalPosition ?? 'center'};"
			/>
			<span>{data.post.featuredImageCaption}</span>
		</header>
		<Content postContent={data.component} />
		<span class="dot-separator">◆ ◆ ◆</span>
		<div class="tags">
			{#each data.post.tags as tag}
				<span class="tag">{tag}</span>
			{/each}
		</div>
		<div class="other-posts">
			<a href="/p/{data.post.previous.slug}">⟵<br />{data.post.previous.title}</a>
			<a href="/p/{data.post.next.slug}">⟶<br />{data.post.next.title}</a>
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
		font-style: italic;
	}

	img {
		width: 100%;
		max-height: 80vh;
		object-fit: cover;
		filter: grayscale();
	}

	h1 {
		font-size: var(--font-size-large);
		margin-bottom: 2rem;
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

	.tags {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--color-border);
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
