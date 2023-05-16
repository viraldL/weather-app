import requestWeather from "./request.js";
import {createMainInfo, createHourlyInfo} from "./createMain.js";
import { populateStorageType, populateStorageCity, retriveStorageType, retriveStorageCity } from "./localStorage.js";
console.log(requestWeather("Wroclaw").then((res) => {console.log(res)}));
// window.onload = createMainInfo("Wroclaw");
// window.onload = createHourlyInfo("Wroclaw");
window.onload = retriveStorageType();
window.onload = retriveStorageCity();
window.onload = populateStorageType();
let radios = document.querySelectorAll('input[name="value-radio"]');
radios.forEach(radio => {
    radio.addEventListener("change", () => {
        populateStorageType();
        location.reload();
    })
})
const searchBtn = document.querySelector("#searchBtn");

searchBtn.addEventListener("click", () => {
    const search = document.querySelector("#searchField").value;
    if(search != "") {
        populateStorageCity(search);
        location.reload();
    }
})