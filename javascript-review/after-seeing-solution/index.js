const baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0";

async function getData(url = "") {
  let pokemonResponse = {};
  if (url != "") {
    pokemonResponse = await fetch(url);
  } else {
    pokemonResponse = await fetch(baseUrl);
  }
  const pokemonData = await pokemonResponse.json();
  return pokemonData;
}

function toTitleCase(string) {
  const titleString = string.charAt(0).toUpperCase() + string.slice(1);
  return titleString;
}

function pokemonDetailsTemplate(pokemonDetails) {
  return `
  <row>
    <imgContainer>
      <row><img class="big-image" src="${pokemonDetails.sprites.front_default}"></img></row>
    </imgContainer>
    <sidebar>
      <row>Height: ${pokemonDetails.height}</row>
      <row>Weight: ${pokemonDetails.weight}</row>
      <row>HP: ${pokemonDetails.stats[0].base_stat}</row>
      <row>ATK: ${pokemonDetails.stats[1].base_stat}</row>
      <row>DEF: ${pokemonDetails.stats[2].base_stat}</row>
      <row>SPATK: ${pokemonDetails.stats[3].base_stat}</row>
      <row>SPDEF: ${pokemonDetails.stats[4].base_stat}</row>
      <row>SPD: ${pokemonDetails.stats[5].base_stat}</row>
    </sidebar>
  </row>
  `;
}

function pokemonNameImgTemplate(pokemonDetails) {
  const nameTitleCase = toTitleCase(pokemonDetails.name);
  return `<row class="big-text">${nameTitleCase}</row><row><img src="${pokemonDetails.sprites.front_default}"></img></row>`;
}

const pokemonData = await getData();

const pageTitle = document.getElementById("pageTitle");

const sectionContainer = document.getElementById("pokemonData");

async function renderList() {
  sectionContainer.innerHTML = "";
  sectionContainer.className = "listView";

  pageTitle.textContent = "Pokemon List";

  for (const pokemon of pokemonData.results) {
    const pokemonDetails = await getData(pokemon.url);

    const nameImgElement = document.createElement("column");
    nameImgElement.innerHTML = pokemonNameImgTemplate(pokemonDetails);
    nameImgElement.className = "border";

    const rowContainer = document.createElement("row");
    rowContainer.addEventListener("click", () => {
      renderDetail(pokemonDetails);
    });
    rowContainer.appendChild(nameImgElement);
    rowContainer.className = "interactable";

    sectionContainer.appendChild(rowContainer);
  }
}

function renderDetail(pokemonDetails) {
  pageTitle.textContent = toTitleCase(pokemonDetails.name);
  sectionContainer.className = "detailsView";
  sectionContainer.innerHTML = pokemonDetailsTemplate(pokemonDetails);

  const backButton = document.createElement("button");
  backButton.textContent = "Back to list";
  backButton.addEventListener("click", renderList);

  sectionContainer.prepend(backButton);
}

renderList();
