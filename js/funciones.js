import Citas from './models/Citas.js'
import UI from './models/UI.js'
import { mascotaInput, propietarioInput,
         telefonoInput, fechaInput,
         horaInput, sintomasInput, formulario } from './selectores.js'

const ui = new UI()
const administrarCitas = new Citas()

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

let editando = false


export function datosCita(e) {
    //  console.log(e.target.name) // Obtener el Input
    citaObj[e.target.name] = e.target.value
}

// Valida y agraga nueva cita
export function nuevaCita(e) {
    e.preventDefault()

    // Extraer info de cita
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj

    // Validar 
    // Validar
    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son Obligatorios.', 'error')

        return;
    }

    if (editando) {
        ui.imprimirAlerta('Editado correctamente..', 'success')

        // Actulizar cita
        administrarCitas.editarCita({...citaObj})

        // Resetear controles
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita'

        // Modo edicion OFF
        editando = false
    } else {
        // generar ID
        citaObj.id = Date.now()

        // Crear cita
        administrarCitas.agregarCita({ ...citaObj })
        ui.imprimirAlerta('Nueva cita creada.', 'success')
    }

    // Resets
    reiniciarObjeto()
    formulario.reset()

    // Mostrar citas en el DOM
    ui.imprimirCitas(administrarCitas)
}

export function reiniciarObjeto() {
    // Reiniciar el objeto
    citaObj.mascota = ''
    citaObj.propietario = ''
    citaObj.telefono = ''
    citaObj.fecha = ''
    citaObj.hora = ''
    citaObj.sintomas = ''
}

export function eliminarCita(id) {
    // eliminar cita
    administrarCitas.eliminarCita(id)
    // mostrar cita
    ui.imprimirAlerta('La cita se elimino correctamente.', 'success')
    //mostrar citas
    ui.imprimirCitas(administrarCitas)
}

// Modo edicion
export function cargarEdicion(cita) {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita

    // llenar los input del formulario
    mascotaInput.value = mascota
    propietarioInput.value = propietario
    telefonoInput.value = telefono
    fechaInput.value = fecha
    horaInput.value = hora
    sintomasInput.value = sintomas

    // carga valores en el objeto cita
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    //Cambiar text boton crear

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios'

    editando = true
}