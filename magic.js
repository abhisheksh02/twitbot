var TwitterPackage = require('twitter');

var secret = {
  consumer_key: 'PUT-YOUR-OWN-KEY',
  consumer_secret: 'PUT-YOUR-OWN-KEY',
  access_token_key: 'PUT-YOUR-OWN-KEY',
  access_token_secret: 'PUT-YOUR-OWN-KEY'
}
var Twitter = new TwitterPackage(secret);

var reply;

var arrOfMagicSayings = [
  "Signs point to yes.",
  "Yes.",
  "Reply hazy, try again.",
  "Without a doubt.",
  "My sources say no.",
  "As I see it, yes.",
  "You may rely on it.",
  "Concentrate and ask again.",
  "Outlook not so good.",
  "It is decidedly so.",
  "Better not tell you now.",
  "Very doubtful.",
  "Yes - definitely.",
  "It is certain.",
  "Cannot predict now.",
  "Most likely.",
  "Ask again later.",
  "My reply is no.",
  "Outlook good.",
  "Don't count on it.",
  "You can ask Siri.",
  "I am not that Genius"
]

// Call the stream function and pass in 'statuses/filter', our filter object, and our callback
Twitter.stream('statuses/filter', {track: '#ShowMagic'}, function(stream) {

  // ... when we get tweet data...
  stream.on('data', function(tweet) {

    // print out the text of the tweet that came in
    console.log(tweet.text);

    // calculate the random index (Math.random returns a double between 0 and 1)
    var randomIndex = Math.round(Math.random() * arrOfMagicSayings.length);

    //build our reply string grabbing the string in that randomIndex we've calculated
    var reply = "Hi @" + tweet.user.screen_name + ", " + arrOfMagicSayings[randomIndex];

    //call the post function to tweet something
    Twitter.post('statuses/update', {status: reply},  function(error, tweetReply, response){

      //if we get an error print it out
      if(error){
        console.log(error);
      }

      //print the text of the tweet we sent out
      console.log(tweetReply.text);
    });
  });

        // ... when we get an error...
        stream.on('error', function(error) {
          //print out the error
          console.log(error);
        });
      });
