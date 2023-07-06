<script>
	import GitHubIcon from './github.svelte';
	import InstagramIcon from './instagram.svelte';
	import EmailIcon from './email.svelte';
	import StefanDevaiPicture from './stefandevai.jpg';
</script>

<main>
	<h1>About <span class="brand-diamond">◆</span></h1>
	<div class="grid">
		<img src={StefanDevaiPicture} alt="Stefan Devai" loading="lazy" />
		<div class="rectangle" />
		<div class="line-top" />
		<div class="text-wrapper">
			<div class="text">
				<h2>Hi, I'm Stefan Devai :)</h2>
				<p>
					I'm a History student at the Sorbonne University in Paris and a Computer Science
					enthusiast. In this blog I can share some of my programming experiments and historical
					essays I've written.
				</p>
				<p>
					I actively use four languages for different aspects of my life, so you will find here
					posts in Spanish, Portuguese, English and French.
				</p>
				<p>
					I use <a
						href="https://wiki.archlinux.org/index.php/Arch_Linux"
						target="_blank"
						rel="noopener noreferrer">Arch Linux</a
					>
					as my main operating system,
					<a href="https://i3wm.org/" target="_blank" rel="noopener noreferrer">i3wm</a>
					as my window manager and both
					<a href="https://neovim.io/" target="_blank" rel="noopener noreferrer">NeoVim</a>
					/
					<a href="https://www.gnu.org/software/emacs/" target="_blank" rel="noopener noreferrer"
						>GNU Emacs</a
					> as my text editors depending on the programming language.
				</p>
			</div>
		</div>

		<div class="line-bottom" />

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
		margin-top: var(--nav-height);
	}

	.grid {
		grid-template-columns: repeat(10, 1fr);
		grid-template-rows: repeat(11, 2.5rem) auto repeat(3, 2.5rem);
	}

	@media (min-width: 672px) {
		.grid {
			display: grid;
		}
	}

	h1 {
		font-size: var(--font-size-large);
		margin-bottom: 2rem;
	}

	h2 {
		font-size: var(--font-size-medium);
	}

	.brand-diamond {
		font-size: var(--font-size-normal);
		font-weight: 600;
		color: var(--color-red2);
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

	@media (min-width: 672px) {
		img {
			opacity: 0.8;
		}
	}

	.text-wrapper {
		height: 100%;
		z-index: 1;
		grid-column: 4 / span 7;
		grid-row: 2 / span 11;
		padding: 0;
		background-color: rgba(255, 255, 255, 0.7);
	}

	@media (min-width: 672px) {
		.text-wrapper {
			padding: 1rem 2rem;
		}
	}

	@media (min-width: 672px) {
		p:last-child {
			margin: 0;
		}
	}

	.text {
		padding-top: 2rem;
	}

	@media (min-width: 672px) {
		.text {
			padding-top: 1.5rem;
		}
	}

	.line-top {
		grid-column: 8 / span 1;
		grid-row: 1 / span 1;
	}

	@media (min-width: 672px) {
		.line-top {
			border-top: 1px solid var(--color-gray3);
		}
	}

	.line-bottom {
		border-top: 1px solid var(--color-gray3);
		grid-column: 1 / span 3;
		grid-row: 10 / span 1;
	}

	@media (max-width: 672px) {
		.line-bottom {
			display: none;
		}
	}

	.rectangle {
		grid-column: 5 / span 1;
		grid-row: 1 / span 1;
		background-color: var(--color-red2);
	}

	@media (max-width: 672px) {
		.rectangle {
			display: none;
		}
	}

	.social-icons {
		height: 45px;
		grid-column: 3 / -3;
		grid-row: 14 / span 1;
		display: flex;
		justify-content: space-between;
	}

	@media (max-width: 672px) {
		.social-icons {
			margin-top: 2rem;
			margin-bottom: 1rem;
		}
	}

	:global(.social-icons a) {
		height: 100%;
		width: 45px;
	}

	:global(.social-icons svg) {
		height: 100%;
		width: auto;
	}

	:global(.social-icons svg rect) {
		transition: fill 0.1s ease;
	}

	:global(.social-icons svg:hover rect) {
		fill: var(--color-red);
	}
</style>
