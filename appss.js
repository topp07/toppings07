const { response } = require("express");
const bodyparser = require("body-parser")
const express = require("express");
const https = require ("https");
const { url } = require("inspector");

const app = express();
app.use(bodyparser.urlencoded({extended:true }));




app.get("/", (req, res) => {
res.sendFile(__dirname + "/index.html");

  });


app.post("/", (req, res)=>{
const query = req.body.cityname;
const units = "metric";
const apikey ="53a159100a67e4a7fb451ed6f6280c03";
const url ="https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=" +
    units +
    "&appid=" +
    apikey;

    https.get(url,(response) => {
        console.log("statusCode:", response.statusCode);   
      
        response.on("data", (data) => {
            const input =JSON.parse(data);
            // console.log(JSON.parse(data)); 
            const temp = input.main.temp;
            const weatherdescription = input.weather[0].description;
            const icon = input.weather[0].icon;
            const imgURl = `http://openweathermap.org/img/w/${icon}.png`;

            res.write("<img scr=" + imgURl + ">");
            res.write(
                `<h1> the temperature in ${query} is ${temp} degree celcius</h1>`
            );
            res.write(`<p> the weather is currently ${weatherdescription}</p`
            );
            res.send();
        });
    });

});
  





const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`listening @port ${PORT}`);
});
 