const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Peter'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Peter'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        message: 'you need help? don\'t we all',
        title: 'Help',
        name: 'Peter'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 - Articles',
        errorMessage: 'cant find help article',
        name: 'Peter'
    })
})

// Serve up JSON response.
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'address must be provided'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            })
        })
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

// 404 page - always put this at the end of the other routes
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'page not found',
        name: 'Peter'
    })
})

// ALL IS DONE
// start the server up. Stays up and running.
app.listen(port, () => {
    console.log('Server is up on port', port)
})