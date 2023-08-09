<script lang="ts">
	import type { Post } from '$lib/server/posts';
	import { postUrlSection } from '$lib/config';
	import ContinueReadingButton from '$lib/components/continue-reading-button.svelte';
	import TagContainer from '$lib/components/tag-container.svelte';

	export let post: Post;

	let active = false;
	const activate = () => (active = true);
	const deactivate = () => (active = false);
	const postUrl = `/${postUrlSection}/${post.slug}`;
</script>

<div class="wrapper">
	<a
		href={postUrl}
		class="image-wrapper"
		aria-label={post.title}
		on:mouseenter={activate}
		on:mouseleave={deactivate}
	>
		<picture>
			{#each Object.entries(post.featuredImage.sources) as [format, images]}
				<source
					srcset={`${images[0].src} 250w, ${images[1].src} 100w`}
					sizes={`(max-width: 576px) 100px, 250px`}
					type={`image/${format}`}
				/>
			{/each}
			<img
				style={`background:url(${post.featuredImageFallback}) no-repeat;`}
				src={post.featuredImageFallback}
				alt="post"
				loading="lazy"
			/>
		</picture>
	</a>
	<div class="text-content">
		<header>
			<span>{post.date}</span>
			<a href={postUrl} on:mouseenter={activate} on:mouseleave={deactivate}>
				<h2>{post.title}</h2>
			</a>
			<TagContainer tags={[post.language, ...post.tags]} style="margin-top: 0.5rem;" />
		</header>
		<a href={postUrl} on:mouseenter={activate} on:mouseleave={deactivate}>
			<p>
				{post.excerpt}…
			</p>
		</a>
		<div class="read-more">
			<ContinueReadingButton href={postUrl} {active} />
		</div>
	</div>
</div>

<style>
	.wrapper {
		padding: 2rem 1rem;
		display: flex;
		justify-content: flex-start;
	}

	.image-wrapper {
		position: relative;
		flex-basis: 250px;
		flex-grow: 0;
		flex-shrink: 0;
		height: 250px;
		line-height: normal;
	}

	.image-wrapper img {
		width: 100%;
		height: 100%;
		background-size: cover;
		display: block;
	}

	.image-wrapper:after {
		content: '';
		position: absolute;
		display: block;
		top: 0;
		right: 0;
		width: 25px;
		height: 50px;
		background-color: var(--color-red);
	}

	.text-content {
		padding: 0 1rem 0 2rem;
		display: flex;
		flex-direction: column;
	}

	.text-content a {
		color: inherit;
		text-decoration: none;
	}

	header {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding-bottom: 1rem;
	}

	header > span {
		font-size: var(--font-size-very-small);
		color: var(--color-gray1);
		font-style: italic;
	}

	h2 {
		font-size: var(--font-size-medium);
		color: var(--color-black);
		margin-bottom: 0;
		margin-top: 0;
	}

	p {
		font-size: var(--font-size-small2);
		color: var(--color-black);
		margin: 0;
	}

	.read-more {
		margin-top: auto;
		align-self: flex-end;
	}

	@media (min-width: 577px) and (max-width: 700px) {
		.wrapper {
			padding: 1rem 0;
		}

		.text-content {
			padding: 0 0 0 1rem;
		}

		.read-more {
			display: none;
		}

		.text-content h2 {
			font-size: var(--font-size-medium);
		}
	}

	@media (max-width: 576px) {
		.wrapper {
			padding: 1rem 0;
		}

		.image-wrapper {
			flex-basis: 100px;
			height: 100px;
			margin-bottom: 1rem;
		}

		.text-content {
			padding: 0 1rem;
		}

		.text-content h2 {
			font-size: var(--font-size-normal);
		}

		.text-content > a {
			display: none;
		}

		.read-more {
			display: none;
		}

		.image-wrapper:after {
			content: '';
			position: absolute;
			display: block;
			top: 0;
			right: 0;
			width: 20px;
			height: 40px;
			background-color: var(--color-red);
		}
	}
</style>
