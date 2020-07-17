const path=require('path')
const express=require('express')
const hbs =require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000

const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Forecast',
        name: 'Abhigyan Utsav'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Abhigyan Utsav'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Developer Contact' ,Email:'abhigyanutsav@gmail.com', Phone:'9315446472',
        title: 'Help',
        name: 'Abhigyan Utsav'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Please enter a location'
        })

    }
    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(longitude,latitude,(error,fdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:fdata,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abhigyan Utsav',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abhigyan Utsav',
        errorMessage: 'Page not found.'
    })
})


app.listen(port,()=>{
    console.log('listening to port'+port)
})