import { getForecast } from "./fetchAPI.js";

function cleanNodes () {
    const weather = document.getElementById("weather-data");
    while (weather.hasChildNodes()) weather.removeChild(weather.firstElementChild);
}

function daysOfTheWeek (daynumber) {
    let day;
    switch (daynumber) {
        case 0:
            day = "SUN";
            break;
        case 1:
            day = "MON";
            break;
        case 2:
            day = "TUE";
            break;   
        case 3:
            day = "WED";
            break;
        case 4:
            day = "THU";
            break;
        case 5:
            day = "FRI";
            break;
        case 6:
            day = "SAT";                
    }
    return day;
}

function forecastDay(data, i) {
    const forecastCell = document.createElement("div");
    forecastCell.classList.add("forecast-cell");

    const forecastDate = new Date((data.forecast.forecastday[i].date_epoch)*1000);
    const forecastDay = daysOfTheWeek(forecastDate.getDay());
    const forecastDayDiv = document.createElement("div");
    forecastDayDiv.id = "forecast-day";
    forecastDayDiv.textContent = forecastDay;
    forecastCell.appendChild(forecastDayDiv);

    const weatherIcon = new Image();
    weatherIcon.id = "weather-icon";
    weatherIcon.src = "https://" + data.forecast.forecastday[i].day.condition.icon.slice(2);
    forecastCell.appendChild(weatherIcon);

    const avgTemperature = data.forecast.forecastday[i].day.avgtemp_c;
    const degrees = new Intl.NumberFormat("en-US", {
        style: "unit",
        unit: "celsius",
    }).format(avgTemperature);
    const degreesDiv = document.createElement("div");
    degreesDiv.id = "degrees";
    degreesDiv.textContent = degrees;
    forecastCell.appendChild(degreesDiv);

    return forecastCell;
}

function createDOM(obj) {
    const location = document.getElementById("location");
    location.innerHTML = obj.location.name + "<br>" + obj.location.region + ", " + obj.location.country;

    const weather = document.getElementById("weather-data");
    for(let i = 0; i < 5; i++) {
        weather.appendChild(forecastDay(obj, i));
    }
}

async function getData () {
    let city = "London";
    let obj;
    const button = document.getElementById("search-button");
    button.addEventListener("click", async () => {
        city = document.getElementById("search-city").value.toLowerCase();
        obj = await getForecast(city);
        if (Object.hasOwn(obj, "error") || obj === "error") alert ("Not found.");
        else {
            cleanNodes();
            createDOM(obj);
        }
    });
    obj = await getForecast(city);
    createDOM(obj);
}

export {getData};