const APIKEY = "3265874a2c77ae4a04bb96236a642d2f";
const URL = (city) =>
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`;


const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

async function getWeatherBycity(city){
    const resp= await fetch(URL(city));
    
    const respData = await resp.json();   
    
    addWeatherToPage(respData)
} 


function addWeatherToPage(data){
    const weather = document.createElement('div');

    if(!data.coord){
        main.innerHTML="Sorry Not Found,Please Search By City Name"
    }
    const temp = KtoC(data.main.temp);
    weather.classList.add('weather');
    weather.classList.add('backweather');

    weather.innerHTML= `
        

        <h2>
        ${data.weather[0].main === "Clear" ? '<span class="backweather-clear" </span>' : ''}
        ${data.weather[0].main === "Rain" ? '<span class="backweather-rain" </span>' : ''}
        ${data.weather[0].main === "Clouds" ? '<span class="backweather-clouds" </span>' : ''}
        ${data.weather[0].main === "Sunny" ? '<span class="backweather-Sun" </span>' : ''}
        ${data.weather[0].main === "Mist" ? '<span class="backweather-mist" </span>' : ''}
        ${data.weather[0].main === "Haze" ? '<span class="backweather-mist" </span>' : ''}
        ${data.weather[0].main === "Snow" ? '<span class="backweather-snow" </span>' : ''}
        ${data.weather[0].main === "Smoke" ? '<span class="backweather-smoke" </span>' : ''}
        ${data.weather[0].main === "Fog" ? '<span class="backweather-fog" </span>' : ''}

        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
        ${temp}°C
        
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
        <br>
        <small>${data.weather[0].main}</small>

        </h2>
        

        
        `
        
    ;

    main.innerHTML='';

    main.appendChild(weather);


}

function KtoC(K){
    return Math.floor(K - 273.15);  
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const city = search.value;

    if(city){
        getWeatherBycity(city)
    }

})

