<script>
	export let title = 'Event Title';
	export let subtitle = 'Event Subtitle';
	export let when = 'WHEN';
	export let where = 'WHERE';
	export let link = '#';
</script>

<a href={link} class="card text-start text-decoration-none">
	<div class="card-body">
		<h5 class="card-title text-secondary fw-bold" style="text-decoration: none;">{title}</h5>
		<h6 class="card-subtitle mb-2 text-muted">{subtitle}</h6>
		<p class="card-text">
			<strong>When:</strong>
			{when} <br />
			<strong>Where:</strong>
			{where}
		</p>
	</div>
</a>

<style>
	.card {
		margin: 1rem;
		color: black;
	}

	.card:hover {
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		transition: box-shadow 0.3s ease-in-out;
	}
</style>
