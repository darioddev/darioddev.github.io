const POKEMONURL = "https://pokeapi.co/api/v2/pokemon";

export const control = {
    async getPokemons(limit) {
      const pokemons = await axios.get(`${POKEMONURL}/?limit=${limit}`);
      const {
        data: { results: response },
      } = pokemons;
      return response;
    },
  
    async getInformacionPokemon(pokemon) {
      const response = await axios.get(`${POKEMONURL}/${pokemon}`);
      const {
        abilities,
        forms: [{ name: informacionNombreUrl }],
        sprites: {
          other: { home },
        },
      } = response.data;
  
      return {
        nombre: informacionNombreUrl,
        experiencia: response.data.base_experience,
        habilidades: abilities,
        imagen: home.front_default,
      };
    },
  
    pushTarjetaPokemon(contenedor,nombre, imagen) {
      const div = document.createElement("div");
      div.classList.add("itemPokemon");
      div.id = nombre;
      div.innerHTML = `<p data-url=${POKEMONURL}/${nombre}> ${nombre}</p>
                       <img src="${imagen}" alt="${nombre}">
                      `;
      contenedor.append(div);
    },
    informacionPokemon(nombre, url) {
      Swal.fire({
        title: `Redirigiendo a la informacion de ${nombre}`,
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          window.open(url, "_blank");
        }
      });
    },
  };