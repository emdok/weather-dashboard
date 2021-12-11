var APIKey = '53fc86921cad0b3c977522d6827674ab';
var cityInputEl = document.querySelector("#city-search");
var cityFormEl = document.querySelector("#city-form");


// Get city and locate lat and lon values
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

// Update city to lat and lon value, return forecast for city
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

var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();

    if (city) {
        getCityCoord(city);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city");
    }
};

cityFormEl.addEventListener("submit", formSubmitHandler);


