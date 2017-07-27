// map.center.lat
// map.center.lng
var map;
var service;
var infowindow;
var searchBox;

function initialize() {
  var pyrmont = new google.maps.LatLng(37.75174648400875,-122.44769873561698);

  map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 12
    });

  var request = {
    location: pyrmont,
    radius: '1000',
    type: ['cafe']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);

}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      addMarker(results[i])
    }
  }


}

function addMarker(place) {
  // console.log(place)
  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: {
      url: 'http://labs.google.com/ridefinder/images/mm_20_gray.png',
      // url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
      anchor: new google.maps.Point(10, 10),
      scaledSize: new google.maps.Size(10, 17)
    }
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent('<div>' 
      +'<strong>' + place.name + '</strong><br>' +
      'Place Rating: ' + `${place.rating}/5.0` + '<br>' 
      + '<button onclick="addToListView()" class="btn-cool">Add to Favorite </button>' + 
       '</div>');
    console.log('infowindow: ',infowindow, infowindow.content)
    infowindow.open(map, this);
  });
}

function addToListView(e) {
  var btn = document.getElementsByClassName('btn-cool');
  console.log(btn[0].parentElement)

}

// var button = document.getElementsByClassName('favorite-button');
// console.log('button', button)
// button.forEach( (ele)=>{
//   console.log(ele)
// } )