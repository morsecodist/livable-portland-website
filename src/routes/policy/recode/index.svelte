<script lang="ts">
	import ReCodeSection from '../../../components/ReCodeSection.svelte';
	import MailingList from '../../../components/MailingList.svelte';

	// scroll to bottom of page and select first text input
	function getInvolved() {
		window.scrollTo(0, document.body.scrollHeight);
		document.querySelector('input').focus();
	}

	let title = 'UCP - Make Real Change with ReCode';
	let description =
		'Urbanist Coalition of Portland: Make real change with our amendments to ReCode';
	let imageUrl = 'https://urbanistportland.me/LUC_cover_blue_logo.jpg';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={imageUrl} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
</svelte:head>

<h1 class="text-primary">Make Real Change with ReCode</h1>
<div class="d-flex pt-4">
	<div class="text-start pe-2">
		<img class="mobile mb-2" src="/LUC_cover_blue.jpg" alt="ReCode Cover" style="width: 100%;" />
		<p>
			The City of Portland has been in the process of rewriting its zoning code since 2017.
			Portland's city staff has now released <a
				href="https://www.recodeportland.me/second-wave-changes">a complete proposal</a
			> for these changes. Their goal is to pass these changes into law in Fall of 2024. Though updates
			to our zoning code are needed and we are supportive of some of the proposed changes, we think that
			the current proposal is insufficient to address the needs of our city today and into the future.
			The current proposal does not adequately remove barriers to addressing our housing crisis and building
			the walkable, bikeable, transit-accessible neighborhoods that will make our city a pleasant and
			environmentally sustainable place to live.
		</p>
		<p>
			We have assembled four amendments that will allow for for more middle-density, mixed-use
			neighborhoods that are pleasant to live in and move around. These changes make housing more
			affordable, encourage equity, protect the environment, make the administration of our city
			services more resilient and efficient, and bring communities closer together. All of these
			outcomes are goals laid out in Portland’s Comprehensive Plan and One Climate Future Plan.
			These amendments will not stop people from building the types of buildings they build today,
			they will just give people more options of neighborhoods to build and live in. We are
			currently in a housing affordability crisis with an environmental crisis on the horizon; the
			least we can do is allow ourselves to build the kind of city that can rise to face these
			challenges.
		</p>
		<ul>
			<li>
				<a href="/2024.06.03_ReCode_UCP_Memorandum.pdf" target="_blank">Read our memorandum</a>
			</li>
			<li><a href="/2024.06.03_ReCode_One_Pager.pdf" target="_blank">Read our one-pager</a></li>
		</ul>
		<button class="btn btn-primary" on:click={getInvolved}>Get Involved</button>
	</div>
	<div class="text-start desktop">
		<img src="/LUC_cover_blue.jpg" alt="ReCode Cover" style="width: 500px;" />
	</div>
</div>

<div class="container text-start">
	<ReCodeSection title="Transit" imageSrc="/transit.jpg" imageAlt="GP Metro Buses" i={0}>
		<p>
			To get bus routes with <strong class="text-secondary"
				>frequencies of 15 minutes or less</strong
			>
			we need the density to support it. Developing dense housing near transit lines, often called
			<strong class="text-secondary">Transit Oriented Development</strong>, will give us the
			ridership and tax revenue we need to get high quality transit for all of Portland. Portland's
			Comprehensive Plan and One Climate Future Plan identify key corridors that have transit today
			and were identified as places for Transit Oriented Development. Unfortunately, the newly
			proposed Transit Oriented Development zone category from the city staff's current ReCode
			proposal are not applied to these corridors at all. Instead, they are applied to just three
			specific properties in the whole city. This is spot zoning for specific projects, it is not in
			line with the comprehensive plan, and it is not nearly enough Transit Oriented Development to
			give Portland the high quality, frequent public transit it needs.
		</p>
		<p>
			<strong class="text-secondary"
				>We are advocating for applying the new Transit Oriented Development Zone category to all of
				the corridors that the City has already identified in Portland's Comprehensive Plan.</strong
			>
		</p>
	</ReCodeSection>
	<ReCodeSection
		title="Housing"
		imageSrc="/middle-dense-housing.jpg"
		imageAlt="An eight unit building in a residential neighborhood"
		i={1}
	>
		<p>
			Portland made significant progress in allowing for more housing options by <a
				href="/policy/portland_ld2003">implementing state law LD2003</a
			>. This allows for up to four units on all lots on the mainland. However, barriers to building
			denser walkable neighborhoods are still in place:
		</p>
		<ul>
			<li>
				Bonuses to height and setback minimums for affordable housing do not apply in residential
				zones
			</li>
			<li>
				Setbacks, minimum lot sizes, density limits, and height limits make it difficult to build
				middle-density housing
			</li>
			<li>
				The height per story used to calculate height limits doesn't allow for the insulation needed
				for modern, green buildings
			</li>
		</ul>
		<p>
			<strong class="text-secondary"
				>We are advocating for relaxing some of these barriers to bring off-peninsula neighborhoods
				in line with some of the standards of on-peninsula residential neighborhoods like Munjoy
				Hill, Parkside, and the West End.</strong
			>
		</p>
	</ReCodeSection>
	<ReCodeSection
		title="Complete Neighborhoods"
		imageSrc="/recode/Rosefoods.JPG"
		imageAlt="A local neighborhood business"
		i={2}
	>
		<p>
			To build walkable neighborhoods where residents "have access to the basic necessities of daily
			life - <strong class="text-secondary"
				>high quality and affordable housing, schools and other civic functions, food, open space,
				other amenities and services - within a walkable, bikeable distance"</strong
			> we need to allow for neighborhood-scale mixture of uses within residential areas. Building these
			sorts of neighborhoods is a goal of Portland's Comprehensive Plan, which is quoted above. It is
			also a part of Portland's One Climate Future Plan and a goal of ReCode. Unfortunately, the city
			staff's current ReCode proposal does very little to expand neighborhood mixed use. The currently
			proposed changes will only effect a small handful of properties the majority of which are mixed-use
			already.
		</p>
		<p>
			<strong class="text-secondary"
				>We are advocating for allowing small-scale, low-impact uses like shops, restaurants, and
				places of assembly to be allowed in all residential zones.</strong
			>
		</p>
	</ReCodeSection>
	<ReCodeSection
		title="Simplicity"
		imageSrc="/recode/13_ease_the_transportation_demand_management.png"
		imageAlt="Paperwork"
		i={3}
	>
		<p>
			To build more housing we need to ensure that our city's approval process can keep up. Under
			city staff's current ReCode proposal only buildings with four units or fewer can go through
			the <strong class="text-secondary">faster, minor site plan review</strong> process. Any other building
			will be considered a major site plan whether it is 5 units or 500 units. We can also make it easier
			to determine if a project is allowed by zoning by making our zoning code simpler. Even with the
			currently proposed changes Portland has seven residential zones. Combining zones could simplify
			things for builders and reviewers alike. Lastly, the current proposal removes the option of locking
			in current zoning for a phased project. This makes it risky and complicated to build a project
			because the rules may change during the project.
		</p>
		<p>
			<strong class="text-secondary"
				>We are advocating for allowing more projects to go through minor site plan review based on
				square footage and not units, combining residential zones, combining low-impact industrial
				and mixed-use zones, and preserving the ability to lock in zoning for a multi-phased
				project.</strong
			>
		</p>
	</ReCodeSection>
</div>
<h2 class="text-primary">Sign Up to Get Involved!</h2>
<MailingList listName="recode" />

<style lang="scss">
	a {
		color: #f3b61f;
		text-decoration: none;
		flex-grow: 1;
		max-width: 400px;
	}
</style>
