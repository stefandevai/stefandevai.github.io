<script>
	import { title } from '$lib/config';
	import TwoLinePattern from '$lib/components/two-line-pattern.svelte';
	import GitHubIcon from './github.svelte';
	import InstagramIcon from './instagram.svelte';
	import EmailIcon from './email.svelte';
	import StefanDevaiPicture from './stefandevai.jpg';
</script>

<svelte:head>
	<title>About | {title}</title>
</svelte:head>

<TwoLinePattern />
<main>
	<h1>About me <span class="brand-diamond">◆</span></h1>
	<div class="grid">
		<img src={StefanDevaiPicture} alt="Stefan Devai" loading="lazy" />
		<div class="text-wrapper">
			<h2>Hi, I'm Stefan Devai</h2>
			<p>
				I'm a Mexican-Brazilian Software Engineer working at Clue Insights and a History student at
				the Sorbonne University in Paris. This blog is mostly about History, politics, random coding
				experiments, and other subjects that I find interesting.
			</p>
			<p>
				I have an obsession with understanding the patterns and dynamics that shape society from a
				Marxist perspective. Authors like Domenico Losurdo, E. P. Thompson, Antonio Gramsci, Ruy
				Mauro Marini, and Fernand Braudel have shaped my current perception of the world.
			</p>
			<p>
				Regarding programming, I'm a big fan of the Unix philosophy, C, LISP, Neovim, and Svelte.
				Overall, I have an inclination towards minimalist and performant software.
			</p>
			<p>
				If you want to contact me, don't hesitate to reach out via email or any other social network
				listed here.
			</p>
		</div>

		<div class="social-icons">
			<a
				href="https://github.com/stefandevai"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="GitHub link"><GitHubIcon /></a
			>
			<a
				href="https://instagram.com/stedevai"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Instagram link"><InstagramIcon /></a
			>
			<a href="mailto:stefandevai@posteo.me" aria-label="Email Link"><EmailIcon /></a>
		</div>
	</div>
</main>

<style>
	main {
		max-width: 900px;
	}

	.grid {
		grid-template-columns: repeat(10, 1fr);
		grid-template-rows: repeat(11, 2.5rem) 1fr;
	}

	h1 {
		font-size: var(--font-size-large);
		margin-bottom: 1.5rem;
		margin-top: 0;
	}

	h2 {
		font-size: var(--font-size-medium);
		margin-top: 0;
	}

	img {
		width: 100%;
		grid-column: 1 / span 4;
		grid-row: 1 / span 8;

		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
	}

	.text-wrapper {
		height: 100%;
		z-index: 1;
		grid-column: 5 / span 7;
		grid-row: 1 / span 12;
		padding-top: 2rem;
	}

	.social-icons {
		height: 48px;
		grid-column: 1 / span 4;
		grid-row: 9 / span 1;
		display: flex;
		justify-content: space-between;
		margin-top: 3rem;
		margin: 3rem 1rem 0 1rem;
	}

	:global(.social-icons a) {
		height: 100%;
		width: 48px;
	}

	:global(.social-icons a:not(:last-child)) {
		margin-right: 2rem;
	}

	:global(.social-icons svg) {
		height: 100%;
		width: auto;
	}

	:global(.social-icons svg:hover > path:first-of-type) {
		fill: var(--color-red);
	}

	:global(.social-icons svg:active > path:first-of-type) {
		fill: var(--color-red4);
	}

	@media (min-width: 672px) {
		.grid {
			display: grid;
		}

		.text-wrapper {
			padding: 0 0 0 2rem;
		}

		p:last-child {
			margin: 0;
		}

		.social-icons {
			justify-content: flex-start;
			height: 24px;
			margin: 1rem 0 0 0;
		}

		:global(.social-icons a) {
			width: 24px;
			height: 100%;
		}
	}
</style>
