<script lang="ts">
	import ArticleCard from '../../components/ArticleCard.svelte';
</script>

<svelte:head>
	<title>UCP - Newsletters</title>
</svelte:head>

<h1 class="text-primary">Urbanist Coalition of Portland Policy</h1>

<p>
	These are our current policy recommendations and initiatives. Proposing and analyzing policy is
	one of the core roles of our group. Use this page to keep up to date on the policies we are
	working on and learn more about them. If you have any feedback or questions please reach out to us
	on social media or at <a href="mailto:contact@urbanistportland.me">contact@urbanistportland.me</a
	>.
</p>

<div class="mt-4 text-center row g-4 pb-4">
	<div class="col">
		<ArticleCard
			src="/recode/11_simplify_zones.png"
			title="ReCode Recommendations"
			description="Portland is in the process of changing it's zoning code. These are our recommendations for how we can make the most out of this opportunity to improve our neighborhoods."
			href="/policy/recode"
		/>
	</div>
	<div class="col">
		<ArticleCard
			src="/recode/3_allow_gentle_density.png"
			title="Comply with the Spirit of LD2003"
			description="Portland must update our land use code by January 1st 2024 to comply with the state law, LD2003. This law intends to expand housing opportunities but Portland's implementation adds additional restrictions that undermine this goal. We must ammend this proposal to ensure it complies with the spirit of the law."
			href="/policy/portland_ld2003"
		/>
	</div>
</div>

