const BREEDS_URL = "https://dog.ceo/api/breeds/image/random";
const BREEDS_URL_LIST = "https://dog.ceo/api/breeds/list/all";
const select = document.querySelector(".breeds");
const img = document.querySelector(".dog-img");
const spinner = document.querySelector(".spinner");

// Function to fetch and display a random dog image
function addDoggo() {
  // Show loading spinner
  spinner.classList.add("show");

  fetch(BREEDS_URL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const img = document.createElement("img");
      img.src = data.message;
      img.alt = "Cute doggo";

      // Append the image to the 'doggos' container
      document.querySelector(".doggos").appendChild(img);

      // Hide loading spinner
      spinner.classList.remove("show");
    });
}

// Event listener for adding a doggo
document.querySelector(".add-doggo").addEventListener("click", addDoggo);

// Function to populate the breed select dropdown
function populateBreedList() {
  fetch(BREEDS_URL_LIST)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const breedsObject = data.message;
      const breedsArray = Object.keys(breedsObject);

      for (let i = 0; i < breedsArray.length; i++) {
        const option = document.createElement("option");
        option.value = breedsArray[i];
        option.innerText = breedsArray[i];
        select.appendChild(option);
      }
    });
}

// Event listener for breed selection
select.addEventListener("change", function (event) {
  const selectedBreed = event.target.value;

  // Create the URL for fetching a random image of the selected breed
  const url = `https://dog.ceo/api/breed/${selectedBreed}/images/random`;

  // Show loading spinner
  spinner.classList.add("show");

  // Fetch and display the dog image
  getDoggo(url);
});

// Function to fetch and display a dog image based on the provided URL
function getDoggo(url) {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      img.src = data.message;
    })
    .finally(function () {
      // Hide loading spinner
      spinner.classList.remove("show");
    });
}

// Event listener to show the image once it's loaded
img.addEventListener("load", function () {
  img.classList.add("show");
});

// Populate the breed list on page load
populateBreedList();
