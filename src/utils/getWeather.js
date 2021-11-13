const request = require("request")

const getweather = (long, lati, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=438f2ec6f4a1c4a94c9bdba25a184ae9&query=" + lati + "," + long
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("cannot connect to internet", undefined)
        } else if (response.body.error) {
            callback("connect fetch the data", undefined)
        } else {
            callback(undefined, "current temp is : " + response.body.current.temperature + "it feels like" + response.body.current.feelslike)
        }
    })
}

module.exports = getweather