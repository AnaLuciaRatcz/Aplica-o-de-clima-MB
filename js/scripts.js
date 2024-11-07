//variáveis e seleção de elementos
const apiKey = "c6978734836c88789ffbd61593beeab9";
const apiCountryURL = "https://countryflagsapi.com/png/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");//aqui foi usado a classe hide

//funções
const getWeatherData = async(city) =>{  //acessa os dados da API (lógica)

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    
    return data
};

const showWeatherData = async (city) => { //exibe os dados da API (dom)
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);//para não vir números quebrados
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute(
        "src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png` //alterar o ícone do clima
    );
    countryElement.setAttribute("src", apiCountryURL + data.sys.country);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    weatherContainer.classList.remove("hide");//remover a classe hide
};


//eventos
searchBtn.addEventListener("click", (e) => { //faz o botão de pesquisa funcionar
    e.preventDefault();//sem recarregar a página

    const city = cityInput.value;//variável

    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) =>{ //fazer funcionar o enter na pesquisa
    if(e.code === "Enter"){
        const city = e.target.value;
        showWeatherData(city);
    };
});    