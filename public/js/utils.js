/**
 * Generates random router location based on a given lat & lng
 * @param {list of routers} routers 
 * @param {radius} radius 
 * @param {Latitude} lat 
 * @param {Longitude} lng 
 */
//-- Router utils --/
let randomRouterGenerator = (routers, radius, lat, lng) => {
    let randomRouterLocations = [];

    for (let i = 0; i < routers; i++) {
        let rnd = Math.random();
        let w = radius * Math.sqrt(rnd);
        let t = 2 * Math.PI * rnd;
        let x = w * Math.cos(t) / 10000;
        let y = w * Math.tan(t) / 10000;
        let r = new router();
        r.lat = lat + x;
        r.lng = lng + y;
        r.signalIntensity = randomIntensity();
        randomRouterLocations.push(r);
    }


    return randomRouterLocations;
}

/**
 * Random heat-map intensity value
 */
let randomIntensity = () => {
    let maxIntensity = [20, 30, 100, 200];
    let randomIdx = Math.floor(Math.random() * maxIntensity.length + 1);
    return maxIntensity[randomIdx];
}

//-- Map Utils --//
let addMarker = (map, router) => {
    const routerIcon = "data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' aria-labelledby='title' aria-describedby='desc' role='img' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3ERouter%3C/title%3E%3Cdesc%3EA solid styled icon from Orion Icon Library.%3C/desc%3E%3Cpath data-name='layer2' d='M25.1 22.1l1-.3a2 2 0 0 0 .7-2.7 6 6 0 0 1 0-6 2 2 0 0 0-3.5-2 10 10 0 0 0 0 10 2 2 0 0 0 1.8 1zm12.8-.3l1 .3a2 2 0 0 0 1.7-1 10 10 0 0 0 0-10 2 2 0 0 0-3.5 2 6 6 0 0 1 0 6 2 2 0 0 0 .8 2.7zm-20.2 3.4l.9-.2a2 2 0 0 0 .9-2.7 14 14 0 0 1 0-12.4 2 2 0 1 0-3.6-1.8 18 18 0 0 0 0 16 2 2 0 0 0 1.8 1.1zm27.8-.2l.9.2a2 2 0 0 0 1.8-1.1 18 18 0 0 0 0-16 2 2 0 1 0-3.6 1.8 14.1 14.1 0 0 1 0 12.4 2 2 0 0 0 .9 2.7zm-35.2 3.3l.8-.2a2 2 0 0 0 1-2.7 22 22 0 0 1 0-18.7 2 2 0 1 0-3.6-1.6 26 26 0 0 0 0 22.1 2 2 0 0 0 1.8 1.1zm42.6-.2l.8.2a2 2 0 0 0 1.8-1.1 26.1 26.1 0 0 0 0-22.1 2 2 0 1 0-3.6 1.7 22.1 22.1 0 0 1 0 18.7 2 2 0 0 0 1 2.6z' fill='%23202020'%3E%3C/path%3E%3Cpath data-name='layer1' d='M60 36.1H34v-20a2 2 0 1 0-4 0v20H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2v4a2 2 0 1 0 4 0v-4h44v4a2 2 0 0 0 4 0v-4h2a2 2 0 0 0 2-2v-14a2 2 0 0 0-2-2zm-49 12a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm10 0a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm10 0a3 3 0 1 1 3-3 3 3 0 0 1-3 3z' fill='%23202020'%3E%3C/path%3E%3C/svg%3E";
    new google.maps.Marker({
        position: { lat: router.lat, lng: router.lng },
        icon: {
            size: new google.maps.Size(100,100),
            scaledSize: new google.maps.Size(20,20),
            origin: new google.maps.Point(0,0),
            url: routerIcon,
            anchor: new google.maps.Point(16,16)},
        map,
        title: router.MAC,
    });
}

let addHeatMap = (map, router, startCoord) => {
    var heatmapData = [];
    heatmapData.push(new google.maps.LatLng(router.lat, router.lng))
    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        radius: router.signalIntensity,
        maxIntensity: router.signalIntensity
    });

    heatmap.setMap(map, startCoord.lat, startCoord.lng);
}