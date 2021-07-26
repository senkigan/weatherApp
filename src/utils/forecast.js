const request = require("request")


const forecast = (address, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=2579e806d875ee8f4eb2c1c7e4a25f63&query=${encodeURIComponent(address)}}`

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback("Unable to access API", undefined)
        } else if (body.hasOwnProperty("success") && !body.success) {
            callback(body.error.info + " Error code: " + body.error.code, undefined)
        } else {
            callback(undefined, {
                place: body.request.query,
                weather: `The weather is currently ${body.current.weather_descriptions[0]}`,
                temperature: `and the outside temperature is ${body.current.temperature} C°`,
                localTime: `Local time: ${body.location.localtime}`,
                rain: `with a ${body.current.precip}% chance of rain.`
            })
        }
    })
}


module.exports = forecast;