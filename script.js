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
  console.log(name);

  predictGender(name);
}

async function predictGender(name) {
  try {
    const response = await fetch(`https://api.genderize.io/?name=${name}`);
    const data = await response.json();
    document.getElementById("gender").innerText = data.gender;
    console.log(data.gender);
  } catch (e) {
    console.log("There was a problem fetching the breed list.");
  }
}
