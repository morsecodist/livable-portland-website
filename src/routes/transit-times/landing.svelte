<script lang="ts">
	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const lat = position.coords.latitude;
				const lon = position.coords.longitude;
				window.location.href = `/transit-times/closest?lat=${lat}&lon=${lon}`;
			});
		} else {
		}
	}
</script>

<button on:click={getLocation}>Closest Stop</button>
