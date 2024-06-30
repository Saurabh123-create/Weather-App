    let text = document.getElementById("search");
    let button = document.querySelector("button");
    let city_result = document.querySelector(".city");
    let wind = document.querySelector(".wind");
    let humidity = document.querySelector(".humidity");
    let weatherImg = document.querySelector(".imgBox img");
    let result_box = document.querySelector(".result_box");
    let error_box = document.querySelector(".error_box");
    let temperature_result = document.querySelector(".temperature");
    button.addEventListener("click", (e) => {
      apiCall(text.value);
    });

    async function apiCall(city = "") {
      if (city == "") {
        alert("please enter a city name");
        return;
      }
      let key = "f0bb0d46b0efddf1cf739cb16336c0a8";
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;
      let data = await fetch(url + `&appid=${key}&units=metric`);
      let result = await data.json();
      if (result.cod == 200) {
        error_box.style.display = "none";
        city_result.innerHTML = result.name;
        temperature_result.innerHTML = `${Math.round(result.main.temp)} °C`;
        humidity.innerHTML = `${result.main.humidity} %`;
        wind.innerHTML = `${result.wind.speed} km\h`;

        if (result.weather[0].main == "Clouds") {
          weatherImg.src = "./images/clouds.png";
        } else if (result.weather[0].main == "Rain") {
          weatherImg.src = "./images/rain.png";
        } else if (result.weather[0].main == "Drizzle") {
          weatherImg.src = "./images/drizzle.png";
        } else if (result.weather[0].main == "Snow") {
          weatherImg.src = "./images/snow.png";
        } else if (result.weather[0].main == "Mist") {
          weatherImg.src = "./images/mist.png";
        }
        result_box.style.display = 'block';
      }
      if(result.cod == "404"){
        result_box.style.display = 'none';
        error_box.style.display = "block";
        error_box.innerHTML = "City not found.";
      }
      console.log(result, "resuslt");
    }