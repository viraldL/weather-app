/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayControl": () => (/* binding */ displayControl),
/* harmony export */   "initialSetUp": () => (/* binding */ initialSetUp)
/* harmony export */ });
/* harmony import */ var _localStorage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./localStorage.js */ "./src/localStorage.js");


function initialSetUp() {
    window.onload = (0,_localStorage_js__WEBPACK_IMPORTED_MODULE_0__.retriveStorageType)();
    window.onload = (0,_localStorage_js__WEBPACK_IMPORTED_MODULE_0__.retriveStorageCity)();
    window.onload = (0,_localStorage_js__WEBPACK_IMPORTED_MODULE_0__.populateStorageType)();
    
    if(localStorage.getItem("city") === null) {
        window.onload = (0,_localStorage_js__WEBPACK_IMPORTED_MODULE_0__.populateStorageCity)("Wroclaw");
    }
}

function displayControl() {
    let radios = document.querySelectorAll('input[name="value-radio"]');
    radios.forEach(radio => {
        radio.addEventListener("change", () => {
            (0,_localStorage_js__WEBPACK_IMPORTED_MODULE_0__.populateStorageType)();
            location.reload();
        })
    })
    const searchBtn = document.querySelector("#searchBtn");

    searchBtn.addEventListener("click", () => {
        const search = document.querySelector("#searchField").value;
        if(search != "") {
            (0,_localStorage_js__WEBPACK_IMPORTED_MODULE_0__.populateStorageCity)(search);
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



/***/ }),

/***/ "./src/createMain.js":
/*!***************************!*\
  !*** ./src/createMain.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createForecast": () => (/* binding */ createForecast),
/* harmony export */   "createHourlyInfo": () => (/* binding */ createHourlyInfo),
/* harmony export */   "createMainInfo": () => (/* binding */ createMainInfo)
/* harmony export */ });
/* harmony import */ var _request_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./request.js */ "./src/request.js");


function currentTempType() {
    const tempType = document.querySelector('input[name="value-radio"]:checked').value;
    return tempType;
}

function getDayName(dateStr) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var date = new Date(dateStr);
    return days[date.getDay()];
}

function createMainInfo(req) {
    const mainImg = document.querySelector("#imgMain");
    const condition = document.querySelector("#condition");
    const day = document.querySelector("#day");
    const time = document.querySelector("#time");
    const temp = document.querySelector("#temp");
    const city = document.querySelector("#city");
    (0,_request_js__WEBPACK_IMPORTED_MODULE_0__["default"])(req).then((res) => {
        mainImg.src = res.current.condition.icon;
        condition.textContent = res.current.condition.text;
        let fullDate = res.location.localtime;
        let onlyDay = fullDate.slice(0,9);
        let onlyTime = fullDate.slice(10);
        let convertedDate = getDayName(res.forecast.forecastday[0].date);
        day.textContent =  `${convertedDate}, ${onlyDay}`;
        time.textContent = onlyTime;
        temp.textContent = currentTempType() == 0 ? `${res.current.temp_c}°` : `${res.current.temp_f}°`;
        city.textContent = `${res.location.name}, ${res.location.country}`


    }).catch(err => {
        alert("Enter valid city");
    })
}

function createHourlyInfo(req) {
    const hourBox = document.querySelector("#hoursTemp");
    (0,_request_js__WEBPACK_IMPORTED_MODULE_0__["default"])(req).then((res) => {
        console.log(res);
        for(let i = 0; i <= res.forecast.forecastday[0].hour.length - 1; i++){
            const div = document.createElement("div");
            const time = document.createElement("span");
            const img = document.createElement("img");
            const temp = document.createElement("span");

            div.classList.add("hour");
            div.setAttribute("id", `hour${i}`);

            time.classList.add("hourTime");
            time.setAttribute("id", `hourTime${i}`);
            console.log(res.forecast.forecastday[0].hour[i].time);
            let onlyTime = res.forecast.forecastday[0].hour[i].time;
            time.textContent = onlyTime.slice(10);
            
            img.classList.add("imgHour");
            img.setAttribute("id", `imgHour${i}`);
            img.src = res.forecast.forecastday[0].hour[i].condition.icon;

            temp.classList.add("tempHour");
            temp.setAttribute("id", `tempHour${i}`);
            temp.textContent = currentTempType() == 0 ? `${Math.round(res.forecast.forecastday[0].hour[i].temp_c)}°` : `${Math.round(res.forecast.forecastday[0].hour[i].temp_f)}°`;


            div.appendChild(time);
            div.appendChild(img);
            div.appendChild(temp);

            hourBox.appendChild(div);
        }
    })
}

function createForecast(req) {
    const forecastBox = document.querySelector(".forecast");
    (0,_request_js__WEBPACK_IMPORTED_MODULE_0__["default"])(req).then((res) => {
        for(let i = 1; i < 5; i++){
            if(res.forecast.forecastday[i]){
                const div = document.createElement("div");
                const forecastDay = document.createElement("span");
                const conditionDiv = document.createElement("div");
                const img = document.createElement("img");
                const spanCondition = document.createElement("span");
                const forecastTemp = document.createElement("span");
    
                div.classList.add("forecastBox");
                forecastDay.classList.add("forecastDay");
                img.classList.add("forecastImg");
                forecastTemp.classList.add("forecastTemp");
    
                let convertedDate = getDayName(res.forecast.forecastday[i].date)
                forecastDay.textContent = convertedDate;
                img.src = res.forecast.forecastday[i].day.condition.icon;
                spanCondition.textContent = res.forecast.forecastday[i].day.condition.text;
                forecastTemp.textContent = currentTempType() == 0 ? `${Math.round(res.forecast.forecastday[i].day.maxtemp_c)}° / ${Math.round(res.forecast.forecastday[i].day.mintemp_c)}°` : `${Math.round(res.forecast.forecastday[i].day.maxtemp_f)}° / ${Math.round(res.forecast.forecastday[i].day.mintemp_f)}°`;
                
                conditionDiv.appendChild(img);
                conditionDiv.appendChild(spanCondition);
                div.appendChild(forecastDay);
                div.appendChild(conditionDiv);
                div.appendChild(forecastTemp);
    
                forecastBox.appendChild(div);
            } else {
                const span = document.querySelector("span")
                span.classList.add("spanPlaceholder");
                span.textContent = "free trial ended :("
                forecastBox.appendChild(span);
            }
        }
    })
}



/***/ }),

/***/ "./src/localStorage.js":
/*!*****************************!*\
  !*** ./src/localStorage.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "populateStorageCity": () => (/* binding */ populateStorageCity),
/* harmony export */   "populateStorageType": () => (/* binding */ populateStorageType),
/* harmony export */   "retriveStorageCity": () => (/* binding */ retriveStorageCity),
/* harmony export */   "retriveStorageType": () => (/* binding */ retriveStorageType)
/* harmony export */ });
/* harmony import */ var _createMain_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createMain.js */ "./src/createMain.js");


function populateStorageType() {
            localStorage.setItem(`tempType`, document.querySelector('input[name="value-radio"]:checked').value);
}

function populateStorageCity(city = "Wroclaw") {
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
    (0,_createMain_js__WEBPACK_IMPORTED_MODULE_0__.createMainInfo)(localStorage.getItem("city"));
    (0,_createMain_js__WEBPACK_IMPORTED_MODULE_0__.createHourlyInfo)(localStorage.getItem("city"));
    (0,_createMain_js__WEBPACK_IMPORTED_MODULE_0__.createForecast)(localStorage.getItem("city"));
}



/***/ }),

/***/ "./src/request.js":
/*!************************!*\
  !*** ./src/request.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ requestWeather)
/* harmony export */ });
async function requestWeather(req) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=8f7668839d52444a8df183310230604&q=${req}&days=5&aqi=no&alerts=no`);
        const weatherData = await response.json();
        return weatherData;
    } catch(err) {
        console.log(err);
    }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller.js */ "./src/controller.js");

(0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.initialSetUp)();
(0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.displayControl)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Y2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2NyZWF0ZU1haW4uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbG9jYWxTdG9yYWdlLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwb3B1bGF0ZVN0b3JhZ2VUeXBlLCBwb3B1bGF0ZVN0b3JhZ2VDaXR5LCByZXRyaXZlU3RvcmFnZVR5cGUsIHJldHJpdmVTdG9yYWdlQ2l0eSB9IGZyb20gXCIuL2xvY2FsU3RvcmFnZS5qc1wiO1xyXG5cclxuZnVuY3Rpb24gaW5pdGlhbFNldFVwKCkge1xyXG4gICAgd2luZG93Lm9ubG9hZCA9IHJldHJpdmVTdG9yYWdlVHlwZSgpO1xyXG4gICAgd2luZG93Lm9ubG9hZCA9IHJldHJpdmVTdG9yYWdlQ2l0eSgpO1xyXG4gICAgd2luZG93Lm9ubG9hZCA9IHBvcHVsYXRlU3RvcmFnZVR5cGUoKTtcclxuICAgIFxyXG4gICAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjaXR5XCIpID09PSBudWxsKSB7XHJcbiAgICAgICAgd2luZG93Lm9ubG9hZCA9IHBvcHVsYXRlU3RvcmFnZUNpdHkoXCJXcm9jbGF3XCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5Q29udHJvbCgpIHtcclxuICAgIGxldCByYWRpb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwidmFsdWUtcmFkaW9cIl0nKTtcclxuICAgIHJhZGlvcy5mb3JFYWNoKHJhZGlvID0+IHtcclxuICAgICAgICByYWRpby5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcclxuICAgICAgICAgICAgcG9wdWxhdGVTdG9yYWdlVHlwZSgpO1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuICAgIGNvbnN0IHNlYXJjaEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoQnRuXCIpO1xyXG5cclxuICAgIHNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoRmllbGRcIikudmFsdWU7XHJcbiAgICAgICAgaWYoc2VhcmNoICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgcG9wdWxhdGVTdG9yYWdlQ2l0eShzZWFyY2gpO1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoRmllbGRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIChlKSA9PiB7XHJcbiAgICAgICAgaWYoZS5rZXkgPT09IFwiRW50ZXJcIikge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgc2VhcmNoQnRuLmNsaWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IHtpbml0aWFsU2V0VXAsIGRpc3BsYXlDb250cm9sfTsiLCJpbXBvcnQgcmVxdWVzdFdlYXRoZXIgZnJvbSBcIi4vcmVxdWVzdC5qc1wiO1xyXG5cclxuZnVuY3Rpb24gY3VycmVudFRlbXBUeXBlKCkge1xyXG4gICAgY29uc3QgdGVtcFR5cGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwidmFsdWUtcmFkaW9cIl06Y2hlY2tlZCcpLnZhbHVlO1xyXG4gICAgcmV0dXJuIHRlbXBUeXBlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREYXlOYW1lKGRhdGVTdHIpIHtcclxuICAgIGxldCBkYXlzID0gWydTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSddO1xyXG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShkYXRlU3RyKTtcclxuICAgIHJldHVybiBkYXlzW2RhdGUuZ2V0RGF5KCldO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVNYWluSW5mbyhyZXEpIHtcclxuICAgIGNvbnN0IG1haW5JbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ltZ01haW5cIik7XHJcbiAgICBjb25zdCBjb25kaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmRpdGlvblwiKTtcclxuICAgIGNvbnN0IGRheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGF5XCIpO1xyXG4gICAgY29uc3QgdGltZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGltZVwiKTtcclxuICAgIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RlbXBcIik7XHJcbiAgICBjb25zdCBjaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaXR5XCIpO1xyXG4gICAgcmVxdWVzdFdlYXRoZXIocmVxKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBtYWluSW1nLnNyYyA9IHJlcy5jdXJyZW50LmNvbmRpdGlvbi5pY29uO1xyXG4gICAgICAgIGNvbmRpdGlvbi50ZXh0Q29udGVudCA9IHJlcy5jdXJyZW50LmNvbmRpdGlvbi50ZXh0O1xyXG4gICAgICAgIGxldCBmdWxsRGF0ZSA9IHJlcy5sb2NhdGlvbi5sb2NhbHRpbWU7XHJcbiAgICAgICAgbGV0IG9ubHlEYXkgPSBmdWxsRGF0ZS5zbGljZSgwLDkpO1xyXG4gICAgICAgIGxldCBvbmx5VGltZSA9IGZ1bGxEYXRlLnNsaWNlKDEwKTtcclxuICAgICAgICBsZXQgY29udmVydGVkRGF0ZSA9IGdldERheU5hbWUocmVzLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRhdGUpO1xyXG4gICAgICAgIGRheS50ZXh0Q29udGVudCA9ICBgJHtjb252ZXJ0ZWREYXRlfSwgJHtvbmx5RGF5fWA7XHJcbiAgICAgICAgdGltZS50ZXh0Q29udGVudCA9IG9ubHlUaW1lO1xyXG4gICAgICAgIHRlbXAudGV4dENvbnRlbnQgPSBjdXJyZW50VGVtcFR5cGUoKSA9PSAwID8gYCR7cmVzLmN1cnJlbnQudGVtcF9jfcKwYCA6IGAke3Jlcy5jdXJyZW50LnRlbXBfZn3CsGA7XHJcbiAgICAgICAgY2l0eS50ZXh0Q29udGVudCA9IGAke3Jlcy5sb2NhdGlvbi5uYW1lfSwgJHtyZXMubG9jYXRpb24uY291bnRyeX1gXHJcblxyXG5cclxuICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgYWxlcnQoXCJFbnRlciB2YWxpZCBjaXR5XCIpO1xyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlSG91cmx5SW5mbyhyZXEpIHtcclxuICAgIGNvbnN0IGhvdXJCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hvdXJzVGVtcFwiKTtcclxuICAgIHJlcXVlc3RXZWF0aGVyKHJlcSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDw9IHJlcy5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyLmxlbmd0aCAtIDE7IGkrKyl7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICAgICAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICAgICAgICAgICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG5cclxuICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJob3VyXCIpO1xyXG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgYGhvdXIke2l9YCk7XHJcblxyXG4gICAgICAgICAgICB0aW1lLmNsYXNzTGlzdC5hZGQoXCJob3VyVGltZVwiKTtcclxuICAgICAgICAgICAgdGltZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgaG91clRpbWUke2l9YCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyW2ldLnRpbWUpO1xyXG4gICAgICAgICAgICBsZXQgb25seVRpbWUgPSByZXMuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cltpXS50aW1lO1xyXG4gICAgICAgICAgICB0aW1lLnRleHRDb250ZW50ID0gb25seVRpbWUuc2xpY2UoMTApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaW1nLmNsYXNzTGlzdC5hZGQoXCJpbWdIb3VyXCIpO1xyXG4gICAgICAgICAgICBpbWcuc2V0QXR0cmlidXRlKFwiaWRcIiwgYGltZ0hvdXIke2l9YCk7XHJcbiAgICAgICAgICAgIGltZy5zcmMgPSByZXMuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cltpXS5jb25kaXRpb24uaWNvbjtcclxuXHJcbiAgICAgICAgICAgIHRlbXAuY2xhc3NMaXN0LmFkZChcInRlbXBIb3VyXCIpO1xyXG4gICAgICAgICAgICB0ZW1wLnNldEF0dHJpYnV0ZShcImlkXCIsIGB0ZW1wSG91ciR7aX1gKTtcclxuICAgICAgICAgICAgdGVtcC50ZXh0Q29udGVudCA9IGN1cnJlbnRUZW1wVHlwZSgpID09IDAgPyBgJHtNYXRoLnJvdW5kKHJlcy5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyW2ldLnRlbXBfYyl9wrBgIDogYCR7TWF0aC5yb3VuZChyZXMuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cltpXS50ZW1wX2YpfcKwYDtcclxuXHJcblxyXG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQodGltZSk7XHJcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChpbWcpO1xyXG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQodGVtcCk7XHJcblxyXG4gICAgICAgICAgICBob3VyQm94LmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRm9yZWNhc3QocmVxKSB7XHJcbiAgICBjb25zdCBmb3JlY2FzdEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9yZWNhc3RcIik7XHJcbiAgICByZXF1ZXN0V2VhdGhlcihyZXEpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCA1OyBpKyspe1xyXG4gICAgICAgICAgICBpZihyZXMuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV0pe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZvcmVjYXN0RGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb25kaXRpb25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNwYW5Db25kaXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZvcmVjYXN0VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0Qm94XCIpO1xyXG4gICAgICAgICAgICAgICAgZm9yZWNhc3REYXkuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0RGF5XCIpO1xyXG4gICAgICAgICAgICAgICAgaW1nLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdEltZ1wiKTtcclxuICAgICAgICAgICAgICAgIGZvcmVjYXN0VGVtcC5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RUZW1wXCIpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgY29udmVydGVkRGF0ZSA9IGdldERheU5hbWUocmVzLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2ldLmRhdGUpXHJcbiAgICAgICAgICAgICAgICBmb3JlY2FzdERheS50ZXh0Q29udGVudCA9IGNvbnZlcnRlZERhdGU7XHJcbiAgICAgICAgICAgICAgICBpbWcuc3JjID0gcmVzLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2ldLmRheS5jb25kaXRpb24uaWNvbjtcclxuICAgICAgICAgICAgICAgIHNwYW5Db25kaXRpb24udGV4dENvbnRlbnQgPSByZXMuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV0uZGF5LmNvbmRpdGlvbi50ZXh0O1xyXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUZW1wLnRleHRDb250ZW50ID0gY3VycmVudFRlbXBUeXBlKCkgPT0gMCA/IGAke01hdGgucm91bmQocmVzLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2ldLmRheS5tYXh0ZW1wX2MpfcKwIC8gJHtNYXRoLnJvdW5kKHJlcy5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXkubWludGVtcF9jKX3CsGAgOiBgJHtNYXRoLnJvdW5kKHJlcy5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXkubWF4dGVtcF9mKX3CsCAvICR7TWF0aC5yb3VuZChyZXMuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV0uZGF5Lm1pbnRlbXBfZil9wrBgO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjb25kaXRpb25EaXYuYXBwZW5kQ2hpbGQoaW1nKTtcclxuICAgICAgICAgICAgICAgIGNvbmRpdGlvbkRpdi5hcHBlbmRDaGlsZChzcGFuQ29uZGl0aW9uKTtcclxuICAgICAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChmb3JlY2FzdERheSk7XHJcbiAgICAgICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoY29uZGl0aW9uRGl2KTtcclxuICAgICAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChmb3JlY2FzdFRlbXApO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBmb3JlY2FzdEJveC5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJzcGFuXCIpXHJcbiAgICAgICAgICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoXCJzcGFuUGxhY2Vob2xkZXJcIik7XHJcbiAgICAgICAgICAgICAgICBzcGFuLnRleHRDb250ZW50ID0gXCJmcmVlIHRyaWFsIGVuZGVkIDooXCJcclxuICAgICAgICAgICAgICAgIGZvcmVjYXN0Qm94LmFwcGVuZENoaWxkKHNwYW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IHtjcmVhdGVNYWluSW5mbywgY3JlYXRlSG91cmx5SW5mbywgY3JlYXRlRm9yZWNhc3R9OyIsImltcG9ydCB7Y3JlYXRlTWFpbkluZm8sIGNyZWF0ZUhvdXJseUluZm8sIGNyZWF0ZUZvcmVjYXN0fSBmcm9tIFwiLi9jcmVhdGVNYWluLmpzXCI7XHJcblxyXG5mdW5jdGlvbiBwb3B1bGF0ZVN0b3JhZ2VUeXBlKCkge1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgdGVtcFR5cGVgLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwidmFsdWUtcmFkaW9cIl06Y2hlY2tlZCcpLnZhbHVlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcG9wdWxhdGVTdG9yYWdlQ2l0eShjaXR5ID0gXCJXcm9jbGF3XCIpIHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYGNpdHlgLCBjaXR5KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmV0cml2ZVN0b3JhZ2VUeXBlKCkge1xyXG4gICAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0ZW1wVHlwZVwiKSA9PSAwKSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cInZhbHVlLXJhZGlvXCJdJylbMF0uY2hlY2tlZCA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9XCJ2YWx1ZS1yYWRpb1wiXScpWzFdLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZXRyaXZlU3RvcmFnZUNpdHkoKSB7XHJcbiAgICBjcmVhdGVNYWluSW5mbyhsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImNpdHlcIikpO1xyXG4gICAgY3JlYXRlSG91cmx5SW5mbyhsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImNpdHlcIikpO1xyXG4gICAgY3JlYXRlRm9yZWNhc3QobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjaXR5XCIpKTtcclxufVxyXG5cclxuZXhwb3J0IHsgcG9wdWxhdGVTdG9yYWdlVHlwZSwgcG9wdWxhdGVTdG9yYWdlQ2l0eSwgcmV0cml2ZVN0b3JhZ2VUeXBlLCByZXRyaXZlU3RvcmFnZUNpdHkgfTsiLCJleHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiByZXF1ZXN0V2VhdGhlcihyZXEpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cDovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT04Zjc2Njg4MzlkNTI0NDRhOGRmMTgzMzEwMjMwNjA0JnE9JHtyZXF9JmRheXM9NSZhcWk9bm8mYWxlcnRzPW5vYCk7XHJcbiAgICAgICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgcmV0dXJuIHdlYXRoZXJEYXRhO1xyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge2luaXRpYWxTZXRVcCwgZGlzcGxheUNvbnRyb2x9IGZyb20gXCIuL2NvbnRyb2xsZXIuanNcIjtcclxuaW5pdGlhbFNldFVwKCk7XHJcbmRpc3BsYXlDb250cm9sKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9