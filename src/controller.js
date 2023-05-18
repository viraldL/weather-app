import { populateStorageType, populateStorageCity, retriveStorageType, retriveStorageCity } from "./localStorage.js";

function initialSetUp() {
    window.onload = retriveStorageType();
    window.onload = retriveStorageCity();
    window.onload = populateStorageType();
    
    if(localStorage.getItem("city") === null) {
        window.onload = populateStorageCity("Wroclaw");
    }
}

function displayControl() {
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

    document.querySelector("#searchField").addEventListener("keypress", (e) => {
        if(e.key === "Enter") {
            e.preventDefault()
            searchBtn.click();
        }
    })
}

export {initialSetUp, displayControl};