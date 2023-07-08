<script lang="ts">
    import { fade } from 'svelte/transition';

    let name = "";
    let email = "";
    let state = "none";

    async function handleOnSubmit() {
        const formData = new FormData(document.getElementById("get-involved") as HTMLFormElement);
        const obj = {};
        obj["name"] = name;
        obj["email"] = email;
        name = "";
        email = "";
        formData.forEach((v, k) => {
            obj[k] = v;
        });
        const resp = await fetch("/get-involved", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        });
        if (resp.status < 400) state = "success";
        else state = "failure";
        setTimeout(() => state = "none", 2000);
	}
</script>

<svelte:head>
    <title>UCP - Get Involved</title>
</svelte:head>

<h1 class="text-primary">Get Involved</h1>
{#if state === "success"}
<div class="alert alert-success" role="alert" transition:fade>
    Thank you!
</div>
{:else if state === "failure"}
<div class="alert alert-danger" role="alert" transition:fade>
    Something went wrong
</div>
{/if}

<div class="text-start">
    <p>We are always looking for new people to get involved, no matter how small your involvement may be or what your skills are. If you want to:</p>
    <ul>
        <li>Help plan and provide feedback</li>
        <li>Help with data analysis, or learn more about analyzing public datasets</li>
        <li>Help manage our organization</li>
        <li>Help communicate our message</li>
        <li>Hear updates and our perspective on city issues</li>
    </ul>
</div>

<p>Please add your name and email. We promise we won't spam you. Our organization is just starting out so we don't have much in the way of structure yet, but hopefully if there's interest we can schedule regular meetings.</p>

<form class="text-start" on:submit|preventDefault={handleOnSubmit} id="get-involved">
    <div class="mb-3">
        <label for="inputName" class="form-label">Name</label>
        <input name="name" class="form-control" id="inputName" aria-describedby="nameHelp" bind:value={name}>
        <div id="nameHelp" class="form-text">Please enter your preferred full name.</div>
    </div>
    <div class="mb-3">
        <label for="exampleInputEmail" class="form-label">Email address</label>
        <input name="email" type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp" bind:value={email}>
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>