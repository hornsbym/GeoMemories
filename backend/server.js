const express = require('express');
const bodyParser = require('body-parser');
const db = require("./queries");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true,
})
)
app.use(cors())

const port = 9999;

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

app.get('/getUserInfo', db.getUser);
app.get('/getMemoriesForUser', db.getMemoriesForUser);
app.put('/addMemoryForUser', db.addMemoryForUser);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
