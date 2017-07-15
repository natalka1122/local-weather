const mainDiv="#main";
const btnUnits="#btnUnits";
const selLanguage="#btnLanguage"
const proxyCors="https://cors-anywhere.herokuapp.com/"
var _0x203e=["\x38\x38\x64\x37\x39\x38\x64\x31\x32\x30\x64\x64\x36\x30\x30\x66\x38\x63\x38\x64\x34\x33\x34\x33\x35\x33\x63\x34\x33\x36\x36\x64"];const key=_0x203e[0];
var units="si";
var language="en";
var latitude;
var longitude;

function getLocation() {
    function error(err) {
        $(mainDiv).html(`ERROR(${err.code}): ${err.message}`);
    };
    function success(position) {
        latitude=position.coords.latitude;
        longitude=position.coords.longitude;
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success,error);
    } else {
        $(mainDiv).html("Geolocation is not supported by this browser");
    }
}
function showPosition(position) {
    $(mainDiv).html("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude+" key=");
    var jsonQuery=proxyCors+"https://api.darksky.net/forecast/"+key+"/"+position.coords.latitude+","+position.coords.longitude+"?units=si";
    $(mainDiv).html(jsonQuery);
    $.getJSON(jsonQuery, function(json) {

        var html = json.currently.summary+"\n"+json.currently.temperature;
        $(mainDiv).html(html);
    });
}

function showWeather(){
    var jsonQuery=proxyCors+"https://api.darksky.net/forecast/"+key+"/"+latitude+","+longitude+"?units="+units+"&lang="+language;
    $(mainDiv).html(jsonQuery);
    $.getJSON(jsonQuery, function(json) {

        var html = json.currently.summary+"\n"+json.currently.temperature;
        $(mainDiv).html(html);
    });
}
$( document ).ready(function() {
    var secured=location.protocol;
    $(mainDiv).html("Detecting location")
    if (secured!="http"){
        getLocation();
    }
    showWeather();

    $(btnUnits).click(function() {
        alert( "Handler for btnUnits.click() called." );
    });
    $(selLanguage).click(function() {
        alert( "Handler for selLanguage.click() called." );
    });    
});