const request = require('postman-request')

const forecast = (lon, lat, callback) => {
    const url = 'https://api.darksky.net/forecast/28a9e7a0e9bbaf702a1d8bd5176ea532/' +
                encodeURIComponent(lat) + ',' + encodeURIComponent(lon)

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service')
        } else if (body.error) {
            callback(body.error)
        } else {
            callback(undefined, 
                body.daily.data[0].summary +
                ` It is currently ` + body.currently.temperature +
                ` degrees out. There is a ` + body.currently.precipProbability +
                ` chance of rain.`)
        }
    })
}

module.exports = forecast