import axios from "axios";

export async function getPokemonById(pokemonId: string | number) {
    const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );

    return response.data;
}
