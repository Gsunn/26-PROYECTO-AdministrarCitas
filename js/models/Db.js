import {mostrarCitas} from '../funciones.js'

export let DB;

export function crearDB(){

    // Crear BBDD v1.0
    const crearDB = window.indexedDB.open('citas', 1)

    // Error
    crearDB.onerror = () => {
        console.log('Error al abrir la BBDD');
    }

    // OK
    crearDB.onsuccess = () => {
        console.log('BBDD creada.');

        DB = crearDB.result

        mostrarCitas(DB)
    }

    //Define SCHEMA
    crearDB.onupgradeneeded = (e) => {
        const db = e.target.result

        const objStore = db.createObjectStore('citas',{
            keyPath: 'id', // indice
            autoIncrement: true
        })

        // definir columnas
        objStore.createIndex('mascota', 'mascota', {unique : false})
        objStore.createIndex('propietario', 'propietario', {unique : false})
        objStore.createIndex('telefono', 'telefono', {unique : false})
        objStore.createIndex('fecha', 'fecha', {unique : false})
        objStore.createIndex('hora', 'hora', {unique : false})
        objStore.createIndex('sintomas', 'sintomas', {unique : false})
        objStore.createIndex('id', 'id', {unique : true})


        console.log('Columnas creadas DB OK!');
    }

}

