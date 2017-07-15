const mainDiv="#main";
const btnUnits="#btnUnits";
const selLanguage="#btnLanguage"
const proxyCors="https://cors-anywhere.herokuapp.com/"
var _0x203e=["\x38\x38\x64\x37\x39\x38\x64\x31\x32\x30\x64\x64\x36\x30\x30\x66\x38\x63\x38\x64\x34\x33\x34\x33\x35\x33\x63\x34\x33\x36\x36\x64"];const key=_0x203e[0];
var units="si";
var language="en";
var latitude;
var longitude;

function getHtml5Location() {
    function error(err) {
    };
    function success(position) {
        latitude=position.coords.latitude;
        longitude=position.coords.longitude;
        showWeather();
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success,error);
    } else {
//        $(mainDiv).html("Geolocation is not supported by this browser");
    }
}

function getIpLocation() {
    var jsonQuery=proxyCors+"http://freegeoip.net/json/";

    $.getJSON(jsonQuery, function(json) {
        latitude=json.latitude;
        longitude=json.longitude;
        showWeather();
    });
    
}


function showPosition(position) {
    var jsonQuery=proxyCors+"https://api.darksky.net/forecast/"+key+"/"+position.coords.latitude+","+position.coords.longitude+"?units=si";
    $.getJSON(jsonQuery, function(json) {

        var html = json.currently.summary+"\n"+json.currently.temperature;
        $(mainDiv).html(html);
    });
}

function showWeather(){
    var jsonQuery=proxyCors+"https://api.darksky.net/forecast/"+key+"/"+latitude+","+longitude+"?units="+units+"&lang="+language;
    $.getJSON(jsonQuery, function(json) {

        var html = json.currently.summary+"\n"+json.currently.temperature;
        $(mainDiv).html(html);
    });
}
$( document ).ready(function() {
    getIpLocation();
    var secured=location.protocol;
    $(mainDiv).html("Detecting location")
    if (secured!="http"){
        getHtml5Location();
    }

    $(btnUnits).click(function() {
        alert( "Handler for btnUnits.click() called." );
    });
    $(selLanguage).change(function() {
        var str = "";
        $( "select option:selected" ).each(function() {
            str += $( this ).text() + " ";
        });
        alert( str );
        alert( "Handler for selLanguage.click() called." );
    });    
});