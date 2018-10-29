const request = require("request");
const excepciones = require("../Tilapiapp.Logica/ManejoExcepcionesLogica");



let CallGetParametrosVariables = () => {

    var getParametrosVariables = {
        method: 'GET',
        url: `${global.urlServicioWeb}ObtenerParametros`,
        qs: { idTanque: global.idTanque },
        headers: {
            Authorization: `bearer ${global.serviceRestToken}`
        }
    };
    return new Promise((resolve, reject) => {
        request(getParametrosVariables, function(err, response, body) {
            if (err) reject(err);
            if (response != null) {
                if (response.statusCode == 200) {
                    resolve(JSON.parse(body));
                } else if (response.statusCode == 401) {
                    excepciones.RegistrarExcepcion(`Acceso no autorizado al servicio web`, "RestServiceManager.CallGetParametrosVariables");
                    reject("Acceso no autorizado al servicio");
                }
            } else {
                reject(err)
            }
        });
    });
}

let CallEnviarTrama = (Trama) => {
    var sendTrama = {
        method: 'POST',
        url: `${global.urlServicioWeb}RegistrarTrama`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${global.serviceRestToken}`
        },
        body: Trama
    };

    return new Promise((resolve, reject) => {
        request(sendTrama, function(err, response, body) {
            if (err) reject(err);
            if (response != null) {
                if (response.statusCode == 200) {
                    resolve(JSON.parse(body));
                } else if (response.statusCode == 401) {
                    excepciones.RegistrarExcepcion(`Acceso no autorizado al servicio web`, "RestServiceManager.CallEnviarTrama");
                    reject("Acceso no autorizado al servicio");
                }
            } else {
                reject(err)
            }
        });
    });
}

let CallIniciarSesion = (loginService) => {

    var getTokenServicio = {
        method: 'POST',
        url: `${global.urlServicioWeb}iniciarSesion`,
        headers: { 'Content-Type': 'application/json' },
        body: loginService
    };

    return new Promise((resolve, reject) => {
        request(getTokenServicio, function(err, response, body) {
            if (err) reject(err);
            if (response != null) {
                if (response.statusCode == 200) {
                    resolve(JSON.parse(body));
                } else if (response.statusCode == 401) {
                    excepciones.RegistrarExcepcion(`Acceso no autorizado al servicio web`, "RestServiceManager.CallIniciarSesion");
                    reject("Acceso no autorizado al servicio");
                }
            } else {
                reject(err)
                    //console.log("Error");
            }
        });
    });
}

let CallEstadoSensor = (sensor) => {

    var sendEstadoSensor = {
        method: 'POST',
        url: `${global.urlServicioWeb}estadoSensorAsync`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${global.serviceRestToken}`
        },
        formData: sensor
    };

    return new Promise((resolve, reject) => {
        request(sendEstadoSensor, function(err, response, body) {

            try {
                if (response != null) {
                    if (response.statusCode == 200) {
                        resolve(JSON.parse(body));
                    } else if (response.statusCode == 401) {
                        excepciones.RegistrarExcepcion(`Acceso no autorizado al servicio web`, "RestServiceManager.CallEstadoSensor");
                        reject("Acceso no autorizado al servicio");
                    }
                } else {
                    excepciones.RegistrarExcepcion(`No fue posible enviar el estado del sensor: ${err}`, `RestServiceManager.CallEstadoSensor`);
                    reject(err);
                }

            } catch (err) {
                excepciones.RegistrarExcepcion(`No fue posible enviar el estado del sensor: ${err}`, `RestServiceManager.CallEstadoSensor`);
                reject(err);
            }
        });
    });
}


let CallEstadoTarjeta = (sensor) => {

    var sendEstadoSensor = {
        method: 'POST',
        url: `${global.urlServicioWeb}estadoTarjetaAsync`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${global.serviceRestToken}`
        },
        formData: { idTanque: global.idTanque }
    };

    return new Promise((resolve, reject) => {
        request(sendEstadoSensor, function(err, response, body) {

            try {
                if (response != null) {
                    if (response.statusCode == 200) {
                        resolve(JSON.parse(body));
                    } else if (response.statusCode == 401) {
                        excepciones.RegistrarExcepcion(`Acceso no autorizado al servicio web`, "RestServiceManager.CallEstadoTarjeta");
                        reject("Acceso no autorizado al servicio");
                    }
                } else {
                    excepciones.RegistrarExcepcion(`No fue posible enviar el estado de la tarjeta: ${erro}`, `RestServiceManager.CallEstadoTarjeta`);
                    reject(err);
                }

            } catch (err) {
                excepciones.RegistrarExcepcion(`No fue posible enviar el estado de la tarjeta: ${erro}`, `RestServiceManager.CallEstadoTarjeta`);
                reject(err);
            }
        });
    });
}


async function EnviarTrama(Trama) {
    var result = await CallEnviarTrama(Trama);
    return result;
}

async function getParametrosVariables() {
    var result = await CallGetParametrosVariables(getParametrosVariables);
    return result;
}

let IniciarSesionServicio = async() => {
    var result = await CallIniciarSesion(JSON.stringify(global.loginService));
    return result;
}

let SendEstadoSensor = async(sensor) => {
    var result = await CallEstadoSensor(sensor);
    return result;
}

let SendEstadoTarjeta = async() => {
    var result = await CallEstadoTarjeta();
    return result;
}

module.exports = {
    IniciarSesionServicio,
    getParametrosVariables,
    EnviarTrama,
    SendEstadoSensor,
    SendEstadoTarjeta
}