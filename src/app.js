const path = require("path")
const express = require("express")
const compression = require("compression")
const hbs = require("hbs")
const forecast = require("./utils/forecast")


const app = express()
const port = process.env.PORT || 3000


// Paths for views and static assets
const viewsPath = path.join(__dirname, "../templates/views")
const publicDirectoryPath = path.join(__dirname, "../public")
const partialsPaths = path.join(__dirname, "../templates/partials")


// Use handlebars template engine and sets the views path 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPaths)


// Use static directory
app.use(express.static(publicDirectoryPath))

// Compress responses middleware
app.use(compression())


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: "please provide a valid address"
        })
    }

    forecast(req.query.address, (error, forecast) => {
        if (error) {
            return res.send({error})
        }

        res.send({
            forecast,
            address: req.query.address
        })
    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        helptext: "If it doesn't work that means my monthly API calls are exhausted (ง ˙ω˙)ว"
    })
})

app.get('/error', (req, res) => {
    res.redirect('/')
})


app.get('/help/*', (req, res) => {
    res.render('error', {
        title: "404",
        error: "Help page not found"
    })
})


app.get('*', (req, res) => {
    res.render('error', {
        title: "404",
        error: "Page not found"
    })
})



app.listen(port , () => {
    console.log("server running on port", port)
})
