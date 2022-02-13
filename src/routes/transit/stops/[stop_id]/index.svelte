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
    import { page } from '$app/stores';

    const { stop_id } = $page.params;
    export let stopInfo: any;
    export let predictions: any;
    export let serviceBulletins: any;

    const route_colors = {
        "1": "#0d6ea1",
        "2": "#f4b430",
        "3": "#2296c5",
        "4": "#5eb034",
        "5": "#5eb034",
        "7": "#bf262b",
        "8": "#d55ca1",
        "9A": "#f5562e",
        "9B": "#463698",
        "B": "#9ddfef",
        "21": "#9ddfef",
        "24A": "#a52227",
        "24B": "#df9f62",
        "ZM": "#df9f62",
        "IS": "#df9f62",
        "LRB": "#241e20",
    }

    let poller: any;

    const setupPoller = () => {
        if (poller) {
            clearInterval(poller)
        }
        poller = setInterval(doPoll, 2000)
    }

    const doPoll = async () => {
        if (typeof window !== "undefined") {
            const predictionsP = fetch(`${window.location.protocol}://${window.location.host}/transit/stops/${stop_id}/predictions.json`);
            const serviceBulletinsP = fetch(`${window.location.protocol}://${window.location.host}/transit/stops/${stop_id}/service-bulletins.json`);
            const predictionsRes = await predictionsP;
            const serviceBulletinsRes = await serviceBulletinsP;
            predictions = await predictionsRes.json();
            serviceBulletins = await serviceBulletinsRes.json();
        }
    }

    $: setupPoller()
</script>

<h3>{stopInfo.stpnm}</h3>

{#if serviceBulletins.error}
    <div class="alert alert-success">
        No service alerts 😎
    </div>
{:else}
    {#each serviceBulletins.sb as serviceBulletin}
        <div class="text-start alert alert-danger">
            ⚠️ <strong>{serviceBulletin.sbj}</strong>: {serviceBulletin.brf}
        </div>
    {/each}
{/if}
<div class="pb-2 pt-2 text-start">
    <p>Serving Lines: </p>
    {#each stopInfo.route_directions as route}
        <div class="card text-center d-inline-block me-2" style="background-color: {route_colors[route[0]]}">
            <div class="card-body p-0"  style="width: 5rem">
                <p class="card-text">{route[0]}</p>
            </div>
        </div>
    {/each}
</div>

{#if predictions.error}
    <div class="alert alert-secondary">
        {predictions.error[0].msg}
    </div>
{:else}
    {#each predictions.prd as prediction}
        <div class="card text-start mb-2" style="background-color: {route_colors[prediction.rt]}">
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
<p class="text-primary">Brought to you by Livable Portland <a href="/">Learn More</a></p>