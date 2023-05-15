import requestWeather from "./request.js";
import {createMainInfo, createHourlyInfo} from "./createMain.js"
console.log(requestWeather("Wroclaw").then((res) => {console.log(res)}));
window.onload = createMainInfo("Wroclaw");
window.onload = createHourlyInfo("Wroclaw");