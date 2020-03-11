const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=1&access_token=pk.eyJ1IjoibGFuZG9ucml2ZXJzIiwiYSI6ImNrN2lqMm5ycjBkcjIzcGxuN2xhNXhya3gifQ.-XFVzi0DKS8_CutBGtE4pQ'

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services')
        } else if (body.features.length === 0) {
            callback('No results on this query')
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode