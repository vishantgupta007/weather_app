
const container = document.querySelector('.container');
const searchBtn = document.querySelector(".search-container button")
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const loadingSpinner = document.querySelector(".loading-spinner");

onLoad()

// event handler on click button
function onLoad() {
   searchBtn.addEventListener("click", getCity);
}


// invoking the getcity function

function getCity() {
   const city = document.querySelector(".search-container input").value;

   // if input is empty alert otherwise fetchData function will work

   if (city === "") {
      return alert('Please enter city name')
   }
   else {
      fetchData(city);
   }


}

const fetchData = async (city) => {

   let API_KEY = "0701b0c40c59b184db8350c900e6c2f7"
   let URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`

   // try catch block for fetching data
   try {
      // showing loader for late response
      showLoading(true);

      const response = await fetch(URL);
      const data = await response.json();

      if (data === "") {
         showError(data)
      }

      else {
         error404.style.dislpay = "none";
         error404.classList.remove("fade-in");
         weatherReport(data) // if city is entered then show weather report and invoke 
      }
   } catch (error) {
      console.error('Bad Connection')
   } finally {
      showLoading(false);
   }

}

//invoking showloading function

function showLoading(isLoading) {
   if (isLoading) {
      // Showing loading indicator
      loadingSpinner.style.display = "block";
   } else {
      // Hiding loading indicator
      loadingSpinner.style.display = "none";

   }
}

// show error if there is api is entered wrong

function showError(data) {
   if (data.cod === 404) {
      container.style.display = "400px";
      weatherBox.style.display = "none";
      weatherDetails.style.display = "none";
      error404.style.dislpay = "block";
      error404.classList.add("fade-in");
   }
}

// invoking this function 

function weatherReport(data) {

   const image = document.querySelector(".weather-box img");

   // switch case for displaying image for different weather

   switch (data.list[0].weather[0].main) {
      case "Clear":
         image.src = "images/clear.png";
         break;
      case "Haze":
         image.src = "images/mist.png";
         break;

      case "Cloud":
         image.src = "images/cloud.png";
         break;

      case "Rain":
         image.src = "images/rain.png";
         break;

      case "Snow":
         image.src = "images/snow.png";
         break;

      default:
         return image.src = ""
   }

   // invoking this working right after image which shows description, humidity and wind-speed  and temperature with innerHTML

   displayWeatherCondition(data)

}

function displayWeatherCondition(data) {
   const temperature = document.querySelector(".weather-box .temperature");
   const description = document.querySelector(".weather-box .description");
   const humidity = document.querySelector(".weather-details .humidity span");
   const wind = document.querySelector(".weather-details .wind span");

   temperature.innerHTML = `${parseInt(data.list[0].main.temp - 273.15).toFixed(2)} <span>°C</span>`;
   description.innerHTML = `${data.list[0].weather[0].description}`;
   humidity.innerHTML = `${data.list[0].main.humidity}%`;
   wind.innerHTML = `${parseInt(data.list[0].wind.speed)} km/hr`;


   weatherBox.style.display = "";
   weatherDetails.style.display = "";
   weatherBox.classList.add("fade-in");
   weatherDetails.classList.add("fade-in");
   container.style.height = "590px";
}
