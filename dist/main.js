/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/createMain.js":
/*!***************************!*\
  !*** ./src/createMain.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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
    (0,_createMain_js__WEBPACK_IMPORTED_MODULE_0__.createMainInfo)(localStorage.getItem("city"));
    (0,_createMain_js__WEBPACK_IMPORTED_MODULE_0__.createHourlyInfo)(localStorage.getItem("city"));
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
/* harmony import */ var _request_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./request.js */ "./src/request.js");
/* harmony import */ var _createMain_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createMain.js */ "./src/createMain.js");
/* harmony import */ var _localStorage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./localStorage.js */ "./src/localStorage.js");



console.log((0,_request_js__WEBPACK_IMPORTED_MODULE_0__["default"])("Wroclaw").then((res) => {console.log(res)}));
// window.onload = createMainInfo("Wroclaw");
// window.onload = createHourlyInfo("Wroclaw");
window.onload = (0,_localStorage_js__WEBPACK_IMPORTED_MODULE_2__.retriveStorageType)();
window.onload = (0,_localStorage_js__WEBPACK_IMPORTED_MODULE_2__.retriveStorageCity)();
window.onload = (0,_localStorage_js__WEBPACK_IMPORTED_MODULE_2__.populateStorageType)();
let radios = document.querySelectorAll('input[name="value-radio"]');
radios.forEach(radio => {
    radio.addEventListener("change", () => {
        (0,_localStorage_js__WEBPACK_IMPORTED_MODULE_2__.populateStorageType)();
        location.reload();
    })
})
const searchBtn = document.querySelector("#searchBtn");

searchBtn.addEventListener("click", () => {
    const search = document.querySelector("#searchField").value;
    if(search != "") {
        (0,_localStorage_js__WEBPACK_IMPORTED_MODULE_2__.populateStorageCity)(search);
        location.reload();
    }
})
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxpQkFBaUI7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSx1REFBYztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsY0FBYyxJQUFJLFFBQVE7QUFDeEQ7QUFDQSx1REFBdUQsbUJBQW1CLFFBQVEsbUJBQW1CO0FBQ3JHLDhCQUE4QixrQkFBa0IsSUFBSSxxQkFBcUI7QUFDekU7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksdURBQWM7QUFDbEIsdUJBQXVCLDhDQUE4QztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsRUFBRTtBQUM1QztBQUNBO0FBQ0EsK0NBQStDLEVBQUU7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsRUFBRTtBQUMvQztBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsRUFBRTtBQUNqRCwyREFBMkQsdURBQXVELFFBQVEsdURBQXVEO0FBQ2pMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RFaUU7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDhEQUFjO0FBQ2xCLElBQUksZ0VBQWdCO0FBQ3BCO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3RCZTtBQUNmO0FBQ0EseUhBQXlILElBQUk7QUFDN0g7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7Ozs7OztVQ1JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ04wQztBQUN1QjtBQUNvRDtBQUNySCxZQUFZLHVEQUFjLDJCQUEyQixpQkFBaUI7QUFDdEU7QUFDQTtBQUNBLGdCQUFnQixvRUFBa0I7QUFDbEMsZ0JBQWdCLG9FQUFrQjtBQUNsQyxnQkFBZ0IscUVBQW1CO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLFFBQVEscUVBQW1CO0FBQzNCO0FBQ0EsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxxRUFBbUI7QUFDM0I7QUFDQTtBQUNBLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2NyZWF0ZU1haW4uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbG9jYWxTdG9yYWdlLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVxdWVzdFdlYXRoZXIgZnJvbSBcIi4vcmVxdWVzdC5qc1wiO1xyXG5cclxuZnVuY3Rpb24gY3VycmVudFRlbXBUeXBlKCkge1xyXG4gICAgY29uc3QgdGVtcFR5cGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwidmFsdWUtcmFkaW9cIl06Y2hlY2tlZCcpLnZhbHVlO1xyXG4gICAgcmV0dXJuIHRlbXBUeXBlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREYXlOYW1lKGRhdGVTdHIsIGxvY2FsZSlcclxue1xyXG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShkYXRlU3RyKTtcclxuICAgIHJldHVybiBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHsgd2Vla2RheTogJ2xvbmcnIH0pOyAgICAgICAgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZU1haW5JbmZvKHJlcSkge1xyXG4gICAgY29uc3QgbWFpbkltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW1nTWFpblwiKTtcclxuICAgIGNvbnN0IGNvbmRpdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29uZGl0aW9uXCIpO1xyXG4gICAgY29uc3QgZGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkYXlcIik7XHJcbiAgICBjb25zdCB0aW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aW1lXCIpO1xyXG4gICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGVtcFwiKTtcclxuICAgIGNvbnN0IGNpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NpdHlcIik7XHJcbiAgICByZXF1ZXN0V2VhdGhlcihyZXEpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIG1haW5JbWcuc3JjID0gcmVzLmN1cnJlbnQuY29uZGl0aW9uLmljb247XHJcbiAgICAgICAgY29uZGl0aW9uLnRleHRDb250ZW50ID0gcmVzLmN1cnJlbnQuY29uZGl0aW9uLnRleHQ7XHJcbiAgICAgICAgbGV0IGZ1bGxEYXRlID0gcmVzLmxvY2F0aW9uLmxvY2FsdGltZTtcclxuICAgICAgICBsZXQgb25seURheSA9IGZ1bGxEYXRlLnNsaWNlKDAsOSk7XHJcbiAgICAgICAgbGV0IG9ubHlUaW1lID0gZnVsbERhdGUuc2xpY2UoMTApO1xyXG4gICAgICAgIGxldCBjb252ZXJ0ZWREYXRlID0gZ2V0RGF5TmFtZShvbmx5RGF5LCBcImVuLVVTXCIpXHJcbiAgICAgICAgZGF5LnRleHRDb250ZW50ID0gIGAke2NvbnZlcnRlZERhdGV9LCAke29ubHlEYXl9YDtcclxuICAgICAgICB0aW1lLnRleHRDb250ZW50ID0gb25seVRpbWU7XHJcbiAgICAgICAgdGVtcC50ZXh0Q29udGVudCA9IGN1cnJlbnRUZW1wVHlwZSgpID09IDAgPyBgJHtyZXMuY3VycmVudC50ZW1wX2N9wrBgIDogYCR7cmVzLmN1cnJlbnQudGVtcF9mfcKwYDtcclxuICAgICAgICBjaXR5LnRleHRDb250ZW50ID0gYCR7cmVzLmxvY2F0aW9uLm5hbWV9LCAke3Jlcy5sb2NhdGlvbi5jb3VudHJ5fWBcclxuXHJcblxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlSG91cmx5SW5mbyhyZXEpIHtcclxuICAgIGNvbnN0IGhvdXJCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hvdXJzVGVtcFwiKTtcclxuICAgIHJlcXVlc3RXZWF0aGVyKHJlcSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8PSByZXMuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91ci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICAgICAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICAgICAgICAgICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG5cclxuICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJob3VyXCIpO1xyXG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgYGhvdXIke2l9YCk7XHJcblxyXG4gICAgICAgICAgICB0aW1lLmNsYXNzTGlzdC5hZGQoXCJob3VyVGltZVwiKTtcclxuICAgICAgICAgICAgdGltZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgaG91clRpbWUke2l9YCk7XHJcbiAgICAgICAgICAgIGxldCBvbmx5VGltZSA9IHJlcy5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyW2ldLnRpbWU7XHJcbiAgICAgICAgICAgIHRpbWUudGV4dENvbnRlbnQgPSBvbmx5VGltZS5zbGljZSgxMCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpbWcuY2xhc3NMaXN0LmFkZChcImltZ0hvdXJcIik7XHJcbiAgICAgICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgaW1nSG91ciR7aX1gKTtcclxuICAgICAgICAgICAgaW1nLnNyYyA9IHJlcy5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyW2ldLmNvbmRpdGlvbi5pY29uO1xyXG5cclxuICAgICAgICAgICAgdGVtcC5jbGFzc0xpc3QuYWRkKFwidGVtcEhvdXJcIik7XHJcbiAgICAgICAgICAgIHRlbXAuc2V0QXR0cmlidXRlKFwiaWRcIiwgYHRlbXBIb3VyJHtpfWApO1xyXG4gICAgICAgICAgICB0ZW1wLnRleHRDb250ZW50ID0gY3VycmVudFRlbXBUeXBlKCkgPT0gMCA/IGAke01hdGgucm91bmQocmVzLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbaV0udGVtcF9jKX3CsGAgOiBgJHtNYXRoLnJvdW5kKHJlcy5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyW2ldLnRlbXBfZil9wrBgO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZCh0aW1lKTtcclxuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGltZyk7XHJcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZCh0ZW1wKTtcclxuXHJcbiAgICAgICAgICAgIGhvdXJCb3guYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQge2NyZWF0ZU1haW5JbmZvLCBjcmVhdGVIb3VybHlJbmZvfTsiLCJpbXBvcnQge2NyZWF0ZU1haW5JbmZvLCBjcmVhdGVIb3VybHlJbmZvfSBmcm9tIFwiLi9jcmVhdGVNYWluLmpzXCI7XHJcblxyXG5mdW5jdGlvbiBwb3B1bGF0ZVN0b3JhZ2VUeXBlKCkge1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgdGVtcFR5cGVgLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwidmFsdWUtcmFkaW9cIl06Y2hlY2tlZCcpLnZhbHVlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcG9wdWxhdGVTdG9yYWdlQ2l0eShjaXR5KSB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBjaXR5YCwgY2l0eSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJldHJpdmVTdG9yYWdlVHlwZSgpIHtcclxuICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidGVtcFR5cGVcIikgPT0gMCkge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9XCJ2YWx1ZS1yYWRpb1wiXScpWzBdLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwidmFsdWUtcmFkaW9cIl0nKVsxXS5jaGVja2VkID0gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmV0cml2ZVN0b3JhZ2VDaXR5KCkge1xyXG4gICAgY3JlYXRlTWFpbkluZm8obG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjaXR5XCIpKTtcclxuICAgIGNyZWF0ZUhvdXJseUluZm8obG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjaXR5XCIpKTtcclxufVxyXG5cclxuZXhwb3J0IHsgcG9wdWxhdGVTdG9yYWdlVHlwZSwgcG9wdWxhdGVTdG9yYWdlQ2l0eSwgcmV0cml2ZVN0b3JhZ2VUeXBlLCByZXRyaXZlU3RvcmFnZUNpdHkgfTsiLCJleHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiByZXF1ZXN0V2VhdGhlcihyZXEpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cDovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT04Zjc2Njg4MzlkNTI0NDRhOGRmMTgzMzEwMjMwNjA0JnE9JHtyZXF9JmRheXM9NSZhcWk9bm8mYWxlcnRzPW5vYCk7XHJcbiAgICAgICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgcmV0dXJuIHdlYXRoZXJEYXRhO1xyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgcmVxdWVzdFdlYXRoZXIgZnJvbSBcIi4vcmVxdWVzdC5qc1wiO1xyXG5pbXBvcnQge2NyZWF0ZU1haW5JbmZvLCBjcmVhdGVIb3VybHlJbmZvfSBmcm9tIFwiLi9jcmVhdGVNYWluLmpzXCI7XHJcbmltcG9ydCB7IHBvcHVsYXRlU3RvcmFnZVR5cGUsIHBvcHVsYXRlU3RvcmFnZUNpdHksIHJldHJpdmVTdG9yYWdlVHlwZSwgcmV0cml2ZVN0b3JhZ2VDaXR5IH0gZnJvbSBcIi4vbG9jYWxTdG9yYWdlLmpzXCI7XHJcbmNvbnNvbGUubG9nKHJlcXVlc3RXZWF0aGVyKFwiV3JvY2xhd1wiKS50aGVuKChyZXMpID0+IHtjb25zb2xlLmxvZyhyZXMpfSkpO1xyXG4vLyB3aW5kb3cub25sb2FkID0gY3JlYXRlTWFpbkluZm8oXCJXcm9jbGF3XCIpO1xyXG4vLyB3aW5kb3cub25sb2FkID0gY3JlYXRlSG91cmx5SW5mbyhcIldyb2NsYXdcIik7XHJcbndpbmRvdy5vbmxvYWQgPSByZXRyaXZlU3RvcmFnZVR5cGUoKTtcclxud2luZG93Lm9ubG9hZCA9IHJldHJpdmVTdG9yYWdlQ2l0eSgpO1xyXG53aW5kb3cub25sb2FkID0gcG9wdWxhdGVTdG9yYWdlVHlwZSgpO1xyXG5sZXQgcmFkaW9zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cInZhbHVlLXJhZGlvXCJdJyk7XHJcbnJhZGlvcy5mb3JFYWNoKHJhZGlvID0+IHtcclxuICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xyXG4gICAgICAgIHBvcHVsYXRlU3RvcmFnZVR5cGUoKTtcclxuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgIH0pXHJcbn0pXHJcbmNvbnN0IHNlYXJjaEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoQnRuXCIpO1xyXG5cclxuc2VhcmNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBjb25zdCBzZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaEZpZWxkXCIpLnZhbHVlO1xyXG4gICAgaWYoc2VhcmNoICE9IFwiXCIpIHtcclxuICAgICAgICBwb3B1bGF0ZVN0b3JhZ2VDaXR5KHNlYXJjaCk7XHJcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICB9XHJcbn0pIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9