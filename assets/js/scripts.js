var APIKey = '53fc86921cad0b3c977522d6827674ab';
var city = "Portland";



var getCityCoord = function(city) {
    var cityCoordQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey;

    fetch(cityCoordQueryURL).then(function(response) {
        if (response.ok) {
            response.json().then(function (data) {
                getForecastByCity(data);
            });
        } else {
            alert("Error: Current weather for City not found");
        }
    });
}

var getForecastByCity = function(data) {
    var forecastQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&appid=" + APIKey;

    fetch(forecastQueryURL).then(function(response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
            });
        } else {
            alert("Error: Forecast for City not found");
        }
});
}

getCityCoord(city);
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

