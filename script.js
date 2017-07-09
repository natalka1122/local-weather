function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        $("#location").html("Geolocation is not supported by this browser");
    }
}
function showPosition(position) {
    $("#location").html("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude);
}

$( document ).ready(function() {
    var secured=location.protocol;
    $("#location").html("Detecting location")
    if (secured!="http"){
        getLocation();
    }
});