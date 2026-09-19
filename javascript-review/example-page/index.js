const pokemonList = document.querySelector("#pokemon-list");
const pokemonDetails = document.querySelector("#pokemon-details");
const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=40";

// why these template functions?
// We could have just embedded these template literal strings where we use them...
// But this way we can reuse them and make the code more readable.
function pokemonListTemplate(item) {
  // we need some way of knowing which url to use when a button is clicked.
  // data- is a great way to stash stuff in custom attributes...
  return `<li><button data-url="${item.url}">${item.name}</button></li>`;
}

function pokemonDetailsTemplate(item) {
  return `
    <h2>${item.name}</h2>
    <p>Height: ${item.height}</p>
    <p>Weight: ${item.weight}</p>
    <img src="${item.sprites.front_default}" alt="${item.name}">
    `;
}

// note the use of our template function and Array.map.
// We are transforming a list of objects to a list of html strings.
// perfect job for map
function renderPokemonList(pokemon) {
  const pokemonListHtml = pokemon.map(pokemonListTemplate).join("");
  pokemonList.insertAdjacentHTML("afterbegin", pokemonListHtml);
}

async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
async function pokeListHandler(event) {
  // the element that triggered the event will always be found in event.target
  const pokemonUrl = event.target.dataset.url;
  const list = await getData(pokemonUrl);
  const detailsHtml = pokemonDetailsTemplate(list);
  // why this line?
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
pokemonList.addEventListener("click", pokeListHandler);
init();
