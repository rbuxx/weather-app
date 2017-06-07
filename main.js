//299 Thunderstorm http://icon-park.com/imagefiles/simple_weather_icons_mixed_rain_and_thunderstorms.png
//499 Drizzle https://cdn1.iconfinder.com/data/icons/weather-2-colored/512/heavy_rainy-512.png
//599 Rain http://comune.ponzanoveneto.tv.it/sites/all/modules/my_weather/icon/c3/rain.png
//699 Snow http://icon-park.com/imagefiles/simple_weather_icons_snow.png
//799 Fog https://cdn3.iconfinder.com/data/icons/picons-weather/57/32_fog_cloud-512.png
//899 Clear https://cdn1.iconfinder.com/data/icons/weather-19/32/sun-512.png
//>800 Cloudy https://cdn2.iconfinder.com/data/icons/weather-34/512/Cloud_1-512.png
//appid-99fba8b0b8fda86aaa1cc612a8e01150

$(function(){

  var C = false;
  var apiData;

  backgroundImg = [
    "http://wallpapercave.com/wp/8M5Odq4.jpg",
    "http://orig06.deviantart.net/b6f6/f/2012/233/5/6/rainy_wallpaper_by_moggget-d5bwqju.jpg",
    "https://images3.alphacoders.com/892/89289.jpg",
    "https://wallpaperscraft.com/image/city_winter_europe_street_snow_shopping_59090_2560x1444.jpg",
    "https://wallpaperscraft.com/image/san_francisco_fog_lights_bridge_58439_2560x1024.jpg",
    "http://www.aurorasentinel.com/asuplads/Fotolia-64898668-Subscription-Monthly-L.jpg",
    "http://www.natures-desktop.com/images/wallpapers/1024x768/clouds/clouds-cumulus-grey.jpg"
  ]

  function displayTemp(F,C) {
    if(C) return Math.round((F-32)*(5/9)) +  "&deg; C";
    return Math.round(F) + "&deg; F";
  };

  function render(data, C) {
    var currentWeather = data.weather[0].description;
    var currentTemp = displayTemp(data.main.temp, C);
    var icon = data.weather[0].icon;

    $("#currentTemp").html(currentTemp);
    $("#currentWeather").html(currentWeather);

    var apiIcon = "http://openweathermap.org/img/w/" + icon + ".png";
    $("#currentTemp").prepend("<img src=" + apiIcon + ">");
  }

  $.getJSON("https://freegeoip.net/json/").done(function(location) {
    //console.log(location); success!
    $("#country").html(location.country_name);
    $("#city").html(location.city);
    $("#state").html(location.region_name);
    $("#latitude").html(location.latitude);
    $("#longitude").html(location.longitude);


    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+location.latitude+"&lon="+location.longitude+"&units=imperial&appid=e6d48735a2df1b8e6e6471018333638d", function(data) {
     apiData = data;
     //console.log(apiData);
     render(apiData, C);
     $("#toggle").click(function() {
      C = !C
      render(apiData, C);

     })

      var id = data.weather[0].id,
          bgIndex,
          backgroundId = [299, 499, 566, 699, 799, 800];

      backgroundId.push(id); //console.log(backgroundId);
      bgIndex = backgroundId.sort().indexOf(id);

      $("body").css("background-image", "url(" + backgroundImg[bgIndex] + ")");
    })
  })
})
