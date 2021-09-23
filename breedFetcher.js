const request = require('request');
//const fs = require('fs');

//intake only the necessary arguments
let myArgs = process.argv.slice(2);
let catTypeInput = myArgs[0];

let URL = 'https://api.thecatapi.com/v1/breeds/search?q=' + catTypeInput;

request(URL, (error, response, body) => {
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body, typeof(body)); // Print the HTML for the Google homepage.

  //Edge Case: Request Failed
  if (error !== null) {
    console.log('error:', error); // Print the error if one occurred
    process.exit();
  }

  //Edge Case: Breed Not Found
  if (body === "[]") {
    console.log("We couldn't find a breed that matches your search. Please check your spelling and try again.");
    process.exit();
  }

  const data = JSON.parse(body);
  //console.log(data);
  //console.log(typeof data);

  //print out description
  let catDescription = data[0].description;
  console.log(catDescription);
});

