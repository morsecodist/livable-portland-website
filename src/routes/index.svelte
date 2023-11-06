<script lang="ts" context="module">
	import type { Post } from '../types/post';
	export async function load({ fetch }) {
		const res = await fetch('/ideas.json');

		if (res.ok) {
			return {
				props: {
					posts: (await res.json()).sort((a: Post, b: Post) => a.rank > b.rank)
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ideas.json`)
		};
	}
</script>

<script lang="ts">
	import ArticleCard from '../components/ArticleCard.svelte';
	export let posts: Post[];
</script>

<svelte:head>
	<title>Urbanist Coalition of Portland</title>
</svelte:head>

<h1 class="text-primary mb-4">Welcome to the Urbanist Coalition of Portland!</h1>
<div class="p-4">
	<h2 class="text-secondary">
		🗳️ Portand's Mayor and City Council Election is on Tuesday, November 7th 🗳️
	</h2>
	<h3>
		Find out how candidates feel about urbanist issues at our <a href="/election-center"
			>Election Center</a
		>!
	</h3>
</div>
<div class="d-flex flex-wrap">
	<div class="pe-4 flex-grow-1 flex-shrink-1" style="min-width: 300px; width: 300px;">
		<h2 class="text-start text-secondary">Who we are</h2>
		<p class="text-start">
			The Urbanist Coalition of Portland (formerly Livable Portland) is a political group with the
			goal of making Portland, Maine more livable for everyone. We recently changed our name from
			"Livable Portland" to avoid confusion with the Maine DSA's campaign of the same name. We
			support middle density, mixed-use neighborhoods, with access to transit and cycling
			infrastructure. This will provide affordable housing, protect our environment, and overall
			make our city a more pleasant and safe place to live and work . Our policies and approach are
			strongly inspired by the YIMBY movement, Strong Towns, and more. If you think building housing
			is a good thing and that you shouldn't need to drive everywhere you will fit right in.
		</p>
	</div>
	<div class="flex-shrink-0 flex-grow-2 text-start ">
		<h2 class="text-start text-secondary">Follow Us</h2>
		<ul class="text-start d-inline-block ps-0">
			<li>
				<a class="social" href="https://discord.gg/EBF8EUN2RK" target="_blank" rel="noreferrer"
					><img src="/discord_icon.png" class="icon" /> Join us on Discord</a
				>
			</li>
			<li>
				<a
					class="social"
					href="https://www.instagram.com/urbanistportland.me/"
					target="_blank"
					rel="noreferrer"><img src="/instagram_icon.png" class="icon" />Follow us on Instagram</a
				>
			</li>
			<li>
				<a
					class="social"
					href="https://www.facebook.com/profile.php?id=100093333520448"
					target="_blank"
					rel="noreferrer"><img src="/facebook_icon.png" class="icon" />Like us on Facebook</a
				>
			</li>
			<li>
				<a
					class="social"
					href="https://twitter.com/urbanistport_me"
					target="_blank"
					rel="noreferrer"><img src="/twitter_icon.png" class="icon" />Follow us on Twitter</a
				>
			</li>
		</ul>
	</div>
</div>

<div class="row g-4 pb-4">
	<h2 class="text-start text-secondary">Our Vision</h2>
	{#each posts as post}
		<div class="col">
			<ArticleCard src={post.image} title={post.title} description={post.description} />
		</div>
	{/each}
</div>

<style lang="scss">
	a.social {
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
