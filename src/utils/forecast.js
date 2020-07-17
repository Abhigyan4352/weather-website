const request=require('request')

const forecast = (longitude,latitude,callback)=>{
    
    const url='http://api.weatherstack.com/current?access_key=99ea4f2b335716c8787fffcf6a38ffa8&query='+latitude+','+longitude
    
    request({url,json:true},(error,{body})=>{
        if(error){
             callback("Unable to connect to the internet",undefined)
        }else if(body.error){
             callback("Unable to find address",undefined)
        }else{
                const data2=body.current
                const data=data2.weather_descriptions[0]+", It is currently "+data2.temperature+" degrees out there but feels like "+data2.feelslike+" degrees."
                callback(undefined,data)
            }
            
    })

}

module.exports=forecast