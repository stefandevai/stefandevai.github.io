<script lang="ts">
	import { title } from '$lib/config';
</script>

<svelte:head>
	<title>Clase Obrera | {title}</title>
</svelte:head>

<main>
	<div>
		<p>
			<span>si la</span>
			<span>clase</span>
			<span>obrera</span>
			<span>todo lo produce,</span>
		</p>

		<p>
			<span>a la</span>
			<span>clase</span>
			<span>obrera</span>
			<span>todo le pertenece.</span>
		</p>
	</div>
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
		display: grid;
		grid-template-columns: 4rem 1fr 4rem;
		grid-template-rows: 2rem 1fr 1fr 2rem;
		font-family: 'Helvetica', sans-serif;
	}
	div {
		writing-mode: vertical-rl;
		transform: rotate(-180deg);
		grid-column: 2 / span 1;
		grid-row: 3 / span 1;
	}
	p {
		font-size: 1.5rem;
		margin-left: 4rem;
	}
	span {
		display: block;
	}
</style>
