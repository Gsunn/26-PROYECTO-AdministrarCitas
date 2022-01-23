// import { eliminarCita, cargarEdicion } from '../funciones.js'
import { contenedorCitas, heading } from '../selectores.js'
import { cargarEdicion, eliminarCita } from '../funciones.js'

class UI {

    constructor(){
        this.textoHeading(citas)
    }

    imprimirAlerta(mensaje, tipo) {
        const divMensaje = document.createElement('div')
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12')

        // Agregar class
        switch (tipo) {
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
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'))

        setTimeout(() => {
            divMensaje.remove()
        }, 3000)
    }

    imprimirCitas(dataBase) {
        this.limpiarHTML()

        // Leer contenido de la BBDD
        const objStore = dataBase.transaction('citas').objectStore('citas')

        objStore.openCursor().onsuccess = (e) => {
           // console.log(e.target.result);

           const cursor = e.target.result

           const totalCitas = objStore.count()

           const fnTxtHeading = this.textoHeading

           totalCitas.onsuccess = function (){
                fnTxtHeading(totalCitas.result)
           }
         

           if(cursor){
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cursor.value

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

            // Agregar un botón de eliminar...
            const btnEliminar = document.createElement('button');
            btnEliminar.onclick = () => eliminarCita(id); // añade la opción de eliminar
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'

            // Añade un botón de editar...
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
            
            const cita = cursor.value
            btnEditar.onclick = () => cargarEdicion(cita);

            // Agregar parrados
            divCita.appendChild(mascotaParrafo)
            divCita.appendChild(propietarioParrafo)
            divCita.appendChild(telefonoParrafo)
            divCita.appendChild(fechaParrafo)
            divCita.appendChild(horaParrafo)
            divCita.appendChild(sintomasParrafo)
            divCita.appendChild(btnEliminar)
            divCita.appendChild(btnEditar)

            // Agregar al DOM
            contenedorCitas.appendChild(divCita)

            // Cursor avanza al siguiente elemento
            cursor.continue()
           }

        }

    }

    limpiarHTML() {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }

    textoHeading(resultado){       
        if(resultado > 0){
            heading.textContent = 'Administra tus Citas.'
        }else{
            heading.textContent = 'No tienes citas.'
        }
    }
}

export default UI