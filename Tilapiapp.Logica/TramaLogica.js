const serviceRest = require("../Tilapiapp.AccesoRestService/RestServiceManager") //Si se necesita
const excepciones = require("./ManejoExcepcionesLogica");
const db = require("../Tilapiapp.AccesoDatos/DBTrama");


let InsertTrama = async(datoTrama) => {
    try {
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
                var sensor = { idTanque: global.idTanque, estado: 0 };
                var result = serviceRest.SendEstadoSensor(sensor);
                excepciones.RegistrarExcepcion(`La última trama ya fue enviada, validar estado sensor. ${result}`, 'TramaLogica.EnviarTramaTanque');
            } else {
                var sensor = { idTanque: global.idTanque, estado: 1 };
                var result = serviceRest.SendEstadoSensor(sensor);
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

let SendEstadoTarjeta = async() => {
    try {
        var result = await serviceRest.SendEstadoTarjeta();
        if (result.result == false) {
            excepciones.RegistrarExcepcion(result.message, "TramaLogica.EnviarEstadoTarjeta");
        } else if (result.result == true) {
            excepciones.RegistrarExcepcion(`Se actualiza estado de la tarjeta`);
        }
    } catch (error) {
        excepciones.RegistrarExcepcion("No hay conexión al servicio", "TramaLogica.EnviarEstadoTarjeta");
    }
}

module.exports = {
    InsertTrama,
    SendTrama,
    SendEstadoTarjeta
}