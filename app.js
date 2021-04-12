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
    key:'b7a9b1cd527028579d01a5f91c1b4815',
    baseurl: 'https://api.openweathermap.org/data/2.5/'
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




// var localOffset;
// var day = new Date().getDate();
// var month = new Date().getMonth();
// var year = new Date().getFullYear();
// var months = ["January","February","March","April","May","June","July","August","September","Oktober","Nowember","December"];
// document.getElementById("dateInfo").innerHTML = `${day} ${months[month]} ${year}`;
// setInterval(function(){
//     var localTimeZone = new Date().toLocaleTimeString();
//     document.getElementById("localTime").innerHTML = localTimeZone}, 1000);
// document.getElementById('submit').addEventListener("click", addCity);
// function addCity () {
//     var id;
//     var city = document.getElementById('cityName').value;
//     var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=edaa8bba95e577d84a924d9a673e4a1b&units=metric`;
//     fetch(url).then(function(response){
//         return response.json();
//     }).then(function (data) {
//         console.log(data);
//         //var hightemp = data.main.temp_max;
//         // var lowtemp = data.main.temp_min;
//         var temperature = data.main.temp;
//         var windSpeed = data.wind.speed;
//         var humidity = data.main.humidity;
//         var pressure = data.main.pressure;
//         // var sunRise = new Date(data.sys.sunrise);
//         // var sunRiseTime = `${sunRise.getHours()}`+':'+`${sunRise.getMinutes()}`;
//         // var sunDown = new Date(data.sys.sunset);
//         // var sunDownTime = `${sunDown.getHours()}`+':'+`${sunDown.getMinutes()}`;
//         var weatherIconId = data.weather[0].icon;
//         var weatherinfo = data.weather[0].description;
//         localOffset = (data.timezone / 3600);
//         id = data.id;
//         document.getElementById('show').style.display = "block";
//         document.getElementById('cityNameSpan').innerHTML = `${data.name}, ${data.sys.country}`;
//         document.getElementById('citytemp').innerHTML = `${temperature} ℃`;
//         // document.getElementById('sunUp').innerHTML = `${sunRiseTime}`;
//         // document.getElementById('sunDown').innerHTML = `${sunDownTime}`;
//         document.getElementById('wind').innerHTML = `${windSpeed} m/s`;
//         document.getElementById('humid').innerHTML = `${humidity} %`;
//         document.getElementById('pres').innerHTML = `${pressure} hpa`;
//         // document.getElementById('highTemp').innerHTML = `${hightemp} ℃`;
//         // document.getElementById('lowTemp').innerHTML = `${lowtemp} ℃`;
//         document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${weatherIconId}@2x.png`;
//         document.getElementById('weatherInfo').innerHTML = `${weatherinfo}`;
//         apiDataLoad();
//     });
//         setInterval(function () {
//         let d = new Date();
//         let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
//         let nd = new Date(utc + (3600000 * `${localOffset}`));
//         let ndCity = nd.toLocaleString();
//         document.getElementById('timeInfo').innerHTML = ndCity}, 1000);
//     async function apiDataLoad() {
//         let dataArray = [];
//         const url = `https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=edaa8bba95e577d84a924d9a673e4a1b&units=metric`;
//         const response = await fetch(url);
//         const articles = await response.json();
//         let array = articles.list;
//         array.forEach(function(listItem){
//             let arry = [];
//             let date = new Date(listItem.dt_txt);
//             arry.push(date);
//             arry.push(listItem.main.temp);
//             dataArray.push(arry);
//         });
//         google.charts.load('current', {'packages':['line']});
//         google.charts.setOnLoadCallback(drawChart);
//         function drawChart() {
//             let data = new google.visualization.DataTable();
//             data.addColumn('date');
//             data.addColumn('number');
//             data.addRows(dataArray);
//             let options = {
//                 backgroundColor: {
//                     fill: 'transparent'
//                 },
//                 chart: {
//                     title: '5 day temperature forecast',
//                     subtitle: 'data every 3 hours ( ℃ )'
//                 },
//                 hAxis: {
//                     textStyle: {
//                         color:'white'
//                     },
//                     titleTextStyle: {
//                         color:'white'
//                     }
//                 },
//                 vAxis: {
//                     textStyle: {
//                         color: 'white'
//                     },
//                     titleTextStyle: {
//                         color:'white'
//                     }
//                 },
//                 titleTextStyle: {
//                     color: 'white'
//                 },
//                 legend: {
//                     position: 'none'
//                 },
//                 curveType : 'function',
//                 colors : ['lightblue'],
//                 width: 500,
//                 height: 300,
//                 chartArea: {
//                     'backgroundColor': {
//                         'fill': 'transparent'
//                     }
//                 }
//             };
//             let chart = new google.charts.Line(document.getElementById('chartdiv'));
//             chart.draw(data,google.charts.Line.convertOptions(options));
//         }
//     }
// }