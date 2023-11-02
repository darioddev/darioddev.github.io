import { control } from "../pokemon.js";

const contenedor = document.getElementById("contenedorPokemon");

window.addEventListener("click", (event) => {
  const url = event.target.dataset.url;
  if (url !== undefined)
    control.informacionPokemon(event.target.textContent, url);
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const pokemons = await control.getPokemons(50);
    const pokemonsImagenes = await Promise.all(
      pokemons.map((el) => control.getInformacionPokemon(el.name))
    );
    pokemonsImagenes.map((el) => {
      control.pushTarjetaPokemon(contenedor , el.nombre, el.imagen);
    });
  } catch (error) {
    console.log(error);
  }
});