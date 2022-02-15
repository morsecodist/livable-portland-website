<script lang="ts" context="module">
    export async function load({ fetch, params }) {
        const { stop_id } = params;
        const stopInfoP = fetch(`/stops/${stop_id}.json`);
        const predictionsP = fetch(`/transit/stops/${stop_id}/predictions.json`);
        const serviceBulletinsP = fetch(`/transit/stops/${stop_id}/service-bulletins.json`);
        const stopInfoRes = await stopInfoP;
        const predictionsRes = await predictionsP;
        const serviceBulletinsRes = await serviceBulletinsP;

        if (stopInfoRes.ok && predictionsRes.ok && serviceBulletinsRes.ok) {
            return {
                props: {
                    stopInfo: await stopInfoRes.json(),
                    predictions: await predictionsRes.json(),
                    serviceBulletins: await serviceBulletinsRes.json(),
                },
            };
        }

        return {
            status: 500,
            error: new Error(`Could not load stop`),
        };
    }
</script>

<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';

    const { stop_id } = $page.params;
    export let stopInfo: any;
    export let predictions: any;
    export let serviceBulletins: any;

    $: routes = Array.from((new Set(stopInfo.route_directions.map(([r, _]) => r))).values()).sort() as string[];

    const route_colors = {
        "1": "#0d6ea1",
        "2": "#f4b430",
        "3": "#2296c5",
        "4": "#5eb034",
        "5": "#0a817d",
        "7": "#bf262b",
        "8": "#d55ca1",
        "9A": "#f5562e",
        "9B": "#463698",
        "BRZ": "#9ddfef",
        "21": "#9ddfef",
        "24A": "#a52227",
        "24B": "#df9f62",
        "ZM": "#422b85",
        "IS": "#ce178d",
        "LRB": "#241e20",
        "HSK": "#242c6b",
    }

    const route_text_colors = {
        "1": "white",
        "2": "black",
        "3": "black",
        "4": "black",
        "5": "white",
        "7": "black",
        "8": "black",
        "9A": "black",
        "9B": "white",
        "BRZ": "black",
        "21": "white",
        "24A": "white",
        "24B": "black",
        "ZM": "white",
        "IS": "black",
        "LRB": "white",
        "HSK": "#eab420",
    }

    let poller: any;

    const setupPoller = () => {
        if (poller) clearInterval(poller)
        poller = setInterval(doPoll, 10000)
    }

    const doPoll = async () => {
        if (typeof window !== "undefined") {
            const predictionsP = fetch(`/transit/stops/${stop_id}/predictions.json`);
            const serviceBulletinsP = fetch(`/transit/stops/${stop_id}/service-bulletins.json`);
            const predictionsRes = await predictionsP;
            const serviceBulletinsRes = await serviceBulletinsP;
            predictions = await predictionsRes.json();
            serviceBulletins = await serviceBulletinsRes.json();
        }
    }

    $: setupPoller();
    onMount(doPoll);
</script>

<h3>{stopInfo.stpnm}</h3>

<div class="pb-2 pt-2 text-start">
    <p>Serving Lines: </p>
    <div class="d-flex flex-wrap">
        {#each routes as route}
            <div class="card text-center me-2 mb-2 flex-grow-1" style="min-width: 5rem; max-width: 7rem; background-color: {route_colors[route]}; color: {route_text_colors[route]}; {route === 'HSK' ? 'border: dashed #eab420 2px' : ''}">
                <div class="card-body p-0">
                    <p class="card-text">{route}</p>
                </div>
            </div>
        {/each}
    </div>
</div>

{#if serviceBulletins.error}
    <div class="alert alert-success">
        No service alerts 😎
    </div>
{:else}
    {#each serviceBulletins.sb as serviceBulletin}
        <div class="text-start alert alert-danger" transition:fade>
            ⚠️ <strong>{serviceBulletin.sbj}</strong>: {serviceBulletin.brf}
        </div>
    {/each}
{/if}

{#if predictions.error}
    <div class="alert alert-secondary">
        {predictions.error[0].msg}
    </div>
{:else}
    {#each predictions.prd as prediction (prediction.vid)}
        <div class="card text-start mb-2" transition:fade animate:flip style="background-color: {route_colors[prediction.rt]}; color: {route_text_colors[prediction.rt]}">
            <div class="card-body">
                <div class="d-flex">
                    <h5 class="card-title d-inline-block">{prediction.rt}</h5>
                    <h5 class="d-inline-block flex-grow-1 text-end">{prediction.prdctdn}{prediction.prdctdn !== "DUE" ? " min" : ""}</h5>
                </div>
                <p class="card-text">{prediction.des}</p>
            </div>
        </div>
    {/each}
{/if}
<p class="text-primary fst-italic fs-sm">Brought to you by Livable Portland <a href="/">Learn More</a></p>