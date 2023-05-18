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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXFIO0FBQ3JIO0FBQ0E7QUFDQSxvQkFBb0Isb0VBQWtCO0FBQ3RDLG9CQUFvQixvRUFBa0I7QUFDdEMsb0JBQW9CLHFFQUFtQjtBQUN2QztBQUNBO0FBQ0Esd0JBQXdCLHFFQUFtQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVkscUVBQW1CO0FBQy9CO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxxRUFBbUI7QUFDL0I7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckMwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsaUJBQWlCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksdURBQWM7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGNBQWMsSUFBSSxRQUFRO0FBQ3hEO0FBQ0EsdURBQXVELG1CQUFtQixRQUFRLG1CQUFtQjtBQUNyRyw4QkFBOEIsa0JBQWtCLElBQUkscUJBQXFCO0FBQ3pFO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHVEQUFjO0FBQ2xCLHVCQUF1Qiw4Q0FBOEM7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLEVBQUU7QUFDNUM7QUFDQTtBQUNBLCtDQUErQyxFQUFFO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLEVBQUU7QUFDL0M7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLEVBQUU7QUFDakQsMkRBQTJELHVEQUF1RCxRQUFRLHVEQUF1RDtBQUNqTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSx1REFBYztBQUNsQix1QkFBdUIsT0FBTztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUVBQXVFLHNEQUFzRCxNQUFNLHNEQUFzRCxRQUFRLHNEQUFzRCxNQUFNLHNEQUFzRDtBQUNuVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEhpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksOERBQWM7QUFDbEIsSUFBSSxnRUFBZ0I7QUFDcEIsSUFBSSw4REFBYztBQUNsQjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN2QmU7QUFDZjtBQUNBLHlIQUF5SCxJQUFJO0FBQzdIO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOzs7Ozs7VUNSQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjZEO0FBQzdELDREQUFZO0FBQ1osOERBQWMsRyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY3JlYXRlTWFpbi5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9sb2NhbFN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBvcHVsYXRlU3RvcmFnZVR5cGUsIHBvcHVsYXRlU3RvcmFnZUNpdHksIHJldHJpdmVTdG9yYWdlVHlwZSwgcmV0cml2ZVN0b3JhZ2VDaXR5IH0gZnJvbSBcIi4vbG9jYWxTdG9yYWdlLmpzXCI7XHJcblxyXG5mdW5jdGlvbiBpbml0aWFsU2V0VXAoKSB7XHJcbiAgICB3aW5kb3cub25sb2FkID0gcmV0cml2ZVN0b3JhZ2VUeXBlKCk7XHJcbiAgICB3aW5kb3cub25sb2FkID0gcmV0cml2ZVN0b3JhZ2VDaXR5KCk7XHJcbiAgICB3aW5kb3cub25sb2FkID0gcG9wdWxhdGVTdG9yYWdlVHlwZSgpO1xyXG4gICAgXHJcbiAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImNpdHlcIikgPT09IG51bGwpIHtcclxuICAgICAgICB3aW5kb3cub25sb2FkID0gcG9wdWxhdGVTdG9yYWdlQ2l0eShcIldyb2NsYXdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlDb250cm9sKCkge1xyXG4gICAgbGV0IHJhZGlvcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9XCJ2YWx1ZS1yYWRpb1wiXScpO1xyXG4gICAgcmFkaW9zLmZvckVhY2gocmFkaW8gPT4ge1xyXG4gICAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBwb3B1bGF0ZVN0b3JhZ2VUeXBlKCk7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG4gICAgY29uc3Qgc2VhcmNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hCdG5cIik7XHJcblxyXG4gICAgc2VhcmNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hGaWVsZFwiKS52YWx1ZTtcclxuICAgICAgICBpZihzZWFyY2ggIT0gXCJcIikge1xyXG4gICAgICAgICAgICBwb3B1bGF0ZVN0b3JhZ2VDaXR5KHNlYXJjaCk7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hGaWVsZFwiKS5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgKGUpID0+IHtcclxuICAgICAgICBpZihlLmtleSA9PT0gXCJFbnRlclwiKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICBzZWFyY2hCdG4uY2xpY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQge2luaXRpYWxTZXRVcCwgZGlzcGxheUNvbnRyb2x9OyIsImltcG9ydCByZXF1ZXN0V2VhdGhlciBmcm9tIFwiLi9yZXF1ZXN0LmpzXCI7XHJcblxyXG5mdW5jdGlvbiBjdXJyZW50VGVtcFR5cGUoKSB7XHJcbiAgICBjb25zdCB0ZW1wVHlwZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJ2YWx1ZS1yYWRpb1wiXTpjaGVja2VkJykudmFsdWU7XHJcbiAgICByZXR1cm4gdGVtcFR5cGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERheU5hbWUoZGF0ZVN0ciwgbG9jYWxlKVxyXG57XHJcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKGRhdGVTdHIpO1xyXG4gICAgcmV0dXJuIGRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwgeyB3ZWVrZGF5OiAnbG9uZycgfSk7ICAgICAgICBcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTWFpbkluZm8ocmVxKSB7XHJcbiAgICBjb25zdCBtYWluSW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbWdNYWluXCIpO1xyXG4gICAgY29uc3QgY29uZGl0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25kaXRpb25cIik7XHJcbiAgICBjb25zdCBkYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RheVwiKTtcclxuICAgIGNvbnN0IHRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RpbWVcIik7XHJcbiAgICBjb25zdCB0ZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZW1wXCIpO1xyXG4gICAgY29uc3QgY2l0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2l0eVwiKTtcclxuICAgIHJlcXVlc3RXZWF0aGVyKHJlcSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgbWFpbkltZy5zcmMgPSByZXMuY3VycmVudC5jb25kaXRpb24uaWNvbjtcclxuICAgICAgICBjb25kaXRpb24udGV4dENvbnRlbnQgPSByZXMuY3VycmVudC5jb25kaXRpb24udGV4dDtcclxuICAgICAgICBsZXQgZnVsbERhdGUgPSByZXMubG9jYXRpb24ubG9jYWx0aW1lO1xyXG4gICAgICAgIGxldCBvbmx5RGF5ID0gZnVsbERhdGUuc2xpY2UoMCw5KTtcclxuICAgICAgICBsZXQgb25seVRpbWUgPSBmdWxsRGF0ZS5zbGljZSgxMCk7XHJcbiAgICAgICAgbGV0IGNvbnZlcnRlZERhdGUgPSBnZXREYXlOYW1lKG9ubHlEYXksIFwiZW4tVVNcIilcclxuICAgICAgICBkYXkudGV4dENvbnRlbnQgPSAgYCR7Y29udmVydGVkRGF0ZX0sICR7b25seURheX1gO1xyXG4gICAgICAgIHRpbWUudGV4dENvbnRlbnQgPSBvbmx5VGltZTtcclxuICAgICAgICB0ZW1wLnRleHRDb250ZW50ID0gY3VycmVudFRlbXBUeXBlKCkgPT0gMCA/IGAke3Jlcy5jdXJyZW50LnRlbXBfY33CsGAgOiBgJHtyZXMuY3VycmVudC50ZW1wX2Z9wrBgO1xyXG4gICAgICAgIGNpdHkudGV4dENvbnRlbnQgPSBgJHtyZXMubG9jYXRpb24ubmFtZX0sICR7cmVzLmxvY2F0aW9uLmNvdW50cnl9YFxyXG5cclxuXHJcbiAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgIGFsZXJ0KFwiRW50ZXIgdmFsaWQgY2l0eVwiKTtcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUhvdXJseUluZm8ocmVxKSB7XHJcbiAgICBjb25zdCBob3VyQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNob3Vyc1RlbXBcIik7XHJcbiAgICByZXF1ZXN0V2VhdGhlcihyZXEpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPD0gcmVzLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBjb25zdCB0aW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuXHJcbiAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKFwiaG91clwiKTtcclxuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIGBob3VyJHtpfWApO1xyXG5cclxuICAgICAgICAgICAgdGltZS5jbGFzc0xpc3QuYWRkKFwiaG91clRpbWVcIik7XHJcbiAgICAgICAgICAgIHRpbWUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYGhvdXJUaW1lJHtpfWApO1xyXG4gICAgICAgICAgICBsZXQgb25seVRpbWUgPSByZXMuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cltpXS50aW1lO1xyXG4gICAgICAgICAgICB0aW1lLnRleHRDb250ZW50ID0gb25seVRpbWUuc2xpY2UoMTApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaW1nLmNsYXNzTGlzdC5hZGQoXCJpbWdIb3VyXCIpO1xyXG4gICAgICAgICAgICBpbWcuc2V0QXR0cmlidXRlKFwiaWRcIiwgYGltZ0hvdXIke2l9YCk7XHJcbiAgICAgICAgICAgIGltZy5zcmMgPSByZXMuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cltpXS5jb25kaXRpb24uaWNvbjtcclxuXHJcbiAgICAgICAgICAgIHRlbXAuY2xhc3NMaXN0LmFkZChcInRlbXBIb3VyXCIpO1xyXG4gICAgICAgICAgICB0ZW1wLnNldEF0dHJpYnV0ZShcImlkXCIsIGB0ZW1wSG91ciR7aX1gKTtcclxuICAgICAgICAgICAgdGVtcC50ZXh0Q29udGVudCA9IGN1cnJlbnRUZW1wVHlwZSgpID09IDAgPyBgJHtNYXRoLnJvdW5kKHJlcy5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyW2ldLnRlbXBfYyl9wrBgIDogYCR7TWF0aC5yb3VuZChyZXMuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cltpXS50ZW1wX2YpfcKwYDtcclxuXHJcblxyXG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQodGltZSk7XHJcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChpbWcpO1xyXG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQodGVtcCk7XHJcblxyXG4gICAgICAgICAgICBob3VyQm94LmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRm9yZWNhc3QocmVxKSB7XHJcbiAgICBjb25zdCBmb3JlY2FzdEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9yZWNhc3RcIik7XHJcbiAgICByZXF1ZXN0V2VhdGhlcihyZXEpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCA1OyBpKyspe1xyXG4gICAgICAgICAgICBpZihyZXMuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV0pe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZvcmVjYXN0RGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb25kaXRpb25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNwYW5Db25kaXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZvcmVjYXN0VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0Qm94XCIpO1xyXG4gICAgICAgICAgICAgICAgZm9yZWNhc3REYXkuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0RGF5XCIpO1xyXG4gICAgICAgICAgICAgICAgaW1nLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdEltZ1wiKTtcclxuICAgICAgICAgICAgICAgIGZvcmVjYXN0VGVtcC5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RUZW1wXCIpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgY29udmVydGVkRGF0ZSA9IGdldERheU5hbWUocmVzLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2ldLmRhdGUsIFwiZW4tVVNcIilcclxuICAgICAgICAgICAgICAgIGZvcmVjYXN0RGF5LnRleHRDb250ZW50ID0gY29udmVydGVkRGF0ZTtcclxuICAgICAgICAgICAgICAgIGltZy5zcmMgPSByZXMuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV0uZGF5LmNvbmRpdGlvbi5pY29uO1xyXG4gICAgICAgICAgICAgICAgc3BhbkNvbmRpdGlvbi50ZXh0Q29udGVudCA9IHJlcy5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXkuY29uZGl0aW9uLnRleHQ7XHJcbiAgICAgICAgICAgICAgICBmb3JlY2FzdFRlbXAudGV4dENvbnRlbnQgPSBjdXJyZW50VGVtcFR5cGUoKSA9PSAwID8gYCR7TWF0aC5yb3VuZChyZXMuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV0uZGF5Lm1heHRlbXBfYyl9wrAgLyAke01hdGgucm91bmQocmVzLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2ldLmRheS5taW50ZW1wX2MpfcKwYCA6IGAke01hdGgucm91bmQocmVzLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2ldLmRheS5tYXh0ZW1wX2YpfcKwIC8gJHtNYXRoLnJvdW5kKHJlcy5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXkubWludGVtcF9mKX3CsGA7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvbmRpdGlvbkRpdi5hcHBlbmRDaGlsZChpbWcpO1xyXG4gICAgICAgICAgICAgICAgY29uZGl0aW9uRGl2LmFwcGVuZENoaWxkKHNwYW5Db25kaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGZvcmVjYXN0RGF5KTtcclxuICAgICAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChjb25kaXRpb25EaXYpO1xyXG4gICAgICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGZvcmVjYXN0VGVtcCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGZvcmVjYXN0Qm94LmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInNwYW5cIilcclxuICAgICAgICAgICAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZChcInNwYW5QbGFjZWhvbGRlclwiKTtcclxuICAgICAgICAgICAgICAgIHNwYW4udGV4dENvbnRlbnQgPSBcImZyZWUgdHJpYWwgZW5kZWQgOihcIlxyXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RCb3guYXBwZW5kQ2hpbGQoc3Bhbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQge2NyZWF0ZU1haW5JbmZvLCBjcmVhdGVIb3VybHlJbmZvLCBjcmVhdGVGb3JlY2FzdH07IiwiaW1wb3J0IHtjcmVhdGVNYWluSW5mbywgY3JlYXRlSG91cmx5SW5mbywgY3JlYXRlRm9yZWNhc3R9IGZyb20gXCIuL2NyZWF0ZU1haW4uanNcIjtcclxuXHJcbmZ1bmN0aW9uIHBvcHVsYXRlU3RvcmFnZVR5cGUoKSB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGB0ZW1wVHlwZWAsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJ2YWx1ZS1yYWRpb1wiXTpjaGVja2VkJykudmFsdWUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwb3B1bGF0ZVN0b3JhZ2VDaXR5KGNpdHkgPSBcIldyb2NsYXdcIikge1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgY2l0eWAsIGNpdHkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXRyaXZlU3RvcmFnZVR5cGUoKSB7XHJcbiAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRlbXBUeXBlXCIpID09IDApIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwidmFsdWUtcmFkaW9cIl0nKVswXS5jaGVja2VkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cInZhbHVlLXJhZGlvXCJdJylbMV0uY2hlY2tlZCA9IHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJldHJpdmVTdG9yYWdlQ2l0eSgpIHtcclxuICAgIGNyZWF0ZU1haW5JbmZvKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY2l0eVwiKSk7XHJcbiAgICBjcmVhdGVIb3VybHlJbmZvKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY2l0eVwiKSk7XHJcbiAgICBjcmVhdGVGb3JlY2FzdChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImNpdHlcIikpO1xyXG59XHJcblxyXG5leHBvcnQgeyBwb3B1bGF0ZVN0b3JhZ2VUeXBlLCBwb3B1bGF0ZVN0b3JhZ2VDaXR5LCByZXRyaXZlU3RvcmFnZVR5cGUsIHJldHJpdmVTdG9yYWdlQ2l0eSB9OyIsImV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIHJlcXVlc3RXZWF0aGVyKHJlcSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PThmNzY2ODgzOWQ1MjQ0NGE4ZGYxODMzMTAyMzA2MDQmcT0ke3JlcX0mZGF5cz01JmFxaT1ubyZhbGVydHM9bm9gKTtcclxuICAgICAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICByZXR1cm4gd2VhdGhlckRhdGE7XHJcbiAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7aW5pdGlhbFNldFVwLCBkaXNwbGF5Q29udHJvbH0gZnJvbSBcIi4vY29udHJvbGxlci5qc1wiO1xyXG5pbml0aWFsU2V0VXAoKTtcclxuZGlzcGxheUNvbnRyb2woKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=