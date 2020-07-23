
$(document).ready(function(){
console.log(moment()); //Console log to view moment.js objects for date|time...
  let m = moment();
console.log(m); //Moment objects displayed in console...
  var now = moment().format('MMMM Do YYYY');
  //Current date
console.log(now);
$("#currentDay").text(now); 


var cities = [];
  $("#searchButton").click(function(){
    event.preventDefault();
  var city=$("#city").val();
 
  cities.push(city);
  localStorage.setItem("cities", cities);
    console.log(city);

//Api request for 5 day forecast...
   var queryURL="https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=f6ada7ecf5344a8df2b6fd28e779c600";
          
   $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(data) {
          console.log(data);
          console.log(queryURL);
          console.log(data.name);
          console.log(data.main.temp);
          console.log(data.main.humidity);
          console.log(data.coord.lat);
          console.log(data.coord.lon);
           
      //Current Day weather...
        $("#cityName").text("City: "+data.name);
        $("#temp").text("temp: "+data.main.temp);
        $("#humidity").text("humidity: "+data.main.humidity);
       

  //API request for uv index...
    var uvindex="https://api.openweathermap.org/data/2.5/onecall?lat="+data.coord.lat+"&lon="+data.coord.lon+"&exclude={part}&appid=f6ada7ecf5344a8df2b6fd28e779c600";
      $.ajax({
        url: uvindex,
        method: "GET"

      }).then(function(data){
        console.log(data);
        console.log(uvindex);
        console.log(data.current.uvi);
        console.log(data.daily[1].temp.day);
        console.log()
        $("#uvindex").text("UV Index: "+data.current.uvi);
        $("#day2temp").text("Tempature: "+data.daily[1].temp.day);
        $("#day3temp").text("Tempature: "+data.daily[2].temp.day);
        $("#day4temp").text("Tempature: "+data.daily[3].temp.day);
        $("#day5temp").text("Tempature: "+data.daily[4].temp.day);
        $("#day6temp").text("Tempature: "+data.daily[5].temp.day);
        $("#day2humidity").text("Humidity: "+data.daily[1].humidity);
        $("#day3humidity").text("Humidity: "+data.daily[2].humidity);
        $("#day4humidity").text("Humidity: "+data.daily[3].humidity);
        $("#day5humidity").text("Humidity: "+data.daily[4].humidity);
        $("#day6humidity").text("Humidity: "+data.daily[5].humidity);

        
  //Loop for icon callback...
    for(i=2;i<7;i++){
  //Image icon link...
    var icon = "http://openweathermap.org/img/wn/"+data.daily[i-1].weather[0].icon+"@2x.png";
    $("#icon"+i).attr("src",icon);
  }
  })
        
    });



  
  });
      });