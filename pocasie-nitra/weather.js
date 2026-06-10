if (
  localStorage.getItem("auth")
  !== "true"
) {

  window.location.href =
    "index.html";
}

const ctx =
  document.getElementById(
    "weatherChart"
  );

let chart = null;

async function loadWeather() {

  let data = {

    temperature: 24,
    humidity: 62,
    wind: 14,
    windGust: 24,
    windDirection: "SZ",
    rain: 18,
    pressure: 1014
  };

  try {

    const response =
      await fetch(
        "https://projekttb.sksnr.sk/data/"
      );

    const apiData =
      await response.json();

    data = {

      ...data,
      ...apiData
    };

  } catch(error) {

    console.log(
      "Demo mode"
    );
  }

  document.getElementById(
    "temp"
  ).innerText =
    data.temperature + "°";

  document.getElementById(
    "humidity"
  ).innerText =
    data.humidity + "%";

  document.getElementById(
    "wind"
  ).innerText =
    data.wind + " km/h";

  document.getElementById(
    "windGust"
  ).innerText =
    data.windGust + " km/h";

  document.getElementById(
    "windDirection"
  ).innerText =
    data.windDirection;

  document.getElementById(
    "rain"
  ).innerText =
    data.rain + "%";

  document.getElementById(
    "pressure"
  ).innerText =
    data.pressure + " hPa";

  document.getElementById(
    "updatedTime"
  ).innerText =
    new Date().toLocaleTimeString();

  const weekData = [

    {
      day: "Po",
      temp: 24,
      rain: 12
    },

    {
      day: "Ut",
      temp: 25,
      rain: 18
    },

    {
      day: "St",
      temp: 23,
      rain: 45
    },

    {
      day: "Št",
      temp: 22,
      rain: 61
    },

    {
      day: "Pi",
      temp: 27,
      rain: 15
    },

    {
      day: "So",
      temp: 29,
      rain: 8
    },

    {
      day: "Ne",
      temp: 26,
      rain: 20
    }
  ];

  renderForecast(
    weekData
  );

  renderChart(
    weekData
  );
}

function renderForecast(data) {

  const grid =
    document.getElementById(
      "forecastGrid"
    );

  grid.innerHTML = "";

  data.forEach((day) => {

    grid.innerHTML += `

      <div class="forecast-item">

        <div class="forecast-day">
          ${day.day}
        </div>

        <div class="forecast-temp">
          ${day.temp}°
        </div>

        <div class="forecast-rain">
          ${day.rain}% dážď
        </div>

      </div>

    `;
  });
}

function renderChart(data) {

  const labels =
    data.map(
      item => item.day
    );

  const temps =
    data.map(
      item => item.temp
    );

  if(chart) {

    chart.destroy();
  }

  chart =
    new Chart(ctx, {

      type: "line",

      data: {

        labels: labels,

        datasets: [

          {

            label:
              "Teplota °C",

            data: temps,

            borderWidth: 3,

            tension: 0.4,

            fill: true
          }
        ]
      },

      options: {

        responsive: true,

        maintainAspectRatio: false
      }
    });
}

loadWeather();

setInterval(
  loadWeather,
  300000
);
