<script lang="ts" context="module">
	export async function load({ url, fetch }) {
		const res = await fetch('campaigns/portland-ld2003.json');
		let events = await res.json();
		events = events.map((event: any) => {
			event.dateTime = new Date(event.dateTime);
			return event;
		});

		if (res.ok) {
			return {
				props: {
					events
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url.pathname}`)
		};
	}
</script>

<script lang="ts">
	import CampaignTimeline from '../components/CampaignTimeline.svelte';
	import { fade } from 'svelte/transition';

	let name = '';
	let email = '';
	let state = 'none';

	export let events: any;

	async function handleOnSubmit() {
		const formData = new FormData(document.getElementById('get-involved') as HTMLFormElement);
		const obj = {};
		obj['name'] = name;
		obj['email'] = email;
		name = '';
		email = '';
		formData.forEach((v, k) => {
			obj[k] = v;
		});
		const resp = await fetch('/get-involved', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(obj)
		});
		if (resp.status < 400) state = 'success';
		else state = 'failure';
		setTimeout(() => (state = 'none'), 2000);
	}
</script>

<svelte:head>
	<title>UCP - Get Involved</title>
</svelte:head>

<h1 class="text-primary">Get Involved</h1>

<div class="pt-4 pb-4 text-start">
	<h2 class="text-secondary">Make Real Change with LD2003</h2>
	<p>
		LD2003 is a state law that was intended to make cities update their zoning codes to allow for
		more housing. Gowth areas are supposed to generally allow up to four units of housing. Cities
		and towns in Maine have until January to make the changes. Unfortunately, the changes proposed
		by Portland's planning staff add additional limits alongside the allowances that means in
		practice just half a percent of our city's land will ever be allowed the full four units, down
		from around a quarter that would be elligable without these limits. While this follows the
		letter of the law it undermines its intent and won't make real change in Portland.
	</p>
	<p>
		Though we have little time, it is not too late to act. We have put together a few <a
			href="/policy/portland_ld2003">ammendments</a
		> to their proposed changes that remove some of these new limits being added alongside the changes
		for LD2003. To pass them we need your help. Below is a timeline of the stages that the proposed changes
		need to go through to to pass. We must let the planning board and city council know that we want
		real change by showing up to meetings and sending emails to make public comment. Together, we can
		pass changes that will actually make a dent in our housing crisis!
	</p>
	<CampaignTimeline {events} title="Make Real Change with LD2003" />
</div>

<h2 class="text-secondary text-start">Sign Up for Our Mailing List</h2>
{#if state === 'success'}
	<div class="alert alert-success" role="alert" transition:fade>Thank you!</div>
{:else if state === 'failure'}
	<div class="alert alert-danger" role="alert" transition:fade>Something went wrong</div>
{/if}

<div class="text-start">
	<p>
		We are always looking for new people to get involved, no matter how small your involvement may
		be or what your skills are. If you want to:
	</p>
	<ul>
		<li>Help plan and provide feedback</li>
		<li>Help with data analysis, or learn more about analyzing public datasets</li>
		<li>Help manage our organization</li>
		<li>Help communicate our message</li>
		<li>Hear updates and our perspective on city issues</li>
	</ul>
</div>

<p>
	Please add your name and email if you want to get updates. We send about one email a month and you
	can unsubscribe at any time. If you want to keep up with us more often you can see updates on our <a
		href="https://www.instagram.com/urbanistportland.me/"
		target="_blank"
		rel="noreferrer">Instagram</a
	>
	and <a href="https://discord.gg/EBF8EUN2RK" target="_blank" rel="noreferrer">Discord</a>.
</p>

<form class="text-start" on:submit|preventDefault={handleOnSubmit} id="get-involved">
	<div class="mb-3">
		<label for="inputName" class="form-label">Name</label>
		<input
			name="name"
			class="form-control"
			id="inputName"
			aria-describedby="nameHelp"
			bind:value={name}
		/>
		<div id="nameHelp" class="form-text">Please enter your preferred full name.</div>
	</div>
	<div class="mb-3">
		<label for="exampleInputEmail" class="form-label">Email address</label>
		<input
			name="email"
			type="email"
			class="form-control"
			id="exampleInputEmail"
			aria-describedby="emailHelp"
			bind:value={email}
		/>
		<div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
	</div>
	<button type="submit" class="btn btn-primary">Submit</button>
</form>
