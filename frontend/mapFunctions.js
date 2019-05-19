var map;

function initMap() {
  var geojson = {
    "type": "FeatureCollection",
    "features": []
  }

  // URL to send the GET request to:
  var url = "http://cf6cd891.ngrok.io/getMemoriesForUser?username=hornsbym"

  // Sends a GET fetch request to the appropriate endpoint:
  fetch(url).then(
    (raw_data) => {
      // Turns the database information into a JSON object:
      raw_data.json().then(
        // Adds the DB info to the GeoJSON object as a new feature:
        (json_data) => {
          // Loops over all data gathered from DB:
          for (var i = 0; i < json_data.length; i++){
            var geo_data = json_data[i];

            // Dissect the JSON object:
            var lat = geo_data.lat;
            var long = geo_data.long;
            var title = geo_data.title;
            var desc = geo_data.descr;
  
            // Adds the new information to a new feature:
            var feature = {
              "type" : "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [ long , lat ]
              },
              "properties": {
                "title": title,
                "content": desc,
                "icon": "http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png"
              }
            }
  
            // Puts the new feature in the GeoJSON object:
            geojson.features.push(feature);
          }

          map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 37.789148, lng: -79.441281 },
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.HYBRID,
            minZoom: 3,
            maxZoom: 10
          });

          map.data.addListener('click', function (event) {
            var title = event.feature.getProperty("title");
            var content = event.feature.getProperty("content");
            var infowindow = new google.maps.InfoWindow();
            infowindow.setContent(title + content);
            infowindow.setPosition(event.feature.getGeometry().get());
            infowindow.setOptions({ pixelOffset: new google.maps.Size(0, -30) });
            infowindow.open(map);
          });

          map.data.addGeoJson(geojson);

          map.data.setStyle(function (feature) {
            return { icon: feature.getProperty('icon') };
          });
        })
    });
}
