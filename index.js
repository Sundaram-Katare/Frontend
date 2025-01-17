const weatherButton = document.getElementById("btn");
const cityName = document.getElementById("cityInput");
const appName = document.getElementById("appName");
const weatherResult = document.getElementById("weatherResult");
const nameOfCity = document.getElementById("name");
const temp = document.getElementById("temp");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const clouds = document.getElementById("clouds");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feelsLike");
const bg = document.getElementsByTagName("body");
const statsItems = document.querySelectorAll(".item");


var i = 0;
var txt = "Weather Snap";
var speed = 95;


function typeWriter(){
    if(i < txt.length)
    {
        document.getElementById("appName").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter,speed);
    }
}

typeWriter();

weatherButton.addEventListener("click", async function (event) {
    event.preventDefault();

    nameOfCity.style.color = "white";
    appName.style.color = "white";
    
    const city = cityName.value.trim();
    if (!city) {
        weatherResult.textContent = "Please enter a city name.";
        return;
    }

    const url = `https://backend-eight-psi-90.vercel.app/?address=${encodeURIComponent(city)}`;
    console.log(url);

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch weather data.");

        const result = await response.json(); 
        console.log(result);

        if (!result || result.length === 0) {
            weatherResult.textContent = "No weather data found.";
            return;
        }
       
        const weatherData = result[0];

        const temperature = parseFloat(weatherData.temp);

        nameOfCity.innerHTML = weatherData.name;
        temp.innerHTML = `${weatherData.temp}`;
        wind.innerHTML = `Wind : ${weatherData.wind} <i class="fa-solid fa-wind" style="color: #B197FC; height:20px; background-color: black; padding : 10px; border-radius : 5px; "></i>`;
        humidity.innerHTML = `Humidity : ${weatherData.humidity} <i class="fa-solid fa-droplet" style="color: #74C0FC; height:20px; background-color: black; padding : 10px; border-radius : 5px; "></i>`;
        clouds.innerHTML = `Clouds : ${weatherData.clouds}% <i class="fa-solid fa-cloud" style="color: #ffffff; height:20px; background-color: black; padding : 10px; border-radius : 5px; "></i>`;
        pressure.innerHTML = `Pressure : ${weatherData.pressure} <i class="fa-solid fa-temperature-empty" style="color: #63E6BE; height:20px; background-color: black; padding : 10px; border-radius : 5px; "></i>`;
        feelsLike.innerHTML = `Feels Like : ${weatherData.feelsLike} <i class="fa-solid fa-temperature-full" style="color: #FFD43B; height:20px; background-color: black; padding : 10px; border-radius : 5px; "></i>`

        if (temperature < 0) {
            document.body.style.backgroundImage = "url('https://png.pngtree.com/background/20220730/original/pngtree-morning-in-winter-mountains-flat-color-vector-illustration-picture-image_1881242.jpg')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.color = "black";
            temp.style.color = "black";
            nameOfCity.style.color = "black";
            appName.style.color = "black";

           
            statsItems.forEach((individualItem) => {
                individualItem.style.color = "black";
            });

        } else if (temperature < 14) {
            document.body.style.backgroundImage = "url('https://usagif.com/wp-content/uploads/gifs/starfall-gif-46.gif')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.color = "white";
            temp.style.color = "white";

            statsItems.forEach((individualItem) => {
                individualItem.style.color = "white";
            })

        } else if (temperature < 25) {
            document.body.style.backgroundImage = "url('https://www.joshmorony.com/media/2016/05/phaser-fog.gif')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.color = "black";
            temp.style.color = "white";

            statsItems.forEach((individualItem) => {
                individualItem.style.color = "white";
            })
        } else if (temperature < 35) {
            document.body.style.backgroundImage = "url('https://cdn.dribbble.com/users/215810/screenshots/2747402/media/6781b8939832022565f0c127dd192c7f.gif')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.color = "black";

            temp.style.color = "black";
            nameOfCity.style.color = "black";
            appName.style.color = "black";

           
            statsItems.forEach((individualItem) => {
                individualItem.style.color = "black";
            })
        } else {
            document.body.style.backgroundImage = "url('https://i.gifer.com/embedded/download/YUwc.gif')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.color = "black";
        }

    } catch (error) {
        weatherResult.textContent = "Error fetching weather data.";
        console.error(error);
    }
});
