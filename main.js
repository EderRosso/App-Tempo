const API_KEY = '06011b36b195aa4d67492cc1bb7b271f';

const elIconClear = document.getElementById('icon-clear');
const elTemperatura = document.getElementById('temperatura');
const elLocal = document.getElementById('local');
const elUmidade = document.getElementById('umidade');
const elSpeedWind = document.getElementById('speed-wind');
const elCard = document.querySelector('.card');



function getData(local) {
    const route = `https://api.openweathermap.org/data/2.5/weather?q=${local}&lang=pt_br&units=metric&appid=${API_KEY}`;
    return fetch(route).then(response => response.json());
}

function handleSubmit(event) {
    event.preventDefault();

    const value = document.querySelector('[name="local"]').value;

    getData(value).then(data => {
        console.log(data);

        elTemperatura.innerHTML = Math.floor(data.main.temp) + '°C';
        elLocal.innerHTML = data.name;
        elUmidade.innerHTML = data.main.humidity + '%';
        elSpeedWind.innerHTML = Math.floor(data.wind.speed) + ' km/h';

        const icon = data.weather[0].main.toLocaleLowerCase();
        const src = `./img//icons/${icon}.png`;

        elIconClear.setAttribute('src', src);




    })
}

function fadeOut(){
    const timeline = gsap.timeline();

    timeline.to('footer', { y: 51, duration: 1, opacity: 0.5})
}
function fadein(){
    const timeline = gsap.timeline();

    timeline.fromTo('footer', { y: -50, duration: 1, opacity: 0.5})
}

fadeOut();

document.querySelector('form').addEventListener('submit', handleSubmit);