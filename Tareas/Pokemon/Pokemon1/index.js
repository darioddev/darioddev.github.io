import { control } from "../pokemon.js";
// Se obtiene la referencia del formulario y se almacena en una constante
const formulario = document.getElementById("formulario");

// Se crea dos contenedores para las habilidades y la imagen del Pokémon
const contenedorHabilidades = document.createElement("div");
const contenedorImagen = document.createElement("div");

// Se crea un evento para cuando el formulario ha sido enviado.
formulario.addEventListener("submit", async (e) => {
  // Evitar la recarga de la página al enviar el formulario
  e.preventDefault();

  contenedorHabilidades.innerHTML = "";
  contenedorImagen.innerHTML = "";
  // Se almacena en una constante el nombre del Pokémon ingresado por el usuario
  const pokemon = formulario["pokemon"].value.toLowerCase();

  // Se añaden id a ambos contenedores , estas id son para darle estilos css mediante id
  contenedorHabilidades.id = "contenedorPokemon";
  contenedorImagen.id = "imagenPokemon";

  try {
    // Se realiza una peticion la API de PokeAPI para obtener información del Pokémon ingresado por el usuario
    const response = await control.getInformacionPokemon(pokemon);

    // Mientras se obtiene el pokemon mostramos una imagen de Obtenido pokemon...
    Swal.fire({
      title: `Buscando a ${response.nombre}`,
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        // Se rea una lista en la que se va almacenar por li , las habilidades obtenidas
        const contenedor = document.createElement("ul");
        const experience = document.createElement("li");
        experience.textContent = `Experiencia de ${pokemon} : ${response.experiencia}`;
        contenedor.append(experience);

        //Se recorre todas las habilidades obtenidas
        response.habilidades.map((el, index) => {
          const lista = document.createElement("li");
          lista.textContent = ` Habilidad ${index + 1} : ${el.ability.name}`;
          contenedor.append(lista);
        });

        // Se crea una etiqueta img en la que su src , sera el link obtenido de la imagen
        contenedorImagen.innerHTML = `<img src="${response.imagen}" alt="${response.nombre}">`;

        // Se agrega la lista de habilidades y la imagen al final de la pagina
        contenedorHabilidades.append(contenedor);
        document.body.append(contenedorHabilidades);
        document.body.append(contenedorImagen);

        //Se muestra por consola que todo ha ido bien.
        console.log("Pokemon obtenido sin problemas.");
      }
    });
  } catch (error) {
    //Se muestra el error por consola
    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `El Pokémon ${formulario["pokemon"].value} no se ha encontrado en la base de datos`,
    });

    contenedorHabilidades.remove()
    contenedorImagen.remove()

  } finally {
    formulario.reset(); // Se resetea el formulario despues de enviar el formulario
  }
});
