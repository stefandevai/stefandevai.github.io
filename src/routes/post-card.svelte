<script lang="ts">
	import type { Post } from '$lib/server/posts';
	import ContinueReadingButton from '$lib/components/continue-reading-button.svelte';
	export let post: Post;

	let active = false;
	const activate = () => (active = true);
	const deactivate = () => (active = false);
</script>

<div class="wrapper">
	<a
		href={`p/${post.slug}`}
		class="image-wrapper"
		aria-label={post.title}
		on:mouseenter={activate}
		on:mouseleave={deactivate}
	>
		<picture>
			<source srcset={post.featuredImage} type="image/webp" />
			<img src={post.featuredImageFallback} alt="" />
		</picture>
	</a>
	<div class="text-content">
		<header>
			<span>{post.date}</span>
			<a href={`p/${post.slug}`} on:mouseenter={activate} on:mouseleave={deactivate}>
				<h2>{post.title}</h2>
			</a>
			<div>
				<span class="tag">{post.language}</span>
				{#if post.tags}
					{#each post.tags as tag}
						<span class="tag">{tag}</span>
					{/each}
				{/if}
			</div>
		</header>
		<a href={`p/${post.slug}`} on:mouseenter={activate} on:mouseleave={deactivate}>
			<p>
				{post.excerpt}…
			</p>
		</a>
		<div class="read-more">
			<ContinueReadingButton href={`p/${post.slug}`} {active} />
		</div>
	</div>
</div>

<style>
	.wrapper {
		padding: 1rem;
		display: flex;
		justify-content: center;
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

	header > a {
		color: inherit;
		text-decoration: none;
	}

	h2 {
		font-size: var(--font-size-medium);
		color: var(--color-black);
		margin-bottom: 0.5rem;
		margin-top: 0;
	}

	header > div {
		display: flex;
		align-items: center;
		justify-content: flex-start;
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

	@media (max-width: 700px) {
		.wrapper {
			flex-direction: column;
		}

		.text-content {
			padding: 0;
		}

		.image-wrapper {
			width: 100%;
			height: auto;
			margin-bottom: 1rem;
		}

		.image-wrapper > picture {
			width: 100%;
			height: auto;
		}

		.image-wrapper:after {
			content: '';
			position: absolute;
			display: block;
			left: 0;
			top: calc(100% - 35px);
			width: 70px;
			height: 35px;
			background-color: var(--color-red);
		}

		.read-more {
			display: none;
		}
	}
</style>
