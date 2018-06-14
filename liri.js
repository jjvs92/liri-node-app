require("dotenv").config();

var keys = require("./keys.js");
var twitter = require("twitter");
var spotify = require("node-spotify-api")
var request = require("request"); 
var fs = require("fs");
var spotifyClient = new spotify(keys.spotify);
var twitterClient = new twitter(keys.twitter);

var command = process.argv[2];


if(command === "my-tweets"){
    var params = {screen_name: 'Julian80987238',
                count:20};
    twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            // console.log(tweets)
            console.log('');
            console.log('My Last 20 Tweets: ');
            console.log('--------------------------');
            tweets.forEach(function(individualTweet) {
                console.log('Time Posted: ' + individualTweet.created_at);
                console.log('Tweet: ' + individualTweet.text);
                console.log('--------------------------');
            
            });
            
        } else {
            console.log(error);
            };
    })
} else if(command === "spotify-this-song"){
    var track = process.argv[3];
        spotifyClient.search({ type: 'track', query: track }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
            // artists' name
            console.log("The artist for this track is " + data.tracks.items[0].artists[0].name);  
            // Song title
            console.log("The title of this track is " + data.tracks.items[0].name)     
            // Preview link 
            console.log("You can find a preview of the track at " + data.tracks.items[0].preview_url)
            // THe album this track is on 
            console.log("The album this track is on " + data.tracks.items[0].album.name)
        })
} else if(command === "movie-this"){
    var movie = process.argv[3];
    
    if(!movie){
        request("http://www.omdbapi.com/?t=Mr.Nobody&plot=short&apikey=trilogy", function(error, response, body) {

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {
          
              console.log("Movie title: " + JSON.parse(body).Title);
              console.log("Year the movie came out: " + JSON.parse(body).Year);
              console.log("IMDB rating of  movie: " + JSON.parse(body).imdbRating);
              console.log("Rotten tomatoes rating of movie: " + JSON.parse(body).Ratings[1].Value);
              console.log("Movie was produced in: " + JSON.parse(body).Country);
              console.log("Available languages: " + JSON.parse(body).Language);
              console.log("movie plot: " + JSON.parse(body).Plot);
              console.log("Actors: " + JSON.parse(body).Actors);        

            }
        })
    } else {
        request("http://www.omdbapi.com/?t=" + movie + "&plot=short&apikey=trilogy", function(error, response, body) {

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {
        
                console.log("Movie title: " + JSON.parse(body).Title);
                console.log("Year the movie came out: " + JSON.parse(body).Year);
                console.log("IMDB rating of  movie: " + JSON.parse(body).imdbRating);
                console.log("Rotten tomatoes rating of movie: " + JSON.parse(body).Ratings[1].Value);
                console.log("Movie was produced in: " + JSON.parse(body).Country);
                console.log("Available languages: " + JSON.parse(body).Language);
                console.log("movie plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
            }
        })
    }         
} else if(command === "do-what-it-says"){
    fs.readFile("random.txt", "utf8", function(error, data){
        if(error){
            console.log("Error");
        } else{
            console.log(data);
            var dataArr = data.split(",");
            console.log(dataArr);
            console.log(dataArr[0]);
        }
    })
}
