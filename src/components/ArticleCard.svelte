<script lang="ts">
	export let title: string;
	export let description: string;
	export let src: string;
	export let href: string | undefined = undefined;
	export let passed: boolean = false;
</script>

<div class="card d-inline-flex flex-shrink-1" style="width: 30rem; height: 100%;">
	{#if passed}
		<div class="ribbon ribbon-top-left">
			<span>Passed</span>
		</div>
	{/if}
	<div class="image-container {passed ? 'mask' : ''}">
		<img {src} class="mask card-img-top" alt={title} />
	</div>
	<div class="card-body">
		<h5 class="card-title">{title}</h5>
		<p class="card-text">{description}</p>
	</div>
	{#if href}
		<div class="card-footer text-muted text-end">
			<a {href} class="btn btn-primary">Learn More</a>
		</div>
	{/if}
</div>

<style>
	/* common */
	.ribbon {
		width: 150px;
		height: 150px;
		overflow: hidden;
		position: absolute;
		z-index: 1;
	}
	.ribbon::before,
	.ribbon::after {
		position: absolute;
		z-index: -1;
		content: '';
		display: block;
		border: 5px solid #2980b9;
	}
	.ribbon span {
		position: absolute;
		display: block;
		width: 225px;
		padding: 15px 0;
		background-color: var(--bs-success);
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
		color: #fff;
		font: 700 18px/1 'Lato', sans-serif;
		text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
		text-transform: uppercase;
		text-align: center;
	}

	/* top left*/
	.ribbon-top-left {
		top: -10px;
		left: -10px;
	}
	.ribbon-top-left::before,
	.ribbon-top-left::after {
		border-top-color: transparent;
		border-left-color: transparent;
	}
	.ribbon-top-left::before {
		top: 0;
		right: 0;
	}
	.ribbon-top-left::after {
		bottom: 0;
		left: 0;
	}
	.ribbon-top-left span {
		right: -25px;
		top: 30px;
		transform: rotate(-45deg);
	}

	.mask::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(var(--bs-success-rgb), 0.4);
		pointer-events: none; /* Allows clicking through the overlay */
	}
</style>
