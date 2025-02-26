const citySearch = document.querySelector(".weather_search")
//* first reference section 
let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");
//* second reference section 
let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

//todo get country name function 
const getCountryCode = (code)=> new Intl.DisplayNames([code],{type:"region"}).of(code);
//todo get country current time
const getTime = (code)=>{
    const curDate = new Date(code*1000)
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    }
    const formatter = new Intl.DateTimeFormat("en-US",options).format(curDate)
    return formatter;
}
//todo search function
let city = "delhi"
citySearch.addEventListener("submit" ,(e)=>{
e.preventDefault();

let searchName = document.querySelector(".city_name");
console.log();

city = searchName.value;
getWeatherData();
searchName.value=""
;
})

const getWeatherData = async()=>{
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&&appid=a0148a2cec6cb0641af15cd703d3bc91`
    try {
        const res = await fetch(weatherURL);
        const data = await res.json();
// console.log(data);

        const {main,name,weather,wind,sys,dt}= data;
        cityName.innerHTML = `${name}, ${getCountryCode(sys.country)}`;
        dateTime.innerHTML = getTime(dt);
        w_forecast.innerHTML = weather[0].main;
        w_icon.innerHTML= `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`;
        w_temperature.innerHTML = `${main.temp}&#176`;
        w_minTem.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
        w_maxTem.innerHTML = `Max: ${main.temp_max}&#176`;
    w_feelsLike.innerHTML =`${ main.feels_like}&#176`
    w_humidity.innerHTML =`${ main.humidity}%`
    w_wind.innerHTML =`${ wind.speed} m/s`
    w_pressure.innerHTML =`${ main.pressure} hPA`
    } catch (error) {
        console.log(error);
        
    }
}
document.body.addEventListener("load", getWeatherData());