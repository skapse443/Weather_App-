const userlocation = document.getElementById("userlocation"),
    converter = document.getElementById("converter"),
    weatherIcon = document.querySelector(".weatherIcon"),
    feelsLike = document.querySelector(".feelslike"),
    description = document.querySelector(".description"),
    date = document.querySelector(".date"),
    city = document.querySelector(".city"),
    HValue = document.querySelector("#HValue"),
    WValue = document.querySelector("#WValue"),
    SRValue = document.querySelector("#SRValue"),
    SSValue = document.querySelector("#SSValue"),
    CValue = document.querySelector("#CValue"),
    UVValue = document.querySelector("#UVValue"),
    PValue = document.querySelector("#PValue"),
    Forecast = document.querySelector("#forecast");

    WEATHER_API_ENDPOINT=`https://api.openweathermap.org/data/2.5/weather?appid=86794ab1820eff2a61f0f7a1c08c07fd&q=`;
    WEATHER_DATA_ENDPOINT=`https://api.openweathermap.org/data/2.5/weather?appid=86794ab1820eff2a61f0f7a1c08c07fd&exclude=minutely=metric&`;

    function findUserLocation(){
        fetch(WEATHER_API_ENDPOINT + userlocation.value)
        .then((response)=>response.json())
        .then((data)=>{
           
           if(data.cod != "" && data.cod !=200){
            alert(data.message);
            return;
            
           }
           console.log(data);
           
           city.innerHTML =data.name + ", " + data.sys.country;
           weatherIcon.style.background=`url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`;
           fetch(
                 WEATHER_DATA_ENDPOINT+`lon=${data.coord.lon}&lat=${data.coord.lat}`    
           )

           .then((response)=>response.json())
           .then((data)=>{
            console.log(data);


            temp.innerHTML=data.main.temp;
            fl.innerHTML="Feels Like "+ data.main.feels_like;
            desc.innerHTML=`<i class="fa-brands fa-cloudversify"></i> &nbsp;` +data.weather[0].description;

            const options={
                weekday:"long",
                month : "numeric",
                day : "numeric",
                hour : "numeric",
                minute:" numeric",
                hour12 : true,

            };

            date.innerHTML=getLongFormateDateTime(
                data.coord.dt,
                data.timezone_offset,
                options
            );

            HValue.innerHTML = Math.round(data.main.humidity)+"<span>%<span>";
            WValue.innerHTML = Math.round(data.wind.speed)+"<span>m<span>";

            const options1 = {
                hour : "numeric",
                minute: "numeric",
                hour12: true,
            };

            SRValue.innerHTML=getLongFormateDateTime(
                data.sys.sunrise,
                data.timezone,
                options1
            );
                
            SSValue.innerHTML = getLongFormateDateTime(
                data.sys.sunset,
                data.timezone,
                options1
            );
            

            CValue.innerHTML = data.clouds.all+"<span>%<span>";
            Sea_Level.innerHTML = data.main.sea_level+"<span>%<span>";
            PValue.innerHTML = data.main.pressure+"<span>hPa<span>";
            
           });

        });
    }

    function formatUnixTime(dtValue , offset , options = {}){
        const date = new Date((dtValue+ offset)* 10000);
        return date.toLocaleTimeString([], {timeZone: "UTC", ...options});
    }

    function getLongFormateDateTime(dtValue , offset , options){
        return formatUnixTime(dtValue,offset,options)
    }
