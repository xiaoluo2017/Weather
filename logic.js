var isCelsius = true;
var main;
var temp;

$(document).ready(function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    getCurrentWeather(position);
  });

  $("#change").on("click", function() {
    console.log("click");
    if (isCelsius) {
      celToFah();
    } else {
      fahToCel();
    }
  });
});

function getCurrentWeather(position) {
  var lat = position.coords.latitude, lon = position.coords.longitude;
  var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon;
  console.log(url);
  $.getJSON(url, function(json) {
    var city = json.name;
    main = json.weather[0].main;
    temp = Math.floor(json.main.temp);
    initBG(main);
    initTemp(temp);
    initCity(city);
  }); 
}

// Fahrenheit to Celsius
function fahToCel() {
  // console.log("Fahrenheit to Celsius");
  initTemp(temp);
  isCelsius = true;
  $("button").html('Fahrenheit<i class="fa fa-arrow-circle-right" aria-hidden="true"></i>')
}

// Celsius to Fahrenheit 
function celToFah() {
  // console.log("Celsius to Fahrenheit");
  var Fahrenheit = Math.floor(temp * 1.8 + 32);
  initTemp(Fahrenheit);
  isCelsius = false;
  $("button").html('Celsius<i class="fa fa-arrow-circle-right" aria-hidden="true"></i>');
}

function initBG(main) {
  // console.log(main);
  $("button").html('Fahrenheit<i class="fa fa-arrow-circle-right" aria-hidden="true"></i>')
  if (main === "Clear") {
    $("#weather").text("Sunny");
    $("body").css("background-image", 'url("https://static.pexels.com/photos/33044/sunflower-sun-summer-yellow.jpg")');
  } else if (main === "Rain") {
    $("#weather").text("Rainy");
    $("body").css("background-image", 'url("https://static.pexels.com/photos/1553/glass-rainy-car-rain.jpg")');
  } else if (main === "Clouds") {
    $("#weather").text("Cloudy");
    $("body").css("background-image", 'url("https://static.pexels.com/photos/314726/pexels-photo-314726.jpeg")');
  } else if (main === "Mist") {
    $("#weather").text("Misty");
    $("body").css("background-image", 'url("https://static.pexels.com/photos/325185/pexels-photo-325185.jpeg")');
  }
}

function initTemp(temp) {
  $("#temp").html('<span id="fill">&deg</span>' + temp + "<span>&deg</span>");
}

function initCity(city) {
  $("#city").text(city);
}
