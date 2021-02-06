function initMap() {
    let startCoord = { lat: 42.376678, lng: -71.115444 };
    let demoRouters = randomRouterGenerator(50, 10, startCoord.lat, startCoord.lng)


    let map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: startCoord.lat, lng: startCoord.lng },
        zoom: 15,
        styles: [{
            featureType: 'poi',
            stylers: [{ visibility: 'off' }] // Turn off points of interest.
        }, {
            featureType: 'transit.station',
            stylers: [{ visibility: 'off' }] // Turn off bus stations, train stations, etc.
        }],
        disableDoubleClickZoom: true,
        streetViewControl: false
    });

    for (let i = 0; i < demoRouters.length; i++) {
        const router = demoRouters[i];
        addHeatMap(map, router);
    }

    function addHeatMap(map, router) {
        var heatmapData = [];
        heatmapData.push(new google.maps.LatLng(router.lat, router.lng))
        var heatmap = new google.maps.visualization.HeatmapLayer({
            data: heatmapData,
            radius: router.signalIntensity,
            maxIntensity: router.signalIntensity
        });

        heatmap.setMap(map, startCoord.lat, startCoord.lng);
    }
}