const serviceRest = require("../Tilapiapp.AccesoRestService/ParametrosVariablesRest") //Si se necesita
const db = require("../Tilapiapp.AccesoDatos/DBTrama");


let InsertTrama = async(datoTrama) => {
    try {
        await db.SetTrama(datoTrama);
    } catch (error) {
        console.log("Se generó error: ", error);
        throw error;
    }
}


module.exports = {
    InsertTrama
}