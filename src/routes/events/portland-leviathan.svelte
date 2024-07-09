<script>
	const presentations = [
		{
			name: 'Ian Jacob',
			subtitle: 'Moderator',
			slides: '/leviathan-presentations/Ian Jacob Data.pdf'
		},
		{
			name: 'Julie Larry',
			subtitle: 'On the history of 295 in Portland',
			slides: '/leviathan-presentations/Julie Libbytown Slides-History.pdf'
		},
		{
			name: 'Community Representatives',
			subtitle:
				'Eyewitnesses to history - Moderated by Richard Barringer, Emeritus Professor at Muskie School of Public Service at the University of Southern Maine'
		},
		{
			name: 'Dayea Shim (AICP) Program Coordinator, GrowSmart Maine',
			subtitle: 'On highway removal throughout the world',
			slides: '/leviathan-presentations/Dayea Highway Removals_Shim.pdf'
		},
		{
			name: 'Ryan Johnson, Associate Urban Planner, Austin TX',
			subtitle: 'A new vision of the 295 corridor',
			slides: '/leviathan-presentations/Ryan NEW PortlandParkway_RJohnson_06-2024_V2_reduced.pdf'
		},
		{
			name: 'Beth Osborne, Transportation for America',
			subtitle: 'On the national movement to make smarter transportation policies',
			slides: '/leviathan-presentations/Beth Osborne PortlandLeviathan_06_20.pdf'
		},
		{
			name: 'Myles Smith, Mainers for Smarter Transportation',
			subtitle: 'On the proposed highway expansion',
			slides: '/leviathan-presentations/Myles Gorham Connector at the Portland Leviathan Event.pdf'
		}
	];
</script>

<svelte:head>
	<title>UCP - Portland Leviathan</title>
</svelte:head>

<h1 class="text-primary">(Past) Portland Leviathan</h1>
<p>Conference on the Past, Present, & Future of Interstate 295</p>
<p>Thursday June 20th, 2024 from 5:30-8:30</p>
<p>Jewish Community Alliance of Southern Maine: 1342 Congress Street, Portland Maine, 04102</p>

<img src="/leviathan.png" alt="295 Leviathan" />

<div class="text-start">
	<p>
		In the 20th century, cities across America were scarred by urban highways – and Portland Maine
		is no exception. Just as elsewhere, I-295 was routed through underserved neighborhoods and
		communities of color permanently altering the city's landscape. During this time, the city also
		experienced the destruction of the iconic Union Station, the demolition of a thriving housing
		corporation, and the eradication of Maine's largest African American community at the time.
	</p>

	<p>
		Today, Portlanders are working to undo the damage and restore our city. Many citizen campaigns
		have centered around reckoning with the legacy of I-295, by advocating for the restoration of a
		walkable human scale city and the corollary benefits of environmental justice, economic
		development, vibrancy, and beauty.
	</p>

	<p>
		The efforts have been largely supported by the city government, which is seeking two
		Reconnecting Communities grants from the U.S. Department of Transportation to repair the
		neighborhood fabric at Franklin Street and at exit 5. However, as advocates work along the
		margins, the root problem, I-295 itself, is often regarded as eternal and immutable.
	</p>

	<p class="lead pt-2">
		Portland Leviathan 2024 will look beyond isolated projects to envision a bolder, better future
		for the I-295 corridor and our city as a whole.
	</p>

	<h2 class="text-primary">Presentations</h2>

	{#each presentations as { name, subtitle, slides }}
		<div class="mb-2">
			<h5 class="fw-bold">{name}</h5>
			<p class="fst-italic">{subtitle}</p>
			{#if slides}
				<div>
					<embed src={slides} type="application/pdf" />
				</div>
			{/if}
		</div>
	{/each}

	<h2 class="text-primary">Bios</h2>

	<p>
		<b>Ryan Johnson</b> is an urban planner and designer from Austin, TX. He believes that good design
		and planning are critical for cities of all sizes to be diverse, active, equitable and engaging places.
		Before joining Code Studio, Ryan worked in both the public and non-profit sectors on land use planning
		and active transportation. His experience includes interpreting zoning ordinances, contributing to
		comprehensive plans and streetscape standards, and participating in multiple affordable housing design
		competitions. Ryan's research has focused on land use regulation, affordable housing, active transportation,
		suburban retrofitting, and streetscape design. In his personal life, Ryan serves on the city of Austin's
		Planning Commission, and enjoys biking, cooking, and traveling to new places.
	</p>
	<p>
		<b>Dayea Shim</b>is senior planner who specializes in connecting community members on planning
		issues related to transportation, housing, and resiliency.
	</p>
	<p>
		<b>Myles Smith</b> is a longtime community advocate and non-profit leader in both international and
		community development. Myles's work has focused on supporting journalists and open access to the
		internet, as well as trade and economic development in Central Asia. He led the Maine Broadband Coalition,
		an advocacy and public education group devoted to expanding access to high speed internet, particularly
		in rural areas. Myles is a member of a number of Portland-based and statewide advocacy coalitions
		for complete streets, cycling safety, and public transportation. He is the volunteer facilitator
		of an ad hoc group of advocates called Mainers for Smarter Transportation, which is fighting the
		expansion of the Maine Turnpike from South Portland to Gorham. A native of greater Portland, Myles
		returned to Portland in 2022 after over two decades in Boston, Washington DC, Russia, Turkmenistan,
		and Kyrgyzstan.
	</p>
	<p>
		<b>Julie Ann Larry</b> is the former Director of Advocacy at Greater Portland Landmarks. An architectural
		historian, Julie has researched and presented on the historic development of several of Portland's
		neighborhoods, including those impacted by I-295 construction and urban renewal projects. Prior to
		joining Landmarks, Julie was a partner for eighteen years at ttl-architects where she oversaw the
		restoration of the Portland Observatory, the Castle-in-the-Park at Deering Oaks, and numerous other
		preservation projects in New England. She is currently the Senior Architectural Historian at Black
		Diamond Consultants.
	</p>

	<h2 class="text-primary">Partner Organizations</h2>

	<ul>
		<li>Better Biddeford</li>
		<li>Franklin Reclamation Authority</li>
		<li>Grow Smart Maine</li>
		<li>Libbytown Neighborhood Association</li>
		<li>Portland Bicycle Pedestrian Advisory Committee</li>
		<li>Portland Trails</li>
		<li>Urbanist Coalition of Portland</li>
		<li>and more</li>
	</ul>

	<h2 class="text-primary">Sponsors</h2>

	<ul>
		<li>Factory 3</li>
		<li>Grow Smart Maine</li>
		<li>Maine Health Caring Communities Grant</li>
		<li>Merchant & Co.</li>
		<li>Portland Trails</li>
		<li>Redfern</li>
	</ul>
</div>

<style>
	img {
		max-width: 100%;
	}

	embed {
		width: 100%;
		height: 600px;
	}

	@media (max-width: 768px) {
		embed {
			height: 300px;
		}
	}
</style>
