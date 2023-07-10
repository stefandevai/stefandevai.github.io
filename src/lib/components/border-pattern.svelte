<div />

<style>
	div {
		position: relative;
		height: 50px;
		border-top: 5px solid var(--color-red2);
		border-bottom: 5px solid var(--color-red2);
	}

	div:after {
		content: '';
		display: block;
		position: absolute;
		top: 5px;
		left: 0;
		width: 100%;
		height: 30px;
		background-image: repeating-linear-gradient(
				45deg,
				var(--color-red2) 25%,
				transparent 25%,
				transparent 75%,
				var(--color-red2) 75%,
				var(--color-red2)
			),
			repeating-linear-gradient(
				135deg,
				var(--color-red2) 25%,
				var(--color-white) 25%,
				var(--color-white) 75%,
				var(--color-red2) 75%,
				var(--color-red2)
			);
		background-position: 0 0, 0 0;
		background-size: 20px;
	}
</style>
