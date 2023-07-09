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
			/>
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
			font-size: var(--font-size-medium2);
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

		/* .wrapper { */
		/* 	flex-direction: column-reverse; */
		/* } */

		/* .text-content { */
		/* 	padding: 0; */
		/* } */

		/* .text-content > a { */
		/* 	display: none; */
		/* } */

		/* .image-wrapper { */
		/* 	flex-basis: 250px; */
		/* 	height: 250px; */
		/* 	/1* width: 100%; *1/ */
		/* 	/1* height: auto; *1/ */
		/* 	margin-bottom: 1rem; */
		/* } */

		/* /1* .image-wrapper > picture { *1/ */
		/* /1* 	width: 100%; *1/ */
		/* /1* 	height: auto; *1/ */
		/* /1* } *1/ */

		/* .image-wrapper:after { */
		/* 	content: ''; */
		/* 	position: absolute; */
		/* 	display: block; */
		/* 	right: 0; */
		/* 	top: calc(100% - 35px); */
		/* 	width: 70px; */
		/* 	height: 35px; */
		/* 	background-color: var(--color-red); */
		/* } */

		/* .read-more { */
		/* 	display: none; */
		/* } */
	}
</style>
