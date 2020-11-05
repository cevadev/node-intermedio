/** Definimos el modelo de nuestra base de datos*/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//creamos nuestro esquema pra indicarle a mongoose que tipo de info queremos almacenar
const mySchema = new Schema({
    users: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
});

/**
 * Creamos un model que servirá siempre que querramos hacer alguna modificación dentro de la BD datos
 * donde indicamos el esquema, y que todo lo que se cree tenga el esquema definido y se almacene
 * en la BD con un nombre específico. Pasamos 2 parametros
 * 1. nombre de la coleccion en mongo
 * 2. Nuestro esquema elaborado
 */
const model = mongoose.model('Chat', mySchema);

module.exports = model; 