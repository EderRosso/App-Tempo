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

function loadInformation(){
    const value = document.querySelector('[name="local"]').value;

    getData(value).then(data => {
        
        // console.log(data);
        
        if(data.cod === '404'){
            elCard.classList.remove('active');
            return
        }
        
        elCard.classList.add('active');

        elTemperatura.innerHTML = Math.floor(data.main.temp) + '°C';
        elLocal.innerHTML = data.name;
        elUmidade.innerHTML = data.main.humidity + '%';
        elSpeedWind.innerHTML = Math.floor(data.wind.speed) + ' km/h';

        const icon = data.weather[0].main.toLocaleLowerCase();
        const src = `./img//icons/${icon}.png`;

        elIconClear.setAttribute('src', src);

        fadein();
        

    })
}

function handleSubmit(event) {
    event.preventDefault();

    fadeOut();


}

function fadein(){
    const timeline = gsap.timeline( );
    const configFrom = { y: -50};
    const configTo = { y: 0, duration:0.4, opacity:1,  ease: 'back'};


    timeline.fromTo('#icon-clear', configFrom, configTo);
    timeline.fromTo('#temperatura', configFrom, configTo, 0.1);
    timeline.fromTo('#local', configFrom, configTo, 0.2);
    timeline.fromTo('footer', configFrom, configTo, 0.3);
}

function fadeOut(){
    const timeline = gsap.timeline({onComplete: loadInformation});
    const config =  { y: 50, duration: 0.4, opacity: 0, ease: 'slow'};

    timeline.to('footer', config);
    timeline.to('#local', config, 0.1);
    timeline.to('#temperatura', config, 0.2);
    timeline.to('#icon-clear', config, 0.3);
}



document.querySelector('form').addEventListener('submit', handleSubmit);