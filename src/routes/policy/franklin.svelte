<script>
	import MailingList from '../../components/MailingList.svelte';
</script>

<svelte:head>
	<title>UCP - Reclaim Franklin Street</title>
</svelte:head>

<h1 class="text-primary">Reclaim Franklin Street</h1>
<p>A Vision for Affordable Housing Along Franklin Street</p>

<div class="text-start pb-4">
	<p>
		We’re in a housing crisis, and part of the solution could be right under our feet: Franklin
		Street. Franklin has long been thought of as a traffic planning problem that needs a traffic
		planning solution. Instead, we could and should be thinking about it differently: Franklin is a
		land-use problem that can be turned into a housing solution.
	</p>
	<p>Rebuilding Franklin Street is an investment in the sustainability of our city.</p>
	<img
		class="mb-4"
		src="/franklin/Render_Housing_Labeled.jpg"
		alt="Franklin Street Housing Render"
	/>
	<img src="/franklin/Render_Park_Labeled.jpg" alt="Franklin Street Park Render" />

	<table class="styled-table desktop">
		<tbody>
			<tr>
				<td class="description" colspan="2"
					>994 new homes<br />on the peninsula (under current zoning)</td
				>
				<td class="value">$15.7M<br />estimated land sale value</td>
			</tr>
			<tr>
				<td class="description" colspan="2">5.9 acres<br />of city-owned land reclaimed</td>
				<td class="value">$3.4M<br />estimated annual property tax revenue</td>
			</tr>
			<tr>
				<td class="description" colspan="2">17,000 SF<br />restored to Lincoln Park</td>
				<td class="value">Improved traffic flow on Franklin Street.</td>
			</tr>
		</tbody>
	</table>

	<table class="styled-table mobile">
		<tbody>
			<tr>
				<td class="description" colspan="2"
					>994 new homes<br />on the peninsula (under current zoning)</td
				>
			</tr>
			<tr>
				<td class="value">$15.7M<br />estimated land sale value</td>
			</tr>
			<tr>
				<td class="description" colspan="2">5.9 acres<br />of city-owned land reclaimed</td>
			</tr>
			<tr><td class="value">$3.4M<br />estimated annual property tax revenue</td></tr>
			<tr>
				<td class="description" colspan="2">17,000 SF<br />restored to Lincoln Park</td>
			</tr>
			<tr><td class="value">Improved traffic flow on Franklin Street.</td></tr>
		</tbody>
	</table>

	<ul>
		<li>
			Franklin Street is already slated for a future sewer/stormwater separation project, which will
			tear up the street and rebuild it using federal money.
		</li>
		<li>
			Federal grants are available under DOT’s Reconnecting Communities initiative for urban street
			redesigns just like Franklin Street.
		</li>
		<li>
			Unlocking city-owned land for housing development creates immediate sale value and long-term
			tax value for the city.
		</li>
		<li>Portland has been sitting on a plan since 2015 that can accomplish much of this.</li>
	</ul>

	<p>
		The Franklin Reclamation Authority’s volunteer working group has assembled a vision plan to show
		the potential of the Franklin Street right-of-way to be redeveloped into housing in the heart of
		the Portland peninsula. This working group includes local architects and affordable housing
		experts invested in the future of Franklin Street and Portland as a whole. This is not a
		specific plan or proposal, but a conceptual analysis of housing development opportunities in the
		Franklin Street corridor.
	</p>

	<h2 class="text-primary">Learn More</h2>
	<p>
		To learn more about the history of Franklin Street and past attempts to redesign it, check out
		this series of deep-dive articles in The Portland Townsman.
	</p>

	<p>
		<a
			rel="noreferrer"
			target="_blank"
			href="https://thetownsman.org/a-biography-of-franklin-street/"
			>A Biography of Franklin Street</a
		>
	</p>
	<p>
		<a
			rel="noreferrer"
			target="_blank"
			href="https://thetownsman.org/stops-and-starts-the-history-of-franklin-street-redesign/"
			>Stops and Starts: The History of Franklin Street Redesign</a
		>
	</p>

	<h2 class="text-primary">Sign Up for the Franklin Street Mailing List</h2>
	<p>
		The Franklin Reclamation Authority operates their own mailing list independent of UCP. If you
		would like to receive updates specific to Franklin Street, please sign up below.
	</p>
	<MailingList listName="reclaim-franklin" />
</div>

<style>
	img {
		max-width: 100%;
	}

	table.styled-table {
		border-collapse: collapse;
		margin: 25px 0;
		font-size: 0.9em;
		min-width: 400px;
		width: 100%;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
	}
	.styled-table td {
		padding: 12px 15px;
		text-align: left;
	}
	.styled-table td {
		border-bottom: 1px solid #dddddd;
	}
	.styled-table.mobile td {
		width: 100vw;
	}
	.styled-table tr:last-of-type {
		border-bottom: 2px solid var(--bs-primary);
	}
	.description {
		font-weight: bold;
		background-color: #f3f3f3;
	}
	.value {
		font-weight: bold;
		color: var(--bs-primary);
	}
</style>
