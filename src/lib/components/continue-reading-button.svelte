<script lang="ts">
	export let href: string;
	export let active = false;
</script>

<a {href}>
	<div class:active>Continue reading ⟶</div>
</a>

<style>
	a {
		position: relative;
		display: block;
		width: 200px;
		height: 20px;
		text-align: right;
	}

	div {
		position: absolute;
		display: block;
		font-size: var(--font-size-very-small);
		transition: opacity 0.15s ease-in, right 0.25s ease-in-out;
		opacity: 0;
		right: 100px;
		width: 100%;
	}

	.active,
	a:hover > div {
		opacity: 1;
		right: 0;
	}
</style>
