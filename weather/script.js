let search_btn = document.querySelector('.search');
let input_place  = document.querySelector('.user-city');
let api_key = "adeff947f610b33a04d52a1961ede1af";
let card = document.querySelector('.card');
 let todayWeather = document.querySelector('.todayweather');
 let current_location = document.querySelector('.currentlocation');

let nowweather = (name,lat,lon,country) => {
let weather_api= `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`;
let forecast_api= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
   let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
   let month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
   fetch(weather_api).then(res => res.json()).then(data =>{
   console.log(data);
    let date  = new Date();

   todayWeather.innerHTML =
               `
            <div class="ntodayweather">
                <div class="todayweather">
                    <h2 > ${name} , ${country}</h2>
                    <h3 style="padding-top: 5px;"> ${date.getDate()}  ${month[date.getMonth()]} ${date.getFullYear()} </h3>
                    <h3 style="padding-top: 5px;">${days[date.getDay()]} </h3>
                    
                    <h4>Temperature: ${(data.list[0].main.temp - 273.15).toFixed(2)}°C</h4>
                        <h4>Humidity: ${data.list[0].main.humidity} %</h4>
                    <h4>wind: ${Math.floor(data.list[0].wind.speed*3.6 )} km/h</h4>
                </div> 

                 <div id="weathericonss">
    <img  src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png" alt="weather-img">
    <br>
    <h4>${data.list[0].weather[0].description}</h4>
</div>
                </div>
                `
input_place.value = name;
   }).catch(() =>{
    alert('Error while fetching location');
   });

   fetch(weather_api).then(res=> res.json()).then(data => 
    {
      let uniquedates = [];
      let fivedates = data.list.filter(forcast =>{
        let ndays = new Date(forcast.dt_txt).getDate();
        if(!uniquedates.includes(ndays))
          {
            return uniquedates.push(ndays);
          }
    });
    console.log(fivedates);
    console.log(uniquedates);
    card.innerHTML = ``;

    for(let i=1;i<=uniquedates.length;i++)
      {
        let date = new Date(fivedates[i].dt_txt);
        console.log(date);
        card.innerHTML += `
                   
                    <li class="day2">
                        <h2> ${days[date.getDay()]}</h2>
                          <h3 style="padding-top: 2px;"> ${date.getDate()}  ${month[date.getMonth()]} ${date.getFullYear()} </h3>
                   <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png">
                   <h3>${data.list[i].weather[0].description}</h3>
                   <br>
                        <h4 class="temp">Temperature: ${(data.list[i].main.temp - 273.15).toFixed(2)}°C</h4>
                        <br>

                      <h4>Humidity: ${data.list[i].main.humidity}%</h4>
                      <br>
                       
         <h4>wind:${Math.floor(data.list[i].wind.speed*3.6)}km/h</h4>
                    </li>
        `;

      }
                        
  

   }).catch(()=>{
    console.log("error while fetching next few days ")
   });
  
}


function getcoordinates() {
  let Cityinput = input_place.value.trim();
  if(!Cityinput) return alert('Enter your city') ;
  let  geo_weather_api = `https://api.openweathermap.org/geo/1.0/direct?q=${Cityinput}&limit=1&appid=${api_key}`;
  fetch(geo_weather_api).then(res => res.json()).then(data =>{
    let {name,lat,lon,country} = data[0];  
    nowweather(name,lat,lon,country);
  }).catch(()=>{
    alert(`${Cityinput} location is not avaliable`)
  });
}


function getcurrentlocation()
{
  navigator.geolocation.getCurrentPosition(position =>{
  let {latitude,longitude} = position.coords;
  let reverse_geo_api = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`
    fetch(reverse_geo_api).then(res => res.json()).then(data =>{
      let{name,country} = data[0];
      nowweather(name,latitude,longitude,country);
    }).catch(()=>{
      alert('getting error while fetching current location');
    })
  })
}


search_btn.addEventListener("click",getcoordinates);

current_location.addEventListener('click',getcurrentlocation);


