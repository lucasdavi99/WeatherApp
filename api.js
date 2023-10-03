const apiKey = '9ff8d06cca7a6940798faad184e1d9c9';

function mapWeatherIcon(iconCode) {
  switch (iconCode) {
    case '01d':
    case '01n':
      return 'sun';
    case '02d':
    case '02n':
      return 'cloud';
    case '03d':
    case '03n':
      return 'cloud';
    case '04d':
    case '04n':
      return 'cloud';
    case '09d':
    case '09n':
      return 'cloud-rain';
    case '10d':
    case '10n':
      return 'cloud-rain';
    case '11d':
    case '11n':
      return 'cloud-lightning';
    case '13d':
    case '13n':
      return 'cloud-snow';
    case '50d':
    case '50n':
      return 'cloud-off';
    default:
      return 'sun';
  }
}

function updateWeatherSide(temperature, description, iconCode, city, country,humidity, wind, precipitation, dayIndex = (new Date().getDay() + 6) % 7) {
  const mappedIcon = mapWeatherIcon(iconCode);

  const dateDayName = document.querySelector('.date-dayname');
  const dateDay = document.querySelector('.date-day');
  const locationText = document.querySelector('.location');
  const weatherIcon = document.querySelector('.weather-icon');
  const weatherTemp = document.querySelector('.weather-temp');
  const weatherDesc = document.querySelector('.weather-desc');

  
  const dayNames = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  const currentDate = new Date();
  const selectedDate = new Date(currentDate);
  selectedDate.setDate(currentDate.getDate() + (dayIndex - ((currentDate.getDay() + 6) % 7)));

  dateDayName.textContent = dayNames[dayIndex];
  dateDay.textContent = `${selectedDate.getDate()} ${selectedDate.toLocaleString('default', { month: 'short' })} ${selectedDate.getFullYear()}`;
  locationText.textContent = `${city}, ${country}`;
  weatherIcon.setAttribute('data-feather', mappedIcon);
  feather.replace();

  const temperatureCelsius = temperature - 273.15;
  weatherTemp.textContent = `${temperatureCelsius.toFixed(1)}°C`;
  weatherDesc.textContent = description;

  const weekList = document.querySelectorAll('.week-list li');
  weekList.forEach(item => item.classList.remove('selected'));
  if (weekList[dayIndex]) weekList[dayIndex].classList.add('selected');

  const humidityElement = document.querySelector('.humidity .value');
    const precipitationElement = document.querySelector('.precipitation .value');
    const windElement = document.querySelector('.wind .value');

    humidityElement.textContent = `${humidity} %`;
    precipitationElement.textContent = `${precipitation} %`;
    windElement.textContent = `${wind} km/h`;

    // Atualizar o background
    updateWeatherBackground(description.toLowerCase());
}

// Função para buscar os dados da previsão do tempo com base na cidade e país
function getWeather(city, country) {
  const currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;
  const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${apiKey}&cnt=7`;
  
  fetch(currentApiUrl)
    .then((response) => response.json())
    .then((data) => {
      
      const temperature = data.main.temp;
      const weatherDescription = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const humidity = data.main.humidity;
      const wind = data.wind ? data.wind.speed : 0; // Verifica se o campo 'wind' existe.
      const precipitation = data.rain ? (data.rain['1h'] || data.rain['3h'] || 0) : 0; // Verifica se há precipitação em 1h ou 3h.
      

      updateWeatherSide(temperature, weatherDescription, iconCode, city, country, humidity, precipitation, wind);
    })
    .catch((error) => {
      console.error('Erro ao buscar dados da API:', error);
    });

      // Fetch para a previsão de 7 dias
  fetch(forecastApiUrl)
  .then((response) => response.json())
  .then((data) => {
    const weekList = document.querySelectorAll('.week-list li');
    const currentDateIndex = (new Date().getDay() + 6) % 7;

    data.list.forEach((forecast, index) => {
      if (weekList[index]) {
          const temperature = forecast.main.temp;
          const description = forecast.weather[0].description;
          const iconCode = forecast.weather[0].icon;
          const humidity = forecast.main.humidity;
          const wind = forecast.wind ? forecast.wind.speed : 0;
          const precipitation = forecast.rain ? (forecast.rain['1h'] || forecast.rain['3h'] || 0) : 0;
  
          const mappedIcon = mapWeatherIcon(iconCode);
          weekList[index].querySelector('.day-icon').setAttribute('data-feather', mappedIcon);
          weekList[index].querySelector('.day-temp').textContent = `${(temperature - 273.15).toFixed(1)}°C`;
          weekList[index].setAttribute('data-desc', description);
  
          weekList[index].classList.remove('selected');
  
          weekList[index].addEventListener('click', function () {
              updateWeatherSide(temperature, description, iconCode, city, country, humidity, wind, precipitation, index);
              weekList.forEach(item => item.classList.remove('selected'));
              this.classList.add('selected');
          });
      }
  });

    if (weekList[currentDateIndex]) {
      weekList[currentDateIndex].click();
    }

    feather.replace();
  })
  .catch((error) => {
    console.error('Erro ao buscar dados da API:', error);
  });
}

// Event listener para o botão "Change location"
var changeLocationButton = document.getElementById('changeLocationButton');
changeLocationButton.addEventListener('click', function () {
  var newCity = document.getElementById('newCity').value.trim();
  var newCountry = document.getElementById('newCountry').value.trim();

  if (newCity === '' || newCountry === '') {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  getWeather(newCity, newCountry);

  var locationElement = document.querySelector('.location');
  locationElement.textContent = newCity + ', ' + newCountry;

  locationModal.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', (event) => {
  getWeather('Recife', 'Brasil');
});