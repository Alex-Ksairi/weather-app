// coding starts right below

// DOMs Local date and time

let localDate = document.querySelector('.local-date');

let hour = document.querySelector('.hour');
let minutes = document.querySelector('.mins');
let seconds = document.querySelector('.second');

(function date() {
    let currentDate = new Date();
    localDate.innerText = currentDate.toLocaleDateString();
})();

var updateTime = () => {
    let currentTime = new Date();

    let currentHour = currentTime.getHours();
    let currentMinutes = currentTime.getMinutes();
    let currentSecond = currentTime.getSeconds(); 

    hour.textContent = currentHour;
    minutes.textContent = currentMinutes.toString().padStart(2, '0');
    seconds.textContent = currentSecond.toString().padStart(2, '0');
}
setInterval(updateTime, 1000);
updateTime();


// importing API-KEY & BASE-URL

let api = {
    key:'3854b0fa69f7a859345e1603835850a7',
    baseurl: 'https://api.openweathermap.org/data/3.0/'
}

// DOMs Search-box
let searchBox = document.querySelector('.search-box');

searchBox.addEventListener('keypress', setQuery);

function setQuery(search) {
    if (search.keyCode == 13) {
        // console.log(searchBox.value);    works great
        getResult(searchBox.value);
        searchBox.value = '';
    }
};

// getting result and paste it in setQuery function above
function getResult(check) {
    fetch(`${api.baseurl}weather?q=${check}&units=metric&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        })
        .then((data) => displayResult(data))
};

// display result on browser
function displayResult(weather) {
    // console.log(weather);    // works great

    // changing city name according to input

    let city = document.querySelector('.location .city');
    city.textContent = `${weather.name}, ${weather.sys.country}`;

    // getting date according the timezone
    let dateNow = new Date();
    // console.log(dateNow);
    let locationDate = document.querySelector('.location .date');
    locationDate.textContent = dateChecker(dateNow);

    // setInterval(function(){
    //     let dateNow = new Date().toLocaleTimeString();
    //     // console.log(dateNow);

    //     let locationDate = document.querySelector('.location .date');
    //     locationDate.textContent = dateChecker(dateNow)}, 1000);

    // checking temperature
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    // checking weather statue
    let weatherStatue = document.querySelector('.current .weather');
    // let icon = document.querySelector('.current .icon');
    weatherStatue.textContent = weather.weather[0].main;
    // icon.textContent = weather[0].icon;

    // checking the high and low
    let minMax = document.querySelector('.hi-low');
    minMax.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
};

// getting date according the timezone and paste it in display result function above
function dateChecker(d) {       // d represents date
    // months
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // daysOfWeek
    let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // getting date
    let day = daysOfWeek[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
    // console.log(`${day} ${date} ${month} ${year}`);
}