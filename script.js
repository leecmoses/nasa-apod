"use strict";

const resultsNav = document.getElementById("resultsNav");
const favoritesNav = document.getElementById("favoritesNav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

// NASA API
const count = 10;
const apiKey = "DEMO_KEY";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

const updateDOM = () => {
  resultsArray.forEach((apod) => {
    // Card Container
    const card = document.createElement("div");
    card.classList.add("card");

    // Link
    const link = document.createElement("a");
    link.href = apod.hdurl;
    link.title = "View Full Images";
    link.target = "_blank";

    // Image
    const image = document.createElement("img");
    image.classList.add("card-img-top");
    image.src = apod.url;
    image.alt = "NASA Picture of the Day";
    image.loading = "lazy";

    // Card Body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    // Card Title
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = apod.title;

    // Save Text
    const saveText = document.createElement("p");
    saveText.classList.add("clickable");
    saveText.textContent = "Add to Favorites";

    // Card Text
    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = apod.explanation;

    // Footer container
    const footer = document.createElement("small");
    footer.classList.add("text-muted");

    // Date
    const date = document.createElement("strong");
    date.textContent = apod.date;

    // Copyright
    const copyrightResult =
      result.copyright === undefined ? "" : result.copyright;
    const copyright = document.createElement("copyright");
    copyright.textContent = ` ${copyrightResult}`;

    // Append
    footer.append(date, copyright);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  });
};

// Get 10 Images from NASA API
const getNasaPictures = async () => {
  try {
    const resp = await fetch(apiUrl);
    resultsArray = await resp.json();
    updateDOM();
  } catch (err) {
    // Catch Error Here
  }
};

// Onload
getNasaPictures();
