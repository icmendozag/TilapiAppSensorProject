const serviceRest = require("../Tilapiapp.AccesoRestService/RestServiceManager") //Si se necesita

const db = require("../Tilapiapp.AccesoDatos/DBTrama");


let InsertTrama = async(datoTrama) => {
    try {
        AnalizarTrama(datoTrama);
        await db.SetTrama(datoTrama);
    } catch (error) {
        console.log("Se generó error: ", error);
        throw error;
    }
}

let GetUltimaTrama = async() => {
    db.GetUltimaTrama()
        .then((dato) => {
            console.log("Dato enviado: ", dato);
            EnviarTramaTanque(dato)
        }).catch((err) => {
            console.log("Error al procesar la información: ", err);
        });

}

let EnviarTramaTanque = async(objTrama) => {

    try {
        var result = await serviceRest.EnviarTrama(objTrama.idTrama, objTrama.trama);
        console.log(result);
    } catch (error) {
        console.log("Error: ", error);
    }

}

let AnalizarTrama = (trama) => {
    var arrayTrama = trama.split(",");
    console.log(`${arrayTrama[3]}, ${arrayTrama[4]}, ${arrayTrama[5]}, ${arrayTrama[6]} `);
}

module.exports = {
    InsertTrama,
    GetUltimaTrama
}