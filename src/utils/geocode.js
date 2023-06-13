const log = console.log;
const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic3Bhc29qZTkwIiwiYSI6ImNsaTI3NmU3ZjI0bHYzZG50OGh3bTd2djkifQ.Jd_XzINurn5icx7Tk61Rbw&limit=1`
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to the location service', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find the location provided', undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    });
}



module.exports = geocode;