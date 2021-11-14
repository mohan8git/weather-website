const request = require('request')

const geocode = (address, callback) => {
    const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibmVtb2NpMTAwMyIsImEiOiJja3Z1eGM3ajMwcmxsMm9qdDFxeXI2YXp6In0.7Z6zi5l-3kuGIWfZOGC7rA&limit=1"
    request({ url: geocodeUrl, json: true }, (error, response) => {
        if (error) {
            callback("cannot connect to internet", undefined)
        }
        else if (response.body.features.length === 0) {
            callback("cannot fetch the data properly", undefined)
        }
        else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                place: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode