<script lang="ts">
	import { fade } from 'svelte/transition';

	export let listName: string;

	let name = '';
	let email = '';

	let submitStatus = '';

	async function handleOnSubmit() {
		const resp = await fetch('/mailing-list-signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, email, listName })
		});
		if (resp.status < 400) submitStatus = 'success';
		else submitStatus = 'failure';
		setTimeout(() => (submitStatus = ''), 2000);
	}
</script>

{#if submitStatus === 'success'}
	<div class="alert alert-success" role="alert" transition:fade>Thank you!</div>
{:else if submitStatus === 'failure'}
	<div class="alert alert-danger" role="alert" transition:fade>Something went wrong</div>
{/if}

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
	<div class="text-end">
		<button type="submit" class="btn btn-primary">Submit</button>
	</div>
</form>
