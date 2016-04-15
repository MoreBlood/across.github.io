
var map;
var infoWindow;
var service;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 52.09039729033585, lng: 23.716607093811035},
        zoom: 15,

    });

    infoWindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);

    // The idle event is a debounced event, so we can query & listen without
    // throwing too many requests at the server.
    performSearch();
}


function performSearch() {
    var pos  = new google.maps.LatLng(52.09039729033585,23.716607093811035);
    var request = {
        location: pos,
        radius: 20000,
        type : 'bus_station'
    };
    service.radarSearch(request, callback);
}

function callback(results, status) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
    }


    for (var i = 0, result; result = results[i]; i++) {

        addMarker(result, i);

    }
}



function addMarker(place, i) {
    setTimeout(function () {
           service.getDetails(place, function(result, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                console.error(status);
                return;
            }
               console.log(i +":" + result.name + ":" + result.geometry.location );
    });
        }, i*600)
}
google.maps.event.addDomListener(window, 'load', initMap);




