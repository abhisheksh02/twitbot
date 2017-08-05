var TwitterPackage = require('twitter');

var secret = {
  consumer_key: 'PUT-YOUR-OWN-KEY',
  consumer_secret: 'PUT-YOUR-OWN-KEY',
  access_token_key: 'PUT-YOUR-OWN-KEY',
  access_token_secret: 'PUT-YOUR-OWN-KEY'
}
var Twitter = new TwitterPackage(secret);




//Basic Reply
// Call the stream function and pass in 'statuses/filter', our filter object, and our callback
Twitter.stream('statuses/filter', {track: '#HelloAbhishek'}, function(stream) {

  // ... when we get tweet data...
  stream.on('data', function(tweet) {

    // print out the text of the tweet that came in
    console.log(tweet.text);

    //build our reply object
    var statusObj = {status: "Hi @" + tweet.user.screen_name + ", How are you?"}

    //call the post function to tweet something
    Twitter.post('statuses/update', statusObj,  function(error, tweetReply, response){

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

//Tip Calculator

// Call the stream function and pass in 'statuses/filter', our filter object, and our callback
Twitter.stream('statuses/filter', {track: '#CalculateTip'}, function(stream) {

  // ... when we get tweet data...
  stream.on('data', function(tweet) {

    // print out the text of the tweet that came in
    console.log(tweet.text);

    //split up the tweet's text
    var tipArr = tweet.text.split(" ");

    // turn those Strings in to a floats
    var percent = parseFloat(tipArr[0]);
    var amount = parseFloat(tipArr[1]);

    // calculate the tip amount
    var tipAmount = percent * amount;

    //build our reply string
    var reply = "Hi @" + tweet.user.screen_name + ", " + (percent*100) + "% of $" + amount.toFixed(2) + " is $" + tipAmount.toFixed(2) + ". That's a total of: $" + (tipAmount+amount).toFixed(2) +"!";

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

//Basic Calculator

// Call the stream function and pass in 'statuses/filter', our filter object, and our callback
Twitter.stream('statuses/filter', {track: '#CalculatorGenius'}, function(stream) {

  // ... when we get tweet data...
  stream.on('data', function(tweet) {

    // print out the text of the tweet that came in
    console.log(tweet.text);

    //split up the tweet's text
    var calcArr = tweet.text.split(" ");

    // saving our calculator function
    var func = calcArr[0];

    // turn those Strings in to a floats
    var opp1 = parseFloat(calcArr[1]);
    var opp2 = parseFloat(calcArr[2]);
    var answer;

    switch (func) {
      case "Add": answer = opp1 + opp2;
                  break;

      case "Divide": if(opp2==0){
        answer = "Cannot Divide";
      }
      else{
        answer = opp1/opp2;
      }
      break;

      case "Difference": answer = opp1 - opp2;
      break;

      case "Multiply": answer = opp1 * opp2;
      break;

      case "Equal": if(opp1 === opp2){
        answer = opp1 + " and " + opp2 + " are equal numbers."
      }else {
        answer = opp1 + " and " + opp2 + " are not equal numbers."
      }
      break;

      default: answer = "You did not mention the Case correctly. Please try again!";

    }

    var reply = "Hi @" + tweet.user.screen_name + ", your answer is " + answer + " #AskAgain";

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


//Random Number Generator

// Call the stream function and pass in 'statuses/filter', our filter object, and our callback
Twitter.stream('statuses/filter', {track: '#RandomNumber'}, function(stream) {

  // ... when we get tweet data...
  stream.on('data', function(tweet) {

    // print out the text of the tweet that came in
    console.log(tweet.text);

    //split up the tweet's text
    var tipArr = tweet.text.split(" ");

    // turn those Strings in to a floats
    var lowerBound = parseInt(tipArr[0]);
    var upperBound = parseInt(tipArr[1]);

    // calculate the random number (Math.random returns a double between 0 and 1)
    var randomNum = Math.random() * (upperBound - lowerBound) + lowerBound;

    //build our reply string
    var reply = "Hi @" + tweet.user.screen_name + ", a random number between " + tipArr[0] + " and " + tipArr[1] + " is " + Math.round(randomNum) + "!";

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

//Magic 8 ball

// we will randomly pick one of these items in this array
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
  "Don't count on it."
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
