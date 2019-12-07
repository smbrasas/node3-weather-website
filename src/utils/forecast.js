const request = require('request')
const forecast = (latitude, longitude, callback) =>{
    //const url = 'https://api.darksky.net/forecast/42bca4454ac55c0625fb8942504d99e0/37.8267,-122.4233?units=si&lang=es'
    const url = 'https://api.darksky.net/forecast/42bca4454ac55c0625fb8942504d99e0/'+encodeURIComponent(latitude+','+longitude)+'?units=si&lang=es'
    request({url, json:true}, (error, {body}) => {
        //console.log(error)
        //console.log(body)
        if(error){
            callback('Unable to connect lo forecast services!', undefined)
        }else if(body.error){
            callback('Could not find location, try another search', undefined)
        }else{
            callback(undefined,{
                temperature: body.currently.temperature,
                rainChance: body.currently.precipProbability,
                summary: body.daily.data[0].summary + '. The high today is '+body.daily.data[0].temperatureHigh+' with a low of '+body.daily.data[0].temperatureLow
            })
        }
    })
}

module.exports = forecast


