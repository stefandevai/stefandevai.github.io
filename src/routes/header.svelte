<nav>
	<a href="/" class="logo"><img src="$lib/assets/stefan-devai-logo.svg" alt="go to home" /></a>
	<a href="/about">About</a>
</nav>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 2rem;
		height: var(--nav-height);
		border-bottom: 1px solid var(--color-border);
		background-color: var(--color-white);
		position: absolute;
		width: 100vw;
		z-index: 2;
		top: 0;
	}

	@media (max-width: 768px) {
		nav {
			padding: 0 1rem;
		}
	}

	img {
		width: 140px;
		height: 21px;
	}

	.logo {
		width: 140px;
		height: auto;
	}

	a {
		color: #111;
		text-decoration: none;
		font-size: var(--font-size-small);
	}
</style>
