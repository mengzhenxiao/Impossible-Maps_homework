var map = L.map('map').setView([40.72962, -73.993724], 10);
var marker = L.marker([40.72962, -73.993724]).addTo(map);

var OpenStreetMap_HOT = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
}).addTo(map);

var latlngs = [];

getInsData();

function getInsData() {
  $.getJSON("iphone_photos_data.json", function(data) {
    var photoData = {
      Data: data
    };
    console.log(photoData);
    for (var i = 0; i < photoData.Data.length; i++) {

      var long = photoData.Data[i].longitude;
      var lag = photoData.Data[i].latitude;
      var time = photoData.Data[i].time;
      var content = photoData.Data[i].content;
      var name = photoData.Data[i].file_name;
      console.log(name);

      var circle = L.circle([long, lag], {
        color: '#ffcc02',
        fillColor: '#ffcc02',
        fillOpacity: 0.2,
        radius: 20
      }).addTo(map);
      circle.bindPopup("<h4>" + time + "</h4>" + content + "<br>" + "<img src='recentPhotos/" + name + "'width='100px' >").openPopup();
      // console.log(long);
      // console.log(lag);
      latlngs.push([long, lag]);
      setTimeout(function() {
        var polyline = L.polyline(latlngs, {
          color: '#ffcc02',
          weight: 2
        }).addTo(map);
        map.fitBounds(polyline.getBounds());
      }, 1000);

    }
  })
}
console.log(latlngs);
