
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// Contenedor para las citas
const contenedorCitas = document.querySelector('#citas');

// Formulario nuevas citas
const formulario = document.querySelector('#nueva-cita')

class Citas{
    constructor(){
        this.citas = []
    }

    agregarCita(cita){
        this.citas =[...this.citas, cita]
    }
}

class UI{

    imprimirAlerta(mensaje, tipo){
        const divMensaje = document.createElement('div')
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12')

        // Agregar class
        switch(tipo){
            case 'error':
                        divMensaje.classList.add('alert-danger')
                        break
            case 'success':
                        divMensaje.classList.add('alert-success')
                        break
            case 'warning':
                        divMensaje.classList.add('alert-warning')
                        break

        }

        divMensaje.textContent = mensaje

        //agregar al dom el mensaje
        document.querySelector('#contenido').insertBefore(divMensaje,  document.querySelector('.agregar-cita'))

        setTimeout(()=> {
            divMensaje.remove()
        }, 3000)
    }

    imprimirCitas({citas}){

        this.limpiarHTML()

        citas.forEach( cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita

            const divCita = document.createElement('div')
            divCita.classList.add('cita', 'p-3')
            divCita.dataset.id = id
            
            //Scripting
            const mascotaParrafo = document.createElement('h2')
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder')
            mascotaParrafo.textContent = mascota

            const propietarioParrafo = document.createElement('p')
            propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${propietario}`

            const telefonoParrafo = document.createElement('p')
            telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Tlf: </span> ${telefono}`
            
            const fechaParrafo = document.createElement('p')
            fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`

            const horaParrafo = document.createElement('p')
            horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`

            const sintomasParrafo = document.createElement('p')
            sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Sintomas: </span> ${sintomas}`

            
            // Agregar parrados
            divCita.appendChild(mascotaParrafo)
            divCita.appendChild(propietarioParrafo)
            divCita.appendChild(telefonoParrafo)
            divCita.appendChild(fechaParrafo)
            divCita.appendChild(horaParrafo)
            divCita.appendChild(sintomasParrafo)


            // Agregar al DOM
            contenedorCitas.appendChild(divCita)
        })
    }

    limpiarHTML() {
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
   }
}

const ui = new UI()
const administrarCitas = new Citas()

// Eventos
eventListeners();
function eventListeners() {
    mascotaInput.addEventListener('change', datosCita);
    propietarioInput.addEventListener('change', datosCita);
    telefonoInput.addEventListener('change', datosCita);
    fechaInput.addEventListener('change', datosCita);
    horaInput.addEventListener('change', datosCita);
    sintomasInput.addEventListener('change', datosCita);

    formulario.addEventListener('submit', nuevaCita)
}

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora:'',
    sintomas: ''
}


function datosCita(e) {
    //  console.log(e.target.name) // Obtener el Input
     citaObj[e.target.name] = e.target.value;
}


// Valida y agraga nueva cita
function nuevaCita(e){
    e.preventDefault()

    // Extraer info de cita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj

    // Validar 
    // Validar
    if( mascota === '' || propietario === '' || telefono === '' || fecha === ''  || hora === '' || sintomas === '' ) {
        ui.imprimirAlerta('Todos los campos son Obligatorios.', 'error')

        return;
    }

    // generar ID
    citaObj.id = Date.now()

    // Crear cita
    administrarCitas.agregarCita({...citaObj})

    // Resets
    reiniciarObjeto()
    formulario.reset()

    // Mostrar citas en el DOM
    ui.imprimirCitas(administrarCitas)
}

function reiniciarObjeto() {
    // Reiniciar el objeto
    citaObj.mascota = ''
    citaObj.propietario = ''
    citaObj.telefono = ''
    citaObj.fecha = ''
    citaObj.hora = ''
    citaObj.sintomas = ''
}
