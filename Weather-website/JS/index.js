
var apiResponse, responseData

var city = document.querySelector(".city"),
fullDate = document.querySelector(".date"),
search = document.querySelector("input"),
icon = document.querySelector(".icon-currunt .icon"),
degree = document.querySelector(".degree-currunt"),
condition = document.querySelector(".condition"),
minDegree = document.querySelector(".low-degree .number"),
maxDegree = document.querySelector(".high-degree .number"),
wind = document.querySelector(".wind .number"),
sunrise = document.querySelector(".sunrise .number"),
rain = document.querySelector(".rain .number"),
sunset = document.querySelector(".sunset .number"),
hourDayContainer = document.querySelector(".swiper-wrapper"),
dayContainer = document.querySelector(".days"),
monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'],
days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


function timeConvert(fulldate) {
    var time = fulldate.split(' ');
    var hour = time[1].split(':');
    hour = Number(hour[0]);
    if(hour==0) hour="12am";
    else if (hour==12) hour="12pm";
    else if (hour<12) hour=hour+"am";
    else hour=(hour-12)+"pm";
    
    // console.log(hour);
    return hour;
}


function hourDayData(hour=0, image=0, degree=0){
    var cartoona = `
        <div class="swiper-slide d-flex flex-column align-items-center justify-content-center">
            <div class="day-hour py-2 px-3 text-center rounded w-100">
                <p class="hour fs-5">${hour}</p>
                <img src="https:${image}" alt="" class="w-100">
                <p class="hour-degree fs-5">${degree}</p>
            </div>
        </div>
    `
    return cartoona;
}

function dayData(day, date, image, minDegree, maxDegree, wind, rain){
    var cartoona = `
    <div class="col-lg-12 col-md-4 col-sm-6 col-12 box-sizing-border px-2 py-2">
        <div class="day py-3 px-1 rounded text-center">
            <div class="row">
                <div class="col-lg-2 date">
                    <bold class="">${day}</bold>
                    <p class="">${date}</p>
                </div>
                <div class="col-lg-2 icon">
                    <img src="https:${image}" alt="" class="w-25">
                </div>
                <div class="col-lg-6">
                    <div class="row">
                        <div class="col-4 min-degree">
                            <bold class="">${minDegree}</bold>
                            <p class="">Low</p>
                        </div>
                        <div class="col-4 max-degree">
                            <bold class="">${maxDegree}</bold>
                            <p class="">High</p>
                        </div>
                        <div class="col-4 rain">
                            <bold class="">${rain}</bold>
                            <p class="">Rain</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 wind d-none d-lg-block">
                    <bold class="">${wind}</bold>
                    <p class="">Wind</p>
                </div>
            </div>
        </div>
    </div>
    `
    return cartoona;
}


getWeatherData();
async function getWeatherData(currentCity='cairo'){
    apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8d77858195364bdab70104817222810&q=${currentCity}&days=11`)
    responseData= await apiResponse.json()
    console.log(responseData);

    displayTodayWeather();
}


function displayTodayWeather(){
    city.innerHTML = responseData.location.name+", "+responseData.location.country;
    let date =new Date();
    console.log(date);
    fullDate.innerHTML = days[date.getDay()]+" "+date.getDate()+" "+monthName[date.getMonth()];
    icon.setAttribute("src", `https:${responseData.current.condition.icon}`)
    degree.innerHTML = Math.round(responseData.current.temp_c) + "&deg";
    condition.innerHTML = responseData.current.condition.text;
    minDegree.innerHTML = Math.round(responseData.forecast.forecastday[0].day.mintemp_c) + "&deg";
    maxDegree.innerHTML = Math.round(responseData.forecast.forecastday[0].day.maxtemp_c) + "&deg";
    wind.innerHTML = responseData.current.wind_mph+"mph";
    rain.innerHTML = responseData.forecast.forecastday[0].day.daily_chance_of_rain+"%";
    sunrise.innerHTML = responseData.forecast.forecastday[0].astro.sunrise;
    sunset.innerHTML = responseData.forecast.forecastday[0].astro.sunset;

    displayTodayHourWeather();
    displayDaysWeather();
}

function displayTodayHourWeather(){
    let time, icon, degree;
    var cartoona="";
    for (var i=0;i<24;i++){
        time = timeConvert(responseData.forecast.forecastday[0].hour[i].time)
        icon = responseData.forecast.forecastday[0].hour[i].condition.icon;
        degree = Math.round(responseData.forecast.forecastday[0].hour[i].temp_c) + "&deg";
        cartoona += hourDayData(time, icon, degree);
    }
    hourDayContainer.innerHTML = cartoona;
}


function displayDaysWeather(){
    let day, date, image, minDegree, maxDegree, wind, rain, fulldate;
    var dayDataRes = responseData.forecast;
    var cartoona="";
    for (var i=1;i<11;i++){
        fulldate = dayDataRes.forecastday[i].date;
        let d = new Date(fulldate);
        day = d.getDay();
        day = days[day];
        date = fulldate.split('-');
        date = date[2]+"/"+date[1];
        image = dayDataRes.forecastday[i].day.condition.icon;
        minDegree = Math.round(dayDataRes.forecastday[i].day.mintemp_c) + "&deg";
        maxDegree = Math.round(dayDataRes.forecastday[i].day.maxtemp_c) + "&deg";
        wind = dayDataRes.forecastday[i].day.maxwind_mph + "mph";
        rain = dayDataRes.forecastday[i].day.daily_chance_of_rain + "%";
        
        cartoona += dayData(day, date, image, minDegree, maxDegree, wind, rain);
    }
    dayContainer.innerHTML = cartoona;
}


search.addEventListener("keyup",function(){
    currentCity= search.value;
    getWeatherData(currentCity);
    // console.log(currentCity);
});