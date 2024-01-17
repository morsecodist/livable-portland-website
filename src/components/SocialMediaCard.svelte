<script lang="ts">
	export let title = 'Follow Us';
	export let discordLink: string = null;
	export let instagramLink: string = null;
	export let facebookLink: string = null;
	export let twitterLink: string = null;
</script>

<div>
	<h2 class="text-start text-secondary">{title}</h2>
	<ul class="text-start d-inline-block ps-0">
		{#if discordLink}
			<li>
				<a href={discordLink} target="_blank" rel="noreferrer"
					><img src="/discord_icon.png" class="icon" alt="Discord Icon" /> Join us on Discord</a
				>
			</li>
		{/if}
		{#if instagramLink}
			<li>
				<a href={instagramLink} target="_blank" rel="noreferrer"
					><img src="/instagram_icon.png" class="icon" alt="Instagram Icon" />Follow us on Instagram</a
				>
			</li>
		{/if}
		{#if facebookLink}
			<li>
				<a href={facebookLink} target="_blank" rel="noreferrer"
					><img src="/facebook_icon.png" class="icon" alt="Facebook Icon" />Like us on Facebook</a
				>
			</li>
		{/if}
		{#if twitterLink}
			<li>
				<a href={twitterLink} target="_blank" rel="noreferrer"
					><img src="/twitter_icon.png" class="icon" alt="Twitter Icon" />Follow us on Twitter</a
				>
			</li>
		{/if}
	</ul>
</div>

<style>
	a {
		text-decoration: none;
		color: black;
	}

	img.icon {
		width: 2em;
		height: 2em;
		margin-right: 0.5em;
	}

	ul {
		text-align: left;
	}

	/* remove bullet from li */
	ul li {
		list-style-type: none;
	}
</style>
