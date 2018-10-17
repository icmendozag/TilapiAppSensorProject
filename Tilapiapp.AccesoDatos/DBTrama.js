const { DbConection } = require("./DBConection");


let SetTrama = (trama) => {

    return new Promise((resolve, reject) => {

        var sql = `CALL USP_InsertarTrama('${trama}')`;
        DbConection.query(sql, function(err, result) {
            if (err) reject(err);
            resolve(1);
        });
    });

};

let GetUltimaTrama = () => {
    return new Promise((resolve, reject) => {

        var sql = 'call SensoresDB.USP_ObtenerUltimaTrama()';
        //var sql = 'select trama from Trama where idTrama = 217';
        DbConection.query(sql, function(err, result) {
            if (err) reject(err);
            else {
                resolve(result[1][0]);
            }
        });
    });
}

module.exports = {
    SetTrama,
    GetUltimaTrama
}