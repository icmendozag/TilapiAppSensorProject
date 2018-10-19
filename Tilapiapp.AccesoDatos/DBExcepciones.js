const { DbConection } = require("./DBConection");


let SetLogExcepcion = (error, metodoApi) => {

    return new Promise((resolve, reject) => {
        var sql = `CALL USP_InsertarLogErrores('${error}','${metodoApi}')`;
        DbConection.query(sql, function(err, result) {
            if (err) reject(err);
            resolve(1);
        });
    });

};


module.exports = {
    SetLogExcepcion
}