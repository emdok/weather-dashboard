var APIKey = '53fc86921cad0b3c977522d6827674ab';
var cityInputEl = document.querySelector("#city-search");
var cityFormEl = document.querySelector("#city-form");
var currentWeatherEl = document.getElementById("current-weather-list");
var searchHistoryEl = document.querySelector(".recent-search");
var recentSearch = [];


var recentSearchHistory = function() {
    if (localStorage.getItem("city")) {
        recentSearch = JSON.parse(localStorage.getItem("city"));

        for (var i = 0; i < recentSearch.length; i++) {
            searchHistoryEl.innerHTML += `<button type="button" class="list-group-item list-group-item-action">${recentSearch[i]}</button></li>`
        };
    }
};

recentSearchHistory();

// Get city and locate lat and lon values
var getCityCoord = function (city) {
    var cityCoordQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey;

    fetch(cityCoordQueryURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                getForecastByCity(data, city);
            });
        } else {
            alert("Error: Current weather for City not found");
        }
    });
};

// Update city to lat and lon value, return forecast for city
var getForecastByCity = function (data, city) {
    var forecastQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&units=imperial&appid=" + APIKey;

    fetch(forecastQueryURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                currentWeatherDisplay(data, city);
                fiveDayForecastDisplay(data);
            });
        } else {
            alert("Error: Forecast for City not found");
        }
    });
};

// Create list for current weather
var currentWeatherDisplay = function (data, city) {

    var date = data.current.dt;
    var temp = data.current.temp;
    var wind = data.current.wind_speed;
    var humidity = data.current.humidity;
    var uvi = data.current.uvi;
    var icon = data.current.weather[0].icon;

    var currentCityEl = document.getElementById("city-name")
    currentCityEl.innerHTML = `<span>${city} ${formatDate(date)}<img src=./assets/icons/` + icon + `.png></span></p>`;

    var currentTempEl = document.createElement("li");
    currentTempEl.className = "list-group-item";
    currentTempEl.textContent = "Temp:" + " " + temp + "F";
    currentWeatherEl.appendChild(currentTempEl);

    var currentWindEl = document.createElement("li");
    currentWindEl.className = "list-group-item";
    currentWindEl.textContent = "Wind:" + " " + wind;
    currentWeatherEl.appendChild(currentWindEl);

    var currentHumidityEl = document.createElement("li");
    currentHumidityEl.className = "list-group-item";
    currentHumidityEl.textContent = "Humiditiy:" + " " + humidity;
    currentWeatherEl.appendChild(currentHumidityEl);

    var currentUviEl = document.createElement("li");
    currentUviEl.className = "list-group-item";
    currentUviEl.textContent = "UV Index:" + " " + uvi;
    currentWeatherEl.appendChild(currentUviEl);
};

var fiveDayForecastDisplay = function(data) {
    var cardDeckEl = document.querySelector(".card-deck");
    cardDeckEl.innerHTML = "";
    for (var i = 1; i < 6; i++) {
        var date = formatDate(data.daily[i].dt);
        var icon = data.daily[i].weather[0].icon;
        var temp = data.daily[i].temp.day;
        var humidity = data.daily[i].humidity;
        var wind = data.daily[i].wind_speed;

        console.log(date);
        cardDeckEl.innerHTML += `<div class="card">
        <div class="card-body">
          <h5 class="card-title">${date}</h5>
          <img class="card-img-top" src="./assets/icons/${icon}.png" alt="Card image cap">
          <p>Temp: ${temp}</p>
          <p>Wind: ${wind}</p>
          <p>Humidity: ${humidity}</p>
          </div>
        </div>`
    }
}

// format Unix TimeCode to Human Readable Format
var formatDate = function (date) {
    const milliseconds = date * 1000
    const dateObject = new Date(milliseconds)
    let options = { month: 'numeric', day: 'numeric', year: 'numeric' };
    const humanDateFormat = dateObject.toLocaleString("en-US", options)

    return humanDateFormat;
}

// handle search button click
var formSubmitHandler = function (event) {
    event.preventDefault();

    currentWeatherEl.innerHTML = "";

    var city = cityInputEl.value.trim();

    recentSearch.push(city);
    localStorage.setItem("city", JSON.stringify(recentSearch));

    if (city) {
        getCityCoord(city);
        cityInputEl.value = "";
        var currentCityEl = document.createElement("li");
        currentCityEl.className = "list-group-item h2";
        currentCityEl.id = "city-name";
        currentCityEl.textContent = city;
        currentWeatherEl.appendChild(currentCityEl);
    } else {
        alert("Please enter a city");
    }
};

var recentSearchClickHandler = function(event) {
    event.preventDefault();

    currentWeatherEl.innerHTML = "";
    var city = event.target.innerHTML;

    getCityCoord(city);
    cityInputEl.value = "";
    var currentCityEl = document.createElement("li");
    currentCityEl.className = "list-group-item h2";
    currentCityEl.id = "city-name";
    currentCityEl.textContent = city;
    currentWeatherEl.appendChild(currentCityEl);
}

// listen for submit button click
cityFormEl.addEventListener("submit", formSubmitHandler);
searchHistoryEl.addEventListener("click", recentSearchClickHandler);


