const pokemonList = document.querySelector("#pokemon-list");
const pokemonDetails = document.querySelector("#pokemon-details");
const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=40";

interface Pokemon {
  name: string;
  url: string;
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

// why these template functions?
// We could have just embedded these template literal strings where we use them...
// But this way we can reuse them and make the code more readable.
function pokemonListTemplate(pokemon: Pokemon) {
  // we need some way of knowing which url to use when a button is clicked.
  // data- is a great way to stash stuff in custom attributes...
  return `<li><button data-url="${pokemon.url}">${pokemon.name}</button></li>`;
}

function pokemonDetailsTemplate(pokemonDetails: PokemonDetails) {
  return `
    <h2>${pokemonDetails.name}</h2>
    <p>Height: ${pokemonDetails.height}</p>
    <p>Weight: ${pokemonDetails.weight}</p>
    <img src="${pokemonDetails.sprites.front_default}" alt="${pokemonDetails.name}">
    `;
}

// note the use of our template function and Array.map.
// We are transforming a list of objects to a list of html strings.
// perfect job for map
function renderPokemonList(pokemon: Pokemon[]) {
  const pokemonListHtml = pokemon.map(pokemonListTemplate).join("");
  pokemonList!.insertAdjacentHTML("afterbegin", pokemonListHtml);
}

async function getData(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
async function pokeListHandler(event: Event) {
  // the element that triggered the event will always be found in event.target
  const pokemonEventResponse = event.target as HTMLElement;
  const pokemonUrl = pokemonEventResponse.dataset.url;
  if (!pokemonUrl) {
    throw new Error("pokemonUrl not found");
  }
  const list = await getData(pokemonUrl);
  const detailsHtml = pokemonDetailsTemplate(list);
  // why this line?
  if (!pokemonDetails) {
    throw new Error("pokemonDetails not found");
  }
  pokemonDetails.innerHTML = "";
  pokemonDetails.insertAdjacentHTML("afterbegin", detailsHtml);
}
async function init() {
  const data = await getData(apiUrl);
  const pokemon = data.results;
  renderPokemonList(pokemon);
}
// we attach the listener to the list instead of the items.
// then we only have to do it once, instead of everytime we render the list.
pokemonList!.addEventListener("click", pokeListHandler);
init();
