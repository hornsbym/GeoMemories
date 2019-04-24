var getData = function(){
    console.log("In function:")
    var lat = document.getElementById("memLat").value;
    var long = document.getElementById("memLong").value;
    var title = document.getElementById("memTitle").value;
    var content = document.getElementById("memContent").value;
    var icon = document.getElementById("memIcon").value;

    var popupTitle = "<h1>" + title + "</h1>";
    var popupContent = "<p>" + content + "</p>"
    var popupLat = lat
    var popupLong = long
    var popupIcon = icon

    var feature = {
        "type" : "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [ popupLat, popupLong ]
        },
        "properties": {
          "title": popupTitle,
          "content": popupContent,
          "icon": popupIcon
        }
      }

      var url = "https://142.93.118.50:9999";
      var data = JSON.stringify(feature);

      console.log(data)

      fetch(url, {
        credentials: 'include', 
        method: "post",
        mode: "cors",
        headers: {
          'Access-Control-Allow-Origin':'POST',
          "Content-Type": "application/json"
        },
        body: data
      })

    clearFormData();
}

var showForm = function() {
    var form = document.getElementById("memoryForm");
    form.style.display = "block";
}

var deleteForm = function() {
    var form = document.getElementById("memoryForm");
    form.style.display = "None";
    clearFormData();
}

var clearFormData = function() {
    document.getElementById("memLat").value = "";
    document.getElementById("memLong").value = "";
    document.getElementById("memTitle").value = "";
    document.getElementById("memContent").value = "";
    document.getElementById("memIcon").value = "";
}  

var newButton = document.getElementById("newMemory");
newButton.addEventListener("click", showForm);

var cancelButton = document.getElementById("cancelButton");
cancelButton.addEventListener("click", deleteForm);

var createButton = document.getElementById("createButton");
createButton.addEventListener("click", getData, false);