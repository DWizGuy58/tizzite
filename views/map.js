var map

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
    });

}

function createEvent(latLng, map) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        animation: google.maps.Animation.DROP
    });

    google.maps.event.addListener(marker, 'click', viewEvent);

}

// TODO: bring up popup and event data
function viewEvent() {

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

        }, function () {
            handleNoGeolocation(true);
        });
    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }
}

google.maps.event.addDomListener(window, 'load', initialize);
