/**Logica de almacenamiento de nuestros mensajes
 * Creamos un mock : un mock es "falsear" la BD para validar que todo funciona correctamente
 * messageList -> array donde guardamos nuestros mensaje
 */

//nos traemos a mongoose
const db = require('mongoose');
const Model = require('./model.js');

const connectionString = 
'mongodb+srv://barcvilla:root@cluster0.nldop.mongodb.net/platzimessages_db?retryWrites=true&w=majority';

//le pedimos a mongoose que utilice la promesas
db.Promise = global.Promise;

//conexion con la bd
db.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.info('[db] conectada con éxito');
    })
    .catch((error)=>{
        console.error('[db] ', error);
    })

 function addMessage(message){
     const myMessage = new Model(message);
     myMessage.save();
 }

 async function getMessages(){
     //pedimos todos los documentos
     const messages = await Model.find();
     return messages;
 }

 async function updateText(id, message){
     const updateMessage = await Model.findById(id);
     //actualizamos el cambio message de nuestro modelo
     updateMessage.message = message;
     //grabamos el mensaje modificado
     const newMessage = await updateMessage.save();
     return newMessage;
 }

 module.exports = {
     add: addMessage,
     list: getMessages,
     updateText: updateText,
 }