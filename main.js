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

function getDayName(dateStr, locale)
{
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });        
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
        let convertedDate = getDayName(onlyDay, "en-US")
        day.textContent =  `${convertedDate}, ${onlyDay}`;
        time.textContent = onlyTime;
        temp.textContent = currentTempType() == 0 ? `${res.current.temp_c}°` : `${res.current.temp_f}°`;
        city.textContent = `${res.location.name}, ${res.location.country}`


    }).catch(err => {
        alert("Enter valid city");
        location.reload();
    })
}

function createHourlyInfo(req) {
    const hourBox = document.querySelector("#hoursTemp");
    (0,_request_js__WEBPACK_IMPORTED_MODULE_0__["default"])(req).then((res) => {
        for(let i = 0; i <= res.forecast.forecastday[0].hour.length; i++){
            const div = document.createElement("div");
            const time = document.createElement("span");
            const img = document.createElement("img");
            const temp = document.createElement("span");

            div.classList.add("hour");
            div.setAttribute("id", `hour${i}`);

            time.classList.add("hourTime");
            time.setAttribute("id", `hourTime${i}`);
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
    
                let convertedDate = getDayName(res.forecast.forecastday[i].date, "en-US")
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YyxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jcmVhdGVNYWluLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2xvY2FsU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9yZXF1ZXN0LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcG9wdWxhdGVTdG9yYWdlVHlwZSwgcG9wdWxhdGVTdG9yYWdlQ2l0eSwgcmV0cml2ZVN0b3JhZ2VUeXBlLCByZXRyaXZlU3RvcmFnZUNpdHkgfSBmcm9tIFwiLi9sb2NhbFN0b3JhZ2UuanNcIjtcclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxTZXRVcCgpIHtcclxuICAgIHdpbmRvdy5vbmxvYWQgPSByZXRyaXZlU3RvcmFnZVR5cGUoKTtcclxuICAgIHdpbmRvdy5vbmxvYWQgPSByZXRyaXZlU3RvcmFnZUNpdHkoKTtcclxuICAgIHdpbmRvdy5vbmxvYWQgPSBwb3B1bGF0ZVN0b3JhZ2VUeXBlKCk7XHJcbiAgICBcclxuICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY2l0eVwiKSA9PT0gbnVsbCkge1xyXG4gICAgICAgIHdpbmRvdy5vbmxvYWQgPSBwb3B1bGF0ZVN0b3JhZ2VDaXR5KFwiV3JvY2xhd1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGxheUNvbnRyb2woKSB7XHJcbiAgICBsZXQgcmFkaW9zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cInZhbHVlLXJhZGlvXCJdJyk7XHJcbiAgICByYWRpb3MuZm9yRWFjaChyYWRpbyA9PiB7XHJcbiAgICAgICAgcmFkaW8uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHBvcHVsYXRlU3RvcmFnZVR5cGUoKTtcclxuICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbiAgICBjb25zdCBzZWFyY2hCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaEJ0blwiKTtcclxuXHJcbiAgICBzZWFyY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICBjb25zdCBzZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaEZpZWxkXCIpLnZhbHVlO1xyXG4gICAgICAgIGlmKHNlYXJjaCAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHBvcHVsYXRlU3RvcmFnZUNpdHkoc2VhcmNoKTtcclxuICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaEZpZWxkXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCAoZSkgPT4ge1xyXG4gICAgICAgIGlmKGUua2V5ID09PSBcIkVudGVyXCIpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgIHNlYXJjaEJ0bi5jbGljaygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCB7aW5pdGlhbFNldFVwLCBkaXNwbGF5Q29udHJvbH07IiwiaW1wb3J0IHJlcXVlc3RXZWF0aGVyIGZyb20gXCIuL3JlcXVlc3QuanNcIjtcclxuXHJcbmZ1bmN0aW9uIGN1cnJlbnRUZW1wVHlwZSgpIHtcclxuICAgIGNvbnN0IHRlbXBUeXBlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cInZhbHVlLXJhZGlvXCJdOmNoZWNrZWQnKS52YWx1ZTtcclxuICAgIHJldHVybiB0ZW1wVHlwZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGF5TmFtZShkYXRlU3RyLCBsb2NhbGUpXHJcbntcclxuICAgIHZhciBkYXRlID0gbmV3IERhdGUoZGF0ZVN0cik7XHJcbiAgICByZXR1cm4gZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7IHdlZWtkYXk6ICdsb25nJyB9KTsgICAgICAgIFxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVNYWluSW5mbyhyZXEpIHtcclxuICAgIGNvbnN0IG1haW5JbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ltZ01haW5cIik7XHJcbiAgICBjb25zdCBjb25kaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmRpdGlvblwiKTtcclxuICAgIGNvbnN0IGRheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGF5XCIpO1xyXG4gICAgY29uc3QgdGltZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGltZVwiKTtcclxuICAgIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RlbXBcIik7XHJcbiAgICBjb25zdCBjaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaXR5XCIpO1xyXG4gICAgcmVxdWVzdFdlYXRoZXIocmVxKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBtYWluSW1nLnNyYyA9IHJlcy5jdXJyZW50LmNvbmRpdGlvbi5pY29uO1xyXG4gICAgICAgIGNvbmRpdGlvbi50ZXh0Q29udGVudCA9IHJlcy5jdXJyZW50LmNvbmRpdGlvbi50ZXh0O1xyXG4gICAgICAgIGxldCBmdWxsRGF0ZSA9IHJlcy5sb2NhdGlvbi5sb2NhbHRpbWU7XHJcbiAgICAgICAgbGV0IG9ubHlEYXkgPSBmdWxsRGF0ZS5zbGljZSgwLDkpO1xyXG4gICAgICAgIGxldCBvbmx5VGltZSA9IGZ1bGxEYXRlLnNsaWNlKDEwKTtcclxuICAgICAgICBsZXQgY29udmVydGVkRGF0ZSA9IGdldERheU5hbWUob25seURheSwgXCJlbi1VU1wiKVxyXG4gICAgICAgIGRheS50ZXh0Q29udGVudCA9ICBgJHtjb252ZXJ0ZWREYXRlfSwgJHtvbmx5RGF5fWA7XHJcbiAgICAgICAgdGltZS50ZXh0Q29udGVudCA9IG9ubHlUaW1lO1xyXG4gICAgICAgIHRlbXAudGV4dENvbnRlbnQgPSBjdXJyZW50VGVtcFR5cGUoKSA9PSAwID8gYCR7cmVzLmN1cnJlbnQudGVtcF9jfcKwYCA6IGAke3Jlcy5jdXJyZW50LnRlbXBfZn3CsGA7XHJcbiAgICAgICAgY2l0eS50ZXh0Q29udGVudCA9IGAke3Jlcy5sb2NhdGlvbi5uYW1lfSwgJHtyZXMubG9jYXRpb24uY291bnRyeX1gXHJcblxyXG5cclxuICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgYWxlcnQoXCJFbnRlciB2YWxpZCBjaXR5XCIpO1xyXG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlSG91cmx5SW5mbyhyZXEpIHtcclxuICAgIGNvbnN0IGhvdXJCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hvdXJzVGVtcFwiKTtcclxuICAgIHJlcXVlc3RXZWF0aGVyKHJlcSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8PSByZXMuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91ci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICAgICAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICAgICAgICAgICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG5cclxuICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJob3VyXCIpO1xyXG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgYGhvdXIke2l9YCk7XHJcblxyXG4gICAgICAgICAgICB0aW1lLmNsYXNzTGlzdC5hZGQoXCJob3VyVGltZVwiKTtcclxuICAgICAgICAgICAgdGltZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgaG91clRpbWUke2l9YCk7XHJcbiAgICAgICAgICAgIGxldCBvbmx5VGltZSA9IHJlcy5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyW2ldLnRpbWU7XHJcbiAgICAgICAgICAgIHRpbWUudGV4dENvbnRlbnQgPSBvbmx5VGltZS5zbGljZSgxMCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpbWcuY2xhc3NMaXN0LmFkZChcImltZ0hvdXJcIik7XHJcbiAgICAgICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgaW1nSG91ciR7aX1gKTtcclxuICAgICAgICAgICAgaW1nLnNyYyA9IHJlcy5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyW2ldLmNvbmRpdGlvbi5pY29uO1xyXG5cclxuICAgICAgICAgICAgdGVtcC5jbGFzc0xpc3QuYWRkKFwidGVtcEhvdXJcIik7XHJcbiAgICAgICAgICAgIHRlbXAuc2V0QXR0cmlidXRlKFwiaWRcIiwgYHRlbXBIb3VyJHtpfWApO1xyXG4gICAgICAgICAgICB0ZW1wLnRleHRDb250ZW50ID0gY3VycmVudFRlbXBUeXBlKCkgPT0gMCA/IGAke01hdGgucm91bmQocmVzLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbaV0udGVtcF9jKX3CsGAgOiBgJHtNYXRoLnJvdW5kKHJlcy5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyW2ldLnRlbXBfZil9wrBgO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZCh0aW1lKTtcclxuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGltZyk7XHJcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZCh0ZW1wKTtcclxuXHJcbiAgICAgICAgICAgIGhvdXJCb3guYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVGb3JlY2FzdChyZXEpIHtcclxuICAgIGNvbnN0IGZvcmVjYXN0Qm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JlY2FzdFwiKTtcclxuICAgIHJlcXVlc3RXZWF0aGVyKHJlcSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMTsgaSA8IDU7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHJlcy5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXSl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZm9yZWNhc3REYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbmRpdGlvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3BhbkNvbmRpdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZm9yZWNhc3RUZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RCb3hcIik7XHJcbiAgICAgICAgICAgICAgICBmb3JlY2FzdERheS5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3REYXlcIik7XHJcbiAgICAgICAgICAgICAgICBpbWcuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0SW1nXCIpO1xyXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUZW1wLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdFRlbXBcIik7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGxldCBjb252ZXJ0ZWREYXRlID0gZ2V0RGF5TmFtZShyZXMuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV0uZGF0ZSwgXCJlbi1VU1wiKVxyXG4gICAgICAgICAgICAgICAgZm9yZWNhc3REYXkudGV4dENvbnRlbnQgPSBjb252ZXJ0ZWREYXRlO1xyXG4gICAgICAgICAgICAgICAgaW1nLnNyYyA9IHJlcy5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXkuY29uZGl0aW9uLmljb247XHJcbiAgICAgICAgICAgICAgICBzcGFuQ29uZGl0aW9uLnRleHRDb250ZW50ID0gcmVzLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2ldLmRheS5jb25kaXRpb24udGV4dDtcclxuICAgICAgICAgICAgICAgIGZvcmVjYXN0VGVtcC50ZXh0Q29udGVudCA9IGN1cnJlbnRUZW1wVHlwZSgpID09IDAgPyBgJHtNYXRoLnJvdW5kKHJlcy5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXkubWF4dGVtcF9jKX3CsCAvICR7TWF0aC5yb3VuZChyZXMuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV0uZGF5Lm1pbnRlbXBfYyl9wrBgIDogYCR7TWF0aC5yb3VuZChyZXMuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV0uZGF5Lm1heHRlbXBfZil9wrAgLyAke01hdGgucm91bmQocmVzLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2ldLmRheS5taW50ZW1wX2YpfcKwYDtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29uZGl0aW9uRGl2LmFwcGVuZENoaWxkKGltZyk7XHJcbiAgICAgICAgICAgICAgICBjb25kaXRpb25EaXYuYXBwZW5kQ2hpbGQoc3BhbkNvbmRpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoZm9yZWNhc3REYXkpO1xyXG4gICAgICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGNvbmRpdGlvbkRpdik7XHJcbiAgICAgICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUZW1wKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RCb3guYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic3BhblwiKVxyXG4gICAgICAgICAgICAgICAgc3Bhbi5jbGFzc0xpc3QuYWRkKFwic3BhblBsYWNlaG9sZGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgc3Bhbi50ZXh0Q29udGVudCA9IFwiZnJlZSB0cmlhbCBlbmRlZCA6KFwiXHJcbiAgICAgICAgICAgICAgICBmb3JlY2FzdEJveC5hcHBlbmRDaGlsZChzcGFuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCB7Y3JlYXRlTWFpbkluZm8sIGNyZWF0ZUhvdXJseUluZm8sIGNyZWF0ZUZvcmVjYXN0fTsiLCJpbXBvcnQge2NyZWF0ZU1haW5JbmZvLCBjcmVhdGVIb3VybHlJbmZvLCBjcmVhdGVGb3JlY2FzdH0gZnJvbSBcIi4vY3JlYXRlTWFpbi5qc1wiO1xyXG5cclxuZnVuY3Rpb24gcG9wdWxhdGVTdG9yYWdlVHlwZSgpIHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYHRlbXBUeXBlYCwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cInZhbHVlLXJhZGlvXCJdOmNoZWNrZWQnKS52YWx1ZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBvcHVsYXRlU3RvcmFnZUNpdHkoY2l0eSA9IFwiV3JvY2xhd1wiKSB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBjaXR5YCwgY2l0eSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJldHJpdmVTdG9yYWdlVHlwZSgpIHtcclxuICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidGVtcFR5cGVcIikgPT0gMCkge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9XCJ2YWx1ZS1yYWRpb1wiXScpWzBdLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwidmFsdWUtcmFkaW9cIl0nKVsxXS5jaGVja2VkID0gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmV0cml2ZVN0b3JhZ2VDaXR5KCkge1xyXG4gICAgY3JlYXRlTWFpbkluZm8obG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjaXR5XCIpKTtcclxuICAgIGNyZWF0ZUhvdXJseUluZm8obG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjaXR5XCIpKTtcclxuICAgIGNyZWF0ZUZvcmVjYXN0KGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY2l0eVwiKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHBvcHVsYXRlU3RvcmFnZVR5cGUsIHBvcHVsYXRlU3RvcmFnZUNpdHksIHJldHJpdmVTdG9yYWdlVHlwZSwgcmV0cml2ZVN0b3JhZ2VDaXR5IH07IiwiZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gcmVxdWVzdFdlYXRoZXIocmVxKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHA6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9OGY3NjY4ODM5ZDUyNDQ0YThkZjE4MzMxMDIzMDYwNCZxPSR7cmVxfSZkYXlzPTUmYXFpPW5vJmFsZXJ0cz1ub2ApO1xyXG4gICAgICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIHJldHVybiB3ZWF0aGVyRGF0YTtcclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtpbml0aWFsU2V0VXAsIGRpc3BsYXlDb250cm9sfSBmcm9tIFwiLi9jb250cm9sbGVyLmpzXCI7XHJcbmluaXRpYWxTZXRVcCgpO1xyXG5kaXNwbGF5Q29udHJvbCgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==