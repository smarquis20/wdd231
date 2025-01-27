document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = document.lastModified;

const url = 'data/members.json';
const hbutton = document.querySelector('#hambutton');
const navElement = document.querySelector('.nav-menu');
const spotlight = document.querySelector('#spotlight');
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const forecastDisplay = document.querySelector('#forecast-display');
const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=39.3703&lon=94.7825&units=imperial&appid=515d902ad03125d9b6e25846e25f1724';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=39.3703&lon=94.7825&units=imperial&appid=515d902ad03125d9b6e25846e25f1724';

async function getMemberData() {
    const response = await fetch(url);
    const data = await response.json();
    members = data.members;

    displaySpotlight(members);
}

const displaySpotlight = (members) => {

    spotlight.innerHTML = '';

    const shuffledMembers = members.sort(() => Math.random() - 0.5);
    const randMembers = shuffledMembers.slice(0,3);

    randMembers.forEach((member) => {
        let card = document.createElement('div');
        let name = document.createElement('h3');
        let logo = document.createElement('img');
        let email = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('a');

        card.classList.add('spotlightCard');

        name.textContent = member.name;
        logo.setAttribute('src', member.image);
        logo.setAttribute('alt', `Company logo of ${member.name}`);
        logo.setAttribute('loading', 'lazy');
        logo.classList.add('spotlight-img');

        phone.textContent = member.phone;

        email.textContent = member.email;
        website.textContent = `${member.website}`;
        website.setAttribute('href', member.website);
        website.setAttribute('target', '_blank');

        card.appendChild(name);
        card.appendChild(logo);
        card.appendChild(email);
        card.appendChild(phone);
        card.appendChild(website);

        spotlight.appendChild(card);
    });

}

getMemberData();

async function fetchWeather() {
    try {
      const response = await fetch(currentWeatherUrl);
      if (response.ok) {
        const data = await response.json();
         displayCurrentWeather(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }

  async function fetchForecast() {
    try {
      const response = await fetch(forecastUrl);
      if (response.ok) {
        const data = await response.json();
         displayForecast(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }

  function displayCurrentWeather(data) {
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const weatherCard = document.createElement('div');
    weatherCard.classList.add('weather-card');
    const weatherDesc = document.createElement('p');
    const highTemp = document.createElement('p');
    const lowTemp = document.createElement('p');
    const weatherTemp = document.createElement('p');
    const weatherIcon = document.createElement('img');
    let desc = data.weather[0].description;

    weatherDesc.textContent = desc;
    lowTemp.innerHTML = `Low: ${Math.round(data.main.temp_low)}&deg;F`;
    highTemp.innerHTML = `High: ${Math.round(data.main.temphigh)}&deg;F`;
    weatherTemp.innerHTML = `${Math.round(data.main.temp)}&deg;F`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);

    weatherCard.append(weatherTemp);
    weatherCard.append(weatherDesc);
    weatherCard.append(highTemp);
    weatherCard.append(lowTemp);
    weatherCard.append(weatherIcon);

    currentTemp.appendChild(weatherCard);
  }

  function displayForecast(data) {
    
    const dailyForecast = data.list.filter((item) => 
        item.dt_txt.includes('12:00:00')
    ).slice(0,4);

    dailyForecast.forEach((forecast) => {
        const date = new Date(forecast.dt_txt).toLocaleDateString([], {weekday: 'short'});
        const iconsrc = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
    
        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card');
        const day = document.createElement('p');
        const temp = document.createElement('p');
        const icon = document.createElement('img');

        day.innerHTML = date;
        temp.innerHTML = `${Math.round(forecast.main.temp)}&deg;F`;
        icon.setAttribute('src', iconsrc);
        icon.setAttribute('alt', forecast.weather[0].description);

        forecastCard.append(day);
        forecastCard.append(temp);
        forecastCard.append(icon);

        forecastDisplay.appendChild(forecastCard);
    });
  }

  fetchForecast();
  fetchWeather();
