<script lang="ts">
	import posters from './posters';
</script>

<ul>
	{#each posters as poster}
		<li>
			<a href={poster.url} target="_blank" rel="noopener noreferrer">
				<img src={poster.thumbnail} alt={poster.title} loading="lazy" />
			</a>
		</li>
	{/each}
</ul>

<style>
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 1rem;
		list-style: none;
		padding: 0;
		margin: 0 0 0 0;
	}

	li {
		height: 250px;
	}

	a {
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: grid;
		grid-template-columns: 2rem 2rem 1fr 1rem;
		grid-template-rows: 1rem 1fr 1rem;
		border-radius: var(--border-radius-main);
	}

	img {
		grid-column: 1 / -1;
		grid-row: 1 / -1;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transform-origin: center;
		transition: transform 0.25s ease-in;
	}

	a:hover > img {
		filter: grayscale(0);
		transform: scale(1.2);
		transition: transform 5s ease-out;
	}
</style>
