console.log('===FILE :: public/index.js');

var getWeather = function(cityInput, sunrizeInput, sunsetInput){
    console.log('===getWeather');
    var $cityInput = $(cityInput);
    var cityName = $cityInput.val();
    var $sunrizeInput = $(sunrizeInput);
    var $sunsetInput = $(sunsetInput);

    $.ajax({
        method: "GET",
        url: "/getWeather",
        data: { city: cityName}
    })
    .done(function(data) {
        console.log('===getWeather :: ajax done');
        var astronomy = (data && data.query && data.query.results && data.query.results.channel)
            ?  data.query.results.channel.astronomy
            : { sunrise: 'not available',
                sunset: 'not available'
            };
        $sunrizeInput.text(astronomy.sunrise);
        $sunsetInput.text(astronomy.sunset);
    });
};

$(document).ready(function(){
    console.log('===jQuery :: ready');

    var bttn = $('#getWeatherBttn');
    bttn.click(function(){
        getWeather('#getWeatherInput', '#sunrise', '#sunset');
    });
});