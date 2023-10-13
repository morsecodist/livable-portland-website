<script lang="ts">
	export let title: string;
	export let description: string;
	export let src: string;
	export let href: string | undefined = undefined;
</script>

<div class="card d-inline-flex" style="width: 30rem; height: 100%;">
	<img {src} class="card-img-top" alt={title} />
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
