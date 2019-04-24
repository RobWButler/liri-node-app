require("dotenv").config();
var axios = require("axios")

var keys = require("./keys.js");


var command = process.argv[2];
var artist = process.argv.splice(3, process.argv.length - 1).join('+');
console.log(artist)

if (command ==="concert-this"){
    queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios
    .get(queryUrl)
    .then(function(response) {
        console.log(response.data);
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