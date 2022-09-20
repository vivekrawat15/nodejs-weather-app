const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,  '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vivek Rawat'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Vivek Rawat'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Please send an email to xyz@gmail.com for any kind of support.',
        title: 'help Page',
        name: 'Vivek Rawat'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    const address = req.query.address

    geocode(address, (error, {latitude, longitude, location} = {})  => {

        if(error) {
            return res.send({
                error: error
          })
        }  
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })

          })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found',
        title: '404',
        name: 'Vivek Rawat'
    })
})

app.get('*', (req, res) => {
 res.render('404', {
    error: 'Page not found',
    title: '404',
    name: 'Vivek Rawat'
 })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})

