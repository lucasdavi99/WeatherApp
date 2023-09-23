// Substitua 'YOUR_API_KEY' pela sua chave de API do OpenWeather
const apiKey = '9ff8d06cca7a6940798faad184e1d9c9';

// Função para buscar os dados da previsão do tempo com base na cidade e país
function getWeather(city, country) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Processar os dados da API aqui
      console.log(data);

      // Exemplo de como atualizar elementos HTML com os dados da API
      const temperature = data.main.temp; // Temperatura em Kelvin
      const weatherDescription = data.weather[0].description;

      // Atualizar elementos HTML com os dados da API
      const mainWeatherTemp = document.querySelector('.weather-temp');
      const mainWeatherDesc = document.querySelector('.weather-desc');

      // Converter a temperatura para Celsius (ou Fahrenheit, se preferir)
      const temperatureCelsius = temperature - 273.15;
      mainWeatherTemp.textContent = `${temperatureCelsius.toFixed(1)}°C`;
      mainWeatherDesc.textContent = weatherDescription;
    })
    .catch((error) => {
      console.error('Erro ao buscar dados da API:', error);
    });
}

// Event listener para o botão "Change location"
var changeLocationButton = document.getElementById('changeLocationButton');
changeLocationButton.addEventListener('click', function () {
  var newCity = document.getElementById('newCity').value;
  var newCountry = document.getElementById('newCountry').value;

  // Chamar a função para buscar os dados da previsão do tempo com a nova cidade e país
  getWeather(newCity, newCountry);

  var locationElement = document.querySelector('.location');
  locationElement.textContent = newCity + ', ' + newCountry;

  locationModal.style.display = 'none';
});
