export default async function requestWeather(req) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=8f7668839d52444a8df183310230604&q=${req}&days=7&aqi=no&alerts=no`);
        const weatherData = await response.json();
        return weatherData;
    } catch(err) {
        console.log(err);
    }
}