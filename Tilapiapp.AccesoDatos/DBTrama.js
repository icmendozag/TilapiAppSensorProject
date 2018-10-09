const { DbConection } = require("./DBConection");
const dateParser = require('date-and-time');

let now = new Date();
let dateNow;

let SetTrama = (trama) => {

    return new Promise((resolve, reject) => {

        dateNow = dateParser.format(now, 'YYYY-MM-DD HH:mm:ss');
        var sql = `CALL USP_InsertarTrama('${trama}')`;

        // `INSERT INTO Trama (trama, fechaTrama) VALUES ('${trama}', STR_TO_DATE('${dateNow}', '%Y-%m-%d %H:%i:%s'))`;

        DbConection.query(sql, function(err, result) {
            if (err) reject(err);
            resolve(1);
        });
    });

};

module.exports = {
    SetTrama
}