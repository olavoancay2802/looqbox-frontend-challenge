import pokemonService from "./services.js"
import pokeball from "./pokeball.svg";
import React from "react";

function generateBasicHTML(pokemons) {
  const cards = [];

  pokemons.forEach((pokemon) => {
    cards +=
      `<div class="card">
      <div class="cardContainer">
        <div class="front">
          <li class="list">
            <img class="card-image" src=${pokeball}>  
            <h2 class="card-title">${pokemon.name}</h2>
            <button type="button" class="btn btn-primary btnViewMore" onclick="viewMore()">View More</button>
          </li>
        </div>
      </div>
    </div>`;

    return cards;
  }, '');
}

function generatePokemonCardDetailedView(pokemon) {
  const types = pokemon.types.map((typeInfo) => typeInfo.type.name);

  const card =
    `<li class="card">
        <img class="card-image" alt="${pokemon.name}" src="${pokemon.sprites.other.official_artwork}">  
          <h2 class="card-title">${pokemon.name}</h2>
          <p class="card-subtitle">${types.join(" | ")}</p>
          <button type="button" class="btn btn-primary btnViewMore" onclick="viewMore()">View More</button>
      </li>`;

  return card;
}

function insertPokemonsIntoPage (html) {
  const ul = document.querySelector('[data-js="pokedex"]');
  ul.innerHTML = html;
};

const pokemonCount = pokemonService.getPokemonCount();
const pokemons = pokemonService.getPokemons(`limit=${pokemonCount}`);
const basicHTML = generateBasicHTML(pokemons)

insertPokemonsIntoPage(basicHTML);

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
