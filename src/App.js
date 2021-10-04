import logo from "./pokeball.svg";
import React from "react";

const getPokemonUrl = (pagingFilter) =>
  `https://pokeapi.co/api/v2/pokemon?${pagingFilter}`;

const pokemonCount = fetch(getPokemonUrl()).then((response) =>
  Promise.any([response.json()])

  return response.json().count
);

console.log(pokemonCount);

const getPokemonByIdOrNameUrl = (idOrName) =>
  `https://pokeapi.co/api/v2/pokemon/${idOrName}`;

const generatePokemonPromises = () =>
  Array(150)
    .fill()
    .map((_, index) =>
      fetch(getPokemonByIdOrNameUrl(index + 1)).then((response) =>
        response.json()
      )
    );

const generateHTML = (pokemons) =>
  pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map((typeInfo) => typeInfo.type.name);

    accumulator += `

  <div class="card ${elementTypes[0]}">
    <div class="cardContainer ">
      <div class="front">
        <li class="list">
          <h2 class="card-title">#${id.toString().padStart(3, "0")}</h2>
          <img class="card-image" alt="${name}" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id
      .toString()
      .padStart(3, "0")}.png">  
          <h2 class="card-title">${name}</h2>
          <p class="card-subtitle">${elementTypes.join(" | ")}</p>
          <button type="button" class="btn btn-primary btnViewMore" onclick="viewMore()">View More</button>
        </li>
      </div>
      <div class="back">
        <h2>Abilities:</h2>
        <h2>Stats:</h2>
      </div>
    </div>
  </div>`;

    return accumulator;
  }, "");

const insertPokemonIntoPage = (pokemons) => {
  const ul = document.querySelector('[data-js="pokedex"]');
  ul.innerHTML = pokemons;
};

const pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises).then(generateHTML).then(insertPokemonIntoPage);

//function viewMore() {
//  document.querySelector(div.btnViewMore);
//}

const App = () => {
  return (
    <div class="container">
      <h1>Pokedex</h1>
      <div class="row">
        <div>
          <input
            class="form-control searchBar"
            type="text"
            placeholder="Search for a pokémon by name or id Ex: Pikachu or 25"
          />
        </div>
      </div>
      <ul data-js="pokedex" class="pokedex"></ul>
    </div>
  );
};

export default App;
