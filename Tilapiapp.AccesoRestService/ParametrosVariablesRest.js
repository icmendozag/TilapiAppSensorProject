const request = require("request");



var getParametrosVariables = {
    method: 'GET',
    url: 'http://localhost:5000/Api/GetParametrosVariables',
    qs: { Id: global.idTanque },
    headers: { 'Content-Type': 'application/json' }
};


async function ActualizarParametrosVariables() {
    var result = await call(getParametrosVariables);
    return result;
}

let call = () => {

    return new Promise((resolve, reject) => {
        request(getParametrosVariables, function(err, response, body) {
            if (err) reject(err);
            if (response.statusCode == 200) {
                resolve(JSON.parse(body));
            } else {
                resjec(response.statusCode);
            }




        });
    });


}

module.exports = {
    ActualizarParametrosVariables
}