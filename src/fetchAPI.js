async function getForecast (city) {
    try {
        let apiURL = "https://api.weatherapi.com/v1/forecast.json?key=48be8e08b2ad4dcab5e101553232803&q=" + city + "&days=5";
        const response = await fetch(apiURL, {mode: "cors"});
        const obj = await response.json();
        return obj;
    }
    catch {
        return "error";
    }   
}

export {getForecast};