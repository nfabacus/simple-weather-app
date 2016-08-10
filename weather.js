var tempMode;

function Localweather() {
  $.get( "http://api.wunderground.com/api/your-api-key-here/conditions/q/autoip.json", function( data ) {
    var city = data.current_observation.display_location.city;
    var weather = "Sky is "+ data.current_observation.weather;
    var windspeed = "Windspeed: " + data.current_observation.wind_kph + " kph";
    var icon_url = data.current_observation.icon_url;
    $('#city').html(city);
    console.log(icon_url);
    $('#weatherIcon').attr('src', icon_url);
    $('#weather').html(weather);
    $('#windspeed').html(windspeed);
    getTemp();
  });
}

$('#toggleTempBtn').click(function(){
    getTemp();
});

function getTemp() {
  var degreeType;
  var degreeTo;
  if(tempMode === "temp_c"){
    tempMode = "temp_f";
    degreeType = "\u00B0F";
    degreeTo = "Celcius?";
    $('#toggleTempBtn').html('Celcius?');
  } else if (tempMode === "temp_f" || tempMode === undefined){
    tempMode = "temp_c";
    degreeType = "\u00B0C";
    degreeTo = "Fahrenheit?";
  }
  $.get( "http://api.wunderground.com/api/your-api-key-here/conditions/q/autoip.json", function( data ) {
    var temperature = data.current_observation[tempMode];
    $('#temperature').html(temperature);
    $('#degreeType').html(degreeType);
    $('#toggleTempBtn').html(degreeTo);
  });
}

Localweather();
