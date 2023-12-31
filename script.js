feather.replace();

// Função que coleta a descrição inicial do tempo e retorna uma tag apropriada
function filterWeather(initialWeather){
    if (initialWeather.includes('rain')){
        return "chuvoso";
    } else if (initialWeather.includes('clouds')){
        return "nublado";
    } else {
        return "ensolarado"
    }
}

// Função para atualizar o fundo do elemento .weather-side
function updateWeatherBackground(desc) {
  const weatherSideElement = document.querySelector(".weather-side");
  
  // Resetando o estilo de backgroundImage
  weatherSideElement.style.backgroundImage = ''; 
  weatherSideElement.style.backgroundSize = '';
  weatherSideElement.style.backgroundRepeat = 'no-repeat';  // Evitar a repetição

  let bgImage = "";

  let weatherTag = filterWeather(desc)
  console.log(weatherTag)

  


  switch (weatherTag) {
        case "ensolarado":
          bgImage = "./assets/imagem-dia-ensolarado.webp";
          break;
          case "nublado":
          bgImage = "./assets/imagem-dia-nublado.jpg";
          //   bgImage = "";
          weatherSideElement.style.backgroundRepeat = 'no-repeat';  // Evitar a repetição
          break;
          case "chuvoso":
          bgImage = "./assets/imagem-dia-chuvoso.jpg";
        //   bgImage = ""; // Você pode substituir por uma URL ou caminho apropriado
          weatherSideElement.style.backgroundSize = 'cover'; 
          break
      default:
          break;
  }

  // Atualizando o background diretamente
  if (bgImage) {
      weatherSideElement.style.backgroundImage = `url(${bgImage})`;
  }
}

// Popup modal
var locationButton = document.querySelector(".location-button");
var locationModal = document.getElementById("locationModal");

locationButton.addEventListener("click", function() {
    locationModal.style.display = "block";
});

var closeButton = document.querySelector(".close");

closeButton.addEventListener("click", function() {
    locationModal.style.display = "none";
});





document.addEventListener("DOMContentLoaded", function() {
  feather.replace();

  const weekListItems = document.querySelectorAll(".week-list li");
  const mainWeatherIconContainer = document.querySelector(".weather-container");
  const mainDayName = document.querySelector(".date-dayname");
  const mainWeatherTemp = document.querySelector(".weather-temp");
  const mainWeatherDesc = document.querySelector(".weather-desc");

  weekListItems.forEach(item => {
      item.addEventListener("click", function() {
          // Remova a classe 'active' de todos os outros items
          weekListItems.forEach(i => i.classList.remove("active"));
          
          // Adicione a classe 'active' para o item clicado
          item.classList.add("active");
          
          // Pegue os data attributes do item clicado
          const temp = item.getAttribute("data-temp");
          const desc = item.getAttribute("data-desc");
          const iconType = item.getAttribute("data-icon");

          // Atualize o ícone do tempo principal
          const oldIcon = mainWeatherIconContainer.querySelector(".weather-icon");
          if (oldIcon) {
              mainWeatherIconContainer.removeChild(oldIcon);
          }
          const newIcon = document.createElement("i");
          newIcon.className = "weather-icon";
          newIcon.setAttribute("data-feather", iconType);
          mainWeatherIconContainer.prepend(newIcon);
          feather.replace();

          // Atualize o nome do dia
          mainDayName.textContent = item.querySelector(".day-name").textContent;

          // Atualize a temperatura e a descrição
          mainWeatherTemp.textContent = temp;
          mainWeatherDesc.textContent = desc;

          // Chame a função para atualizar o background com base na descrição
          updateWeatherBackground(desc.toLowerCase()); // Converte a descrição para minúsculas para corresponder aos cases da função
      });
  });
});
