require("dotenv").config();
var axios = require("axios")
var moment = require('moment');
var fs = require('file-system');


var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var work = process.argv.splice(3, process.argv.length - 1).join('+');

switch(command){
  case "concert-this":
    concert()
    break;

  case "movie-this":
    movie()
    break;

  case "spotify-this-song":
    music()
    break;

  case "do-what-it-says":
    readfile();
    break;

}


function concert(){
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
  
}

function movie(){
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

function music(){

    spotify
    .search({ type: 'track', query: work })
    .then(function(response) {
      var data = response.tracks.items[0];
      var artists = [];
      for (var key in data.artists){
        artists.push(data.artists[key].name);
      }
      console.log("Artist(s): " + artists.join(", "));

      console.log("Track: " + data.name);
      console.log("Preview: " + data.preview_url);
      console.log("Album: " + data.album.name);
    })
    .catch(function(err) {
      console.log(err);
    });
  
};

function readfile(){

    fs.readFile("random.txt", "utf8", function(error, data) {

      if (error) return console.log(error);
      
      data = data.split(",");
      command = data[0];
      work = data[1];

      if (command === "concert-this"){concert();}
      if (command === "movie-this"){movie();}
      if (command === "spotify-this-song"){music();}
    });
  
}