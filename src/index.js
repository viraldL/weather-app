import requestWeather from "./request.js";
import { populateStorageType, populateStorageCity, retriveStorageType, retriveStorageCity } from "./localStorage.js";
console.log(requestWeather("Wroclaw").then((res) => {console.log(res)}));
window.onload = retriveStorageType();
window.onload = retriveStorageCity();
window.onload = populateStorageType();
// window.onload = populateStorageCity();
if(localStorage.getItem("city") === null) {
    console.log("jes");
    window.onload = populateStorageCity("Wroclaw");
}
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