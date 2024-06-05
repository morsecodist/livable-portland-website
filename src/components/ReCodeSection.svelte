<script lang="ts">
	export let title: string;
	export let imageSrc: string;
	export let imageAlt: string;
	export let i: number;

	function kebabCase(str: string) {
		return str.toLowerCase().replace(/\s/g, '-');
	}
</script>

<div id={kebabCase(title)} class="row section">
	<div class="col-md-6 order-md-{i % 2 === 0 ? 1 : 2} m-0 p-0">
		<img src={imageSrc} alt={imageAlt} class="img-fluid" />
	</div>
	<div class="col-md-6 order-md-{i % 2 === 0 ? 2 : 1} m-0 p-0">
		<div class="title-bar">
			<h2>{title}</h2>
		</div>
		<div class="ps-3 pe-3">
			<slot />
		</div>
	</div>
</div>

<style lang="scss">
	.section {
		padding: 20px 0;
	}
	.section:not(:last-child) {
		border-bottom: 1px solid #ddd;
	}

	.title-bar {
		color: white;
		padding: 10px;
		margin-bottom: 10px;
	}

	div.row:nth-child(odd) > div > div.title-bar {
		background-color: var(--bs-primary);
		border-radius: 0 0 20px 0;
	}

	div.row:nth-child(even) > div > div.title-bar {
		background-color: var(--bs-secondary);
		border-radius: 0 0 0 20px;
	}
</style>
