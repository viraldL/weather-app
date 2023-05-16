import {createMainInfo, createHourlyInfo} from "./createMain.js";

function populateStorageType() {
            localStorage.setItem(`tempType`, document.querySelector('input[name="value-radio"]:checked').value);
}

function populateStorageCity(city) {
            localStorage.setItem(`city`, city);
}

function retriveStorageType() {
    if(localStorage.getItem("tempType") == 0) {
        document.querySelectorAll('input[name="value-radio"]')[0].checked = true;
    } else {
        document.querySelectorAll('input[name="value-radio"]')[1].checked = true;
    }
}

function retriveStorageCity() {
    createMainInfo(localStorage.getItem("city"));
    createHourlyInfo(localStorage.getItem("city"));
}

export { populateStorageType, populateStorageCity, retriveStorageType, retriveStorageCity };