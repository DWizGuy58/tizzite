var map, pointarray, positiveHeatmap, infowindow

function initialize() {

    var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(49.282875, -123.120464),
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);


    map.addListener('click', function(e) {
        createEvent(e.latLng, map);
        //viewEvent(e.latLng, map);
    });

}

function createEvent(latlng, map) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        animation: google.maps.Animation.DROP
    });
    map.panTo(latLng);
    // TODO: create popup and data
}


// Initializes the data used for map display windows
function loadContent(iw, id){
    $.get("infowindow_stuff", {
        name: "Test"})
            .done(function(data) {
                iw.setContent(data);
            })
            .fail(function(data) {
                iw.setContent("Unable to retrieve data");
            });
}

// Refreshes window with updated content information following a user's click
function updateWindow(location) {
    loadContent(infowindow, location);
    infowindow.setPosition(location);
    infowindow.open(map);
}

// Shows user's location on map
function showMyLocation() {
    // Current GeoLocation
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = new google.maps.LatLng(position.coords.latitude,
                    position.coords.longitude);

            var marker = new google.maps.Marker({
                map: map,
                position: pos,
                animation: google.maps.Animation.DROP
            });

            map.setCenter(pos);
        }, function () {
            handleNoGeolocation(true);
        });
    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }
}

google.maps.event.addDomListener(window, 'load', initialize);
