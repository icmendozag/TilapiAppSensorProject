const dbExcepcion = require('../Tilapiapp.AccesoDatos/DBExcepciones');
const logger = require('../Tilapiapp.Utils/Logger');

let RegistrarExcepcion = async(error, metodo) => {
    try {
        let dateNow = new Date();
        await dbExcepcion.SetLogExcepcion(error, metodo);
        await logger.registrarLog(`${dateNow} - Se genero el error: ${error} - en el metodo ${metodo}`);
    } catch (error) {
        await logger.registrarLog(`Se genero el error: ${error}`);
    }
}
module.exports = {
    RegistrarExcepcion
}