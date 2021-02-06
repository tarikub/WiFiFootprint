function initMap() {
    //NOTE: These are not real hotzones, this is just an example.
    let sampleHotZones = [
        { lat: 42.376678, lng: -71.115444 },
        { lat: 42.376410, lng: -71.118237 },
        { lat: 42.377048, lng: -71.118698 },
        { lat: 42.378306, lng: -71.119153 }
    ]
    let startCoord = { lat: 42.376678, lng: -71.115444 };
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

    let maxIntensity = [10, 30, 100, 200];
    for (let i = 0; i < sampleHotZones.length; i++) {
        const sampleWifiNode = sampleHotZones[i];
        setTimeout(() => {
            addHeatMap(map, sampleWifiNode.lat, sampleWifiNode.lng, 0, 0.01, maxIntensity[i]);
        }, 3000);
    }

    function addHeatMap(map, lat, lng, latRound, lngRound, maxIntensity) {
        var heatmapData = [];
        for (let i = 0; i < 12; i++) {
            let tempLat = lat + latRound;
            let tempLng = lng + lngRound;
            heatmapData.push(new google.maps.LatLng(tempLat, tempLng))
        }
        var heatmap = new google.maps.visualization.HeatmapLayer({
            data: heatmapData,
            radius: 15,
            maxIntensity: maxIntensity
        });

        heatmap.setMap(map, startCoord.lat, startCoord.lng);
    }
}