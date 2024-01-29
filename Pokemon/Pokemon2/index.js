import { control } from "../pokemon.js";

const contenedor = document.getElementById("contenedorPokemon"); // Se obtiene el contenedor de los pokémon
const inputDefault = document.getElementById("inputNumber"); // Se obtiene el input del número de pokémon a mostrar
async function updatePokemonCards(number) {
  try {
    const pokemons = await control.getPokemons(number); // Se obtiene los pokémon
    const pokemonsImagenes = await Promise.all(
      // Se obtiene la información de todos los pokémon
      pokemons.map((el) => control.getInformacionPokemon(el.name))
    );
    contenedor.innerHTML = ""; // Se elimina todo el contenido del contenedor
    pokemonsImagenes.forEach((el) => {
      // Se recorre cada pokémon
      control.pushTarjetaPokemon(contenedor, el.nombre, el.imagen); // Se crea una tarjeta para cada pokémon
    });
  } catch (error) {
    // Si hay un error , se muestra por consola
    console.log(error); // Se muestra el error por consola
  }
}

window.addEventListener("click", (event) => {
  // Se crea un evento para cuando se haga click en el contenedor de los pokémon
  const url = event.target.dataset.url; // Se obtiene la url del pokémon
  if (url !== undefined)
    // Si la url no es undefined , se realiza una petición a la API de PokeAPI
    control.informacionPokemon(event.target.textContent, url); // Se obtiene la información del pokémon
});

inputDefault.addEventListener("input", async (e) => {
  e.target.value = e.target.value < 1 ? 1 : e.target.value; // Si el valor es menor a 0 , se le asigna el valor 1 , para evitar errores
  await updatePokemonCards(e.target.value); // Se actualiza el contenedor de los pokémon
});

document.addEventListener("DOMContentLoaded", async () => {
  // Se crea un evento para cuando se cargue la página
  try {
    const nPokemonShow = 15; // Se crea una constante para el número de pokémon a mostrar
    inputDefault.value = nPokemonShow; // Se le asigna el valor de la constante al input
    await updatePokemonCards(nPokemonShow); // Se actualiza el contenedor de los pokémon
  } catch (error) {
    // Si hay un error , se muestra por consola
    console.log(error); // Se muestra el error por consola
  }
});
