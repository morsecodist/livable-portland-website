<script lang="ts" context="module">
    export async function load({ fetch, params }) {
        const { stop_id } = params;
        const stopInfoP = fetch(`/stops/${stop_id}.json`);
        const predictionsP = fetch(`/transit-times/stops/${stop_id}/predictions.json`);
        const serviceBulletinsP = fetch(`/transit-times/stops/${stop_id}/service-bulletins.json`);
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
    import { onMount, tick } from 'svelte';
    import { page } from '$app/stores';
    import { fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { browser } from '$app/env';

    const { stop_id } = $page.params;
    export let stopInfo: any;
    export let predictions: any;
    export let serviceBulletins: any;

    function parseDate(d: string): Date {
        const year = parseInt(d.substring(0, 4));
        const month = parseInt(d.substring(4, 6)) - 1;
        const day = parseInt(d.substring(6, 8));
        const hour = parseInt(d.substring(9, 11));
        const minute = parseInt(d.substring(12, 14));
        return new Date(year, month, day, hour, minute);
    }

    let now = new Date();
    $: routes = Array.from((new Set(stopInfo.route_directions.map(([r, _]) => r))).values()).sort() as string[];
    $: predictionsMapped = predictions.prd ? predictions.prd.map(p => {
        const seconds = Math.floor((parseDate(p.prdtm).getTime() - now.getTime()) / 1000);
        const secondsPlace = seconds % 60;
        return {
            ...p,
            time: seconds <= 0 ? "DUE" : `${Math.floor(seconds / 60)}:${secondsPlace < 10 ? '0' : ''}${secondsPlace % 60}`,
        }
    }) : [];

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
        "21": "black",
        "24A": "white",
        "24B": "black",
        "ZM": "white",
        "IS": "black",
        "LRB": "white",
        "HSK": "#eab420",
    }

    let poller: any;
    let ticker: any;

    const setupPoller = () => {
        if (poller) clearInterval(poller)
        if (ticker) clearInterval(ticker)
        poller = setInterval(doPoll, 10000)
        ticker = setInterval(tick, 1000);
    }

    const tick = () => {
        now = new Date();
    }

    const doPoll = async () => {
        if (browser) {
            const predictionsP = fetch(`/transit-times/stops/${stop_id}/predictions.json`);
            const serviceBulletinsP = fetch(`/transit-times/stops/${stop_id}/service-bulletins.json`);
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
            <div class="flex-grow-1" style="min-width: 5rem; max-width: 7rem">
                <div class="card text-center me-2 mb-2 " style="min-width: 5rem; max-width: 7rem; background-color: {route_colors[route]}; color: {route_text_colors[route]}; {route === 'HSK' ? 'border: dashed #eab420 2px' : ''}">
                    <div class="card-body p-0">
                        <p class="card-text">{route}</p>
                    </div>
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
    {#each predictionsMapped as prediction (prediction.vid + prediction.prdtm)}
        <div class="card text-start mb-2" transition:fade animate:flip style="background-color: {route_colors[prediction.rt]}; color: {route_text_colors[prediction.rt]}">
            <div class="card-body">
                <div class="d-flex">
                    <h5 class="card-title d-inline-block">{prediction.rt}</h5>
                    <h5 class="d-inline-block flex-grow-1 text-end">{prediction.time}{prediction.time !== "DUE" ? " min" : ""}</h5>
                </div>
                <p class="card-text">{prediction.des}</p>
            </div>
        </div>
    {/each}
{/if}
<p class="text-primary fst-italic fs-sm">Brought to you by Livable Portland <a href="/">Learn More</a></p>