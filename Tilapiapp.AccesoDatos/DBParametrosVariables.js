const { DbConection } = require("./DBConection");

let SetParametroVariable = async(descripcion, valorMin, valorMax, idVariableMedicion) => {

    return new Promise((resolve, reject) => {
        console.log("descripcion:", descripcion);
        console.log("valorMin:", valorMin);
        console.log("valorMax:", valorMax);
        console.log("idVariableMedicion", idVariableMedicion);
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