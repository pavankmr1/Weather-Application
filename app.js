const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post("/", function(req, res) {
    const query = req.body.cityName;
    const apiKey ="6ced1c95ae09877b6c48906595ca7b6b";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query +"&appid="+apiKey+"&units=metric"

    https.get(url,function(response) {

        response.on('data', function( data ) {
          const weatherData = JSON.parse(data);
          
          const temp = weatherData.main.temp;
          const weatherDescription = weatherData.weather[0].description;
          const icon = weatherData.weather[0].icon;
          const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
          res.write("<p>The weather is currently " + weatherDescription + " </p>");
          res.write("<h1>The Temperature in "+query+" is "+ temp+"degrees Celsius.</h1>");
          res.write("<img src="+ imageUrl+">");
          res.send()
        });

    });

})

app.listen(3000, function(){
    console.log('listening on port 3000')
})