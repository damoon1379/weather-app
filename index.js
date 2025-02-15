const API_KEY='f3acb56ed6c3d462c90d47ead34de7f9'
const cityBtn = document.getElementById('cityBtn')
const weather = document.getElementById('weather')
const country=document.getElementById('country')
const temp = document.getElementById('temp')
const humid = document.getElementById('humid')
const description=document.getElementById('description')

async function getLocation(name){
    const result =
    await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${API_KEY}`)
    .then(res=>res.json())
     console.log(result[0])
     return {
        lat:result[0].lat,
        lon:result[0].lon
    }
}

async function getWeather(name){
   
    const {lat,lon}=await getLocation(name)
    const result = 
    await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then(res=>res.json())
    console.log(result)
    const img = document.getElementById('img')
    img.src=`https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`
    country.textContent=result.sys.country
    temp.textContent= (result.main.temp-273.15).toFixed(1)+'°c'
    humid.textContent=result.main.humidity
    description.textContent=result.weather[0].description
    weather.style.display='block'
    
}
cityBtn.addEventListener('click', async()=>{
    const name =document.getElementById('cityName').value
    await getWeather(name)
})

