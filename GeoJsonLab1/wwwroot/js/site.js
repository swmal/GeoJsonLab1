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

    if (country.capital !== undefined) {
        capitalLat = country.capital.lat;
        capitalLon = country.capital.lon;
        svg.selectAll(".pin")
            .data([country.capital])
            .enter().append("circle", ".pin")
            .attr("r", 5)
            .attr("transform", function (d) {
                return "translate(" + projection3([
                    d.lon,
                    d.lat
                ]) + ")";
            })
        .on("mouseenter", function () {
            d3.select(this)
                .attr("fill", "red");
        })
        .on("mouseout", function () {
            d3.select(this)
                .attr("fill", "black");
        })
        .on("click", function (d) {
            var cityMapModal = new bootstrap.Modal(document.getElementById('capital-map'), {
                keyboard: true
            })
            $("#mapdiv").html("");
            cityMapModal.show();
            var yourVectorSource = new ol.source.Vector({
                projection: 'EPSG:3857',
                url: '/geojson/AD.json',
                format: new ol.format.GeoJSON()
            });
            var osmLayer = new ol.layer.Tile({
                source: new ol.source.OSM()
            }); 
            var map = new ol.Map(
                {
                    layers: [osmLayer],
                    target: 'mapdiv',
                    view: new ol.View(
                        {
                            center: [d.lon, d.lat],
                            zoom: 10
                        })
                }); 
            map.getView().setCenter(ol.proj.transform([d.lon, d.lat], 'EPSG:4326', 'EPSG:3857'));
            map.refresh();
            
        });
        let g = svg.select("g");
        g.selectAll("text")
            .data([country.capital])
            .enter()
            .append("text") // append text
            .attr("x", function (d) {
                return projection3([d.lon, d.lat])[0];
            })
            .attr("y", function (d) {
                return projection3([d.lon, d.lat])[1];
            })
            .attr("dy", -9) // set y position of bottom of text
            .style("fill", "black") // fill the text with the colour black
            .attr("text-anchor", "middle") // set anchor y justification
            .text(function (d) { return d.name; }); // define the text to display
    }
}

function renderCountry(cc) {
    d3.json("/GeoJson/" + cc + ".json", drawCountry);
    if (cc !== undefined) {
        $("#country-flag-img").attr("src", "/img/flags/" + cc.toLowerCase() + ".svg");
    }
    $.getJSON("/miscdata/" + cc + ".json", function (data) {
        $("#country-name").html(data.name);
        $("#country-population").html(data.population.toLocaleString('en-US'));
        $("#country-area").html(data.areaKm2.toFixed().toLocaleString('en-US') + " km2/" + data.areaSqm.toFixed().toLocaleString('en-US') + " sqm");
        $("#country-population-density").html(data.populationDensity !== undefined ? data.populationDensity.toFixed(1) : "-");
        $("#country-med-age").html((data.medianAge !== undefined) ? data.medianAge.toFixed() : "-");
        $("#country-fertility-rate").html((data.fertilityRate !== undefined && data.fertilityRate > 0) ? data.fertilityRate.toFixed(1) : "-");
        $("#country-urban-population").html((data.urbanPopulation !== undefined && data.urbanPopulation > 0) ? data.urbanPopulation.toFixed(1) : "-");
        if (data.gdpPerCapitaYears !== undefined && data.gdpPerCapitaYears.length > 0) {
            renderGdpChart(data.gdpPerCapitaYears);
        } else if (window.gdpPerCapitaChart !== undefined){
            window.gdpPerCapitaChart.destroy();
            $("#gdpChart").hide().html("No GDP/capita data available").fadeIn();
        }
    });
}

function renderGdpChart(gdpData) {
    let chartLabels = gdpData.map(d => d.year);
    let chartData = gdpData.map(d => d.value);
    let chartOptions = {
        labels: chartLabels,
        datasets: [{
            label: "GDP/capita by year (USD)",
            data: chartData
        }]
    };
    if (window.gdpPerCapitaChart) {
        window.gdpPerCapitaChart.destroy();
    }
    let chartElem = document.getElementById("gdpChart");
    window.gdpPerCapitaChart = new Chart(chartElem, {
        type: 'line',
        data: chartOptions
    });
    window.gdpPerCapitaChart.update();
    
}

var gdpChartLoaded = false;
var gdpPerCapitaChart;
var capitalLat;
var capitalLon;

$(document).ready(function () {
    $.ajaxSetup({ cache: false });
});
