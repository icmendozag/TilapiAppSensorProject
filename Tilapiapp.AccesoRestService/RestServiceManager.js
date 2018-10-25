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

    console.log(`Ingresa al servicio: ${global.urlServicioWeb}IniciarSesion`);

    let getTokenServicio = {
        method: 'POST',
        url: `${global.urlServicioWeb}iniciarSesion`,
        headers: { 'Content-Type': 'application/json' },
        body: loginService
    };;

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

module.exports = {
    IniciarSesionServicio,
    getParametrosVariables,
    EnviarTrama
}