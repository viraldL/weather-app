import requestWeather from "./request.js";

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
    requestWeather(req).then((res) => {
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
    requestWeather(req).then((res) => {
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
    requestWeather(req).then((res) => {
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

export {createMainInfo, createHourlyInfo, createForecast};