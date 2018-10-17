const serviceRest = require("../Tilapiapp.AccesoRestService/RestServiceManager")
const db = require("../Tilapiapp.AccesoDatos/DBParametrosVariables");


let getParametrosVariables = async() => {

    try {
        var result = await serviceRest.ActualizarParametrosVariables();
        result.forEach(element => {
            db.SetParametroVariable(element.descripcion, element.valorMin, element.valorMax, element.idVariable);
        });
        console.log("Parametros Actualizados");
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getParametrosVariables
}