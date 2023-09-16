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
        for(let i = 0; i <= res.forecast.forecastday[0].hour.length - 1; i++){
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
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8f7668839d52444a8df183310230604&q=${req}&days=5&aqi=no&alerts=no`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY3JlYXRlTWFpbi5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9sb2NhbFN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBvcHVsYXRlU3RvcmFnZVR5cGUsIHBvcHVsYXRlU3RvcmFnZUNpdHksIHJldHJpdmVTdG9yYWdlVHlwZSwgcmV0cml2ZVN0b3JhZ2VDaXR5IH0gZnJvbSBcIi4vbG9jYWxTdG9yYWdlLmpzXCI7XHJcblxyXG5mdW5jdGlvbiBpbml0aWFsU2V0VXAoKSB7XHJcbiAgICB3aW5kb3cub25sb2FkID0gcmV0cml2ZVN0b3JhZ2VUeXBlKCk7XHJcbiAgICB3aW5kb3cub25sb2FkID0gcmV0cml2ZVN0b3JhZ2VDaXR5KCk7XHJcbiAgICB3aW5kb3cub25sb2FkID0gcG9wdWxhdGVTdG9yYWdlVHlwZSgpO1xyXG4gICAgXHJcbiAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImNpdHlcIikgPT09IG51bGwpIHtcclxuICAgICAgICB3aW5kb3cub25sb2FkID0gcG9wdWxhdGVTdG9yYWdlQ2l0eShcIldyb2NsYXdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlDb250cm9sKCkge1xyXG4gICAgbGV0IHJhZGlvcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9XCJ2YWx1ZS1yYWRpb1wiXScpO1xyXG4gICAgcmFkaW9zLmZvckVhY2gocmFkaW8gPT4ge1xyXG4gICAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBwb3B1bGF0ZVN0b3JhZ2VUeXBlKCk7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG4gICAgY29uc3Qgc2VhcmNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hCdG5cIik7XHJcblxyXG4gICAgc2VhcmNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hGaWVsZFwiKS52YWx1ZTtcclxuICAgICAgICBpZihzZWFyY2ggIT0gXCJcIikge1xyXG4gICAgICAgICAgICBwb3B1bGF0ZVN0b3JhZ2VDaXR5KHNlYXJjaCk7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hGaWVsZFwiKS5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgKGUpID0+IHtcclxuICAgICAgICBpZihlLmtleSA9PT0gXCJFbnRlclwiKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICBzZWFyY2hCdG4uY2xpY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQge2luaXRpYWxTZXRVcCwgZGlzcGxheUNvbnRyb2x9OyIsImltcG9ydCByZXF1ZXN0V2VhdGhlciBmcm9tIFwiLi9yZXF1ZXN0LmpzXCI7XHJcblxyXG5mdW5jdGlvbiBjdXJyZW50VGVtcFR5cGUoKSB7XHJcbiAgICBjb25zdCB0ZW1wVHlwZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJ2YWx1ZS1yYWRpb1wiXTpjaGVja2VkJykudmFsdWU7XHJcbiAgICByZXR1cm4gdGVtcFR5cGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERheU5hbWUoZGF0ZVN0cikge1xyXG4gICAgbGV0IGRheXMgPSBbJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5J107XHJcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKGRhdGVTdHIpO1xyXG4gICAgcmV0dXJuIGRheXNbZGF0ZS5nZXREYXkoKV07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZU1haW5JbmZvKHJlcSkge1xyXG4gICAgY29uc3QgbWFpbkltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW1nTWFpblwiKTtcclxuICAgIGNvbnN0IGNvbmRpdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29uZGl0aW9uXCIpO1xyXG4gICAgY29uc3QgZGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkYXlcIik7XHJcbiAgICBjb25zdCB0aW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aW1lXCIpO1xyXG4gICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGVtcFwiKTtcclxuICAgIGNvbnN0IGNpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NpdHlcIik7XHJcbiAgICByZXF1ZXN0V2VhdGhlcihyZXEpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIG1haW5JbWcuc3JjID0gcmVzLmN1cnJlbnQuY29uZGl0aW9uLmljb247XHJcbiAgICAgICAgY29uZGl0aW9uLnRleHRDb250ZW50ID0gcmVzLmN1cnJlbnQuY29uZGl0aW9uLnRleHQ7XHJcbiAgICAgICAgbGV0IGZ1bGxEYXRlID0gcmVzLmxvY2F0aW9uLmxvY2FsdGltZTtcclxuICAgICAgICBsZXQgb25seURheSA9IGZ1bGxEYXRlLnNsaWNlKDAsOSk7XHJcbiAgICAgICAgbGV0IG9ubHlUaW1lID0gZnVsbERhdGUuc2xpY2UoMTApO1xyXG4gICAgICAgIGxldCBjb252ZXJ0ZWREYXRlID0gZ2V0RGF5TmFtZShyZXMuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF0ZSk7XHJcbiAgICAgICAgZGF5LnRleHRDb250ZW50ID0gIGAke2NvbnZlcnRlZERhdGV9LCAke29ubHlEYXl9YDtcclxuICAgICAgICB0aW1lLnRleHRDb250ZW50ID0gb25seVRpbWU7XHJcbiAgICAgICAgdGVtcC50ZXh0Q29udGVudCA9IGN1cnJlbnRUZW1wVHlwZSgpID09IDAgPyBgJHtyZXMuY3VycmVudC50ZW1wX2N9wrBgIDogYCR7cmVzLmN1cnJlbnQudGVtcF9mfcKwYDtcclxuICAgICAgICBjaXR5LnRleHRDb250ZW50ID0gYCR7cmVzLmxvY2F0aW9uLm5hbWV9LCAke3Jlcy5sb2NhdGlvbi5jb3VudHJ5fWBcclxuXHJcblxyXG4gICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICBhbGVydChcIkVudGVyIHZhbGlkIGNpdHlcIik7XHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVIb3VybHlJbmZvKHJlcSkge1xyXG4gICAgY29uc3QgaG91ckJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaG91cnNUZW1wXCIpO1xyXG4gICAgcmVxdWVzdFdlYXRoZXIocmVxKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDw9IHJlcy5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyLmxlbmd0aCAtIDE7IGkrKyl7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICAgICAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICAgICAgICAgICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG5cclxuICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJob3VyXCIpO1xyXG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgYGhvdXIke2l9YCk7XHJcblxyXG4gICAgICAgICAgICB0aW1lLmNsYXNzTGlzdC5hZGQoXCJob3VyVGltZVwiKTtcclxuICAgICAgICAgICAgdGltZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgaG91clRpbWUke2l9YCk7XHJcbiAgICAgICAgICAgIGxldCBvbmx5VGltZSA9IHJlcy5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyW2ldLnRpbWU7XHJcbiAgICAgICAgICAgIHRpbWUudGV4dENvbnRlbnQgPSBvbmx5VGltZS5zbGljZSgxMCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpbWcuY2xhc3NMaXN0LmFkZChcImltZ0hvdXJcIik7XHJcbiAgICAgICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgaW1nSG91ciR7aX1gKTtcclxuICAgICAgICAgICAgaW1nLnNyYyA9IHJlcy5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyW2ldLmNvbmRpdGlvbi5pY29uO1xyXG5cclxuICAgICAgICAgICAgdGVtcC5jbGFzc0xpc3QuYWRkKFwidGVtcEhvdXJcIik7XHJcbiAgICAgICAgICAgIHRlbXAuc2V0QXR0cmlidXRlKFwiaWRcIiwgYHRlbXBIb3VyJHtpfWApO1xyXG4gICAgICAgICAgICB0ZW1wLnRleHRDb250ZW50ID0gY3VycmVudFRlbXBUeXBlKCkgPT0gMCA/IGAke01hdGgucm91bmQocmVzLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbaV0udGVtcF9jKX3CsGAgOiBgJHtNYXRoLnJvdW5kKHJlcy5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyW2ldLnRlbXBfZil9wrBgO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZCh0aW1lKTtcclxuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGltZyk7XHJcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZCh0ZW1wKTtcclxuXHJcbiAgICAgICAgICAgIGhvdXJCb3guYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVGb3JlY2FzdChyZXEpIHtcclxuICAgIGNvbnN0IGZvcmVjYXN0Qm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JlY2FzdFwiKTtcclxuICAgIHJlcXVlc3RXZWF0aGVyKHJlcSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMTsgaSA8IDU7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHJlcy5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXSl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZm9yZWNhc3REYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbmRpdGlvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3BhbkNvbmRpdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZm9yZWNhc3RUZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RCb3hcIik7XHJcbiAgICAgICAgICAgICAgICBmb3JlY2FzdERheS5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3REYXlcIik7XHJcbiAgICAgICAgICAgICAgICBpbWcuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0SW1nXCIpO1xyXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUZW1wLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdFRlbXBcIik7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGxldCBjb252ZXJ0ZWREYXRlID0gZ2V0RGF5TmFtZShyZXMuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV0uZGF0ZSlcclxuICAgICAgICAgICAgICAgIGZvcmVjYXN0RGF5LnRleHRDb250ZW50ID0gY29udmVydGVkRGF0ZTtcclxuICAgICAgICAgICAgICAgIGltZy5zcmMgPSByZXMuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV0uZGF5LmNvbmRpdGlvbi5pY29uO1xyXG4gICAgICAgICAgICAgICAgc3BhbkNvbmRpdGlvbi50ZXh0Q29udGVudCA9IHJlcy5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXkuY29uZGl0aW9uLnRleHQ7XHJcbiAgICAgICAgICAgICAgICBmb3JlY2FzdFRlbXAudGV4dENvbnRlbnQgPSBjdXJyZW50VGVtcFR5cGUoKSA9PSAwID8gYCR7TWF0aC5yb3VuZChyZXMuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV0uZGF5Lm1heHRlbXBfYyl9wrAgLyAke01hdGgucm91bmQocmVzLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2ldLmRheS5taW50ZW1wX2MpfcKwYCA6IGAke01hdGgucm91bmQocmVzLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2ldLmRheS5tYXh0ZW1wX2YpfcKwIC8gJHtNYXRoLnJvdW5kKHJlcy5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXkubWludGVtcF9mKX3CsGA7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvbmRpdGlvbkRpdi5hcHBlbmRDaGlsZChpbWcpO1xyXG4gICAgICAgICAgICAgICAgY29uZGl0aW9uRGl2LmFwcGVuZENoaWxkKHNwYW5Db25kaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGZvcmVjYXN0RGF5KTtcclxuICAgICAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChjb25kaXRpb25EaXYpO1xyXG4gICAgICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGZvcmVjYXN0VGVtcCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGZvcmVjYXN0Qm94LmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInNwYW5cIilcclxuICAgICAgICAgICAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZChcInNwYW5QbGFjZWhvbGRlclwiKTtcclxuICAgICAgICAgICAgICAgIHNwYW4udGV4dENvbnRlbnQgPSBcImZyZWUgdHJpYWwgZW5kZWQgOihcIlxyXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RCb3guYXBwZW5kQ2hpbGQoc3Bhbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQge2NyZWF0ZU1haW5JbmZvLCBjcmVhdGVIb3VybHlJbmZvLCBjcmVhdGVGb3JlY2FzdH07IiwiaW1wb3J0IHtjcmVhdGVNYWluSW5mbywgY3JlYXRlSG91cmx5SW5mbywgY3JlYXRlRm9yZWNhc3R9IGZyb20gXCIuL2NyZWF0ZU1haW4uanNcIjtcclxuXHJcbmZ1bmN0aW9uIHBvcHVsYXRlU3RvcmFnZVR5cGUoKSB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGB0ZW1wVHlwZWAsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJ2YWx1ZS1yYWRpb1wiXTpjaGVja2VkJykudmFsdWUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwb3B1bGF0ZVN0b3JhZ2VDaXR5KGNpdHkgPSBcIldyb2NsYXdcIikge1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgY2l0eWAsIGNpdHkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXRyaXZlU3RvcmFnZVR5cGUoKSB7XHJcbiAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRlbXBUeXBlXCIpID09IDApIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwidmFsdWUtcmFkaW9cIl0nKVswXS5jaGVja2VkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cInZhbHVlLXJhZGlvXCJdJylbMV0uY2hlY2tlZCA9IHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJldHJpdmVTdG9yYWdlQ2l0eSgpIHtcclxuICAgIGNyZWF0ZU1haW5JbmZvKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY2l0eVwiKSk7XHJcbiAgICBjcmVhdGVIb3VybHlJbmZvKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY2l0eVwiKSk7XHJcbiAgICBjcmVhdGVGb3JlY2FzdChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImNpdHlcIikpO1xyXG59XHJcblxyXG5leHBvcnQgeyBwb3B1bGF0ZVN0b3JhZ2VUeXBlLCBwb3B1bGF0ZVN0b3JhZ2VDaXR5LCByZXRyaXZlU3RvcmFnZVR5cGUsIHJldHJpdmVTdG9yYWdlQ2l0eSB9OyIsImV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIHJlcXVlc3RXZWF0aGVyKHJlcSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT04Zjc2Njg4MzlkNTI0NDRhOGRmMTgzMzEwMjMwNjA0JnE9JHtyZXF9JmRheXM9NSZhcWk9bm8mYWxlcnRzPW5vYCk7XHJcbiAgICAgICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgcmV0dXJuIHdlYXRoZXJEYXRhO1xyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge2luaXRpYWxTZXRVcCwgZGlzcGxheUNvbnRyb2x9IGZyb20gXCIuL2NvbnRyb2xsZXIuanNcIjtcclxuaW5pdGlhbFNldFVwKCk7XHJcbmRpc3BsYXlDb250cm9sKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9