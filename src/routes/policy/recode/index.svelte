<script lang="ts">
    const topics = [{
        title: 'Allow Neighborhood Businesses',
        description: 'Allow small, low-impact, first-floor, businesses in all residential neighborhoods.',
        image: '/recode/1_allow_neighborhood_businesses.png',
    },{
        title: 'Allow Multi-Family Housing',
        description: 'Allow multi-family housing in all residential neighborhoods.',
        image: '/recode/2_allow_multi-family_housing.png',
    },{
        title: 'Allow Gentle Density',
        description: 'Remove lot area per dwelling unit requirements.',
        image: '/recode/3_allow_gentle_density.png',
    },{
        title: 'Allow Higher Quality Floors',
        description: 'Allow each story to be slightly taller to make room for ventilation, insulation, and larger windows for more light.',
        image: '/recode/4_allow_higher_quality_floors.png',
    },{
        title: 'Measure Heights from Sidewalks',
        description: 'Measure building heights from the sidewalk they are on, not the average grade of the lot.',
        image: '/recode/5_measure_heights_from_sidewalks.png',
    }, {
        title: 'Reduce Setback Requirements',
        description: 'Reduce setback requirements in residential neighborhoods.',
        image: '/recode/6_reduce_setback_requirements.png',
    }, {
        title: 'Establish Parking Maximums',
        description: 'Establish parking maximums on the peninsula to prevent car-dependent development.',
        image: '/recode/7_establish_parking_maximums.png',
    }, {
        title: 'Expand Bicycle Parking',
        description: 'Expand bicycle parking minimums.',
        image: '/recode/8_expand_bicycle_parking.png',
    }, {
        title: 'Allow Renting Rooms with New Kitchens and Bathrooms',
        description: 'Remove the restriction on renting rooms in your home if you have built a new kitchen or bathroom in the last two years.',
        image: '/recode/9_allow_renting_rooms_with_new_kitchens_and.png',
    }, {
        title: 'Allow More Four-Story Buildings',
        description: 'Allow more four-story buildings in residential neighborhoods.',
        image: '/recode/10_allow_more_four-story_buildings.png',
    }, {
        title: 'Simplify Zones',
        description: 'Combine some of our residential zones to simplify the code.',
        image: '/recode/11_simplify_zones.png',
    }, {
        title: 'Empower Neighbors to Reduce Setbacks',
        description: 'Allow neighbors to decide amongst themselves what setbacks make sense for their block.',
        image: '/recode/12_empower_neighbors_to_reduce_setbacks.png',
    }, {
        title: 'Ease the Transportation Demand Management',
        description: 'Don\'t require a transportation demand management plan just to use the parking minimum exception for building close to transit.',
        image: '/recode/13_ease_the_transportation_demand_management.png',
    }, {
        title: 'Allow Renting More Rooms',
        description: 'Allow people to rent up to four rooms in their home instead of just two.',
        image: '/recode/14_allow_renting_more_rooms.png',
    }, {
        title: 'Allow Co-Living',
        description: 'Create a new type of housing called "co-living" that allows people to rent individual rooms in a building with shared kitchens and bathrooms.',
        image: '/recode/15_allow_coliving.png',
    }, {
        title: 'Allow Smaller Lots',
        description: 'Allow all lots in residential neighborhoods to be split.',
        image: '/recode/16_allow_smaller_lots.png',
    }, {
        title: 'Allow More Lot Coverage',
        description: 'Allow buildings to cover up to 60% of their lots.',
        image: '/recode/17_allow_more_lot_coverage.png',
    }]
</script>


<style lang="scss">
    .image-container {
        position: relative;
        width: 300px;
        overflow: hidden;
        cursor: pointer;
    }

    .image-container img {
        width: 100%;
        height: 100%;
    }

    .image-text {
        position: absolute;
        bottom: -100%; /* Start from below the image */
        width: 100%;
        background: rgba(0, 0, 0, 0.75);
        color: #fff;
        transition: bottom 0.3s ease-in-out; /* Animation */
        padding: 10px;
        box-sizing: border-box;
        text-align: center;
    }

    .image-container:hover .image-text {
        bottom: 0;
        height: 100%;
    }

    a {
        text-decoration: none;
        flex-grow: 1;
        max-width: 400px;
    }
</style>

<svelte:head>
    <title>UCP - Recode</title>
</svelte:head>

<h1 class="text-primary">ReCode Recommendations</h1>
<div class="d-flex p-4">
    <div class="text-start p-2">
        <img class="mobile mb-2" src="/recode/Rosefoods.JPG" alt="Neighborhood example" style="width: 100%;"/>
        <p>The City of Portland is in the process of rewriting its zoning code. We applaud the ongoing work as well as the work done in Phase One of this ReCode process, which simplified our code, allowed the construction of accessory dwelling units, and took the first step towards transit-oriented development. However, from following the process, we are concerned the proposed changes for ReCode Phase Two will not take full advantage of the rare opportunity we have to improve our city. This is why we have put together our own proposal of code changes.</p>
        <p>The intention of these zoning code changes is to allow for more middle-density, mixed-use neighborhoods that are pleasant to live in and move around. These changes make housing more affordable, encourage equity, protect the environment, make the administration of our city services more resilient and efficient, and bring communities closer together. All of these outcomes are goals laid out in Portland’s Comprehensive Plan. The recommendations in this document will not stop people from building the types of buildings they build today, they will just give people more options of neighborhoods to build and live in. We are currently in a housing affordability crisis with an environmental crisis on the horizon; the least we can do is allow ourselves to build the kind of city that can rise to face these challenges.</p>
    </div>
    <div class="text-start p-2 desktop">
        <img src="/recode/Rosefoods.JPG" alt="Neighborhood example" style="width: 100%;"/>
    </div>
</div>
<h2 class="text-primary">Learn More</h2>
<ul class="text-start">
    <li><a href="/recode/UCP_ReCode_Executive_Summary_-_Print_Version.pdf" download>Download the Executive Summary</a></li>
    <li><a href="/recode/UCP_Recode_Full.pdf" download>Download the Detailed Recommendations</a></li>
</ul>

<h2 class="text-primary">The Recommendations</h2>
<div class="d-flex flex-wrap" style="justify-content: center;">
    {#each topics as topic}
    <a href="/policy/recode" class="image-container d-inline-block m-2 text-center" >
        <div class="col d-inline-block" style="max-width: 350px; height: 100%">
            <div class="d-flex flex-column" style="height: 100%">
                <img src="{topic.image}" alt="{topic.title}" class="img-fluid p-2" style="height: 160px" />
                <p class="text-primary" style="">{topic.title}</p>
            </div>
            <p class="image-text p-4" style="max-width: 350px">{topic.description}</p>
        </div>
    </a>
    {/each}
</div>
