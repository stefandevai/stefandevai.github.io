<header>
	<h1>TEST</h1>
	<figure>
		<div>
			<img
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/1024px-Solid_black.svg.png"
				alt=""
			/>
		</div>
		<figcaption>The credits for the picture</figcaption>
	</figure>
</header>

<style>
	header {
		/* height: calc(100dvh - var(--nav-height) - 4rem); */
		height: 500px;
		background: gray;
		margin: 0;
		display: flex;
		justify-content: space-between;
	}

	figure {
		height: 100%;
		max-width: 450px;
	}

	figure > div {
		flex: 1;
	}

	img {
		width: 100%;
		aspect-ratio: 1 / 1;
	}
</style>
