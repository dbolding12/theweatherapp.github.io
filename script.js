
$(document).ready(function(){
  console.log(moment()); //Console log to view moment.js objects for date|time...
    let m = moment();
      console.log(m); //Moment objects displayed in console...
  //Current date...
    var now = moment().format('MMMM Do YYYY');
      console.log(now);
    var day1 = moment().subtract(1, "days");
      console.log(day1)
  
  //Local Storage and Storage Array...
  var cities = [];
    $("#searchButton").click(function(){
      event.preventDefault();
    var city=$("#city").val();
   //local
    cities.push(city);
    localStorage.setItem("cities", cities);
      console.log(city);

  if(city!=" "){
  
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
             
    //Current Day weather div's...
          $("#currentDay").text("Today's Weather: "+now); 
          $("#cityName").text("City: "+data.name);
          $("#temp").text("Tempature: "+data.main.temp+" F");
          $("#humidity").text("Humidity: "+data.main.humidity+"%");
          $(".card").css({"background-color": "lightblue", "color": "black"})
         
  
    //API request for uv index...
      var uvindex="https://api.openweathermap.org/data/2.5/onecall?lat="+data.coord.lat+"&lon="+data.coord.lon+"&exclude={part}&units=imperial&appid=f6ada7ecf5344a8df2b6fd28e779c600";
        $.ajax({
          url: uvindex,
          method: "GET"
  
        }).then(function(data){
      //console.log uv index api...
          console.log(data);
          console.log(uvindex);
          console.log(data.current.uvi);
          console.log(data.daily[1].temp.day);
      //Adding temp and humidity to div's...
          $("#uvindex").text("UV Index: "+data.current.uvi);
          $("#day2temp").text("Temp: "+data.daily[1].temp.day+" F");
          $("#day3temp").text("Temp: "+data.daily[2].temp.day+" F");
          $("#day4temp").text("Temp: "+data.daily[3].temp.day+" F");
          $("#day5temp").text("Temp: "+data.daily[4].temp.day+" F");
          $("#day6temp").text("Temp: "+data.daily[5].temp.day+" F");
          $("#day2humidity").text("Humidity: "+data.daily[1].humidity+"%");
          $("#day3humidity").text("Humidity: "+data.daily[2].humidity+"%");
          $("#day4humidity").text("Humidity: "+data.daily[3].humidity+"%");
          $("#day5humidity").text("Humidity: "+data.daily[4].humidity+"%");
          $("#day6humidity").text("Humidity: "+data.daily[5].humidity+"%");
          $(".column").css({"background-color": "lightgrey"});
  
          
    //Loop for icon callback...
      for(i=2;i<7;i++){
    //Image icon link...
      var icon = "http://openweathermap.org/img/wn/"+data.daily[i-1].weather[0].icon+"@2x.png";
      $("#icon"+i).attr("src",icon);
        }
      })
    });
    }
  });
});