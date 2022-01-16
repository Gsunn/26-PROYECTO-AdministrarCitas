
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
        console.log(this.citas)
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
