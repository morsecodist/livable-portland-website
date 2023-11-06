<script>
	import { onMount } from 'svelte';

	function makeMap() {
		require([
			'esri/Map',
			'esri/views/MapView',
			'esri/layers/FeatureLayer',
			'esri/layers/support/LabelClass'
		], function (Map, MapView, FeatureLayer, LabelClass) {
			var map = new Map({
				basemap: 'streets-vector' // You can change the basemap to satellite, topo, etc.
			});

			var view = new MapView({
				container: 'districtsMap',
				map: map,
				center: [-70.2, 43.665], // Longitude, latitude
				zoom: 11
			});

			// Define the label class
			var labelClass = new LabelClass({
				labelExpressionInfo: { expression: "'District ' + $feature.NAME" }, // Adjust this to match the actual field name in your FeatureLayer
				symbol: {
					type: 'text', // autocasts as new TextSymbol()
					color: 'black',
					haloSize: 1,
					haloColor: 'white',
					font: {
						// autocast as new Font()
						family: 'Ubuntu Mono',
						size: 18,
						weight: 'bold'
					}
				},
				labelPlacement: 'above-center'
			});

			var featureLayer = new FeatureLayer({
				url: 'https://gis.portlandmaine.gov/maps/rest/services/Political/Council_Districts/FeatureServer',
				opacity: 0.5, // 50% transparent
				labelingInfo: [labelClass]
			});

			map.add(featureLayer);
		});
	}

	onMount(() => {
		try {
			makeMap();
		} catch (e) {
			setTimeout(makeMap, 500);
		}
	});
</script>

<svelte:head>
	<script src="https://js.arcgis.com/4.24/"></script>
	<link rel="stylesheet" href="https://js.arcgis.com/4.24/esri/themes/light/main.css" />
</svelte:head>

<h1 class="text-primary">UCP Election Center</h1>

<div class="text-start">
	<p>
		Find out where the candidates stand on urbanist issues. We put together a list of questions to
		ask Portland's political candidates. The questions cover our <a href="/policy/recode"
			>ReCode Recommendations</a
		>, cycling, pedestrian infrastructure, parking, and more. This report also appeared in the
		<a
			href="http://thewestendnews.com/candidate-survey-urbanist-coalition-of-portland-asks-candidates-about-recode-recommendations/"
			rel="noreferrer"
			target="_blank">West End News</a
		>. The symbols mean:
	</p>
	<ul>
		<li>✅ Endorses</li>
		<li>🟨 Endorses with caveats</li>
		<li>❌ Does not endorse</li>
		<li>❔ Declined to comment</li>
	</ul>
</div>

<h2 class="text-primary">Mayor</h2>
<div class="tablewrapper">
	<table class="table">
		<thead>
			<tr>
				<th scope="col" />
				<th scope="col">Pious Ali*</th>
				<th scope="col"
					><a
						href="https://docs.google.com/document/d/1lIFbxd6ulq_-UOlfU6P9NDIC59nJddhe5dtOIaW3k8c"
						rel="noreferrer"
						target="_blank">Justin Costa</a
					></th
				>
				<th scope="col"
					><a
						href="https://docs.google.com/document/d/1ThCCqOR7ubFEK5fdNUA5HX_Fj8I0wjGwYBLnAj4FnMc"
						rel="noreferrer"
						target="_blank">Mark Dion</a
					></th
				>
				<th scope="col"
					><a
						href="https://docs.google.com/document/d/1R8uxMonlxRThkRdeRWh1x2TIfl49qTZ7lgSbkk3Ga0c"
						rel="noreferrer"
						target="_blank">Dylan Pugh</a
					></th
				>
				<th scope="col">George Rheault</th>
				<th scope="col"
					><a
						href="https://docs.google.com/document/d/13oUzx-4bz295YrBR8sUvJeboMx-17vThz2eysWm9RQw"
						rel="noreferrer"
						target="_blank">Andrew Zarro</a
					></th
				>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td
					>1. Do you endorse our ReCode recommendations to allow for gentle density? This includes
					allowing multi-unit housing everywhere housing can be built and limiting density based on
					the sizes of buildings instead of land area. (Recommendations 2 and 3)</td
				>
				<td>❔</td>
				<td>❌</td>
				<td>❌</td>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
			</tr>
			<tr>
				<td
					>2. Do you endorse our ReCode recommendations to relax limits to allow the construction of
					more types of buildings? This includes allowing for small height increases, building on
					smaller lots, and building on a bigger portion of each lot. (Recommendations 4, 5, 6, 10,
					12, 16, and 17)</td
				>
				<td>❔</td>
				<td>❌</td>
				<td>❌</td>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
			</tr>
			<tr>
				<td
					>3. Do you endorse our ReCode recommendation to combine some zones to simplify our zoning
					code and allow for more housing? This includes merging various residential and industrial
					zones into more permissive ones.</td
				>
				<td>❔</td>
				<td>❌</td>
				<td>❌</td>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
			</tr>
			<tr>
				<td
					>4. Do you support returning the Amtrak Station to the former site of Union Station (St
					John St) with new housing nearby instead of the proposed new parking structure?</td
				>
				<td>❔</td>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
			</tr>
			<tr>
				<td
					>5. Would you prioritize increasing the funding of GPMetro to provide higher quality bus
					service, particularly more frequent buses?</td
				>
				<td>❔</td>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
			</tr>
			<tr>
				<td
					>6. Do you support prioritizing constructing protected cycling lanes? Even if this means
					losing some on-street parking?</td
				>
				<td>❔</td>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
			</tr>
			<tr>
				<td
					>7. Do you support prioritizing pedestrians with infrastructure such as crossing priority
					at intersections and well maintained sidewalks and crosswalks?</td
				>
				<td>❔</td>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
			</tr>
			<tr>
				<td
					>8. Do you support increasing revenue from parking meters and city-owned garages by
					bringing pricing more in line with the value of these spaces, metering more spaces, and
					extending enforcement to more hours of the week?</td
				>
				<td>❔</td>
				<td>✅</td>
				<td>❌</td>
				<td>❌</td>
				<td>✅</td>
				<td>✅</td>
			</tr>
			<tr>
				<td
					>9. Do you support the placement and ongoing maintenance of street trees to create and
					preserve green corridors?</td
				>
				<td>❔</td>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
			</tr>
			<tr>
				<td
					>10. Do you support pedestrianizing streets (closing them to motor traffic), such as Dana
					St and lower Exchange St, even if it involves the loss of on-street parking?</td
				>
				<td>❔</td>
				<td>✅</td>
				<td>❌</td>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
			</tr>
			<tr>
				<td
					>11. The Federal Government has grant programs to reconnect communities split by urban
					renewal projects such as Franklin Street. Will you champion the City pursuing such
					opportunities including budgeting matching grant funds if necessary? If so, how would you
					use your position to ensure the City pursues these opportunities?</td
				>
				<td>❔</td>
				<td>🟨</td>
				<td>❌</td>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
			</tr>
		</tbody>
	</table>
</div>
<p class="text-start">
	* Pious Ali commented: "I have decided not to take a position on your questions because city staff
	are still working on the recode process. I will wait to see the final result of their process and
	then compare it side-by-side with your work. I will then decide where there can be a merger and
	where I will have to advocate for some of your proposals to be included. I appreciate your work
	and look forward to working with you to mitigate the housing crisis we have in our city."
</p>

<h2 class="text-primary" style="margin-top: 60px">City Council</h2>
<div id="districtsMap" />
<div class="tablewrapper">
	<table class="table council">
		<thead>
			<tr>
				<th scope="col" />
				<th colspan="2">At Large</th>
				<th colspan="2">District 4</th>
				<th colspan="2">District 5</th>
			</tr>
			<tr>
				<th scope="col" />
				<th scope="col"
					><a
						href="https://docs.google.com/document/d/1CfYpHYYwWspEhCT8-6v9-g-z-Ur-UCkF1zXUg2oulEs"
						rel="noreferrer"
						target="_blank">April Fournier</a
					></th
				>
				<th scope="col"
					><a
						href="https://docs.google.com/document/d/110tgIHhW5w2SrdJWkJqrDsP8pBYATtISeF987QeTxZs"
						rel="noreferrer"
						target="_blank">William Linnell</a
					></th
				>
				<th scope="col"
					><a
						href="https://docs.google.com/document/d/1nasI-bjFbrxDW-nqdRO4obxtQAcN410lsoSf56k8NWQ"
						rel="noreferrer"
						target="_blank">Anna Bullett</a
					></th
				>
				<th scope="col"
					><a
						href="https://docs.google.com/document/d/1aHM53GCFx6LJZTP6uIDDoSxdILIPSaIM1W17_ATzsJg"
						rel="noreferrer"
						target="_blank">Robert Cady*</a
					></th
				>
				<th scope="col"
					><a
						href="https://docs.google.com/document/d/1f8VcS46nW4YEtmgOb4oeq8ffJ7Qp3qeRAEjQNVa8YtI"
						rel="noreferrer"
						target="_blank">Kathryn Sykes</a
					></th
				>
				<th scope="col"
					><a
						href="https://docs.google.com/document/d/11hSF_r7eHFWZmP4WeYYqAnmSuFgfR-W2CIomgqbk5X0"
						rel="noreferrer"
						target="_blank">Matthew Buonopane</a
					></th
				>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td
					>1. Do you endorse our ReCode recommendations to allow for gentle density? This includes
					allowing multi-unit housing everywhere housing can be built and limiting density based on
					the sizes of buildings instead of land area. (Recommendations 2 and 3)</td
				>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
				<td>❔</td>
				<td>🟨</td>
				<td>❌</td>
			</tr>
			<tr>
				<td
					>2. Do you endorse our ReCode recommendations to relax limits to allow the construction of
					more types of buildings? This includes allowing for small height increases, building on
					smaller lots, and building on a bigger portion of each lot. (Recommendations 4, 5, 6, 10,
					12, 16, and 17)</td
				>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
				<td>❔</td>
				<td>✅</td>
				<td>✅</td>
			</tr>
			<tr>
				<td
					>3. Do you endorse our ReCode recommendation to combine some zones to simplify our zoning
					code and allow for more housing? This includes merging various residential and industrial
					zones into more permissive ones.</td
				>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
				<td>❔</td>
				<td>✅</td>
				<td>✅</td>
			</tr>
			<tr>
				<td
					>4. Do you support returning the Amtrak Station to the former site of Union Station (St
					John St) with new housing nearby instead of the proposed new parking structure?</td
				>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
				<td>❔</td>
				<td>✅</td>
				<td>✅</td>
			</tr>
			<tr>
				<td
					>5. Would you prioritize increasing the funding of GPMetro to provide higher quality bus
					service, particularly more frequent buses?</td
				>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
				<td>❔</td>
				<td>✅</td>
				<td>❌</td>
			</tr>
			<tr>
				<td
					>6. Do you support prioritizing constructing protected cycling lanes? Even if this means
					losing some on-street parking?</td
				>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
				<td>❔</td>
				<td>✅</td>
				<td>❔</td>
			</tr>
			<tr>
				<td
					>7. Do you support prioritizing pedestrians with infrastructure such as crossing priority
					at intersections and well maintained sidewalks and crosswalks?</td
				>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
				<td>❔</td>
				<td>✅</td>
				<td>✅</td>
			</tr>
			<tr>
				<td
					>8. Do you support increasing revenue from parking meters and city-owned garages by
					bringing pricing more in line with the value of these spaces, metering more spaces, and
					extending enforcement to more hours of the week?</td
				>
				<td>✅</td>
				<td>🟨</td>
				<td>✅</td>
				<td>❔</td>
				<td>✅</td>
				<td>❌</td>
			</tr>
			<tr>
				<td
					>9. Do you support the placement and ongoing maintenance of street trees to create and
					preserve green corridors?</td
				>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
				<td>❔</td>
				<td>✅</td>
				<td>✅</td>
			</tr>
			<tr>
				<td
					>10. Do you support pedestrianizing streets (closing them to motor traffic), such as Dana
					St and lower Exchange St, even if it involves the loss of on-street parking?</td
				>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
				<td>❔</td>
				<td>✅</td>
				<td>🟨</td>
			</tr>
			<tr>
				<td
					>11. Will you champion the City pursuing Federal Government grant programs to reconnect
					communities split by urban renewal projects such as Franklin Street, including budgeting
					matching grant funds if necessary?</td
				>
				<td>✅</td>
				<td>✅</td>
				<td>✅</td>
				<td>❔</td>
				<td>✅</td>
				<td>🟨</td>
			</tr>
		</tbody>
	</table>
</div>
<p class="text-start">
	* Robert Cady replied with a statement instead of answering individual questions, a highlight from
	the statement: "What I can say is that I’m in favor of allowing increased gentle density in
	Portland, with increase building for the lot size. I am also in favor of improving mass transit
	(bus), and improving pedestrian and bike access and safety. I am a proponent of local, small
	businesses, and would just want to be respectful of existing residents and current neighborhood
	characteristics.". The full response is available by clicking on his name.
</p>

<style>
	table > tbody > tr > td:first-child {
		text-align: left;
	}

	table.council > tbody > tr > td:nth-child(4) {
		border-left: 1px solid #dee2e6;
	}

	table.council > tbody > tr > td:nth-child(6) {
		border-left: 1px solid #dee2e6;
	}

	table.council > thead > tr:last-child > th:nth-child(4) {
		border-left: 1px solid #dee2e6;
	}

	table.council > thead > tr:last-child > th:nth-child(6) {
		border-left: 1px solid #dee2e6;
	}

	#districtsMap {
		padding: 0;
		margin: 0;
		height: 540px;
		width: 100%;
	}
</style>
