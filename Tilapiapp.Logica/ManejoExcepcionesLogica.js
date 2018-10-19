const dbExcepcion = require('../Tilapiapp.AccesoDatos/DBExcepciones');

let RegistrarExcepcion = async(error, metodo) => {

    try {
        await dbExcepcion.SetLogExcepcion(error, metodo);
    } catch (error) {
        console.log("Se generó error al insertar excepción: ", error);
        throw error;
    }

}

module.exports = {
    RegistrarExcepcion
}