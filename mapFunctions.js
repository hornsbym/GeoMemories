var map;

function initMap() {
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

  map.data.loadGeoJson("GeoJson.json");

  map.data.setStyle(function (feature) {
    return { icon: feature.getProperty('icon') };
  });
}
