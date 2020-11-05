/**Logica de almacenamiento de nuestros mensajes
 * Creamos un mock : un mock es "falsear" la BD para validar que todo funciona correctamente
 * messageList -> array donde guardamos nuestros mensaje
 */


const Model = require('./model.js');

 function addMessage(message){
     const myMessage = new Model(message);
     myMessage.save();
 }

 async function getMessages(user){
    //creamos el filtro para obtener los mensajes de un usuario en particular
    let filter = {};
    
    if(user !== null){
        filter = {
            //traemos el user que conincide con el parametro user no importa si esta en mayuscula o minuscula
            user: new RegExp(`^${user}$`, "i")
        }
     }
     //pedimos todos los documentos
     const messages = await Model.find(filter);
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

 async function existDB(id) {
    const exist = await Model.exists({
        _id:id
    });
    return exist;
}

 function removeMessage(id){
    //retorna una promesa
    return Model.findByIdAndDelete({
        _id: id
    })
 }

 module.exports = {
     add: addMessage,
     list: getMessages,
     updateText: updateText,
     removeMessage: removeMessage,
 }