<script lang="ts">
	export let direction: 'left' | 'right';
	export let href: string;
</script>

<a {href}>
	<div class="background" />
	<div class="arrow-right" />
</a>

<style>
	a {
		display: block;
		width: 1rem;
		height: 1rem;
		position: relative;
	}

	a:hover > .background {
		transform: rotate(45deg);
	}

	.background {
		width: 1rem;
		height: 1rem;
		background: var(--color-red2);
		position: absolute;
		top: 0;
		left: 0;
		transition: transform 0.2s ease-in;
	}

	.arrow-right:before {
		content: '';
		display: block;
		width: 0.3rem;
		height: 2px;
		background: var(--color-white);
		z-index: 1;
		position: absolute;
		top: 0.35rem;
		left: 0.4rem;
		transform: rotate(45deg);
	}

	.arrow-right:after {
		content: '';
		display: block;
		width: 0.3rem;
		height: 2px;
		background: var(--color-white);
		z-index: 1;
		position: absolute;
		top: 0.5rem;
		left: 0.4rem;
		transform: rotate(135deg);
	}
</style>
