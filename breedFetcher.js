const request = require('request');

const fetchBreedDescription = function(breedName, callback) {
  let URL = 'https://api.thecatapi.com/v1/breeds/search?q=' + breedName;

  request(URL, (error, response, body) => {
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body, typeof(body)); // Print the HTML for the Google homepage.
  
    //Edge Case: Request Failed
    if (error !== null) {
      callback(error, null); //return with auto-generated error message
      process.exit(); //end script
    }
  
    //Edge Case: Breed Not Found
    if (body === "[]") {
      //set the error to a custom message
      error = "We couldn't find a breed that matches your search. Please check your spelling and try again.";
      callback(error, null); //return custom error to index.js
      process.exit(); //end script
    }
    
    //if there are not any errors (that is, error=null in this case)
    const data = JSON.parse(body);
    //parse for description, and input it to cb to return to index.js
    let catDescription = data[0].description;
    callback(null, catDescription);
  });
};

module.exports = { fetchBreedDescription };
