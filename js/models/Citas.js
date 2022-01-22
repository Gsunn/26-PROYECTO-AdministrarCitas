class Citas {
    constructor() {
        this.citas = []
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita]
    }

    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id)
    }

    editarCita(citaActulizada){
        this.citas = this.citas.map(cita => cita.id === citaActulizada.id ? citaActulizada : cita)
    }
}

export default Citas