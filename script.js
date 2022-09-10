//  when the document loads, display a random dog pic of the initially selected breed
window.onload = loadByBreed("affenpinscher");

// Get a list of all the breeds available in the api
async function fetchBreedData() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    createBreedList(data.message);
  } catch (e) {
    console.log("There was a problem fetching the breed list.");
  }
}

fetchBreedData();

// Creating a dropdown (select) menu of all the breeds
function createBreedList(breedList) {
  document.getElementById("breedListContainer").innerHTML = `
  <select onchange="loadByBreed(this.value)">
        ${Object.keys(breedList)
          .map(function (breed) {
            return `<option>${breed}</option>`;
          })
          .join("")}
      </select>
  `;
}

// Displaying a random dog picture based on the breed selected
async function loadByBreed(breed) {
  try {
    const response = await fetch(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );
    const data = await response.json();
    const randBreedPic = data.message;
    document.getElementById(
      "breedPic"
    ).style.backgroundImage = `url(${randBreedPic})`;
  } catch (e) {
    console.log(
      "There was a problem fetching the api for random dog pictures."
    );
  }

  // setInterval(function () {
  //   loadByBreed(breed);
  // }, 10000);
}

// Taking the input name to call the prediction functions
function predict() {
  const name = document.getElementById("name").value;

  predictGender(name);
  predictAge(name);
  predictNationality(name);
}

// Fetching and displaying gender prediction
async function predictGender(name) {
  try {
    const response = await fetch(`https://api.genderize.io/?name=${name}`);
    const data = await response.json();
    document.getElementById("gender").innerText = "Gender: " + data.gender;
  } catch (e) {
    console.log("There was a problem fetching the gender prediction api.");
  }
}

// Fetching and displaying age prediction
async function predictAge(name) {
  try {
    const response = await fetch(`https://api.agify.io/?name=${name}`);
    const data = await response.json();
    document.getElementById("age").innerText = "Age: " + data.age;
  } catch (e) {
    console.log("There was a problem fetching the age prediction api.");
  }
}

// Fetching and displaying nationality prediction with its corresponding age
async function predictNationality(name) {
  const nationality = document.getElementById("nationality");
  nationality.innerHTML = "";
  try {
    const response = await fetch(`https://api.nationalize.io/?name=${name}`);
    const data = await response.json();
    for (i in data.country) {
      nationality.innerHTML += ` 
        <p>Nationality: ${data.country[i].country_id}, Probability: ${data.country[i].probability}</p>`;
    }
  } catch (e) {
    console.log("There was a problem fetching the nationality prediction api.");
  }
}
