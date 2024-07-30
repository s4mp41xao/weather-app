document.getElementById('getWeatherBtn').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value;
    const response = await fetch(`/weather?city=${city}`);
    const data = await response.json();

    const weatherResult = document.getElementById('weatherResult');
    if (data.error) {
        weatherResult.innerHTML = `<p>Error: ${data.error}</p>`;
    } else {
        weatherResult.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperatura: ${data.main.temp}°C</p>
        <p>Condição do Tempo: ${data.weather[0].description}</p>
        `;
    }
})