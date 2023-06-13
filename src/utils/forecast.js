const log = console.log;
const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=e6dbe9b8d674b3f2e5145ec67d19df66&query=${encodeURIComponent(longitude)},${encodeURIComponent(latitude)}&units=m`;
 request({url, json: true}, (error, {body}) => {
    
    if (error) {
        callback('Unable to connect to the weather service', undefined);
    } else if(body.error){
        callback('Unable to find the location for the wather', undefined);
    } else {
        callback(undefined, body.current.weather_descriptions[0] + "\nThe current temperature is: " + body.current.temperature +"\nReal feel is: " + body.current.feelslike)
    }
});
}

module.exports = forecast;