

var icon = document.getElementById('icon');
var cityName = document.getElementById('cityName');
var temperature = document.getElementById('temperature');
var btnGetWeather = document.getElementById('getWeather');
var btnChangeTempScale = document.getElementById('changeTempScale')

var lati;
var long;
var orignalTemp;
var tempFlag = true;

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    var crd = pos.coords;

    lati = crd.latitude;
    long = crd.longitude;
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
btnGetWeather.addEventListener('click', function () {
    let apiKey = 'ce309858c9580a2f86ac0e0f45374afb';
    let apiUri = `http://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=${apiKey}&units=metric`;

    fetchTemperature(apiUri)
        .then(data => {
            icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            cityName.innerHTML = data.name;
            orignalTemp = data.main.temp
            temperature.innerHTML = orignalTemp + "&degC";
        })

});

btnChangeTempScale.addEventListener('click', function () {
    if (tempFlag) {
        temperature.innerHTML = `${Math.round(parseFloat(orignalTemp) * 9 / 5 + 32)}&degF`
    } else {
        temperature.innerHTML = orignalTemp + "&degC";
    }

    tempFlag = !tempFlag;
});



async function fetchTemperature(apiUrl) {
    let response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error(`HTTP error! ${response.status}`);
    }

    return await response.json();
}