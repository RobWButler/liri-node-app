require("dotenv").config();
var axios = require("axios")
var moment = require('moment');

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);



var command = process.argv[2];
var work = process.argv.splice(3, process.argv.length - 1).join('+');


if (command === "concert-this"){
    queryUrl = "https://rest.bandsintown.com/artists/" + work + "/events?app_id=codingbootcamp"

    axios
    .get(queryUrl)
    .then(function(response) {
      var data = response.data
      var band = work.toUpperCase().split("+").join(" ");
      console.log(band + " UPCOMING CONCERTS")
      console.log("=====================================")
      for (var key in data) {
        var time = moment(data[key].datetime).format("MM/DD/YYYY")
        var venue = data[key].venue.name
        var location = data[key].venue.city + ", " + data[key].venue.country
        console.log(venue + " " + time + " " + location)
        console.log("=====================================")
        }
    })
    .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
    })
};


if (command === "movie-this"){
  var queryUrl = "http://www.omdbapi.com/?t=" + work + "&y=&plot=short&apikey=trilogy";

  axios
.get(queryUrl)
.then(function(response) { 
    var data = response.data;
    console.log(data.Title);
    console.log("Released in " + data.Year);
    console.log("IMDB rating: " + data.Ratings[0].Value);
    console.log("RT rating: " + data.Ratings[1].Value);
    console.log("Country: " + data.Country);
    console.log("Language: " + data.Language);
    console.log("Plot: " + data.Plot);
    console.log("Actors: " + data.Actors);

})
.catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
})
}

if (command === "spotify-this-song") {
  
  spotify
  .search({ type: 'track', query: work })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });
}