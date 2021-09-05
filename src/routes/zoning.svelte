<script lang="ts">
    import { browser } from "$app/env";
    import { onMount } from "svelte";

    const colors = {
        "IR-1": "#fffac2",
        "IR-2": "#fff595",
        "IR-3": "#fde267",
        "I-B": "#fae3e3",
        "I-TS": "#acacac",
        "R1": "#fefac2",
        "R2": "#fef595",
        "R3": "#fde267",
        "R4": "#feca00",
        "R5": "#f7b512",
        "R-5A": "#e99d19",
        "R6": "#dd8519",
        "R-6A": "#a86f00",
        "RP": "#acacac",
        "AB": "#dcdcdc",
        "OP": "#dcdcdc",
        "B1": "#fae3e3",
        "B1b": "#f9e2e2", // TODO: line
        "B2": "#fac4c4",
        "B2b": "#f8c2c2", // TODO: line
        "B2c": "#f8c2c2", // TODO: dots
        "B3": "#faa3a3",
        "B3c": "#fca3a3", // TODO: line
        "B4": "#f98585",
        "B5": "#fc6666",
        "B5b": "#fc6666",
        "B6": "#fe3737",
        "B7": "#bf0700",
        "IS-FBC": "#740000",
        "IL": "#edecfd",
        "ILb": "#edecfd", // TODO: line
        "IM": "#c9c2fe",
        "IMb": "#c9c2fe", // TODO: line
        "IH": "#aca4fe",
        "RPZ": "#c2fec2",
        "WPDZ": "#d6fdfe",
        "WCZ": "#a4f9fe", // TODO: line
        "WSUZ": "#a4f9fe",
        "EWPZ": "#bfe2f8",
        "ROS": "#a0fe9d",
    };

    const zoomLabelSize = {
        14: "8px",
        15: "10px",
        16: "12px",
        17: "14px",
        18: "16px",
    };

    let updateZone = () => {};
    let selectedZone: string | null = null;
    $: { updateZone(selectedZone); }

    const tableValues = [{
        code: "R1",
        friendlyName: "Single Family",
        purposeStatement: "To provide for lower density residential development characterized by single-family homes on individual lots in outlying areas of the city and along traffic corridors with limited additional traffic capacity.",
    }, {
        code: "R2",
        friendlyName: "Single Family",
        purposeStatement: "To provide for lower density residential development characterized by single-family homes on individual lots in outlying areas of the city and along traffic corridors with limited additional traffic capacity.",
    }, {
        code: "R3",
        friendlyName: "Mostly Single Family",
        purposeStatement: "To provide for medium-density residential development characterized by single-family homes on individual lots and also to provide for planned residential unit developments on substantially sized parcels.",
    }, {
        code: "R4",
        friendlyName: "Western Promenade",
        purposeStatement: "To preserve the unique character of the Western Promenade area of the city by controlling residential conversions and by allowing the continued mix of single-family, two-family, and low-rise multi-family dwellings and other compatible development at medium densities.",
    }, {
        code: "R5",
        friendlyName: "Single + Multifamily",
        purposeStatement: "To provide appropriate areas of the city for medium-density residential development characterized by single- family, two-family and low-intensity multifamily dwellings on individual lots; to ensure the stability of established medium-density neighborhoods by controlling residential conversions; and to provide for planned residential unit development on substantially-sized parcels.",
    }, {
        code: "R-5A",
        friendlyName: `<a href="https://g.page/HSL-AshtonGardens?share" target="_blank">Ashton Gardens Gracious Retirement Living</a> and <a href="https://goo.gl/maps/quAxiwDviTSfPtd28" target="_blank">St. Joseph's Convent</a>`,
        purposeStatement: "To provide for moderate-density residential development in off-peninsula locations that can provide a unique residential living experience with a high degree of natural site amenities; and to provide areas of the city in the general proximity of the peninsula that have the capability for adequate municipal services, including traffic corridors with adequate traffic capacity, that can appropriately accommodate a more intensive use of land than other lower-density zoned land and be compatible with surrounding neighborhoods; and to increase affordable housing opportunities in off-peninsula locations by providing a moderate-density zone.",
    }, {
        code: "R6",
        friendlyName: "Multifamily + Low Rise Apartments",
        purposeStatement: "To set aside areas on the peninsula for housing characterized primarily by multi-family dwellings at a high density providing a wide range of housing for differing types of households; to conserve the existing housing stock and residential character of neighborhoods by controlling the scale and external impacts of professional offices and other nonresidential uses; and to encourage new housing development consistent with the compact lot development pattern typically found on the peninsula.",
    }, {
        code: "R-6A",
        friendlyName: `<a href="https://goo.gl/maps/cn6SA3jbEAL7r4Md6" target="_blank">Deering Pavilion</a> and <a href="https://g.page/ParkDanforth?share" target="_blank">The Park Danforth</a>`,
        purposeStatement: "To encourage neighborhood livability with higher density multi-family housing on large parcels located off the peninsula along major public transportation routes, near service areas, and in redevelopment (underutilized) or infill areas.",
    }, {
        code: "R7",
        friendlyName: "Apartment Buildings",
        purposeStatement: "To encourage and accommodate compact residential development on appropriate locations on the Portland peninsula, pursuant to the New Vision for Bayside and housing plans of the City of Portland.",
    }];

    if (browser) {
        onMount(() => {
            // Plotly

            const trace1 = {
                x: ["R1", "R2", "R3", "R4", "R5", "R-5A", "R6", "R-6A"],
                y: [ 1.5, 13.7, 49.7,  1.3, 24.7,  0.3,  8.5,  0.2],
                name: "% of Residential",
                type: "bar",
            };

            const trace2 = {
                x: ["R1", "R2", "R3", "R4", "R5", "R-5A", "R6", "R-6A"],
                y: [ 0.7,  6.1, 22.1,  0.6, 11. ,  0.1,  3.8,  0.1],
                name: "% of Total",
                type: "bar",
            };

            const data = [trace1, trace2];

            const layout = {
                title: "Land Use by Residential Zone",
                font:{
                  family: "Raleway, sans-serif"
                },
                barmode: "group",
            };

            Plotly.newPlot('gd', data, layout);

            // Map

            var map = new L.Map("map", {
                center: [43.680535819832734, -70.2235107589513],
                zoom: 12,
                maxBounds: [[43.74257661763999, -70.05871583707632], [43.61843080183568, -70.38830568082632]],
                minZoom: 12,
            }).addLayer(new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"));

            const svg = d3.select(map.getPanes().overlayPane).append("svg");
            const g = svg.append("g").attr("class", "leaflet-zoom-hide");

            async function loadZones() {
                const rawCollection = await (await fetch("/zones.json")).json();
                const features = rawCollection.features.map(feature => ({
                    type: "Feature",
                    id: feature.OBJECTID,
                    properties: {
                        name: feature.attributes.ACAD_TEXT,
                    },
                    geometry: {
                        type: "Polygon",
                        coordinates: feature.geometry.rings,
                    },
                })).filter(feature => feature.geometry.coordinates[0]);

                const collection = {
                     type: "FeatureCollection",
                     features,
                };

                // Use Leaflet to implement a D3 geometric transformation.
                function projectPoint(x, y) {
                    const {x: px, y: py} = map.latLngToLayerPoint(new L.LatLng(y, x));
                    this.stream.point(px, py);
                }

                const transform = d3.geoTransform({ point: projectPoint });
                const path = d3.geoPath().projection(transform);

                const feature = g.selectAll("path")
                    .data(collection.features)
                    .enter()
                    .append("path")
                    .attr("stroke", "black")
                    .attr("fill-opacity", "0.4")
                    .attr("fill", feature => colors[feature.properties.name] || "#fff")
                    .attr("style", "pointer-events: auto;")
                    .on("mouseover", (_, { properties }) => { selectedZone = properties.name; })
                    .on("mouseout", (_, { properties }) => { selectedZone = null; });

                updateZone = (zone: string | null) => {
                    feature
                        .attr("fill-opacity", ({ properties }) => properties.name === zone ? "0.8" : "0.4")
                        .attr("stroke-width", ({ properties }) => properties.name === zone ? "2px" : "1px");

                }

                let labels;

                // Reposition the SVG to cover the features.
                function reset() {
                    const [topLeft, bottomRight] = path.bounds(collection);

                    svg.attr("width", bottomRight[0] - topLeft[0])
                        .attr("height", bottomRight[1] - topLeft[1])
                        .style("left", topLeft[0] + "px")
                        .style("top", topLeft[1] + "px");

                    g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
                    feature.attr("d", path);

                    if (labels) labels.remove();
                    const zoom = map.getZoom();
                    if (zoom > 13) {
                        labels = g.selectAll("text")
                            .data(collection.features)
                            .enter()
                            .append("text")
                            .text(feature => feature.properties.name)
                            .attr("class", "place-label")
                            .attr("text-anchor","middle")
                            .attr("x", feature => path.centroid(feature)[0])
                            .attr("y", feature => path.centroid(feature)[1])
                            .style("font-size", zoomLabelSize[zoom])
                            .style("font-weight", "bold");
                    }
                }

                map.on("moveend", reset);
                map.on("zoom", reset);

                reset();
            }
            loadZones();
        });
    }
</script>

<style>
    :global(a) {
        color: inherit;
    }

    #map {
        width: 960px;
        height: 500px;
    }
</style>


<svelte:head>
    <title>Livable Portland - Zoning 101</title>
</svelte:head>

<article class="text-start">
<h1 class="text-primary">Zoning 101</h1>

<div class="text-center">
<p id="map" class="d-inline-block"/>
</div>

<p>Zoning is a set of policies that govern how land can be used. Some common zoning policies are: the creation of residential zones (areas where businesses are't allowed), minimum parking requirements (certain types of buildings must have a minimum amount of off-street parking), and minimum lot size requirements (it is illegal for you to cut your property in half and sell half of it). Zoning policy can actually get pretty confusing, not just because the zoning codes are hundreds of pages long, but because what is and isn't zoning is actually pretty arbitrary. Houston Texas has "no zoning code" but they have a lot of the same kinds of laws that would be in a zoning code they just call them something else. Building height is usually considered zoning but in New York City they use a system of Air Rights for that.</p>

<p>Even though there are lots of weird exceptions the zoning codes of American Cities mostly look pretty similar. They usually draw a bunch of lines on a map to divide their cities into zones and then give each zone a use like single-family residential, light industrial, business, ect... This is called <strong>Euclidean Zoning</strong>, Euclid was a famous geometry guy and Euclidean zoning involves drawing lots of shapes but sadly this is a coincidence, it is actually named after Euclid, Ohio. When I say that I don't like zoning I am really talking about the idea of creating zones for specific uses, and not all the other stuff that is sometimes called zoning. This is (mostly) the type of zoning that Portland uses. I say mostly because like many cities, Portland is making small moves away from this model within their zoning code. One reason that the definition of zoning gets kind of fuzzy is that when cities try out new ideas (or bring back some really good old ideas) they usually add them to their existing zoning codes because that is where the laws go. For example, in Portland we have the <strong style="cursor: pointer" class="text-secondary" on:mouseover="{() => selectedZone = "IS-FBC"}" on:mouseout="{() => selectedZone = null}" on:focus="{() => selectedZone = "IS-FBC"}" on:blur="{() => selectedZone = null}">India Street Form Based Zone</strong>. <strong>Form Based Zoning</strong> is a different kind of regulation than Euclidean Zoning but in Portland it is considered just another Euclidean zone.</p>

<table class="table text-start">
  <thead>
    <tr>
      <th scope="col">Code</th>
      <th scope="col">Friendly Name</th>
      <th scope="col">Purpose Statement</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan=3>Residential</td>
    </tr>
    {#each tableValues as tableRow}
        <tr 
          on:mouseover="{() => selectedZone = tableRow.code}"
          on:mouseout="{() => selectedZone = null}"
          on:focus="{() => selectedZone = tableRow.code}"
          on:blur="{() => selectedZone = null}"
          style="background-color: {colors[tableRow.code]}; cursor: pointer"
        >
            <td>{tableRow.code}</td>
            <td>{@html tableRow.friendlyName}</td>
            <td>{tableRow.purposeStatement}</td>
        </tr>
    {/each}
  </tbody>
</table>

<div id="gd"/>
</article>
