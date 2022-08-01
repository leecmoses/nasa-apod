"use strict";

// NASA API
const count = 10;
const apiKey = "DEMO_KEY";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

// Get 10 Images from NASA API
const getNasaPictures = async () => {
  try {
    const resp = await fetch(apiUrl);
    resultsArray = await resp.json();
    console.log(resultsArray);
  } catch (err) {
    // Catch Error Here
  }
};

// Onload
getNasaPictures();
