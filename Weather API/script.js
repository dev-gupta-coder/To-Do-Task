document.addEventListener('DOMContentLoaded',()=>{
const city_input= document.getElementById('city-input');
const enter_btn = document.getElementById("enter-city-btn");
const weather_info = document.getElementById("get-weather-info");
    const  city_name = document.getElementById('city-name');
    const errorMessage =document.getElementById('errorMessage');
    const temp = document.getElementById('temperature');
    const discription = document.getElementById('dicription');
const API_KEY = "e1e30f59dc53d8e1123aa0f1d58e6d05";   //API key

enter_btn.addEventListener('click',async ()=>{
    const city = city_input.value.trim();
    if(!city) return ;

    //it may throw an error
    // database/server is always another continent
    try {
       const weatherData= await fetchWeatherData(city);
       displayWeatherData(weatherData);
    } catch (error) {
        showError();
    }

})

//get the data
async function fetchWeatherData(city){
    //neeed to paste correct url
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`; //env variable
const response =await fetch(url);
console.log(typeof response)
console.log("Response", response);

if(!response.ok){
    throw new Error("city not found");
}
    const data = await response.json();
    return data
} 

//show data
function displayWeatherData(data){
    console.log(data);
    const {name, main , weather} =data;
    city_name.textContent = name;

    //unlock the display by displaying class='hidden'
    weather_info.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    temp.textContent = `Temperature : ${main.temp}`;
    discription.textContent = `Discription : ${weather[0].description}`;    
}
function showError(){
    weather_info.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    
}

})