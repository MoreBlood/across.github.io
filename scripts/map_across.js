var map;
var infoWindow;
var popup;
var popup_pos = new google.maps.LatLng(52.0740594,23.76537499999995);
var popup_pos2 = new google.maps.LatLng(52.11549249999999,23.75328360000003);



time_popup.prototype = new google.maps.OverlayView();

function initMap() { // реализация API google maps
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    //var transitLayer = new google.maps.TransitLayer();

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {lat:52.09135970961974, lng:23.7224543094635}
    });
    directionsDisplay.setMap(map);
    //transitLayer.setMap(map);
    //popup = new time_popup(map, popup_pos);






    map.addListener('click', showArrays);
    infoWindow = new google.maps.InfoWindow;
    //calculateAndDisplayRoute(directionsService, directionsDisplay);

    $("search").click( function() {
        //calculateAndDisplayRoute(directionsService, directionsDisplay);

    });
    //popup = new time_popup(map, popup_pos);
    //google.maps.event.addDomListener(window, 'load', initMap);

}
var line = new Array;
//написать прототип для удаления
function draw_map() {
    var doge_pos = document.getElementById("sidebar").clientHeight;
    document.getElementById("doge_image").style.top = doge_pos + 150;

    $( "#doge_image" ).animate({
        top: doge_pos - 150,
    }, 1000, function() {
        // Animation complete.
    });
    $( "#doge_image" ).animate({
        top: doge_pos - 150,
    }, 500, function() {
        // Animation complete.
    });
    $( "#doge_image" ).animate({
        top: doge_pos + 150,
    }, 750, function() {
        // Animation complete.
    });
	
    for (var i =0; i < 100; i++ ) {
        $("#pop_id_clone").remove();
    };
	
    if (line.length != 0)  {for (i=0; i<line.length; i++)
    {
			line[i].setMap(null);
    }
	}
	line = new Array;
	for (var i = 0; i <stop.length; i++ )
    {
        if (stop[i].location.lat == '0.0000000000000000') return
    }
    
    map.setCenter(new google.maps.LatLng(((stop[0].location.lat)+(stop[stop.length-1].location.lat))/2,((stop[0].location.lng)+(stop[stop.length-1].location.lng))/2));
    //initMap();
    var path = new Array();
    if (stop.length > 0) {

        for (var i = 0; i < stop.length; i++){
            path.push(stop[i].location);
            if (i >= 1){
                var flightPath = new google.maps.Polyline({
                    path: path,
                    geodesic: true,
                    strokeColor: colors[stop[i-1].type],
                    strokeOpacity: 0.5,
                    strokeWeight: 10,

                });
                line.push(flightPath);
                path.shift();
            }

            popup = new time_popup(map, stop[i].location, stop[i].time, stop[i].transport_name, stop[i].type, stop[i].start_transit_end);
        }
        for (i=0; i<line.length; i++)
        {
            line[i].setMap(map); //or line[i].setVisible(false);
        }



        console.log("Drawing...");

    }

}



function time_popup(map, latlng, time, number, tr_type, is_end) {
    this.div_ = null;

    for (var i = 0; i < number.length; i++)
    {
        if (number.charAt(i) == ' ')
        {
            number = number.substring(0, i);
            break;
        }
    }

    this.number = number;
    this.type = tr_type;
    this.time = time;
    this.map = map;
    this.latlng = new google.maps.LatLng(latlng.lat,latlng.lng);
    this.is_end = is_end;
    this.setMap(map);
}


time_popup.prototype.onAdd = function() {

    var divClone = document.getElementById("pop_id");
    var div = divClone.cloneNode(true);
    div.id = "pop_id_clone";

    div.children[0].children[0].innerHTML = this.number;
    div.children[0].children[1].innerHTML = this.time;
    this.div_ = div;
    var panes = this.getPanes();
    panes.overlayLayer.appendChild(div);
};

time_popup.prototype.draw = function() {
    if (this.is_end == 2 || this.is_end == 5) return
    var div = this.div_;

    div.style.display = "inline";
    div.children[0].children[1].style.background = colors[this.type];
    div.children[0].children[0].style.color = colors[this.type];
    if (this.is_end == 3)    div.children[1].style.backgroundImage = 'url("styles/pop_up_arow_stop.png")';
    if (this.is_end == 4)    div.children[1].style.backgroundImage = 'url("styles/pop_up_arow_stop_trans.png")';
    var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

    if (point) {
        div.style.left = (point.x - 53) + 'px';
        div.style.top = (point.y - 68) + 'px';
    }
};

time_popup.prototype.onRemove = function() {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
};



function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
        origin:  $('#top_input').val(),
        destination: $('#bottom_input').val(),
        travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            //initMap();
        }
    });
}

function showArrays(event) {

    var contentString = '"lat":' + event.latLng.lat() + ', ' + '<br>' + '"lng":' + event.latLng.lng();

    infoWindow.setContent(contentString);
    infoWindow.setPosition(event.latLng);

    infoWindow.open(map);
}
google.maps.event.addDomListener(window, 'load', initMap);