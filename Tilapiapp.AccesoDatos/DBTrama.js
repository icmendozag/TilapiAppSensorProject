const { DbConection } = require("./DBConection");
const dateParser = require('date-and-time');

let now = new Date();
let dateNow;

let SetTrama = (trama) => {

    return new Promise((resolve, reject) => {

        var sql = `CALL USP_InsertarTrama('${trama}')`;
        DbConection.query(sql, function(err, result) {
            if (err) reject(err);
            resolve(1);
        });
    });

};

module.exports = {
    SetTrama
}