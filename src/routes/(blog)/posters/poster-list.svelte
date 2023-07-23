<script lang="ts">
	import posters from './posters';
</script>

<ul>
	{#each posters as poster}
		<li>
			<a href={poster.url} target="_blank" rel="noopener noreferrer">
				<h2>{poster.title}</h2>
				<div class="red-stripe" />
				<div class="gray-stripe-1" />
				<div class="gray-stripe-2" />
				<div class="full-cover" />
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
		margin: 3rem 0 0 0;
	}

	li {
		background-color: gray;
		height: 250px;
	}

	a {
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: grid;
		grid-template-columns: 2rem 2rem 1fr 1rem;
		grid-template-rows: 1rem 1fr 1rem;
	}

	h2 {
		grid-column: 3 / span 1;
		grid-row: 2 / span 1;
		margin: 0 0 0 1rem;
		color: var(--color-white);
		font-size: var(--font-size-medium);
		font-weight: 300;
		z-index: 3;
	}

	a:hover > h2 {
		opacity: 0;
	}

	img {
		grid-column: 1 / -1;
		grid-row: 1 / -1;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: grayscale(1);
		transform-origin: center;
		transition: transform 0.25s ease-in;
	}

	a:hover > img {
		filter: grayscale(0);
		transform: scale(1.2);
		transition: transform 5s ease-out;
	}

	.red-stripe {
		grid-column: 2 / span 1;
		grid-row: 1 / -1;
		background-color: var(--color-red);
		mix-blend-mode: darken;
		z-index: 2;
	}

	a:hover > .red-stripe {
		opacity: 0;
	}

	.gray-stripe-1 {
		grid-column: 3 / -1;
		grid-row: 1 / -1;
		background-color: var(--color-black);
		opacity: 0.8;
		z-index: 2;
	}

	a:hover > .gray-stripe-1 {
		opacity: 0;
	}

	.gray-stripe-2 {
		grid-column: 1 / span 1;
		grid-row: 1 / -1;
		background-color: var(--color-black);
		opacity: 0.8;
		z-index: 2;
	}

	a:hover > .gray-stripe-2 {
		opacity: 0;
	}

	.full-cover {
		grid-column: 1 / -1;
		grid-row: 1 / -1;
		backdrop-filter: blur(2px);
		transition: transform 0.15s ease-in;
		z-index: 1;
	}

	a:hover > .full-cover {
		backdrop-filter: none;
	}
</style>
