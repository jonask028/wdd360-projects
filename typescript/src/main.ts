const baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0";

interface Pokemon {
  results: {
    name: string;
    url: string;
  }[];
}

interface PokemonDetails {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
}

async function getPokemon() {
  const pokemonResponse = await fetch(baseUrl);
  const pokemonData: Pokemon = await pokemonResponse.json();
  return pokemonData;
}

async function getPokemonDetails(url: string = "") {
  const pokemonResponse = await fetch(url);
  const pokemonData: PokemonDetails = await pokemonResponse.json();
  return pokemonData;
}

function toTitleCase(string: string) {
  const titleString = string.charAt(0).toUpperCase() + string.slice(1);
  return titleString;
}

function pokemonDetailsTemplate(pokemonDetails: PokemonDetails) {
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

function pokemonNameImgTemplate(pokemonDetails: PokemonDetails) {
  const nameTitleCase = toTitleCase(pokemonDetails.name);
  return `<row class="big-text">${nameTitleCase}</row><row><img src="${pokemonDetails.sprites.front_default}"></img></row>`;
}

const pokemonData = await getPokemon();

const pageTitle = document.getElementById("pageTitle");

const sectionContainer = document.getElementById("pokemonData");

async function renderList() {
  if (!sectionContainer || !pageTitle) {
    throw new Error("sectionContainer or pageTitle not found");
  }
  sectionContainer.innerHTML = "";
  sectionContainer.className = "listView";

  pageTitle.textContent = "Pokemon List";
  if ("results" in pokemonData) {
    for (const pokemon of pokemonData.results) {
      const pokemonDetails = await getPokemonDetails(pokemon.url);

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
}

function renderDetail(pokemonDetails: PokemonDetails) {
  if (!sectionContainer || !pageTitle) {
    throw new Error("sectionContainer or pageTitle not found");
  }
  pageTitle.textContent = toTitleCase(pokemonDetails.name);
  sectionContainer.className = "detailsView";
  sectionContainer.innerHTML = pokemonDetailsTemplate(pokemonDetails);

  const backButton = document.createElement("button");
  backButton.textContent = "Back to list";
  backButton.addEventListener("click", renderList);

  sectionContainer.prepend(backButton);
}

renderList();
