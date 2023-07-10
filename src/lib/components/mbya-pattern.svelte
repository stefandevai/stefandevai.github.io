<div />

<style>
	div {
		position: relative;
		height: 50px;
		border-top: 5px solid var(--color-red3);
		border-bottom: 5px solid var(--color-red3);
	}

	div:after {
		content: '';
		position: absolute;
		top: 5px;
		width: 100%;
		height: 30px;
		background-image: repeating-linear-gradient(
				45deg,
				var(--color-red3) 25%,
				transparent 25%,
				transparent 75%,
				var(--color-red3) 75%,
				var(--color-red3)
			),
			repeating-linear-gradient(
				135deg,
				var(--color-red3) 25%,
				var(--color-white) 25%,
				var(--color-white) 75%,
				var(--color-red3) 75%,
				var(--color-red3)
			);
		background-size: 20px 30px;
		/* background-size: 60px; */
	}
</style>
