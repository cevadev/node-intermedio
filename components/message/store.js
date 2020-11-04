/**Logica de almacenamiento de nuestros mensajes
 * Creamos un mock : un mock es "falsear" la BD para validar que todo funciona correctamente
 * messageList -> array donde guardamos nuestros mensaje
 */

 const messagesList = [];

 function addMessage(message){
     messagesList.push(message);
 }

 function getMessages(){
     return messagesList;
 }

 module.exports = {
     add: addMessage,
     list: getMessages,
 }