const serviceRest = require("../Tilapiapp.AccesoRestService/RestServiceManager")
const db = require("../Tilapiapp.AccesoDatos/DBParametrosVariables");
const excepciones = require("./ManejoExcepcionesLogica");


let getParametrosVariables = async() => {

    try {
        var result = await serviceRest.getParametrosVariables();
        if (result.result == true) {
            console.log(result);
            global.tiempoEnvioTrama = result.data[0].tiempoEnvioTrama * 60000;
            //console.log(result.data);
            result.data.forEach(element => {
                db.SetParametroVariable(element.descripcion, element.valorMinimo, element.valorMaximo, element.idVariable);
            });
            console.log("Parametros Actualizados");
        } else {
            global.tiempoEnvioTrama = 600000;
            excepciones.RegistrarExcepcion(result.message, "ParametrosVariablesLogica.getParametrosVariables");
        }
    } catch (error) {
        excepciones.RegistrarExcepcion("No hay conexión al servicio", "ParametrosVariablesLogica.getParametrosVariables");
    }

}

module.exports = {
    getParametrosVariables
}