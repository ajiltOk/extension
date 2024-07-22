chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "addButtons") {
    document.querySelectorAll(".promocard").forEach((div) => {
      const img = document.createElement("img");
      img.classList.add("info_button");
      img.src = "../icons/info-32.png";
      img.alt = "info";
      div.appendChild(img);
    });
  } else if (message.action === "removeButtons") {
    document.querySelectorAll(".info_button").forEach((button) => {
      button.remove();
    });
    document.querySelectorAll(".info").forEach((div) => {
      div.remove();
    });
  }
});

document.addEventListener("click", (event) => {
  const popup = document.createElement("div");
  if (event.target.classList.value === "info_button") {
    event.target.classList.add("active");
    let block = event.target.closest("div");
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=ru&appid=0a6b6c01a23d55c811d339e38770ea11&units=metric"
    )
      .then((response) => response.json())
      .then((data) => {
        const temperature = document.createElement("span");
        const weatherDescription = document.createElement("span");
        const wind = document.createElement("span");
        const humidity = document.createElement("span");
        temperature.textContent = `- температура воздуха: ${Math.round(
          data.main.temp
        )}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `- скорость ветра: ${Math.round(
          data.wind.speed
        )} м/с`;
        humidity.textContent = `- влажность: ${Math.round(
          data.main.humidity
        )} %`;
        const city = document.createElement("span");
        city.textContent = "Погода в Минске:";
        popup.classList.add("info");
        popup.appendChild(city);
        popup.appendChild(weatherDescription);
        popup.appendChild(temperature);
        popup.appendChild(wind);
        popup.appendChild(humidity);
        block.appendChild(popup);
      })
      .catch((error) => console.error("Произошла ошибка:", error));
  } else if (event.target.classList.value === "info_button active") {
    event.target.classList.remove("active");
    let block = event.target.closest("div");
    block.lastChild.remove();
  }
});
