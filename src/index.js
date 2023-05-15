import requestWeather from "./request.js";
import {createMainInfo, createHourlyInfo} from "./createMain.js";
import { populateStorage, retriveStorage } from "./localStorage.js";
console.log(requestWeather("Wroclaw").then((res) => {console.log(res)}));
window.onload = createMainInfo("Wroclaw");
window.onload = createHourlyInfo("Wroclaw");
window.onload = retriveStorage();
let radios = document.querySelectorAll('input[name="value-radio"]');
radios.forEach(radio => {
    radio.addEventListener("change", () => {
        populateStorage();
        location.reload();
    })
})