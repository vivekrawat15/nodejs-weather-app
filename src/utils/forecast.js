const request = require('request')


const forecast = (latitude, longtitude, callback) => {

    
    const url = 'http://api.weatherstack.com/current?access_key=4da843897a7ece19be9dea9e39698b93&query='+ latitude + ',' + longtitude

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            const forecast = body.current.weather_descriptions[0]+ '. It is currently ' + body.current.temperature + ' degree celcius out. It feels like ' + body.current.feelslike + ' degree celcius out. There is a ' + body.current.precip +'% chance of rain today.'
            callback(undefined, forecast)
        }
        
    })
}

module.exports  = forecast
