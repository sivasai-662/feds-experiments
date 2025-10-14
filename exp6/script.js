const btn = document.getElementById("getWeather");
const cityInput = document.getElementById("city");
const output = document.getElementById("output");
const error = document.getElementById("error");

// Fetch weather data using Open-Meteo API (no API key needed)
const getWeather = async (city) => {
  try {
    error.textContent = "Loading...";
    output.style.display = "none";

    // Get city coordinates
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("City not found. Please try again!");
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // Fetch weather data for that location
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherRes.json();

    const temp = weatherData.current_weather.temperature;
    const wind = weatherData.current_weather.windspeed;

    output.innerHTML = `
      <p class="temp">🌍 ${name}, ${country}</p>
      <p class="desc">🌡️ Temperature: ${temp}°C</p>
      <p class="desc">💨 Wind Speed: ${wind} km/h</p>
    `;
    output.style.display = "block";
    error.textContent = "";
  } catch (err) {
    error.textContent = err.message;
  }
};

// Button click event
btn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    error.textContent = "Please enter a city name.";
  } else {
    getWeather(city);
  }
});
