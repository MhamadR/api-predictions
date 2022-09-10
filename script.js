async function fetchBreedData() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    console.log(data.message);
  } catch (e) {
    console.log("There was a problem fetching the breed list.");
  }
}

fetchBreedData();
