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
    function success(position) {
        latitude=position.coords.latitude;
        longitude=position.coords.longitude;
        showWeather(true);
    }

    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(success);
}

function getIpLocation() {
    var jsonQuery=proxyCors+"http://freegeoip.net/json/";

    $.getJSON(jsonQuery, function(json) {
        latitude=json.latitude;
        longitude=json.longitude;
        showWeather(true);
    });    
}

function showWeather(wallpaper){
    var jsonQuery=proxyCors+"https://api.darksky.net/forecast/"+key+"/"+latitude+","+longitude+"?units="+units+"&lang="+language;
    $.getJSON(jsonQuery, function(json) {
        var html = json.currently.summary+"\n"+json.currently.temperature;
        $(mainDiv).html(html);
    });
    if (wallpaper){
        //change wallpaper
    }
}
$(document).ready(function() {
    getIpLocation();
    getHtml5Location();

    $(btnUnits).click(function() {
        var strUnits,strButton;
        switch(units){
            case "us":
                strUnits="si";
                strButton="°C";
                break;
            case "si": //if not "us" consider units == "si"
            default:
                strUnits="us";
                strButton="°F";
        }
        units=strUnits;
        $(btnUnits).html(strButton);
        showWeather(false);
    });
    $(selLanguage).change(function() {
        language=$(selLanguage+" option:selected").val();
        showWeather(false);
    });    
});