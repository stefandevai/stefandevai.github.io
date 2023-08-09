<script lang="ts">
	import { page } from '$app/stores';

	$: current = $page.url.pathname.split('/').pop();
	/* <li class:selected={current === 'posters'}> */
	/* 	<a href="/posters">Posters</a> */
	/* </li> */
</script>

<nav>
	<a href="/" class="logo"><img src="$lib/assets/stefan-devai-logo.svg" alt="go to home" /></a>
	<ul>
		<li class:selected={current === 'about'}>
			<a href="/about">About</a>
		</li>
	</ul>
</nav>

<style>
	nav {
		display: flex;
		align-items: center;
		padding: 0 2rem;
		height: var(--nav-height);
		background-color: var(--color-white);
	}

	@media (max-width: 768px) {
		nav {
			padding: 0 1rem;
		}
	}

	nav > a > img {
		width: 140px;
		height: 21px;
	}

	.logo {
		width: 140px;
		height: auto;
	}

	a {
		color: var(--color-black);
		text-decoration: none;
		font-size: var(--font-size-small);
		letter-spacing: 1px;
	}

	a:hover {
		color: var(--color-gray3);
	}

	ul {
		list-style-type: none;
		margin: 0;
		flex: 1;
		text-align: right;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	li:not(:first-child) {
		margin-left: 2rem;
	}

	li.selected > a {
		text-decoration: underline;
		text-decoration-color: var(--color-gray3);
		text-underline-offset: 4px;
	}

	li.selected > a:hover {
		color: var(--color-black);
	}
</style>
