// Your code here
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#weather-app form");
  const input = document.querySelector("#weather-search");
  const weatherSection = document.querySelector("#weather");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userQuery = input.value.trim();
    input.value = ""; // clear the input field
    weatherSection.innerHTML = ""; // clear previous weather results

    if (!userQuery) return;

    const apiKey = "9bffa1724249c6bb0a35f38003f5f95b";
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather";
    var queryString = "?units=imperial&appid=" + apiKey + "&q=" + userQuery;
    var fetchURL = weatherURL + queryString;


    try {
      const response = await fetch(fetchURL);
      if (!response.ok) throw new Error("Location not found");

      const data = await response.json();

      const {
        name: city,
        sys: { country },
        coord: { lat, lon },
        weather: [condition],
        main: { temp, feels_like },
        dt,
      } = data;

      const timeString = new Date(dt * 1000).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });

      var mapLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
      var iconUrl = `https://openweathermap.org/img/wn/${condition.icon}@2x.png`;

        weatherSection.innerHTML = `
        <h2 id="example-loc">${city}, ${country}</h2>
        <a id="example-link" href="${mapLink}" target="__BLANK">Click to view map</a>
        <img id="example-icon" src="${iconUrl}" alt="${condition.description}">
        <p id="example-desc" style="text-transform: capitalize;">${condition.description}</p><br>
        <p id="example-actual-temp">Current: ${temp.toFixed(2)}° F</p>
        <p id="example-feels-temp">Feels like: ${feels_like.toFixed(2)}° F</p><br>
        <p id="example-time">Last updated: ${timeString}</p>
        `;

    } catch (error) {
      weatherSection.innerHTML = `Location not found`;
    }
  });
});