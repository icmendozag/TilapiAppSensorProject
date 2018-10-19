const serviceRest = require("../Tilapiapp.AccesoRestService/RestServiceManager")
const db = require("../Tilapiapp.AccesoDatos/DBParametrosVariables");
const excepciones = require("./ManejoExcepcionesLogica");


let getParametrosVariables = async() => {

    try {
        var result = await serviceRest.ActualizarParametrosVariables();
        result.forEach(element => {
            db.SetParametroVariable(element.descripcion, element.valorMin, element.valorMax, element.idVariable);
        });
        console.log("Parametros Actualizados");
    } catch (error) {
        excepciones.RegistrarExcepcion("No hay conexión al servicio", "ParametrosVariablesLogica.getParametrosVariables");
    }

}

module.exports = {
    getParametrosVariables
}