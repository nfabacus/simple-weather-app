(function(){
  var tempMode = "temp_c";
  var degreeType = "\u00B0C";
  var degreeTo = "Fahrenheit?";
  var latiLongi ="";

  getLocation();

  $('#toggleTempBtn').click(function(){
    toggleTemp();
  });

  function getLocation() {
    if(!navigator.geolocation) {
       $("#message").html("Geolocation is not supported by this browser.");
    }
    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
    latiLongi = position.coords.latitude + "," + position.coords.longitude;
    updateWeather(latiLongi, degreeType);
    }
    function error() {
      $("#message").html("Unable to retrieve your location.");
    }
  };

  function updateWeather() {
    $.get( "https://api.wunderground.com/api/your-api-key-here/geolookup/conditions/q/"+latiLongi+".json", function( data ) {
        var city = data.location.city;
        var icon_url = data.current_observation.icon_url;
        var weather = "Sky is "+ data.current_observation.weather;
        var windspeed = "Windspeed: " + data.current_observation.wind_kph + " kph";
        var temperature = data.current_observation[tempMode];
        $('#city').html(city);
        $('#weatherIcon').attr('src', icon_url);
        $('#weather').html(weather);
        $('#windspeed').html(windspeed);
        $('#temperature').html(temperature);
        $('#degreeType').html(degreeType);
        $('#toggleTempBtn').html(degreeTo);
    });
  }

  function toggleTemp () {
      if(tempMode === "temp_c"){
        tempMode = "temp_f";
        degreeType = "\u00B0F";
        degreeTo = "Celcius?";
      $('#toggleTempBtn').html(degreeTo);
    } else if (tempMode === "temp_f" || tempMode === undefined){
      tempMode = "temp_c";
      degreeType = "\u00B0C";
      degreeTo = "Fahrenheit?";
      $('#toggleTempBtn').html(degreeTo);
    }
    updateWeather();
  };

})();
