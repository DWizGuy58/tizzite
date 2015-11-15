var map
var eventsCollection
var infoWindow
var gLatLng
var input = "<table>" +
                 "<tr><td>Name:</td> <td><input type='text' id='name'/> </td> </tr>" +
                 "<tr><td>Description:</td> <td><input type='text' id='description'/></td> </tr>" +
                 "<tr><td></td><td><input type='button' value='Save & Close' onclick='saveData()'/></td></tr>";

var info  = "<table>" +
                 "<tr><td>Name:</td> <td id='name'></td></tr>" +                 
                 "<tr><td>Description:</td> <td id='description'></td></tr>";

function initialize() {
    var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(49.282875, -123.120464),
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

    eventsCollection = new EventsCollection();
    eventsCollection.on('sync', function(collection) {
        plotExistingPoints(collection);
    });

    map.addListener('click', function(e) {
        createEvent(e.latLng, map);
    });

}

function createEvent(latLng, map) {
    var lat = latLng.lat();
    var lng = latLng.lng();

    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        animation: google.maps.Animation.DROP
    });

    infoWindow = new google.maps.InfoWindow({
        content: input
    });

    gLatLng = latLng;

    openWindow(latLng);

}

function saveData() {
    var name = escape(document.getElementById("name").value);
    var description = escape(document.getElementById("description").value);

    eventsCollection.create({
        name: name,
        description: description,
        lat: gLatLng.lat(),
        lng: gLatLng.lng(),
        owner: "me"
    })

    closeWindow(gLatLng);
}

function closeWindow(location) {
    infoWindow.close(map);
}

// Opens window for creator to enter content
function openWindow(location) {
    infoWindow.setPosition(location);
    infoWindow.open(map);
}

// Refreshes window with updated content information following a user's click
function viewWindow(location) {
    loadContent(infoWindow, location);
    infoWindow.setPosition(location);
    infoWindow.open(map);
}

// Initializes the data used for map display windows
function loadContent(infowindow, location) {
    
    var lat = location.lat();
    var lng = location.lng();

    var currentEvent = eventsCollection.findWhere({
                            lat: lat,
                            lng: lng
                        });

    var name = currentEvent.get('name');
    var description = currentEvent.get('description');

}

function plotExistingPoints(collection) {
    collection.each(function(currentEvent) {

        var pos = new google.maps.LatLng(currentEvent.get('lat'),
                    currentEvent.get('lng'));

        var marker = new google.maps.Marker({
            map: map,
            position: pos,
            animation: google.maps.Animation.DROP
        });

        google.maps.event.addListener(marker, 'click', function(event) {
            viewWindow(event.latLng);
        });

        infoWindow = new google.maps.InfoWindow({
            content: info
        });
    });
}

google.maps.event.addDomListener(window, 'load', initialize);
