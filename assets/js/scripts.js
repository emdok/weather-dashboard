var APIKey = '53fc86921cad0b3c977522d6827674ab';
// var city;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + "&appid=" + APIKey;


fetch(queryURL).then(function() {
    console.log(queryURL);
})


