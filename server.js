const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")
const fs = require("fs");
const app = express();

require("dotenv").config();

app.use(express.static(__dirname));
app.use(bodyParser.json())

//allow OPTIONS on all resources
app.options('*', cors())

const port = 3501;

app.post("/", (req, res) => {
    var feature = req.body;

    // Turns the coordinates back into numbers from strings.
    feature.geometry.coordinates[0] = Number(feature.geometry.coordinates[0] )
    feature.geometry.coordinates[1] = Number(feature.geometry.coordinates[1] )

    console.log("Feature to add:" ,feature);
    fs.readFile("./GeoJson.json", (err, data) => {
        var geoJson = JSON.parse(data);
        geoJson.features.push(feature);
        fs.writeFile("./GeoJson.json", JSON.stringify(geoJson), (err) => {
            if (err) throw err;
            console.log('Data written to file');
        })
    })

    res.send("recieved")
})

var server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
