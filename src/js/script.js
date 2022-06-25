let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};
// РОЗКОМЕНТУІВАТИ
// let cityName = prompt("Enter your city!");
// cityName = cityName.toLowerCase().trim();
// if (weather[cityName] !== undefined) {
//   let temperature = weather[cityName].temp;
//   let temperatureCels = Math.round(temperature);
//   let temperatureFaren = Math.round((temperature * 9) / 5 + 32);
//   let humidity = weather[cityName].humidity;
//   alert(
//     `It is currently ${temperatureCels} ℃ (${temperatureFaren}℉) in ${cityName} with humidity of ${humidity}%`
//   );
// } else {
//   alert(
//     `"Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${cityName}"`
//   );
// }
/////////////////////////////////////////////////
//dont need
// function iction(temp, humidity) {
//   this.temp = temp;
//   this.humidity = humidity;
// }
// iction();

//date and time
let currentTime = document.querySelector("#current-time");
let currentDay = document.querySelector("#current-date");

let currentDate = new Date();
let currentTimes = new Date().toLocaleTimeString();
let weekDays = [
  "Sunday",
  "Monday",
  "Tyesday",
  "Wednesday",
  "Thursday",
  "Freiday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "August",
  "September",
  "October",
  "november",
  "December",
];
console.log(currentDate);
console.log(currentTimes);

function formatDate(date) {
  let nowDay = weekDays[date.getDay()];
  let nowDate = date.getDate();
  let nowMonth = months[date.getMonth()];
  let nowYear = date.getFullYear();

  currentDay.innerHTML = ` ${nowYear}/ ${nowMonth}, ${nowDate}`;

  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0 ${minutes}`;
  }

  currentTime.innerHTML = `${nowDay} ${hours}:${minutes}`;
}
console.log(formatDate(currentDate));

//schow city temperature
let temperature = document.querySelector("#temperature");
let temperatureCelsium = document.querySelector("#celsius-link");
let temperatureFarenheit = document.querySelector("#farenheit-link");
let humidity = document.querySelector("#current__humidity");
let speadWind = document.querySelector("#current__wind");
let description = document.querySelector(".main__subtitle");

function showTemperature(responsive) {
  console.log(responsive.data);
  let currentTemp = Math.round(responsive.data.main.temp);
  let currentHumidity = Math.round(responsive.data.main.humidity);
  let currentWind = responsive.data.wind.speed;
  ///111,112,113 for button current position
  let city = responsive.data.name;
  let cityName = document.querySelector(".sity");
  cityName.innerHTML = `${city}`;
  temperature.innerHTML = `${currentTemp}`;
  humidity.innerHTML = `${currentHumidity}%`;
  speadWind.innerHTML = ` ${currentWind}`;
  description.innerHTML = responsive.data.weather[0].description;
}

//change city name button
let formSearch = document.querySelector("#search-city");

function schowCity(event) {
  event.preventDefault();
  let cityName = document.querySelector(".sity");
  console.log(cityName);
  let inputCity = document.querySelector("#input-city");

  if (inputCity.value) {
    cityName.innerHTML = `${inputCity.value}`;
  } else {
    cityName.innerHTML = null;
    alert("Please type your city");
  }

  let apiKey = "f48cb8e5ea750137e496c7dd7e72c4af";
  let unit = "metric";
  // let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&units=${unit}&appid=${apiKey}&`;

  axios.get(`${apiUrl}appid=${apiKey}`).then(showTemperature);
}

formSearch.addEventListener("submit", schowCity);

//current position showtemperature button

function schowPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let unit = "metric";
  let apiKey = "f48cb8e5ea750137e496c7dd7e72c4af";
  let coordinates = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${unit}&appid=${apiKey}`;
  axios.get(coordinates).then(showTemperature);
}

//button current position
function schowCurrentposition() {
  navigator.geolocation.getCurrentPosition(schowPosition);
}
let btnPosition = document.querySelector("#current-position");
btnPosition.addEventListener("click", schowCurrentposition);

//change unit temperature

function showCelsius(event) {
  // let temperatureCels = Math.round(temperature);
  event.preventDefault();
  temperature.innerHTML = 19;
}

temperatureCelsium.addEventListener("click", showCelsius);

function showFarenheit(event) {
  event.preventDefault();
  temperature.innerHTML = 60;
  // let temperatureFaren = Math.round((temperature * 9) / 5 + 32);
  // temperature.innerHTML = temperatureFaren;
}

temperatureFarenheit.addEventListener("click", showFarenheit);
