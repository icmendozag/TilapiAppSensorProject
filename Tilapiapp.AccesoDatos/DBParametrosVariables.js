const { DbConection } = require("./DBConection");

let SetParametroVariable = (descripcion, valorMin, valorMax, idVariableMedicion) => {

    return new Promise((resolve, reject) => {
        var sql = `CALL USP_InsertarVariableMedicion(${idVariableMedicion},'${descripcion}', ${valorMin}, ${valorMax})`;
        DbConection.query(sql, function(err, result) {
            if (err) reject(err);
            resolve(1);
        });
    });

};

module.exports = {
    SetParametroVariable
}