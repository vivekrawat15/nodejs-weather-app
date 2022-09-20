const request = require('request')


const geocode = (address, callback) => {

    const url = 'http://api.positionstack.com/v1/forward?access_key=374b82aa0e5afb351637d7c3e627a0f0&query='+encodeURIComponent(address)
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else if(body.data !== undefined && body.data.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else if(body.error) {
            callback('Bad request', undefined)
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label
            })
        }
    })
}

module.exports = geocode