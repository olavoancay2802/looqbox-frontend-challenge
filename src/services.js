import axios from "axios";

const pokemonService = () => { getPokemons, getPokemonCount, getPokemonByIdOrName };

const baseURL = "https://pokeapi.co/api/v2/";

async function getPokemons(pagingFilter) {
    try {
        const response = await axios.get(baseURL + "pokemon?" + pagingFilter);

        return response;
    } catch (error) {
        console.error(error);
    }
}

async function getPokemonCount() {
    try {
        const response = await getPokemons();

        return response.count;
    } catch (error) {
        console.error(error);
    }    
}

async function getPokemonByIdOrName(idOrName) {
    try {
        const response = await axios.get(baseURL + "/pokemon/"+ idOrName);

        return response;
    } catch (error) {
        console.error(error);
    }
}

export default pokemonService

