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
    import { stringStore } from '../../../../strings';
    import { eastCoastNow } from '../../../../lib/date';

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

    let now = eastCoastNow();
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

    const route_links = {
        "1": "https://gpmetro.org/DocumentCenter/View/1101/Rte-1-spread-1-22?bidId=",
        "2": "https://gpmetro.org/DocumentCenter/View/1053/Rte-2?bidId=",
        "3": "https://gpmetro.org/DocumentCenter/View/1054/Rte-3?bidId=",
        "4": "https://gpmetro.org/DocumentCenter/View/898/Rte-4-REV?bidId=",
        "5": "https://gpmetro.org/290/Route-5---Maine-Mall",
        "7": "https://gpmetro.org/DocumentCenter/View/1057/Rte-7?bidId=",
        "8": "https://gpmetro.org/DocumentCenter/View/976/Rte-8-8302020?bidId=",
        "9A": "https://gpmetro.org/DocumentCenter/View/1056/Rte-9?bidId=",
        "9B": "https://gpmetro.org/DocumentCenter/View/1056/Rte-9?bidId=",
        "BRZ": "https://gpmetro.org/DocumentCenter/View/1098/BREEZ-spread-1-22?bidId=",
        "21": "https://southportland.org/files/1416/2793/1524/Route_21_-_South_Portland_Bus_Services_-_July_2021.pdf",
        "24A": "https://southportland.org/files/2016/2801/6101/Route_24A_-_South_Portland_Bus_Service_-_August_2021.pdf",
        "24B": "https://southportland.org/files/8216/2793/1884/Route_24B_-_South_Portland_Bus_Services_-July_2021.pdf",
        "ZM": "https://bsoobtransit.org/schedules-maps/purple/",
        "LRB": "https://www.rtprides.org/wp-content/uploads/Lakes-Region-Explorer-Schedule-2020.pdf",
        "HSK": "https://gpmetro.org/DocumentCenter/View/966/HuskyLine-spread-REV-82421?bidId=",
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

<svelte:head>
    <title>Bus Times: {stopInfo.stpnm}</title>
</svelte:head>

<h3>{stopInfo.stpnm}</h3>

<div class="pb-2 pt-2 text-start">
    <p>{($stringStore)[1]["Serving lines"]}</p>
    <div class="d-flex flex-wrap">
        {#each routes as route}
            <div class="flex-grow-1" style="min-width: 5rem; max-width: 7rem">
                <a class="text-decoration-none" href={route_links[route]}>
                    <div class="card text-center me-2 mb-2 " style="min-width: 5rem; max-width: 7rem; background-color: {route_colors[route]}; color: {route_text_colors[route]}; {route === 'HSK' ? 'border: dashed #eab420 2px' : ''}">
                        <div class="card-body p-0">
                            <p class="card-text">{route}</p>
                        </div>
                    </div>
                </a>
            </div>
        {/each}
    </div>
</div>

{#if serviceBulletins.error}
    <div class="alert alert-success">
        {($stringStore)[1]["No Service Alerts"]}
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
        {($stringStore)[1][predictions.error[0].msg] || predictions.error[0].msg}
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
<div class="text-start">
    <p class="text-primary mb-1">{$stringStore[1]["Download the UMO App"]}: <a href="https://play.google.com/store/apps/details?id=com.cubic.ctp.app">Android</a> | <a href="https://apps.apple.com/us/app/umo-mobility/id1540611257">iPhone</a></p>
    <p class="text-primary mb-1"><a href="https://gpmetro.org/ImageRepository/Document?documentId=964">{$stringStore[1]["Full System Map"]}</a></p>
    <p class="text-primary mb-1"><a href="http://adopt-a-stop.org/How_It_Works.html">{$stringStore[1]["Adopt this stop"]}</a></p>
</div>
<p class="text-primary fst-italic fs-sm">{$stringStore[1]["Brought to you by Livable Portland"]}</p>
<p><a href="/">Learn More</a> or <a href="/get-involved">Get Involved</a></p>
