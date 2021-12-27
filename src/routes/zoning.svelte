<script lang="ts" context="module">
    import YAML from "yaml";

    export async function load({ fetch }) {
        const responses = await Promise.all([
            fetch("/table.yaml"),
            fetch("/areas.json"),
            fetch("/zones.json"),
        ]);

        if (responses.every(r => r.ok)) {
            const parsed = await Promise.all(responses.map((elem, i) => i == 0 ? elem.text() : elem.json()));
            return {
                props: {
                    tableValues: YAML.parse(parsed[0]),
                    areas: parsed[1],
                    zones: parsed[2],
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

    export let tableValues: any;
    export let areas: any;
    export let zones: any;
    let overlayZones = false;

    $: filteredZones = !overlayZones 
        ? {
            ...zones,
            features: zones.features.filter(({ properties }) => properties.zoneType !== "overlay"),
        }
        : zones;

    class Map {
        private map: any;
        private g: any;
        private labels: any;
        private div: any;
        private svg: any;
        private path: any;
        private feature: any;
        private zones: any;

        public initialized: boolean;

        initialize(zones: any) {
            this.map = new L.Map("map", {
                center: [43.680535819832734, -70.2235107589513],
                zoom: 12,
                maxBounds: [[43.74257661763999, -70.05871583707632], [43.61843080183568, -70.38830568082632]],
                minZoom: 12,
                attributionControl: false,
            }).addLayer(new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"));

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
            if (properties.zoneType === "overlay") return;
            selectedZone = properties.name;
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

            if (this.labels) this.labels.remove();
            const zoom = this.map.getZoom();
            if (zoom > 13) {
                this.labels = this.g.selectAll("text")
                    .data(this.zones.features)
                    .enter()
                    .append("text")
                    .text(({ properties }) => properties.zoneType === "overlay" ? properties.name : "")
                    .attr("class", "place-label")
                    .attr("text-anchor","middle")
                    .attr("x", feature => this.path.centroid(feature)[0])
                    .attr("y", feature => this.path.centroid(feature)[1])
                    .style("font-size", zoomLabelSize[zoom])
                    .style("font-weight", "bold");
            }
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
                .attr("fill-opacity", ({ properties }) => properties.zoneType === "normal" ? 0.4 : 0)
                .attr("fill", ({ properties }) => colors[properties.name] || "#fff")
                .attr("style", "pointer-events: auto;")
                .attr("stroke-width", ({ properties }) => properties.zoneType === "overlay" ? "4px" : "1px")
                .on("mouseenter", this.handleMouseEnter.bind(this))
                .on("mousemove", this.handleMouseover.bind(this))
                .on("mouseout", this.handleMouseout.bind(this));
            this.reset();
        }

        selectZone(zone: string | null) {
            this.feature
                .attr("fill-opacity", ({ properties }) => colors[properties.name] ? (properties.name === zone ? "0.8" : "0.4") : 0)
                .attr("stroke-width", ({ properties }) => properties.zoneType === "overlay" ? (properties.name === zone ? "4px" : "1px") : (properties.name === zone ? "2px" : "1px"));
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

    const zoomLabelSize = {
        14: "8px",
        15: "10px",
        16: "12px",
        17: "14px",
        18: "16px",
    };

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
        onMount(() => {
            async function loadAreas() {
                const total = Object.values(areas).reduce((a, b) => a + b);
                const percents = Object.entries(areas).reduce((acc, [name, value]) => ({
                    ...acc,
                    [name]: Math.round(100 * 100 * value / total) / 100,
                }), {});

                const width = 800;
                const height = 350;
                const margin = 0;

                // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
                const radius = Math.min(width, height) / 2 - margin

                // append the svg object to the div called 'my_dataviz'
                const svg = d3.select("#pie-chart")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                // Compute the position of each group on the pie:
                const pie = d3.pie()
                    .sort(null) // Do not sort group by size
                    .value(([_, value]) => value);
                const data_ready = pie(Object.entries(areas))

                // The arc generator
                const arc = d3.arc()
                    .innerRadius(radius * 0.5)         // This is the size of the donut hole
                    .outerRadius(radius * 0.8)

                // Another arc that won't be drawn. Just for labels positioning
                const outerArc = d3.arc()
                    .innerRadius(radius * 0.9)
                    .outerRadius(radius * 0.9)

                // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
                svg
                    .selectAll('allSlices')
                    .data(data_ready)
                    .enter()
                    .append('path')
                    .attr('d', arc)
                    .attr('fill', ({ data }) => colors[data[0]])
                    .attr("stroke", "white")
                    .style("stroke-width", "2px")
                    .style("opacity", 0.7)

                // Add the polylines between chart and labels:
                svg
                    .selectAll('allPolylines')
                    .data(data_ready)
                    .enter()
                    .append('polyline')
                        .attr("stroke", "black")
                        .style("fill", "none")
                        .attr("stroke-width", 1)
                        .attr('points', (d) => {
                            let posA = arc.centroid(d) // line insertion in the slice
                            let posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
                            let posC = outerArc.centroid(d); // Label position = almost the same as posB
                            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
                            posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
                            // HACK: lower Resource Protection
                            if (d.data[0] === "Resource Protection") {
                                posB[1] += 20;
                                posC[1] += 20;
                            } else if (d.data[0] === "Island") {
                                posB[1] += 5;
                                posC[1] += 5;
                            } else if (d.data[0] === "Open Space") {
                                posB[1] += 15;
                                posC[1] += 15;
                            }
                            return [posA, posB, posC]
                        })

                // Add the polylines between chart and labels:
                svg
                    .selectAll('allLabels')
                    .data(data_ready)
                    .enter()
                    .append('text')
                        .text(({ data }) => `${percents[data[0]]}% ${data[0]}`)
                        .attr('transform', (d) => {
                            const pos = outerArc.centroid(d);
                            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                            pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                            // HACK: lower Resource Protection
                            if (d.data[0] === "Resource Protection") {
                                pos[1] += 20;
                            } else if (d.data[0] === "Island") {
                                pos[1] += 5;
                            } else if (d.data[0] === "Open Space") {
                                pos[1] += 15;
                            }
                            pos[1] += 5;
                            return 'translate(' + pos + ')';
                        })
                        .style('text-anchor', (d) => {
                            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                            return (midangle < Math.PI ? 'start' : 'end')
                        })
            }
            loadAreas();

            // Map

            map.initialize(filteredZones);
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
<h1 class="text-primary text-center">Zoning 101</h1>
<div class="text-start d-flex">
    <p id="map" class="d-inline-block"/>
    <table class="table text-start d-inline-block" style="height: 600px; overflow: scroll;">
      <tbody>
        {#each tableValues as tableSection}
            <tr>
                <th colspan=2>{tableSection.header}</th>
            </tr>
            <tr>
                <th scope="col">Code</th>
                <th scope="col">Friendly Name</th>
              </tr>
            {#each tableSection.rows as tableRow}
                <tr 
                    on:mouseover="{() => selectedZone = tableRow.code}"
                    on:mouseout="{() => selectedZone = null}"
                    on:focus="{() => selectedZone = tableRow.code}"
                    on:blur="{() => selectedZone = null}"
                    style="background-color: {colors[tableRow.code]}; cursor: pointer;{whiteText[tableRow.code] && "color: white"}"
                >
                    <td>{tableRow.code}</td>
                    <td>{@html tableRow.friendlyName}</td>
                </tr>
            {/each}
        {/each}
      </tbody>
    </table>
</div>
<div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" bind:checked={overlayZones}>
    <label class="form-check-label" for="flexSwitchCheckDefault">Overlay Zones</label>
</div>

<p>Zoning is a big deal. You might not hear about it as much as some more flashy issues but zoning has a massive impact on your life. Zoning controls what you are allowed to do with your property, how much your rent will be, how your home value changes over time, where you are able to move, what sorts of businesses you can open and where, and how you get around. Local issues may seem small but they have a big influence on your immediate surroundings and together, a lot of local policies have big national effects. It influences the environment, economic equality, prosperity, and even how much of a sense of community your neighborhood has. After nearly a century, zoning has faded into the backgrounds of our minds and seems like it is just the way things are. But zoning should not be in the background, changing zoning policies can change lives.</p>

<p>So I just waxed poetic about how powerful zoning can be, but what is it really? Zoning is a set of policies that govern how land can be used. Some common zoning policies are: the creation of residential zones (areas where businesses are't allowed), minimum parking requirements (certain types of buildings must have a minimum amount of off-street parking), and minimum lot size requirements (it is illegal for you to cut your property in half and sell one of the halves). Zoning policy can actually get pretty confusing, not just because the zoning codes are hundreds of pages long, but because what is and isn't zoning is actually pretty arbitrary. Houston Texas claims to have no zoning code but they have a lot of the same kinds of laws that would be in a zoning code they just call them something else. Building height laws are usually considered zoning but in New York City they use a system of Air Rights for that.</p>

<p>Even though there are lots of weird exceptions the zoning codes of American Cities mostly look pretty similar. They usually draw a bunch of lines on a map to divide their cities into zones and then give each zone a use like single-family residential, light industrial, business, ect... This is called <strong>Euclidean Zoning</strong>. Euclid was a famous geometry guy and Euclidean zoning involves drawing lots of shapes but sadly this is a coincidence, it is actually named after Euclid, Ohio. This is (mostly) the type of zoning that Portland uses. I say mostly because like many cities, Portland is making small moves away from this model within their zoning code. One reason that the definition of zoning gets kind of fuzzy is that when cities try out new ideas (or bring back some really good old ideas) they usually add them to their existing zoning codes because that is where the laws go. For example, in Portland we have the <strong style="cursor: pointer" class="text-secondary" on:mouseover="{() => selectedZone = "IS-FBC"}" on:mouseout="{() => selectedZone = null}" on:focus="{() => selectedZone = "IS-FBC"}" on:blur="{() => selectedZone = null}">India Street Form Based Zone</strong>. <strong>Form Based Zoning</strong> is a different kind of regulation than Euclidean Zoning but in Portland it is considered just another zone among many Euclidean Zones.</p>

<div class="text-center">
<p id="pie-chart" class="d-inline-block"/>
</div>
</article>
