require("dotenv").config();

var keys = require("./keys.js");
var twitter = require("twitter");
var spotify = require("node-spotify-api")
var request = require("request"); 
var fs = require("fs");
var spotifyClient = new spotify(keys.spotify);
var twitterClient = new twitter(keys.twitter);
var nodeArgs = process.argv;
var command = process.argv[2];
var track= "";
var movie= "";
var spotParam = process.argv[3];


if(command === "my-tweets"){
    var params = {screen_name: 'Julian80987238',
                count:20};
    twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            // console.log(tweets)
            console.log("");
            console.log("My Last 20 Tweets: " +"\n--------------------------");
            tweets.forEach(function(individualTweet) {
                console.log("Time Posted: " + individualTweet.created_at + "\nTweet: " + individualTweet.text + "\n--------------------------");            
            });
            
        } else {
            console.log(error);
            };
    })
} else if(command === "spotify-this-song"){
        for(var i =3; i < nodeArgs.length; i++){
            track += nodeArgs[i] + " ";
        } 
        if (!spotParam){
            // console.log("test");
            spotifyClient.search({ type: 'track', query: "The Sign"}, function(err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                    // artists' name
                    console.log("The artist for this track is " + data.tracks.items[6].artists[0].name);  
                    // Song title
                    console.log("The title of this track is " + data.tracks.items[6].name)     
                    // Preview link 
                    console.log("You can find a preview of the track at " + data.tracks.items[6].preview_url)
                    // THe album this track is on 
                    console.log("The album this track is on " + data.tracks.items[6].album.name)
                })            

                           

        }else{
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
        })}
} else if(command === "movie-this"){
    for(var i = 3; i < nodeArgs.length; i++){
        movie += nodeArgs[i] + " ";
    }
    console.log(movie)
    
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
              console.log("Actors: " + JSON.parse(body).Actors + "\n");        

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
                console.log("Actors: " + JSON.parse(body).Actors + "\n");
            }
        })
    }         
} else if(command === "do-what-it-says"){
    fs.readFile("random.txt", "utf8", function(error, data){
        if(error){
            console.log("Error");
        } else{
            var dataArr = data.split(",");
            track = dataArr[1];
 
            console.log(track);
            spotifyClient.search({ type: 'track', query: track}, function(err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                    // artists' name
                    console.log("The artist for this track is " + data.tracks.items[6].artists[0].name);  
                    // Song title
                    console.log("The title of this track is " + data.tracks.items[6].name)     
                    // Preview link 
                    console.log("You can find a preview of the track at " + data.tracks.items[6].preview_url)
                    // THe album this track is on 
                    console.log("The album this track is on " + data.tracks.items[6].album.name)
                })               

        }
    })
}
