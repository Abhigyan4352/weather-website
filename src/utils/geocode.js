const request=require('request')

const geocode = (address,callback)=>{
    
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWJoaWd5YW40MzUyIiwiYSI6ImNrY2ticjI1NDFybDUyeHBmOGRsbzI4anYifQ.1vq-xDQiA-1JY1XVaJbL3w&limit=1'
    
    request({url,json:true},(error,{body})=>{
        if(error){
             callback("Unable to connect to the internet",undefined)
        }else if(body.features.length==0){
             callback("Unable to find address",undefined)
        }else{
                const data2=body.features[0]
                const data={
                    longitude:data2.center[0],
                    latitude:data2.center[1],
                    location:data2.place_name
                }
                callback(undefined,data)
            }
            
    })

}

module.exports=geocode