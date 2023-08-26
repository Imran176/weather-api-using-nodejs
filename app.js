const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    console.log("Post Request Recieved.");

    var city = req.body.cityName;
    const query = city;
    const API_Key = "9f76c473fff61a1466a3d4d60f5542bc";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=" + API_Key;
    console.log("URL: ", url);

    https.get(url, (response) => {
        console.log("Header: ", response.headers);
        console.log("Status: ", response.statusCode);

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);

            console.log(weatherData);

            const temperature = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            console.log("Temperature: ", temperature);
            console.log("Description: ", desc);
            console.log("Icon: ", icon);

            res.write(`<h1>Temperature in ${query}: ${temperature} &#8451;</h1>`);
            res.write(`<h3>Current Weather : ${desc}</h3>`);
            res.write("<img src=" + imgURL + " alt=" + desc + ">");

            res.send();
        })
    });
});

const PORT = 5000;

app.listen(PORT, function () {
    console.log(`Server started at port:${PORT}`);
});