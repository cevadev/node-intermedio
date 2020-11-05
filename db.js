/**Gestionamos las conexiones a la BD */
//nos traemos a mongoose
const db = require('mongoose');

//le pedimos a mongoose que utilice la promesas
db.Promise = global.Promise;

//elegimos cuando crear la conexion a la BD. nos aseguramos que siempre se logge se ha conectado correctamente
async function connect(connectionString){
    //conexion con la bd
    await db.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>{
            console.info('[db] conectada con éxito');
        })
        .catch((error)=>{
            console.error('[db] ', error);
    })
}

module.exports = connect;

