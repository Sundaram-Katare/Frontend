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
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const bg = document.getElementsByTagName("body");

const statsItems = document.querySelectorAll(".item");


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
        wind.innerHTML = `Wind : ${weatherData.wind} <i class="fa-solid fa-wind" style="color: #B197FC; height:20px; background-color: black; padding : 10px; border-radius : 5px; "></i> `;
        humidity.innerHTML = `Humidity : ${weatherData.humidity} <i class="fa-solid fa-droplet" style="color: #74C0FC; height:20px; background-color: black; padding : 10px; border-radius : 5px; "></i>`;
        clouds.innerHTML = `Clouds : ${weatherData.clouds}% <i class="fa-solid fa-cloud" style="color: #ffffff; height:20px; background-color: black; padding : 10px; border-radius : 5px; "></i>`;
        sunrise.innerHTML = `Sunrise : ${weatherData.sunrise} <i class="fa-regular fa-sun" style="color: #FFD43B; height:20px; background-color: black; padding : 10px; border-radius : 5px; "></i>`
        sunset.innerHTML = `Sunset : ${weatherData.sunset} <i class="fa-solid fa-sun" style="color: #ff7300; height:20px; background-color: black; padding : 10px; border-radius : 5px; "></i>`
      
        if (temperature < 0) {
            // Very Cold (Snowy Background)
            document.body.style.backgroundImage = "url('./images/w4.jpg')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.color = "white";
           
            statsItems.forEach((individualItem) => {
                individualItem.style.color = "white";
            })

        } else if (temperature < 14) {
            // Cold (Rainy Background)
            document.body.style.backgroundImage = "url('https://usagif.com/wp-content/uploads/gifs/starfall-gif-46.gif')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.color = "white";

            statsItems.forEach((individualItem) => {
                individualItem.style.color = "white";
            })

        } else if (temperature < 25) {
            // Moderate (Spring Background)
            document.body.style.backgroundImage = "url('https://www.joshmorony.com/media/2016/05/phaser-fog.gif')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.color = "black";

            statsItems.forEach((individualItem) => {
                individualItem.style.color = "white";
            })
        } else if (temperature < 35) {
            // Warm (Sunny Beach Background)
            document.body.style.backgroundImage = "url('https://cdn.dribbble.com/users/215810/screenshots/2747402/media/6781b8939832022565f0c127dd192c7f.gif')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.color = "black";
        } else {
            // Very Hot (Desert Background)
            document.body.style.backgroundImage = "url('https://i.gifer.com/embedded/download/YUwc.gif')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.color = "black";
        }
        
        
        

        // weatherResult.textContent = "";
    } catch (error) {
        weatherResult.textContent = "Error fetching weather data.";
        console.error(error);
    }
});
