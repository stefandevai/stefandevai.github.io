<script lang="ts">
	import type { PageData } from './$types';
	import { title } from '$lib/config';
	import Hero from './components/hero.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<Hero />

<main>
	<ul>
		{#each data.posts as post}
			<li>
				<header>
					<span>{post.date}</span>
					<a href={`p/${post.slug}`}>
						<h2>{post.title}</h2>
					</a>
					<div>
						<span>{post.language}</span>
						{#if post.tags}
							{#each post.tags as tag}
								<span>{tag}</span>
							{/each}
						{/if}
					</div>
				</header>
				<p>
					{post.excerpt}…
				</p>
			</li>
		{/each}
	</ul>
</main>
