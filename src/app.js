const log = console.log;
const path = require('path');
const express = require("express");
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast');

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs'); //setupujemo handlebars
app.set('views', viewPath);  //ovako se podesava view putanja
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res)=>{
  res.render('index', {
    title: 'Weather',
    name: 'Ament',
    age: 32
  });
});

app.get('/about', (req, res)=>{
  res.render('about', {
    title: 'About me',
    name: 'Ament',
    age: 32
  });
});

app.get('/help', (req, res)=>{
  res.render('help', {
    title: 'Help',
    text: 'Help page',
    name: 'Ament'
  });
});

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "Spaso",
//       age: 32,
//     },
//     {
//       name: "Ament",
//       age: 32,
//     },
//   ]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>Welcome to About</h2>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send ({
      error: 'Provide the location'
    })
  }

  geocode(req.query.address, (error,  {latitude, longitude, location} = {}) => {
   
    if(error) {
      return res.send({error})
    }
    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({error})
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        })
      });
  });

  // res.send({
  //   location: 'Herceg Novi',
  //   forecast: 'Sunny',
  //   address: req.query.address
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send ({
      error: 'Provide the search term'
    })
  }
  log(req.query);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render('404', {
    title: 'Oops',
    msg: 'Help article not found.',
    name: 'Ament'
  });
});

app.get("*", (req, res) => {
  res.render('404',{
    title: 'Oops',
    msg: 'Page not found',
    name: 'Ament'
  });
});

app.listen(3000, () => {
  log("Server is up on port: 3000");
});
