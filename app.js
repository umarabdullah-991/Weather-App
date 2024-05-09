//private key
var apikey = "758ea5a75e8983d8ae28440c59ebd530";
var api;

const wrapper = document.querySelector(".wrapper"),
  inputPart = wrapper.querySelector(".input-part"),
  infoTxt = inputPart.querySelector(".info-txt"),
  inputField = inputPart.querySelector("input"),
  locationBtn = inputPart.querySelector("button"),
  weatherIcon = document.querySelector(".weather-part img"),
  arrowBack = wrapper.querySelector("header i");

inputField.addEventListener("keyup", (e) => {
  //if user pressed enter button and input value is not empty
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    //if browser support geolocation api
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser not support geolocation api");
  }
});
function onSuccess(position) {
  // getting latitude and longitude of the user device from coords obj
  const { latitude, longitude } = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  fetchData();
}
function onError(error) {
  infoTxt.innerTxt = error.message;
  infoTxt.classList.add("error");
}

function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetchData();
}
function fetchData() {
  infoTxt.innerTxt = "Getting weather details...";
  infoTxt.classList.add("pending");
  //getting api response returning it with parsing into js obj and in another
  //then function calling weatherDetails function with passing api result as an argument.
  fetch(api)
    .then((response) => response.json())
    .then((result) => weatherDetails(result));
}
function weatherDetails(info) {
  if (info.cod == "404") {
    infoTxt.innerTxt = `${inputField.value} invalid city name`;
    infoTxt.classList.replace("pending", "error");
  } else {
    //lets get properties value from the info object
    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0];
    const { feels_like, humidity, temp } = info.main;
    if (id == 800) {
      weatherIcon.src = "images/clear.svg";
    } else if (id >= 200 && id <= 232) {
      weatherIcon.src = "images/strome.svg";
    } else if (id >= 600 && id <= 622) {
      weatherIcon.src = "images/snow-2.svg";
    } else if (id >= 701 && id <= 781) {
      weatherIcon.src = "images/haze.svg";
    } else if (id >= 801 && id <= 804) {
      weatherIcon.src = "images/cloud.svg";
    } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
      weatherIcon.src = "images/rain.svg";
    }

    //let's pass these values to a particular html element
    wrapper.querySelector(".temp .numb").innerTxt = Math.floor(temp);
    wrapper.querySelector(".weather").innerTxt = description;
    wrapper.querySelector(".location span").innerTxt = "${city}, ${country}";
    wrapper.querySelector(".temp .numb-2").innerTxt = feels_like;
    wrapper.querySelector(".humidity span").innerTxt = "${humidity}%";
    infoTxt.classList.remove("pending", "error");
    wrapper.classList.add("active");
    console.log(info);
  }
}
arrowBack.addEventListener("click", () => {
  wrapper.classList.remove("active");
  inputField.innerText = " ";
});
