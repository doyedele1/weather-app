window.addEventListener('load', ()=> {
    let lon;
    let lat;
    let tempDescription = document.querySelector('.temperature-description');
    let tempDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let locationIcon = document.querySelector('.weather-icon');
    let temp = document.querySelector('.temperature');
    let tempSpan = document.querySelector('.temperature span');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=d6cad6182255c9176c8895e36ba18cb3`;
            
            fetch(api)
                .then(res => {
                    return res.json();
            })
            .then(data => {
                // console.log(data);
                const temperature = data.current.temp;
                const description = data.current.weather[0].description;
                const icon = data.current.weather[0].icon;
                // console.log(icon);
                
                // DOM elements
                tempDegree.textContent = temperature;
                tempDescription.textContent = description;
                locationTimezone.textContent = data.timezone;

                let celsius = (temperature - 32) * (5 / 9);

                // Icons
                locationIcon.innerHTML = `<img src="icons/${icon}.png">`;

                // Temperature conversion
                temp.addEventListener('click', () => {
                    if (tempSpan.textContent === "F") {
                        tempSpan.textContent = "C";
                        tempDegree.textContent = Math.floor(celsius);
                    }
                    else {
                        tempSpan.textContent = "F";
                        tempDegree.textContent = temperature;
                    }
                });
            });
        });
    }
});