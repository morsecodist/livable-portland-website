<script lang="ts">
    import { browser } from "$app/env";
    import { onMount } from "svelte";

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
    };

    const zoomLabelSize = {
        14: "8px",
        15: "10px",
        16: "12px",
        17: "14px",
        18: "16px",
    };

    let updateZone = () => {};
    let selectedZone: string | null = "I-TS";
    $: { updateZone(selectedZone); }

    const tableValues = [{
        header: "Residential",
        rows: [{
            code: "R-1",
            friendlyName: "Single Family",
            purposeStatement: "To provide for lower density residential development characterized by single-family homes on individual lots in outlying areas of the city and along traffic corridors with limited additional traffic capacity.",
        }, {
            code: "R-2",
            friendlyName: "Single Family",
            purposeStatement: "To provide for lower density residential development characterized by single-family homes on individual lots in outlying areas of the city and along traffic corridors with limited additional traffic capacity.",
        }, {
            code: "R-3",
            friendlyName: "Mostly Single Family",
            purposeStatement: "To provide for medium-density residential development characterized by single-family homes on individual lots and also to provide for planned residential unit developments on substantially sized parcels.",
        }, {
            code: "R-4",
            friendlyName: "Western Promenade",
            purposeStatement: "To preserve the unique character of the Western Promenade area of the city by controlling residential conversions and by allowing the continued mix of single-family, two-family, and low-rise multi-family dwellings and other compatible development at medium densities.",
        }, {
            code: "R-5",
            friendlyName: "Single + Multifamily",
            purposeStatement: "To provide appropriate areas of the city for medium-density residential development characterized by single- family, two-family and low-intensity multifamily dwellings on individual lots; to ensure the stability of established medium-density neighborhoods by controlling residential conversions; and to provide for planned residential unit development on substantially-sized parcels.",
        }, {
            code: "R-5a",
            friendlyName: `<a href="https://g.page/HSL-AshtonGardens?share" target="_blank">Ashton Gardens Gracious Retirement Living</a> and <a href="https://goo.gl/maps/quAxiwDviTSfPtd28" target="_blank">St. Joseph's Convent</a>`,
            purposeStatement: "To provide for moderate-density residential development in off-peninsula locations that can provide a unique residential living experience with a high degree of natural site amenities; and to provide areas of the city in the general proximity of the peninsula that have the capability for adequate municipal services, including traffic corridors with adequate traffic capacity, that can appropriately accommodate a more intensive use of land than other lower-density zoned land and be compatible with surrounding neighborhoods; and to increase affordable housing opportunities in off-peninsula locations by providing a moderate-density zone.",
        }, {
            code: "R-6",
            friendlyName: "Multifamily + Low Rise Apartments",
            purposeStatement: "To set aside areas on the peninsula for housing characterized primarily by multi-family dwellings at a high density providing a wide range of housing for differing types of households; to conserve the existing housing stock and residential character of neighborhoods by controlling the scale and external impacts of professional offices and other nonresidential uses; and to encourage new housing development consistent with the compact lot development pattern typically found on the peninsula.",
        }, {
            code: "R-6a",
            friendlyName: `<a href="https://goo.gl/maps/cn6sa3jbeal7r4md6" target="_blank">Deering Pavilion</a> and <a href="https://g.page/parkdanforth?share" target="_blank">The Park Danforth</a>`,
            purposeStatement: "To encourage neighborhood livability with higher density multi-family housing on large parcels located off the peninsula along major public transportation routes, near service areas, and in redevelopment (underutilized) or infill areas.",
        }, {
            code: "R-7",
            friendlyName: "Apartment Buildings",
            purposeStatement: "To encourage and accommodate compact residential development on appropriate locations on the Portland peninsula, pursuant to the New Vision for Bayside and housing plans of the City of Portland.",
        }],
    }, {
        header: "Island",
        rows: [{
            code: "IR-1",
            friendlyName: "",
            purposeStatement: "To provide for low-intensity residential, recreational, and rural uses in the less developed areas of the islands in order to preserve the rustic character of the islands, to protect groundwater resources and natural and scenic areas, and to permit only appropriate low-intensity development in areas lacking adequate public facilities and services.",
        }, {
            code: "IR-2",
            friendlyName: "",
            purposeStatement: "To protect the character of existing developed residential neighborhoods on the islands and to allow infill where there are adequate public services. Expansion or extension of an existing IR-2 zone should be strictly limited, generally focused toward areas adjacent to existing village IR-2 areas, and restricted by such factors as adequacy of access, whether adequate water will be available for private use and for fire protection, and whether soils in the area are adequate for subsurface water disposal or whether public sewers are available. IR-2 rezoning on substantially sized parcels should not be considered for those sites that should be more appropriately zoned otherwise.",
        }, {
            code: "IR-3",
            friendlyName: "",
            purposeStatement: `To allow for a planned unit development in a manner compatible with both the natural and built environment, which provides for adequate circulation and waterfront access, adequate water supply for private use and fire protection, and safe and clean disposal of solid and septic wastes. The following guidelines shall be considered, among others, in establishing an IR-3 zone:
<ol type="A">
<li>An IR-3 zone should have a minimum land area of 20 acres.</li>
<li>A site for an IR-3 zone should be able to accommodate higher density development by providing buffers from surrounding areas on a substantially-sized parcel for which natural amenities are capable of being conserved in a development plan for the site.</li>
<li>IR-3 zones should not be established unless issues of municipal services, including infrastructure, education, and police and fire services and other municipal services can be appropriately and adequately addressed.</li>
<li>The differences in scale and intensity of uses between existing development and the IR-3 zone, and the cumulative impact on the overall density of the island, should be mitigated by appropriate open space and buffer areas.</li>
<li>The development plan should have the capability of meeting the development review standards of the zone.</li>
</ol>`,
        }, {
            code: "I-B",
            friendlyName: "",
            purposeStatement: "To provide limited areas on the islands for retail and service establishments that primarily serve the needs of the local island market area.",
        }, {
            code: "I-TS",
            friendlyName: '<a href="https://www.islandinstitute.org/ii-solution/peaks-island-transfer-station/" target="_blank">Peaks Island Transfer Station</a>',
            purposeStatement: "",
        }],
    }, {
        header: "Mixed Use",
        rows: [{
            code: "B-1",
            friendlyName: "",
            purposeStatement: "To provide limited areas for the location of small-scale commercial establishments intended to serve a local market. Uses that are complimentary, quiet, and generally do not disturb the comfort and enjoyment of the adjoining neighborhood environment are encouraged, and should be designed for the pedestrian scale and to provide convenient access for nearby residents and workers to walk in to purchase goods and services. Buildings and uses shall be designed with attractive storefronts or similar features, with windows and doors convenient to a public sidewalk. This zone encourages mixed-use buildings, such as commercial first floor with residential uses above or combined retail/office uses in a multi-story structure. The zone also provides the opportunity for high residential density. Suitable locations for this zone may include street intersections and arterial streets with existing or proposed traditional neighborhood retail and service uses.",
        }, {
            code: "B-1b",
            friendlyName: "",
            purposeStatement: "To provide appropriate opportunities for the establishment of small-scale ground floor commercial uses to serve a local market, while supporting mixed-use buildings with residential uses above ground floor commercial space and on the ground floor where the principal street frontage is maintained for active commercial uses. The zone also provides the opportunity for mixed use and high residential density. Suitable locations for this zone may include street intersections, arterial streets, and sites with existing or traditional neighborhood retail and service uses.",
        }, {
            code: "B-2",
            friendlyName: "",
            purposeStatement: "To provide appropriate locations for the development and operation of community centers offering a mixture of commercial uses, housing, and services serving the adjoining neighborhoods and the larger community. The variety, sites, and intensity of the permitted commercial uses in the B-2 zone are intended to be greater than those permitted in the B-1/B-1b zones. The zone provides a broad range of goods and services with a mixture of large and small buildings, such as grocery stores, shops and services located in major shopping centers and along arterial streets. Such establishments should be readily accessible by automobile, by pedestrians and by bicycle. Development in the B-2 zone should relate to the surrounding neighborhoods by design, orientation, and circulation patterns. The zone should provide locations for moderate to high-density housing in urban neighborhoods along arterials.",
        }, {
            code: "B-2b",
            friendlyName: "",
            purposeStatement: "To provide neighborhood and community retail, business and service establishments that are oriented to and built close to the street. The B-2b zone is appropriate in areas where a more compact urban development pattern exists or where a neighborhood-compatible commercial district is established which exhibits a pedestrian scale and character. Such locations may include the peninsula and other arterials and intersections with an existing urban or neighborhood- oriented building pattern. The B-2b should provide locations for moderate to high-density housing in urban neighborhoods along arterials.",
        }, {
            code: "B-2c",
            friendlyName: "",
            purposeStatement: "To protect and enhance the quiet enjoyment of adjoining residential neighborhoods from the impacts of businesses that serve liquor and from other uses that are incompatible with adjoining neighborhoods due to noise.",
        }, {
            code: "B-3",
            friendlyName: "Old Port",
            purposeStatement: "To maintain and enhance the role of the downtown as the business and commercial center of the region; to enhance and promote the orderly expansion of retail and service businesses downtown, satisfying the related needs of the city’s resident, working, and visitor populations; to encourage increased housing opportunity downtown for a diverse residential population; to enhance the pedestrian environment through the encouragement of intensive mixed-use activities, through the enhancement and maintenance of public and private open space, and through the enlivenment and increased attractiveness of the street environment; to encourage excellence in urban design; to preserve and capitalize on the unique character and historic fabric of the downtown through the encouragement of reuse of significant existing structures; to provide opportunity for an enhanced presence and integration of the arts and cultural activities; to reinforce the role of the downtown as a meeting place for community residents and visitors alike from all walks of life and all socio- economic groups; to provide adequate parking and transportation facilities which promote accessibility, enhance and encourage development opportunity, and enhance and protect the pedestrian environment; In the Pedestrian Activities District (PAD) Overlay Zone, to create continuity of pedestrian-oriented uses along streets where such uses predominate and along streets which, over time, will establish and maintain a strong retail and pedestrian-oriented use pattern; and to provide for the relocation of residents who are displaced by development.",
        }, {
            code: "B-3c",
            friendlyName: "Forrest Avenue",
            purposeStatement: "In addition to the purpose of the B-3 and B-3b zone, to promote the safety, quiet enjoyment, and general welfare of citizens residing in a dense urban neighborhood by decreasing the conflicts between residential uses and loud late- night activities. The B-3c zone recognizes that the business uses appropriate in this zone are constrained by the proximity of multi-unit elderly housing.",
        }, {
            code: "B-4",
            friendlyName: "",
            purposeStatement: "To provide appropriate locations in the city for the development and operation of businesses catering primarily to highway-oriented trade along major arterials (uses which have market areas which are primarily dependent on the regional highway network or serve a regional or larger market), as well as to provide appropriate locations for large- scale commercial uses that require larger land areas to accommodate their operations.",
        }, {
            code: "B-5",
            friendlyName: "",
            purposeStatement: "To provide areas of the peninsula near the downtown where a mixture of uses, including marine, industrial, commercial, and residential, is encouraged. The B- 5 and B-5b zones are characterized by larger underdeveloped lots with great potential for denser, clustered, urban mixed-use development and more efficient reuse of existing land and buildings. It is anticipated that the dense, mixed-uses of the B-5 and B-5b zones will rely on a shared infrastructure system, including service alleys, parking lots, public transportation facilities, stormwater management, and driveways.",
        }, {
            code: "B-5b",
            friendlyName: "",
            purposeStatement: "To provide areas of the peninsula near the downtown where a mixture of uses, including marine, industrial, commercial, and residential, is encouraged. The B- 5 and B-5b zones are characterized by larger underdeveloped lots with great potential for denser, clustered, urban mixed-use development and more efficient reuse of existing land and buildings. It is anticipated that the dense, mixed-uses of the B-5 and B-5b zones will rely on a shared infrastructure system, including service alleys, parking lots, public transportation facilities, stormwater management, and driveways.",
        }, {
            code: "B-6",
            friendlyName: "",
            purposeStatement: "To establish a zoning district for the upland portion of the Eastern Waterfront area. The B-6 zone encourages this district to acquire a distinctly urban form through development that emphasizes a quality pedestrian experience, promotes public transit, and demonstrates exemplary urban design. The zone promotes a range of uses to achieve 24- hour urban vitality and shared use of parking infrastructure as recommended in the Eastern Waterfront Master Plan for redevelopment. The B-6 zone promotes a mixed-use development pattern envisioned for urban land on Portland’s peninsula",
        }, {
            code: "B-7",
            friendlyName: "",
            purposeStatement: "To establish a zoning district for urban areas in which the City has adopted master plans for redevelopment. Certain areas, including but not limited to Bayside, lie at the perimeter of the established downtown and contain significant redevelopment opportunities. The B-7 zone encourages these districts to acquire a distinctly urban form through dense development featuring a mix of uses such as housing, retail, offices, research and development, and artisan studios and that emphasizes a quality pedestrian experience, promotes public transit, and demonstrates exemplary urban design. Use of multi-modal transportation is strongly encouraged and is advanced by the installation of bicycle amenities, such as bicycle racks and storage areas. The zone promotes a wide range of uses in high quality structures and public open spaces to achieve 24-hour urban vitality and shared parking infrastructure. The B-7 zone promotes a mixed-use development pattern envisioned on Portland’s peninsula.",
        }],
    }, {
        header: "Office",
        rows: [{
            code: "O-P",
            friendlyName: "Office Parks",
            purposeStatement: "To provide substantial areas for integrated development of offices in a park- or campus-like setting which are of the highest quality, are well-designed and maintained, and are compatible with their natural surroundings.",
        }, {
            code: "R-P",
            friendlyName: "Business",
            purposeStatement: "To provide appropriate location for the development and operation of low-intensity business uses, including offices on or near major arterials, that are compatible in scale, density and use with surrounding and adjacent residential neighborhoods; or to serve as a transition or buffer zone between residential and more intensive nonresidential zones."
        }],
    }, {
        header: "Industrial and Airport",
        rows: [{
            code: "I-L",
            friendlyName: "",
            purposeStatement: "To provide areas in which low-impact industrial uses, and limited other uses serving employees and residents of the surrounding neighborhood, will be compatible with adjacent residential uses, will provide a buffer between residential neighborhoods and higher impact industrial zones, or will stand alone as a smaller scale industrial district. The I-L zone is located adjacent to residential neighborhoods, business uses and other industrial uses where the low-intensity nature of the uses, as well as their strict performance standards, will ensure the compatibility of the uses with other adjacent industrial and nonindustrial uses. Performance standards for uses in the I-L zone are designed to maintain compatibility between low impact industrial uses and neighboring nonindustrial and industrial uses."
        }, {
            code: "I-Lb",
            friendlyName: "",
            purposeStatement: "To provide areas in which low-impact industrial uses, and limited other uses serving employees and residents of the surrounding neighborhood, will be compatible with adjacent residential uses, will provide a buffer between residential neighborhoods and higher impact industrial zones, or will stand alone as a smaller scale industrial district. The I-L zone is located adjacent to residential neighborhoods, business uses and other industrial uses where the low-intensity nature of the uses, as well as their strict performance standards, will ensure the compatibility of the uses with other adjacent industrial and nonindustrial uses. Performance standards for uses in the I-L zone are designed to maintain compatibility between low impact industrial uses and neighboring nonindustrial and industrial uses."
        }, {
            code: "I-M",
            friendlyName: "",
            purposeStatement: "To provide zones in areas of the city in which low- and moderate-impact industries and transportation-related uses will coexist. I-M and I-Ma zones are located on arterials or collectors. The I-Mb zone is similarly located on the peninsula. These locations provide for direct access onto arterials, thereby protecting residential neighborhoods from drive-through traffic. The purpose of the I-M, I-Ma and I-Mb industrial zones is also to provide for larger industrial buildings and for the limited or controlled use of areas outside of structures for storage of materials and machinery. These facilities often require large volumes of imported materials and products which result in large volumes of shipping and receiving. Often uses may be highway-oriented and transportation-related, thus relying on citywide and regional transportation infrastructure. Industrial uses in these moderate-impact industrial zones may require separation from higher-impact uses."
        }, {
            code: "I-Mb",
            friendlyName: "",
            purposeStatement: "To provide zones in areas of the city in which low- and moderate-impact industries and transportation-related uses will coexist. I-M and I-Ma zones are located on arterials or collectors. The I-Mb zone is similarly located on the peninsula. These locations provide for direct access onto arterials, thereby protecting residential neighborhoods from drive-through traffic. The purpose of the I-M, I-Ma and I-Mb industrial zones is also to provide for larger industrial buildings and for the limited or controlled use of areas outside of structures for storage of materials and machinery. These facilities often require large volumes of imported materials and products which result in large volumes of shipping and receiving. Often uses may be highway-oriented and transportation-related, thus relying on citywide and regional transportation infrastructure. Industrial uses in these moderate-impact industrial zones may require separation from higher-impact uses."
        }, {
            code: "I-H",
            friendlyName: "",
            purposeStatement: "To provide areas suitable for higher impact industrial uses than are permitted in other industrial zones and other uses that are capable of demonstrating, through design, layout and topography, their compatibility with, or non- intrusion on, existing or future higher impact industrial uses on adjacent or neighboring I-H zoned properties. Due to the intensity of use, the I-H zones are intended for uses which may require extensive outdoor storage and usage and may utilize heavy equipment. Processes may require separation from residential or sensitive environmental areas. The I-H zones are separated from other nonindustrial uses as well as natural or constructed features. High-impact industrial uses will be of a higher intensity, with a greater lot coverage, than the other zones."
        }, {
            code: "A-B",
            friendlyName: "Airport",
         purposeStatement: "To provide an area for the development of airport-related enterprises. Appropriate uses permitted in this zone are those customarily associated with the operation of the airport terminal and individual airlines and accessory uses to provide for the comfort and convenience of the airport’s patrons and employees."
        }],
    }, {
        header: "Open Space",
        rows: [{
            code: "R-OS",
            friendlyName: "Parks",
            purposeStatement: "To preserve and protect open space as a limited and valuable resource; to permit the reasonable use of open space, while simultaneously preserving and protecting its inherent open space characteristics to assure its continued availability for public use as scenic, recreation, and conservation or natural resource area, and for the containment and structuring of urban development; to provide a suitable location for large-scale regional sports and athletic facilities; and to develop an open space system throughout the city, which provides the highest quality parks, plazas, and pedestrian environment. The R-OS zone may include parcels of public property and private property legally restricted from intensive use or development through deed, covenant, or otherwise.",
        }],
    }, {
        header: "Waterfront",
        rows: [{
            code: "WCZ",
            friendlyName: "Waterfront Central",
            purposeStatement: "The Waterfront Central Zone was created to protect and nurture water-dependent and marine-related support uses so that they may grow and prosper in the present and into the future in an environment and area dedicated to this purpose.",
        }, {
            code: "WPDZ",
            friendlyName: "Waterfront Port Development",
            purposeStatement: "Transport of goods by water to and from Portland is an important component of both the local and regional economy. This commerce is dependent upon land with direct access to the dredged deep-water channel of the Fore River and Portland Harbor. The Port of Portland is integral to the City’s economic, cultural and fiscal health. This zone exists to ensure the continued viability of the Port of Portland.",
        }, {
            code: "EWPZ",
            friendlyName: "Eastern Waterfront Port",
            purposeStatement: "The Eastern Waterfront Port Zone is created to nurture deepwater-dependent activity within the context of the established waterfront.",
        }],
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
                attributionControl: false,
            }).addLayer(new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"));

            const svg = d3.select(map.getPanes().overlayPane).append("svg");
            const g = svg.append("g").attr("class", "leaflet-zoom-hide");

            async function loadZones() {
                const collection = await (await fetch("/zones.json")).json();

                // Use Leaflet to implement a D3 geometric transformation.
                function projectPoint(x, y) {
                    const {x: px, y: py} = map.latLngToLayerPoint(new L.LatLng(y, x));
                    this.stream.point(px, py);
                }

                const transform = d3.geoTransform({ point: projectPoint });
                const path = d3.geoPath().projection(transform);

                var div = d3.select("body").append("div")	
                    .style("background-color", "white")
                    .style("padding", "5px")
                    .attr("class", "tooltip")				
                    .style("user-select", "none")
                    .style("opacity", 0);

                let moving = false;

                function handleMouseover(event, { properties }) {
                    selectedZone = properties.name;
                    if (!moving) {
                        div.transition()		
                            .duration(200)		
                            .style("opacity", .9);		
                        div.html(properties.name + "<br/>")	
                            .style("left", (event.pageX) + "px")		
                            .style("top", (event.pageY - 36) + "px");	
                    }
                }

                function handleMouseout(event, { properties }) {
                    selectedZone = null;
                    div.style("opacity", 0);
                }

                const feature = g.selectAll("path")
                    .data(collection.features)
                    .enter()
                    .append("path")
                    .attr("stroke", "black")
                    .attr("fill-opacity", "0.4")
                    .attr("fill", feature => colors[feature.properties.name] || "#fff")
                    .attr("style", "pointer-events: auto;")
                    .on("mouseover", handleMouseover)
                    .on("mouseout", handleMouseout);

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
                map.on("movestart", () => { div.style("opacity", 0); moving = true });
                map.on("moveend", () => { moving = false });

                reset();
            }
            loadZones();
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
<h1 class="text-primary">Zoning 101</h1>

<div class="text-center">
<p id="map" class="d-inline-block"/>
</div>

<p>Zoning is a big deal. You might not hear about it as much as some more exciting issues but zoning has a massive impact on your life. Zoning controls what you are allowed to do with your property, it controls what sorts of businesse can open and where as well as what housing gets built. It influences the environment, economic opportunities, discrimination, and just about everything else you can think of. So what exactly is zoning?</p>

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
    {#each tableValues as tableSection}
        <tr>
            <th colspan=3>{tableSection.header}</th>
        </tr>
        {#each tableSection.rows as tableRow}
            <tr 
                on:mouseover="{() => selectedZone = tableRow.code}"
                on:mouseout="{() => selectedZone = null}"
                on:focus="{() => selectedZone = tableRow.code}"
                on:blur="{() => selectedZone = null}"
                style="background-color: {colors[tableRow.code]}; cursor: pointer"
            >
                <td>{tableRow.code}</td>
                <td>{@html tableRow.friendlyName}</td>
                <td>{@html tableRow.purposeStatement}</td>
            </tr>
        {/each}
    {/each}
  </tbody>
</table>

<div id="gd"/>
</article>
