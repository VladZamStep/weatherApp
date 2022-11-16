const apiKey = 'secret key';

const searchBtn = document.querySelector('.searchBar button');
const searchInput = document.querySelector('.searchBar input');

const weather = {
    coordinates: {
        lat: '51.5073219',
        lon: '-0.1276474'
    },
    fetchCity: async function (city) {
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`)
        if (!response.ok) {
            throw new Error('No city found.');
        }
        const data = await response.json();
        this.coordinates.lat = data[0].lat;
        this.coordinates.lon = data[0].lon;
    },
    fetchWeather: async function (city) {
        await this.fetchCity(city);
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.coordinates.lat}&lon=${this.coordinates.lon}&appid=${apiKey}&units=metric`)
        if (!weatherResponse.ok) {
            throw new Error('No weather found.');
        }
        const weatherData = await weatherResponse.json();
        return this.displayWeather(weatherData);
    },
    displayWeather: function (weatherData) {
        const { name } = weatherData;
        const { temp, humidity } = weatherData.main;
        const { icon, description } = weatherData.weather[0];
        const { speed } = weatherData.wind;
        console.log(weatherData);
        document.querySelector('.city').innerText = `Weather in ${name}`;
        document.querySelector('.tempetature').innerText = `${Math.round(temp)}°C`;
        document.querySelector('.description').innerText = `${description}`;
        document.querySelector('.humidity').innerText = `Humidity: ${humidity}%`;
        document.querySelector('.wind').innerText = `Wind: ${speed}km/h`;
        document.querySelector('.icon').src = `https://openweathermap.org/img/wn/${icon}.png`;
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    searchWeather: function () {
        this.fetchWeather(searchInput.value);
    }
}

searchBtn.addEventListener('click', () => {
    weather.searchWeather();
    searchInput.value = '';
})

searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        weather.searchWeather();
        searchInput.value = '';
    }
})

weather.fetchWeather('Atlanta');