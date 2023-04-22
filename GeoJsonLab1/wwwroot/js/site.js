// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

function drawCountry(err, country) {
    // Create a unit projection.
    let projection3 = d3.geoMercator()
        .scale(1)
        .translate([0, 0]);

    // Create a path generator.
    let path = d3.geoPath()
        .projection(projection3);

    let width = 940;
    let height = 580;
    // Compute the bounds of a feature of interest, then derive scale & translate.
    let b = path.bounds(country),
        s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
        t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

    // Update the projection to use computed scale & translate.
    projection3
        .scale(s)
        .translate(t);

    svg.selectAll("*").remove();

    svg.append("path")
        .datum(graticule)
        .attr("class", "graticule")
        .attr("d", path);

    svg.append("path")
        .datum(graticule.outline)
        .attr("class", "foreground")
        .attr("d", path);
    svg.append("g")
        .selectAll("path")
        .data([country])
        .enter().append("path")
        .attr("d", path);
}

function renderCountry(cc) {
    d3.json("/GeoJson/" + cc + ".json", drawCountry);
    $.getJSON("/miscdata/" + cc + ".json", function (data) {
        $("#country-name").html(data.name);
        $("#country-population").html(data.population.toLocaleString('en-US'));
        $("#country-area").html(data.areaKm2.toFixed().toLocaleString('en-US') + " km2/" + data.areaSqm.toFixed().toLocaleString('en-US') + " sqm");
        $("#country-population-density").html(data.populationDensity !== undefined ? data.populationDensity.toFixed(1) : "-");
        $("#country-med-age").html((data.mediumAge !== undefined) ? data.mediumAge.toFixed(1) : "-");
        $("#country-fertility-rate").html((data.fertilityRage !== undefined && data.fertilityRage > 0) ? data.fertilityRage.toFixed(1) : "-");
    });
}
