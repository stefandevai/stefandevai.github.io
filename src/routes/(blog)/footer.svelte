<script>
	import MbyaPattern from '$lib/components/mbya-pattern.svelte';
</script>

<footer>
	<MbyaPattern />
	<div>
		<span>
			View website
			<a
				href="https://github.com/stefandevai/stefandevai.github.io/"
				target="_blank"
				rel="noopener noreferrer"
			>
				source code
			</a>
		</span>
		&nbsp;—&nbsp;
		<div>
			<a href="https://github.com/stefandevai" target="_blank" rel="noopener noreferrer">github</a>
			&nbsp;·&nbsp;
			<a href="https://instagram.com/stedevai" target="_blank" rel="noopener noreferrer"
				>instagram</a
			>
			&nbsp;·&nbsp;
			<a href="mailto:stefandevai@posteo.me" target="_blank" rel="noopener noreferrer">email</a>
			&nbsp;·&nbsp;
			<a href="/rss.xml" target="_blank" rel="noopener noreferrer">rss</a>
		</div>
	</div>
</footer>

<style>
	footer > div {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 3rem 1rem;
		font-size: var(--font-size-small);
		color: var(--color-gray1);
	}

	@media (max-width: 450px) {
		footer > div {
			padding: 3rem 1rem;
			flex-direction: column;
		}
	}
</style>
