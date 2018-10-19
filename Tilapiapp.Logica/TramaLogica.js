const serviceRest = require("../Tilapiapp.AccesoRestService/RestServiceManager") //Si se necesita
const excepciones = require("./ManejoExcepcionesLogica");
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
            if (dato.trama == -1 && dato.idTrama == -1) {
                console.log('La última trama ya fue enviada, validar estado sensor');
                var mensajeExcepcion = 'La última trama ya fue enviada, validar estado sensor';
                var metodo = 'TramaLogica.EnviarTramaTanque';
                excepciones.RegistrarExcepcion(mensajeExcepcion, metodo);
            } else {
                EnviarTramaTanque(dato);
            }

        }).catch((err) => {
            console.log("Error al procesar la información: ", err);
        });

}

let EnviarTramaTanque = async(objTrama) => {

    try {
        var result = await serviceRest.EnviarTrama(objTrama.idTrama, objTrama.trama);
        console.log(result);
    } catch (error) {
        excepciones.RegistrarExcepcion("No hay conexión al servicio", "TramaLogica.EnviarTramaTanque");
    }

}

let AnalizarTrama = (trama) => {
    var arrayTrama = trama.split(",");
    console.log(`${arrayTrama[2] / 10}, ${arrayTrama[3]/10}, ${arrayTrama[4]/10}, ${arrayTrama[5]/10} `);
}

module.exports = {
    InsertTrama,
    GetUltimaTrama
}