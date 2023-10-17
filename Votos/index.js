//Obtenemos la referencia a los elementos del DOM

const formulario = document.getElementById('formulario');

const seleccionados = document.getElementById("seleccionados")

const delegado = document.getElementById("delegado")
const subdelegado = document.getElementById("subDelegado")
const numVotos = document.getElementById("numVotos")

/* Almaceno los botones obtenidos en una constante */
/* Todas las arrow functions seran expostadas*/

const botonGrabar = document.getElementById("grabar")
const botonLimpiar = document.getElementById("limpiar")

//Este objeto controlará todo

const control = {
    listaVotados:[],
    votosEmitidos: 0,

    aumentaVoto(id){
        this.listaVotados[id].votos++
        this.votosEmitidos++
        numVotos.textContent = this.votosEmitidos
    },
    insertaVotado(nombre , _votos = 0)  {
        this.listaVotados.push({
            nombre:nombre,
            votos:_votos,
        })
        const id = this.listaVotados.length-1;
        
        const elementoListaSeleccionados = document.createElement('div');
        elementoListaSeleccionados
            .innerHTML=`    <p>${nombre}</p>
                            <input type="button" class="boton-modificado" value="${_votos}" id="C${id}" data-counter>`                     

        //añadimos el elemento a la lista de elementosdom       
        elementoListaSeleccionados.id=nombre


       seleccionados.append(elementoListaSeleccionados)

        //Asignamos los eventos a los botones
        document.getElementById(`C${id}`).addEventListener("click",(event)=>{  
            if (event.target.dataset.counter != undefined ) {
                this.aumentaVoto(id)
                event.target.value++
                this.dameDelegado()
                formulario["nombre"].focus()
            }
        })
    },  
    reseteaFormulario() {
        formulario['nombre'].value=''
        formulario['nombre'].focus()
    },
    dameDelegado(){
        const nombreDelegado =[...this.listaVotados].sort((ele1, ele2)=>
                    ele2.votos - ele1.votos)
        delegado.textContent=`Delegado: ${nombreDelegado[0].nombre}`
        const divDelegado= document.getElementById(`${nombreDelegado[0].nombre}`)
        seleccionados.insertAdjacentElement('afterbegin', divDelegado)
        if (nombreDelegado.length>1){
            subdelegado.textContent=`SubDelegado: ${nombreDelegado[1].nombre}`
            const divSubDelegado= document.getElementById(`${nombreDelegado[1].nombre}`)
            divDelegado.insertAdjacentElement('afterend', divSubDelegado)

        }
       
    },
    datoJSON() {
        return this.listaVotados.map(el => JSON.stringify(el))
    }

}

//Se crea un evento click al boton grabar
    botonGrabar.addEventListener('click', () => {
    //Cuando se haga click almacenaremos en localStorage , dos elementos
    //En datos se almacena todos los datos que haya introducido el usuario con sus votos
    localStorage.setItem('datos', control.datoJSON())
    //Y aqui almacena los votos totales de todos los datos
    localStorage.setItem('contador', control.votosEmitidos)
})

// Función para mostrar el contador de votos en un elemento HTML
// En caso de que el valor de contador devolviese null , para evitar errores utilizo "??" para asignar el valor 0
const recopilarContador = (nodo) => { nodo.textContent = localStorage.getItem('contador') ?? 0}

if(localStorage.getItem['datos'] !== null) {
     //Lo primero de todo , convertiremos lo que esta almacenado en la key "datos"
    // del almacenamiento que es un string a un array de objectos.
    const datosAlmacenados = JSON.parse(`[${localStorage.getItem('datos')}]`);
    //datosAlmacenados siempre va a devolver una posicion en este caso por que se obliga a que sea un array.
    //entonces siempre va a tener la posicion 0 que en caso de que no exista datos devolvera null.
    if (datosAlmacenados[0] !== null) {
        //Si ha devuelto datos recorrera el array de objectos
        //Y lo insertara con el metodo insertarVoto que tenemos en index.js 
        datosAlmacenados.forEach(element => {
            control.insertaVotado(element.nombre, element.votos)
        })
        //Esto solamente lo inserta , ahora tocara ordenar los votos con la metodo dameDelegado() que esta en inde.js
        control.dameDelegado()
        control.votosEmitidos = localStorage.getItem('contador')
    }

    recopilarContador(numVotos)
}

botonLimpiar.addEventListener('click', () => localStorage.clear() )

//El submit
formulario.addEventListener("submit", (event)=> {
    event.preventDefault();
    if ( formulario['nombre'].value !== "") {
        control.insertaVotado(formulario['nombre'].value)          
        control.reseteaFormulario()      
    }
});


