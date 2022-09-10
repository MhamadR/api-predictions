window.onload = loadByBreed("affenpinscher");
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

async function loadByBreed(breed) {
  const response = await fetch(
    `https://dog.ceo/api/breed/${breed}/images/random`
  );
  const data = await response.json();
  const randBreedPic = data.message;
  document.getElementById(
    "breedPic"
  ).style.backgroundImage = `url(${randBreedPic})`;
}

function predict() {
  const name = document.getElementById("name").value;

  predictGender(name);
  predictAge(name);
  predictNationality(name);
}

async function predictGender(name) {
  try {
    const response = await fetch(`https://api.genderize.io/?name=${name}`);
    const data = await response.json();
    document.getElementById("gender").innerText = "Gender: " + data.gender;
  } catch (e) {
    console.log("There was a problem fetching the gender prediction api.");
  }
}

async function predictAge(name) {
  try {
    const response = await fetch(`https://api.agify.io/?name=${name}`);
    const data = await response.json();
    document.getElementById("age").innerText = "Age: " + data.age;
  } catch (e) {
    console.log("There was a problem fetching the age prediction api.");
  }
}

async function predictNationality(name) {
  const nationality = document.getElementById("nationality");
  if (!nationality.innerHTML) {
    try {
      const response = await fetch(`https://api.nationalize.io/?name=${name}`);
      const data = await response.json();
      for (i in data.country) {
        nationality.innerHTML += ` 
        <p>Nationality: ${data.country[i].country_id}, Probability: ${data.country[i].probability}</p>`;
      }
    } catch (e) {
      console.log(
        "There was a problem fetching the nationality prediction api."
      );
    }
  }
}
