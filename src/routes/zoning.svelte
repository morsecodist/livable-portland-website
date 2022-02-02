<script lang="ts" context="module">
    import YAML from "yaml";

    export async function load({ fetch }) {
        const responses = await Promise.all([
            fetch("/table.yaml"),
            fetch("/areas.json"),
            fetch("/residential.json"),
            fetch("/zones.json"),
        ]);

        if (responses.every(r => r.ok)) {
            const parsed = await Promise.all(responses.map((elem, i) => i == 0 ? elem.text() : elem.json()));
            return {
                props: {
                    tableValues: YAML.parse(parsed[0]),
                    areas: parsed[1],
                    residential: parsed[2],
                    zones: parsed[3],
                },
            };
        }

        return {
            status: 404,
            error: new Error("Could not load /table.json}"),
        };
    }
</script>

<script lang="ts">
    import { browser } from "$app/env";
    import { onMount } from "svelte";
    import * as d3 from "d3";

    export let tableValues: any;
    export let areas: any;
    export let residential: any;
    export let zones: any;
    let overlayZones = false;
    let tableValuesFiltered = [];

    $: filteredZones = !overlayZones 
        ? {
            ...zones,
            features: zones.features.filter(({ properties }) => properties.zoneType !== "overlay"),
        }
        : zones;

    $: {
        tableValuesFiltered = tableValues.filter(({ header }) => overlayZones === (header === "Overlay Zone"))
    }

    function getOpacity({ properties }) {
        if (properties.zoneType === "overlay") return 0;
        if (properties.zoneType === "normal" && overlayZones) return "0.2";
        return properties.name === selectedZone ? "0.8" : "0.4";
    }

    function getStrokeWidth({ properties }) {
        if (properties.zoneType === "normal" && overlayZones) return "0px";
        if (properties.zoneType === "normal") return properties.name === selectedZone ? "2px" : "1px";
        return properties.name === selectedZone ? "4px" : "2px";
    }

    class Map {
        private map: any;
        private g: any;
        private labels: any;
        private div: any;
        private svg: any;
        private path: any;
        private feature: any;
        private zones: any;
        private L: typeof import("leaflet");

        public initialized: boolean;

        constructor() {}

        initialize(L: typeof import("leaflet"), zones: any) {
            this.L = L;
            this.map = new this.L.Map("map", {
                center: [43.680535819832734, -70.2235107589513],
                zoom: 12,
                maxBounds: [[43.74257661763999, -70.05871583707632], [43.61843080183568, -70.38830568082632]],
                minZoom: 12,
                attributionControl: false,
            }).addLayer(new this.L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"));

            this.svg = d3.select(this.map.getPanes().overlayPane).append("svg");
            this.g = this.svg.append("g").attr("class", "leaflet-zoom-hide");

            let map = this.map;
            // Use Leaflet to implement a D3 geometric transformation.
            function projectPoint(x, y) {
                const {x: px, y: py} = map.latLngToLayerPoint(new L.LatLng(y, x));
                this.stream.point(px, py);
            }

            const transform = d3.geoTransform({ point: projectPoint });
            this.path = d3.geoPath().projection(transform);

            this.div = d3.select("body").append("div")	
                .style("background-color", "white")
                .style("padding", "5px")
                .attr("class", "tooltip")				
                .style("user-select", "none")
                .style("opacity", 0);

            let moving = false;

            document.addEventListener("mousemove", () => {
                if (!selectedZone) this.div.style("opacity", 0);
            });

            this.updateZones(zones);

            this.map.on("moveend", this.reset.bind(this));
            this.map.on("zoom", this.reset.bind(this));
            this.map.on("movestart", () => { this.div.style("opacity", 0); moving = true });
            this.map.on("moveend", () => { moving = false });

            this.reset();
            this.initialized = true;
        }

        handleMouseEnter(_, { properties }) {
            selectedZone = properties.name;
            if (properties.zoneType === "overlay" && !overlayZones) return;
            if (properties.zoneType === "normal" && overlayZones) return;
            this.div.transition()		
                .duration(200)		
                .style("opacity", .9)
                .style("background-color", colors[selectedZone] || "white")
                .style("color", colors[selectedZone] && isDark(colors[selectedZone]) ? "white" : "black");
            
        }

        handleMouseover(event, { properties }) {	
            this.div.html(properties.name + "<br/>")	
                .style("left", (event.pageX) + "px")		
                .style("top", (event.pageY - 36) + "px");	
        }

        handleMouseout() {
            selectedZone = null;
            this.div.style("opacity", 0);
        }

        // Reposition the SVG to cover the features.
        reset() {
            const [topLeft, bottomRight] = this.path.bounds(this.zones);

            this.svg.attr("width", bottomRight[0] - topLeft[0])
                .attr("height", bottomRight[1] - topLeft[1])
                .style("left", topLeft[0] + "px")
                .style("top", topLeft[1] + "px");

            this.g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
            this.feature.attr("d", this.path);
        }

        updateZones(zones: any) {
            this.zones = zones;
            if (this.feature) {
                this.feature.remove();
            }
            this.feature = this.g.selectAll("path")
                .data(zones.features)
                .enter()
                .append("path")
                .attr("stroke", ({ properties }) => colors[properties.name] ? "black" : "#77c")
                .attr("fill-opacity", getOpacity)
                .attr("fill", ({ properties }) => colors[properties.name] || "#fff")
                .attr("style", "pointer-events: auto;")
                .attr("stroke-width", getStrokeWidth)
                .on("mouseenter", this.handleMouseEnter.bind(this))
                .on("mousemove", this.handleMouseover.bind(this))
                .on("mouseout", this.handleMouseout.bind(this));
            this.reset();
        }

        selectZone(zone: string | null) {
            this.feature
                .attr("fill-opacity", getOpacity)
                .attr("stroke-width", getStrokeWidth);
        }
    }

    let map = new Map();

    const colors = {
        "IR-1": "#fffac2",
        "IR-2": "#fff595",
        "IR-3": "#fde267",
        "I-B": "#fae3e3",
        "I-TS": "#acacac",
        "R-1": "#fefac2",
        "R-2": "#fef595",
        "R-3": "#fde267",
        "R-4": "#feca00",
        "R-5": "#f7b512",
        "R-5a": "#e99d19",
        "R-6": "#dd8519",
        "R-6a": "#a86f00",
        "R-P": "#acacac",
        "A-B": "#dcdcdc",
        "O-P": "#dcdcdc",
        "B-1": "#fae3e3",
        "B-1b": "#f9e2e2", // TODO: line
        "B-2": "#fac4c4",
        "B-2b": "#f8c2c2", // TODO: line
        "B-2c": "#f8c2c2", // TODO: dots
        "B-3": "#faa3a3",
        "B-3c": "#fca3a3", // TODO: line
        "B-4": "#f98585",
        "B-5": "#fc6666",
        "B-5b": "#fc6666",
        "B-6": "#fe3737",
        "B-7": "#bf0700",
        "IS-FBC": "#740000",
        "I-L": "#edecfd",
        "I-Lb": "#edecfd", // TODO: line
        "I-M": "#c9c2fe",
        "I-Mb": "#c9c2fe", // TODO: line
        "I-H": "#aca4fe",
        "RPZ": "#c2fec2",
        "WPDZ": "#d6fdfe",
        "WCZ": "#a4f9fe", // TODO: line
        "EWPZ": "#bfe2f8",
        "R-OS": "#a0fe9d",
        "Residential": "#fefac2",
        "Island": "#bfe2f8", // TODO original color
        "Mixed Use": "#fae3e3",
        "Office": "#dcdcdc",
        "Industrial and Airport": "#edecfd",
        "Open Space": "#a0fe9d",
        "Waterfront": "#a4f9fe",
        "Form Based": "#740000",
        "Conditional or Contract": "#fff",
        "Resource Protection": "#c2fec2",
    };

    const whiteText = {
        "B-7": true,
    }

    function hexToRgb(hex: string) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16),
        ] : null;
    }

    function isDark(hex: string) {
        const [r, g, b] = hexToRgb(hex);
        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
        return luma < 40;
    }


    let updateZone = (_: string | null) => {};
    let selectedZone: string | null = null;

    $: {
        if (browser && map.initialized) {
            map.updateZones(filteredZones);
        }
    }

    $: {
        if (browser && map.initialized) {
            map.selectZone(selectedZone);
        }
    }

    if (browser) {
        onMount(async () => {
            const Plotly = await import("plotly.js-dist-min");
            function zonePie() {
                const entries = Object.entries(areas);
                const data = [{
                    values: entries.map(([_, area]) => area) as number[],
                    labels: entries.map(([label, _]) => label),
                    colors: entries.map(_ => "white"),
                    marker: {
                        colors: entries.map(([label, _]) => colors[label]),
                    },
                    showlegend: false,
                    textinfo: "label+percent" as "label+percent",
                    hole: .6,
                    textposition: "outside" as "outside",
                    automargin: true,
                    type: "pie" as "pie",
                }];

                var config = { 
                    responsive: true,
                    displaylogo: false,
                };

                Plotly.newPlot("pie-chart", data, {}, config);
            }
            zonePie();

            function singleFamilyPie() {
                const entries = Object.entries(residential);
                entries.sort(([a, _], [b, __]) => a < b ? 1 : -1);
                const data = [{
                    values: entries.map(([_, area]) => area) as number[],
                    labels: entries.map(([label, _]) => label),
                    colors: entries.map(_ => "white"),
                    marker: {
                        colors: entries.map(([label, _]) => colors[label]),
                    },
                    showlegend: false,
                    textinfo: "label+percent" as "label+percent",
                    hole: .6,
                    textposition: "outside" as "outside",
                    automargin: true,
                    type: "pie" as "pie",
                    sort: false,
                }];

                var config = { 
                    responsive: true,
                    displaylogo: false,
                };

                Plotly.newPlot("pie-chart-residential", data, {}, config);
            }
            singleFamilyPie();

            // Map
            const L = (await import('leaflet')).default;

            map.initialize(L, filteredZones);
        });
    }
</script>

<style lang="scss">
    :global(a) {
        color: inherit;
    }
</style>


<svelte:head>
    <title>Livable Portland - Zoning 101</title>
</svelte:head>

<article class="text-start">
<h1 class="text-primary text-center mb-4">Zoning 101</h1>
<div id="map-container" class="text-start mb-2">
    <p id="map" class="m-0"/>
    <div id="map-table" class="d-inline-flex flex-column">
        <div class="p-2">
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" bind:checked={overlayZones}>
                <label class="form-check-label" for="flexSwitchCheckDefault">Overlay Zones</label>
            </div>
        </div>
        <table class="table text-start d-inline-block m-0" style="overflow-y: scroll;">
        <tbody>
            {#each tableValuesFiltered as tableSection}
                <tr style="background-color: {colors[tableSection.rows[0].code] || 'white'}">
                    <th colspan=2>{tableSection.header}</th>
                </tr>
                <tr style="background-color: {colors[tableSection.rows[0].code] || 'white'}">
                    <th scope="col">Code</th>
                    <th scope="col">Friendly Name</th>
                </tr>
                {#each tableSection.rows as tableRow}
                    <tr 
                        on:mouseover="{() => selectedZone = tableRow.code}"
                        on:mouseout="{() => selectedZone = null}"
                        on:focus="{() => selectedZone = tableRow.code}"
                        on:blur="{() => selectedZone = null}"
                        style="background-color: {colors[tableRow.code]}; cursor: pointer;{whiteText[tableRow.code] && "color: white"};{selectedZone === tableRow.code ? "outline: 2px solid black" : ""}"
                    >
                        <td>{tableRow.code}</td>
                        <td>{@html tableRow.friendlyName}</td>
                    </tr>
                {/each}
            {/each}
        </tbody>
        </table>
    </div>
</div>

<p>Zoning is a big deal. You might not hear about it as much as some more flashy issues but zoning has a massive impact on your life. Zoning controls what you are allowed to do with your property, how much your rent will be, how your home value changes over time, where you are able to move, what sorts of businesses you can open and where, and how you get around. Local issues may seem small but they have a big influence on your immediate surroundings and together, a lot of local policies have big national effects. It influences the environment, economic equality, prosperity, and even how much of a sense of community your neighborhood has. After nearly a century, zoning has faded into the backgrounds of our minds and seems like it is just the way things are. But zoning should not be in the background, changing zoning policies can change lives.</p>

<p>But what is it really? Zoning is a set of policies that govern how land can be used. Some common zoning policies are: the creation of residential zones (areas where businesses are't allowed), minimum parking requirements (certain types of buildings must have a minimum amount of off-street parking), and minimum lot size requirements (it is illegal for you to cut your property in half and sell one of the halves). Zoning codes are hundreds of pages long and contain a lot of specific rules about what you can and can't do with certain pieces of land.</p>

<p>I built this map to get to know Portland's zones. This page is a work in progress and I hope to add more friendly summaries of some of the zoning law to this page as well. While I was researching zones on Portland's <a href="https://www.portlandmaine.gov/2543/GIS-Map-Online-Map-Viewer">generously provided zoning map</a> I found I strugled to find specific zones and move around quickly. This page gives each zone a friendly name all in one table and you can hover over each zone to locate it. Hopefully, this can help you get to know our city's zones and there is even more info to come. Here is a land area breakdown of Portland's zones as well.</p>

<div id="pie-chart"/>

<p>Even though there's a lot of nitty-gritty detail the zoning codes of American Cities mostly look pretty similar. They usually draw a bunch of lines on a map to divide their cities into zones and then give each zone a use like single-family residential, light industrial, business, ect... This is called <strong>Euclidean Zoning</strong>. Euclid was a famous geometry guy and Euclidean zoning involves drawing lots of shapes but sadly this is a coincidence, it is actually named after Euclid, Ohio. This is (mostly) the type of zoning that Portland uses. I say mostly because like many cities, Portland is making small moves away from this model within their zoning code. One reason that the definition of zoning gets kind of fuzzy is that when cities try out new ideas (or bring back some really good old ideas) they usually add them to their existing zoning codes because that is where the laws go. For example, in Portland we have the <strong style="cursor: pointer" class="text-secondary" on:mouseover="{() => selectedZone = "IS-FBC"}" on:mouseout="{() => selectedZone = null}" on:focus="{() => selectedZone = "IS-FBC"}" on:blur="{() => selectedZone = null}">India Street Form Based Zone</strong>. <strong>Form Based Zoning</strong> is a different kind of regulation than Euclidean Zoning but in Portland it is considered just another zone among many Euclidean Zones.</p>

<p>While some zoning can be helpful, you wouldn't want an oil refinery opening up nextdoor, zoning is also one of the primary drivers of car dependency and increasing housing costs in North America. In the above breakdown you can see that 44% of the city's land can't have a business of any kind, even a low-impact neighborhood business. This ensures people will need to drive farther to reach businesses. Over 60% of those residential zones are single-family only R-1, R-2, and R-3 zones. Even the R-5 zone contains laws that prevent many plots from being anything but single-family homes.</p>

<div id="pie-chart-residential"/>
</article>
