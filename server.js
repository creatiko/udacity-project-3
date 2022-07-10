// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
/* Spin up the server*/
const server = app.listen(port, listening);
 function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
  };

const weatherData = [];

  // GET route
app.get('/all', sendData);

function sendData (request, response) {
  response.send(weatherData);
};

// POST route
app.post('/add', addWeather);

function addWeather(req,res){
    console.log(req.body)
    newEntry = {
        temp: req.body.temp,
        feeling: req.body.feeling,
        date: req.body.date
    }
    weatherData.push(newEntry)
    res.send(weatherData)
    console.log(weatherData)
};