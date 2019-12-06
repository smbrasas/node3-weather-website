const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const app = express()

//Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup hadlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory
app.use(express.static(publicDirectory))


app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Silvia Martín'
    })
})

app.get('/about',(req, res) =>{
    res.render('about',{
        title: 'About Me',
        name: 'Silvia Martín'
    })
})

app.get('/help',(req, res) =>{
    res.render('help',{
        title: 'Help',
        name: 'Silvia Martín',
        message: 'Help message'
    })
})


/* app.get('', (req, res) =>{
    //res.send('Hello express!')
    res.send('<h1>Weather</h1>')
})
 */

/* app.get('/help', (req, res) => {
    //res.send('Help page')
    
    res.send([{
        name: 'Silvia',
        age: 43
    },{name: 'Andrew'}])

}) */

/* app.get('/about', (req, res) => {
    //res.send('About page')
    res.send('<h1>About</h1>')
}) */

app.get('/weather', (req, res) => {
    //res.send('weather page')
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    /* res.send({
        location: 'Boston',
        forecast: 'Lluvia ligera',
        address: req.query.address
    }) */
    geocode.geocode(req.query.address, (err, {latitude, longitude, location}={}) => {
        if(err){
           return res.send({
               error: err
            })
        }
        //const {latitude, longitude, location} = data
        console.log(latitude, longitude, location)
        forecast(latitude, longitude, (err, forecastData) => {
           if(err){
               return res.send({error})
           }
           res.send({
            location,
            forecast: forecastData.summary,
            address: req.query.address
              
           })
           //console.log(location)
           //console.log(forecastData.summary)
         }) 
        
    })
   
})

app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You must prive a search term'
        })
    }
    console.log(req.query)
    console.log(req.query.search)
    res.send({
    products:[]
    })
    
})
app.get('/help/*', (req, res) =>{
    //res.send('Help article not found')
    res.render('error',{
        title: '404',
        name: 'Silvia Martín',
       message: 'Help article not found'
    })
})

app.get('*', (req, res) =>{
    //res.send('My 404 page')
    res.render('error',{
        title: '404',
        name: 'Silvia Martín',
       message: 'Page not found' 
    })
})

app.listen(3000, () =>{
    console.log('Server is up on port 3000')
})