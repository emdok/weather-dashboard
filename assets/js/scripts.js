var APIKey = '53fc86921cad0b3c977522d6827674ab';
var cityInputEl = document.querySelector("#city-search");
var cityFormEl = document.querySelector("#city-form");
var currentWeatherEl = document.getElementById("current-weather-list");



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
};

// Update city to lat and lon value, return forecast for city
var getForecastByCity = function(data) {
    var forecastQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&appid=" + APIKey;

    fetch(forecastQueryURL).then(function(response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                currentWeatherDisplay(data);
            });
        } else {
            alert("Error: Forecast for City not found");
        }
});
};

// Create list for current weather
var currentWeatherDisplay = function(data) {
    var date = data.current.dt;
    var temp = data.current.temp;
    var wind = data.current.wind_speed;
    var humidity = data.current.humidity;
    var uvi = data.current.uvi;
    var icon = data.current.weather[0].icon;

    var currentCityEl = document.getElementById("city-name")
    currentCityEl.append(" " + formatDate(date) + " ");
    currentCityEl.innerHTML += `<span><img src=./assets/icons/` + icon + `.png></span></p>`;

    var currentTempEl = document.createElement("li");
    currentTempEl.textContent = "Temp:" + " " + temp;
    currentWeatherEl.appendChild(currentTempEl);

    var currentWindEl = document.createElement("li");
    currentWindEl.textContent = "Wind:" + " " + wind;
    currentWeatherEl.appendChild(currentWindEl);

    var currentHumidityEl = document.createElement("li");
    currentHumidityEl.textContent = "Humiditiy:" + " " + humidity;
    currentWeatherEl.appendChild(currentHumidityEl);

    var currentUviEl = document.createElement("li");
    currentUviEl.textContent = "UV Index:" + " " + uvi;
    currentWeatherEl.appendChild(currentUviEl);
}

// format Unix TimeCode to Human Readable Format
var formatDate = function(date) {
const milliseconds = date * 1000
const dateObject = new Date(milliseconds)
let options = { month: 'numeric', day: 'numeric', year: 'numeric'};
const humanDateFormat = dateObject.toLocaleString("en-US", options)

return humanDateFormat;
}

// handle search button click
var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();

    if (city) {
        getCityCoord(city);
        cityInputEl.value = "";
        var currentCityEl = document.createElement("li");
        currentCityEl.id = "city-name";
        currentCityEl.textContent = city;
        currentWeatherEl.appendChild(currentCityEl);
    } else {
        alert("Please enter a city");
    }

    
};

// listen for submit button click
cityFormEl.addEventListener("submit", formSubmitHandler);


