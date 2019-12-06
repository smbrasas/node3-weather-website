const request = require('request')
const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic21icmFzYXMiLCJhIjoiY2szZnZmM3BsMDBhcTNkbnk1bzdsazJlcyJ9.moD_UFUqyx7A8i-mTh1djw&limit=1'

    
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect lo location services!', undefined)
        }else if(body.features.length === 0){
            callback('Could not find the location, try another search')
        }else{
             const geocodeData = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined,geocodeData)
        }
    })
 }

 module.exports = {
    geocode: geocode
 }