function LocalWeather() {
    $.get( "http://api.wunderground.com/api/your-api-key-here/conditions/q/autoip.json", function( data ) {
    var city = data.current_observation.display_location.city;
    var icon_url = data.current_observation.icon_url;
    var weather = "Sky is "+ data.current_observation.weather;
    var windspeed = "Windspeed: " + data.current_observation.wind_kph + " kph";
    $('#city').html(city);
    console.log(icon_url);
    $('#weatherIcon').attr('src', icon_url);
    $('#weather').html(weather);
    $('#windspeed').html(windspeed);
  });
  this.getTemp();
}

LocalWeather.prototype.toggleTemp = function() {
    if(this.tempMode === "temp_c"){
    this.tempMode = "temp_f";
    this.degreeType = "\u00B0F";
    this.degreeTo = "Celcius?";
    $('#toggleTempBtn').html(this.degreeTo);
  } else if (this.tempMode === "temp_f" || this.tempMode === undefined){
    this.tempMode = "temp_c";
    this.degreeType = "\u00B0C";
    this.degreeTo = "Fahrenheit?";
    $('#toggleTempBtn').html(this.degreeTo);
  }
  return [ this.tempMode, this.degreeType, this.degreeTo ];
};

LocalWeather.prototype.getTemp = function() {
  $.get( "http://api.wunderground.com/api/your-api-key-here/conditions/q/autoip.json", function( data ) {
    var tempArr = weather.toggleTemp();
    var temperature = data.current_observation[tempArr[0]];
    $('#temperature').html(temperature);
    $('#degreeType').html(tempArr[1]);
    $('#toggleTempBtn').html(tempArr[2]);
  });
};

weather = new LocalWeather();

$('#toggleTempBtn').click(function(){
  weather.getTemp();
});
