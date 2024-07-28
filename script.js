const apiKey = "4742d51f6a98ed8f474c288fbf457286";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
function convertUnixTime(unixTime) {
  const date = new Date(unixTime * 1000);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert 24-hour format to 12-hour format
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes} ${ampm},
  ${dayName}, ${day} ${monthName} ${year} `;
}
async function checkWeather(city) {
  document.querySelector(".error").style.display = "none";
  document.querySelector(".weather").style.display = "none";

  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.ok) {
    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;

    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".feels-like").innerHTML =
      Math.round(data.main.feels_like) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".pressure").innerHTML =
      Math.round(data.main.pressure * 0.75006157584566) + "mm";
    document.querySelector(".wind").innerHTML =
      Math.round(data.wind.speed * 3.6) + "km/hr";

    const sunriseTime = convertUnixTime(data.sys.sunrise);
    const sunsetTime = convertUnixTime(data.sys.sunset);
    document.querySelector(".sunrise").innerHTML = sunriseTime;
    document.querySelector(".sunset").innerHTML = sunsetTime;

    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "./clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "./clear.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "./rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "./drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "./mist.png";
    } else {
      weatherIcon.src = "";
    }

    document.querySelector(".weather").style.display = "block";
  } else {
    document.querySelector(".error").style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// usinf switch-case and try&catch error
/*const apiKey = "4742d51f6a98ed8f474c288fbf457286";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
 
  document.querySelector(".error").style.display = "none";
  document.querySelector(".weather").style.display = "none";

  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (!response.ok) {
     
      document.querySelector(".error").style.display = "block";
      return; 
    }

    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";


    switch (data.weather[0].main) {
      case "Clouds":
        weatherIcon.src = "/clouds.png";
        break;
      case "Clear":
        weatherIcon.src = "/clear.png";
        break;
      case "Rain":
        weatherIcon.src = "/rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "/drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "/mist.png";
        break;
      default:
        weatherIcon.src = "";
        break;
    }
    document.querySelector(".weather").style.display = "block";
  } catch (error) {
    document.querySelector(".error").style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});*/
