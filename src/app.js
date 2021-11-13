const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const geocode = require("./utils/geocode")
const getweather = require("./utils/getWeather")

const app = express()
const port = process.env.PORT || 3000
//Define a paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

//Setup handlebars engine and views location
app.set("view engine", 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: "mohan"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "about me",
        name: "mohan"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "this is a help text",
        title: "help page",
        name: "mohan"
    })
})

app.get('/weather', (req, res) => {
    // console.log(req.query);
    if (!req.query.address) {
        return res.send({
            error: "address not provided"
        })
    }
    geocode(req.query.address, (error, response) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        getweather(response.longitude, response.latitude, (error, forcastdata) => {
            if (error) return res.send({
                error: "address not provided"
            })
            res.send({
                forecast: forcastdata,
                location: response.place,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "mohan",
        errorMessage: "no help article found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "mohan",
        errorMessage: "404 Page Not Found"
    })
})

app.listen(port, () => {
    console.log("Server running on port."+port);
})