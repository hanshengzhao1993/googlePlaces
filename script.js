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
  console.log(service)
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
  console.log(place)
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
    console.log(infowindow)
    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
      'Place ID: ' + place.place_id + '<br>' +
      place.formatted_address + '</div>');
    infowindow.open(map, this);
  });
}

  // function initMap() {
  //       var map = new google.maps.Map(document.getElementById('map'), {
  //         center: {lat: -33.866, lng: 151.196},
  //         zoom: 15
  //       });

  //       var infowindow = new google.maps.InfoWindow();
  //       var service = new google.maps.places.PlacesService(map);

  //       service.getDetails({
  //         placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
  //       }, function(place, status) {
  //         if (status === google.maps.places.PlacesServiceStatus.OK) {
  //           var marker = new google.maps.Marker({
  //             map: map,
  //             position: place.geometry.location
  //           });
  //           google.maps.event.addListener(marker, 'click', function() {
  //             infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
  //               'Place ID: ' + place.place_id + '<br>' +
  //               place.formatted_address + '</div>');
  //             infowindow.open(map, this);
  //           });
  //         }
  //       });
  //     }