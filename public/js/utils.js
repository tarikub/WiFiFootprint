/**
 * Generates random router location based on a given lat & lng
 * @param {list of routers} routers 
 * @param {radius} radius 
 * @param {Latitude} lat 
 * @param {Longitude} lng 
 */
let randomRouterGenerator = (routers, radius, lat, lng) => {
    let randomRouterLocations = [];

    for (let i = 0; i < routers; i++) {
        let rnd = Math.random();
        let w = radius * Math.sqrt(rnd);
        let t = 2 * Math.PI * rnd;
        let x = w * Math.cos(t) / 1000;
        let y = w * Math.tan(t) / 1000;
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
let randomIntensity = ()=> {
        let maxIntensity = [20, 30, 100, 200];
        let randomIdx = Math.floor(Math.random() * maxIntensity.length + 1);
        console.log(randomIdx);
        return maxIntensity[randomIdx];
}