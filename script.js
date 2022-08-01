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
let favorites = {};

const showContent = (page) => {
  window.scrollTo({
    top: 0,
    behavior: "instant",
  });
  // Show nav depending on page
  if (page === "results") {
    resultsNav.classList.remove("hidden");
    favoritesNav.classList.add("hidden");
  } else {
    resultsNav.classList.add("hidden");
    favoritesNav.classList.remove("hidden");
  }
  loader.classList.add("hidden");
};

const createDOMNodes = (page) => {
  const currentArray =
    page === "results" ? resultsArray : Object.values(favorites);
  currentArray.forEach((apod) => {
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
    if (page === "results") {
      saveText.textContent = "Add to Favorites";
      saveText.setAttribute("onclick", `saveFavorite('${apod.url}')`);
    } else {
      saveText.textContent = "Remove From Favorites";
      saveText.setAttribute("onclick", `removeFavorite('${apod.url}')`);
    }

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
    const copyrightResult = apod.copyright === undefined ? "" : apod.copyright;
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

const updateDOM = (page) => {
  // Get Favorites from localStorage
  if (localStorage.getItem("nasaFavorites")) {
    favorites = JSON.parse(localStorage.getItem("nasaFavorites"));
  }
  imagesContainer.textContent = "";
  createDOMNodes(page);
  showContent(page);
};

// Get 10 Images from NASA API
const getNasaPictures = async () => {
  // Show loader
  loader.classList.remove("hidden");
  try {
    const resp = await fetch(apiUrl);
    resultsArray = await resp.json();
    updateDOM("results");
  } catch (err) {
    // Catch Error Here
    console.log(err);
  }
};

const saveFavorite = (itemUrl) => {
  // Loop thru Results Array to select Favorite
  resultsArray.forEach((apod) => {
    if (apod.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = apod;
      // Show save confirmation for 2 seconds
      saveConfirmed.hidden = false;
      setTimeout(() => {
        saveConfirmed.hidden = true;
      }, 2000);
      // Set Favorites in localStorage
      localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    }
  });
};

const removeFavorite = (itemUrl) => {
  if (favorites[itemUrl]) {
    delete favorites[itemUrl];
    // Set Favorites in localStorage
    localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    updateDOM("favorites");
  }
};

// Onload
getNasaPictures();
