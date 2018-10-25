const serviceRest = require("../Tilapiapp.AccesoRestService/RestServiceManager") //Si se necesita
const excepciones = require("./ManejoExcepcionesLogica");
const db = require("../Tilapiapp.AccesoDatos/DBTrama");


let InsertTrama = async(datoTrama) => {
    try {
        AnalizarTrama(datoTrama);
        await db.SetTrama(datoTrama);
    } catch (err) {
        excepciones.RegistrarExcepcion(`Error al insertar Trama: ${err}`, `TramaLogica.InsertTrama`);

    }
}

let SendTrama = async() => {
    db.GetUltimaTrama()
        .then((dato) => {
            if (dato.trama == -1 && dato.idTrama == -1) {
                //console.log('La última trama ya fue enviada, validar estado sensor');

                var mensajeExcepcion = 'La última trama ya fue enviada, validar estado sensor';
                var metodo = 'TramaLogica.EnviarTramaTanque';
                excepciones.RegistrarExcepcion(mensajeExcepcion, metodo);
            } else {
                EnviarTramaTanque(dato);
            }

        }).catch((err) => {
            excepciones.RegistrarExcepcion(`Error al enviar información: ${err}`, `TramaLogica.SendTrama`);
        });

}

let EnviarTramaTanque = async(objTrama) => {

    try {
        console.log("Ingresa a enviar trama");
        var Trama = JSON.stringify({ IdTanque: global.idTanque, Trama: objTrama.trama })
        var result = await serviceRest.EnviarTrama(Trama);
        if (result.result == false) {
            excepciones.RegistrarExcepcion(result.message, "TramaLogica.EnviarTramaTanque");
        } else if (result.result == true) {
            excepciones.RegistrarExcepcion(`Trama cargada correctamente: ${Trama}`);
        }
    } catch (error) {
        excepciones.RegistrarExcepcion("No hay conexión al servicio", "TramaLogica.EnviarTramaTanque");
    }

}

let AnalizarTrama = (trama) => {
    var arrayTrama = trama.split(",");
    //console.log(`${arrayTrama[2] / 10}, ${arrayTrama[3]/10}, ${arrayTrama[4]/10}, ${arrayTrama[5]/10} `);
}

module.exports = {
    InsertTrama,
    SendTrama
}