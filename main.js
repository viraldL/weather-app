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
/* harmony export */   "populateStorage": () => (/* binding */ populateStorage),
/* harmony export */   "retriveStorage": () => (/* binding */ retriveStorage)
/* harmony export */ });
function populateStorage(city = "Wroclaw") {
            localStorage.setItem(`tempType`, document.querySelector('input[name="value-radio"]:checked').value);
            localStorage.setItem(`city`, city);
}

function retriveStorage() {
    if(localStorage.getItem("tempType") == 0) {
        document.querySelectorAll('input[name="value-radio"]')[0].checked = true;
    } else {
        document.querySelectorAll('input[name="value-radio"]')[1].checked = true;
    }
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
window.onload = (0,_createMain_js__WEBPACK_IMPORTED_MODULE_1__.createMainInfo)("Wroclaw");
window.onload = (0,_createMain_js__WEBPACK_IMPORTED_MODULE_1__.createHourlyInfo)("Wroclaw");
window.onload = (0,_localStorage_js__WEBPACK_IMPORTED_MODULE_2__.retriveStorage)();
let radios = document.querySelectorAll('input[name="value-radio"]');
radios.forEach(radio => {
    radio.addEventListener("change", () => {
        (0,_localStorage_js__WEBPACK_IMPORTED_MODULE_2__.populateStorage)();
        location.reload();
    })
})
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxpQkFBaUI7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSx1REFBYztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsY0FBYyxJQUFJLFFBQVE7QUFDeEQ7QUFDQSx1REFBdUQsbUJBQW1CLFFBQVEsbUJBQW1CO0FBQ3JHLDhCQUE4QixrQkFBa0IsSUFBSSxxQkFBcUI7QUFDekU7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksdURBQWM7QUFDbEIsdUJBQXVCLDhDQUE4QztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsRUFBRTtBQUM1QztBQUNBO0FBQ0EsK0NBQStDLEVBQUU7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsRUFBRTtBQUMvQztBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsRUFBRTtBQUNqRCwyREFBMkQsdURBQXVELFFBQVEsdURBQXVEO0FBQ2pMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNaZTtBQUNmO0FBQ0EseUhBQXlILElBQUk7QUFDN0g7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7Ozs7OztVQ1JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ04wQztBQUN1QjtBQUNHO0FBQ3BFLFlBQVksdURBQWMsMkJBQTJCLGlCQUFpQjtBQUN0RSxnQkFBZ0IsOERBQWM7QUFDOUIsZ0JBQWdCLGdFQUFnQjtBQUNoQyxnQkFBZ0IsZ0VBQWM7QUFDOUI7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBZTtBQUN2QjtBQUNBLEtBQUs7QUFDTCxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jcmVhdGVNYWluLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2xvY2FsU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9yZXF1ZXN0LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlcXVlc3RXZWF0aGVyIGZyb20gXCIuL3JlcXVlc3QuanNcIjtcclxuXHJcbmZ1bmN0aW9uIGN1cnJlbnRUZW1wVHlwZSgpIHtcclxuICAgIGNvbnN0IHRlbXBUeXBlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cInZhbHVlLXJhZGlvXCJdOmNoZWNrZWQnKS52YWx1ZTtcclxuICAgIHJldHVybiB0ZW1wVHlwZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGF5TmFtZShkYXRlU3RyLCBsb2NhbGUpXHJcbntcclxuICAgIHZhciBkYXRlID0gbmV3IERhdGUoZGF0ZVN0cik7XHJcbiAgICByZXR1cm4gZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7IHdlZWtkYXk6ICdsb25nJyB9KTsgICAgICAgIFxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVNYWluSW5mbyhyZXEpIHtcclxuICAgIGNvbnN0IG1haW5JbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ltZ01haW5cIik7XHJcbiAgICBjb25zdCBjb25kaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmRpdGlvblwiKTtcclxuICAgIGNvbnN0IGRheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGF5XCIpO1xyXG4gICAgY29uc3QgdGltZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGltZVwiKTtcclxuICAgIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RlbXBcIik7XHJcbiAgICBjb25zdCBjaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaXR5XCIpO1xyXG4gICAgcmVxdWVzdFdlYXRoZXIocmVxKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBtYWluSW1nLnNyYyA9IHJlcy5jdXJyZW50LmNvbmRpdGlvbi5pY29uO1xyXG4gICAgICAgIGNvbmRpdGlvbi50ZXh0Q29udGVudCA9IHJlcy5jdXJyZW50LmNvbmRpdGlvbi50ZXh0O1xyXG4gICAgICAgIGxldCBmdWxsRGF0ZSA9IHJlcy5sb2NhdGlvbi5sb2NhbHRpbWU7XHJcbiAgICAgICAgbGV0IG9ubHlEYXkgPSBmdWxsRGF0ZS5zbGljZSgwLDkpO1xyXG4gICAgICAgIGxldCBvbmx5VGltZSA9IGZ1bGxEYXRlLnNsaWNlKDEwKTtcclxuICAgICAgICBsZXQgY29udmVydGVkRGF0ZSA9IGdldERheU5hbWUob25seURheSwgXCJlbi1VU1wiKVxyXG4gICAgICAgIGRheS50ZXh0Q29udGVudCA9ICBgJHtjb252ZXJ0ZWREYXRlfSwgJHtvbmx5RGF5fWA7XHJcbiAgICAgICAgdGltZS50ZXh0Q29udGVudCA9IG9ubHlUaW1lO1xyXG4gICAgICAgIHRlbXAudGV4dENvbnRlbnQgPSBjdXJyZW50VGVtcFR5cGUoKSA9PSAwID8gYCR7cmVzLmN1cnJlbnQudGVtcF9jfcKwYCA6IGAke3Jlcy5jdXJyZW50LnRlbXBfZn3CsGA7XHJcbiAgICAgICAgY2l0eS50ZXh0Q29udGVudCA9IGAke3Jlcy5sb2NhdGlvbi5uYW1lfSwgJHtyZXMubG9jYXRpb24uY291bnRyeX1gXHJcblxyXG5cclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUhvdXJseUluZm8ocmVxKSB7XHJcbiAgICBjb25zdCBob3VyQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNob3Vyc1RlbXBcIik7XHJcbiAgICByZXF1ZXN0V2VhdGhlcihyZXEpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPD0gcmVzLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBjb25zdCB0aW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuXHJcbiAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKFwiaG91clwiKTtcclxuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIGBob3VyJHtpfWApO1xyXG5cclxuICAgICAgICAgICAgdGltZS5jbGFzc0xpc3QuYWRkKFwiaG91clRpbWVcIik7XHJcbiAgICAgICAgICAgIHRpbWUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYGhvdXJUaW1lJHtpfWApO1xyXG4gICAgICAgICAgICBsZXQgb25seVRpbWUgPSByZXMuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cltpXS50aW1lO1xyXG4gICAgICAgICAgICB0aW1lLnRleHRDb250ZW50ID0gb25seVRpbWUuc2xpY2UoMTApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaW1nLmNsYXNzTGlzdC5hZGQoXCJpbWdIb3VyXCIpO1xyXG4gICAgICAgICAgICBpbWcuc2V0QXR0cmlidXRlKFwiaWRcIiwgYGltZ0hvdXIke2l9YCk7XHJcbiAgICAgICAgICAgIGltZy5zcmMgPSByZXMuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cltpXS5jb25kaXRpb24uaWNvbjtcclxuXHJcbiAgICAgICAgICAgIHRlbXAuY2xhc3NMaXN0LmFkZChcInRlbXBIb3VyXCIpO1xyXG4gICAgICAgICAgICB0ZW1wLnNldEF0dHJpYnV0ZShcImlkXCIsIGB0ZW1wSG91ciR7aX1gKTtcclxuICAgICAgICAgICAgdGVtcC50ZXh0Q29udGVudCA9IGN1cnJlbnRUZW1wVHlwZSgpID09IDAgPyBgJHtNYXRoLnJvdW5kKHJlcy5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyW2ldLnRlbXBfYyl9wrBgIDogYCR7TWF0aC5yb3VuZChyZXMuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cltpXS50ZW1wX2YpfcKwYDtcclxuXHJcblxyXG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQodGltZSk7XHJcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChpbWcpO1xyXG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQodGVtcCk7XHJcblxyXG4gICAgICAgICAgICBob3VyQm94LmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IHtjcmVhdGVNYWluSW5mbywgY3JlYXRlSG91cmx5SW5mb307IiwiZnVuY3Rpb24gcG9wdWxhdGVTdG9yYWdlKGNpdHkgPSBcIldyb2NsYXdcIikge1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgdGVtcFR5cGVgLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwidmFsdWUtcmFkaW9cIl06Y2hlY2tlZCcpLnZhbHVlKTtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYGNpdHlgLCBjaXR5KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmV0cml2ZVN0b3JhZ2UoKSB7XHJcbiAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRlbXBUeXBlXCIpID09IDApIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwidmFsdWUtcmFkaW9cIl0nKVswXS5jaGVja2VkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cInZhbHVlLXJhZGlvXCJdJylbMV0uY2hlY2tlZCA9IHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IHBvcHVsYXRlU3RvcmFnZSwgcmV0cml2ZVN0b3JhZ2UgfTsiLCJleHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiByZXF1ZXN0V2VhdGhlcihyZXEpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cDovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT04Zjc2Njg4MzlkNTI0NDRhOGRmMTgzMzEwMjMwNjA0JnE9JHtyZXF9JmRheXM9NSZhcWk9bm8mYWxlcnRzPW5vYCk7XHJcbiAgICAgICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgcmV0dXJuIHdlYXRoZXJEYXRhO1xyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgcmVxdWVzdFdlYXRoZXIgZnJvbSBcIi4vcmVxdWVzdC5qc1wiO1xyXG5pbXBvcnQge2NyZWF0ZU1haW5JbmZvLCBjcmVhdGVIb3VybHlJbmZvfSBmcm9tIFwiLi9jcmVhdGVNYWluLmpzXCI7XHJcbmltcG9ydCB7IHBvcHVsYXRlU3RvcmFnZSwgcmV0cml2ZVN0b3JhZ2UgfSBmcm9tIFwiLi9sb2NhbFN0b3JhZ2UuanNcIjtcclxuY29uc29sZS5sb2cocmVxdWVzdFdlYXRoZXIoXCJXcm9jbGF3XCIpLnRoZW4oKHJlcykgPT4ge2NvbnNvbGUubG9nKHJlcyl9KSk7XHJcbndpbmRvdy5vbmxvYWQgPSBjcmVhdGVNYWluSW5mbyhcIldyb2NsYXdcIik7XHJcbndpbmRvdy5vbmxvYWQgPSBjcmVhdGVIb3VybHlJbmZvKFwiV3JvY2xhd1wiKTtcclxud2luZG93Lm9ubG9hZCA9IHJldHJpdmVTdG9yYWdlKCk7XHJcbmxldCByYWRpb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwidmFsdWUtcmFkaW9cIl0nKTtcclxucmFkaW9zLmZvckVhY2gocmFkaW8gPT4ge1xyXG4gICAgcmFkaW8uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgcG9wdWxhdGVTdG9yYWdlKCk7XHJcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICB9KVxyXG59KSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==