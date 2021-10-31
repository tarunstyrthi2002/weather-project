const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){

res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req , res){

  const query = req.body.cityName;
  const apikey = "05cc954ec43ff4b911c83390c901266d";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query +"&units="+ unit +"&appid="+ apikey;

  https.get(url, function(response){
  console.log(response.statusCode);

    response.on("data",function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp
    const weatherdesc = weatherData.weather[0].description
    const icon = weatherData.weather[0].icon
    const image = " http://openweathermap.org/img/wn/"+ icon+ "@2x.png"
    res.write("<p>The weather is currently "+ weatherdesc+"<p>");
    res.write("<h1>The tempetrature in "+ query +" is "+ temp +" degree celcius.</h1>");
    res.write("<img src =" + image +">")
    res.send()
    })
   })
})



app.listen(3000,function(){
  console.log(" server is running on port 3000");
})
