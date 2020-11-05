/**Aqui definimos todo lo que sucede creando las funciones necesarias */

//importamos el store para operaciones de almacenamiento de messages
const store = require('./store.js');

function addMessage(chat, user, message){
    
    /**
     * retornamos una promesa, validando que haya un usuario
     * construimos nuestro mensaje
     */
    return new Promise((resolve, reject) =>{
        if(!user || !message){
            console.error('[messageController] no hay usuario o mensaje');
            //no se añade el mensaje poor falta de  datos
            return reject(`Los datos son incorrectos`);
        }

        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
        }
       //almacenamos el mensaje
       store.add(fullMessage);
        resolve(fullMessage);
    });
    
}

function getMessages(user){
    return new Promise((resolve, reject)=>{
        resolve(store.list(user));
    });
}

function updateMessage(id, message){
    return new Promise(async (resolve, reject)=>{
        if(!id || !message){
            reject('Invalid data');
            return false;
        }
        const result = await store.updateText(id, message);
        resolve(result);
    });
}

function deleteMessage(id){
    return new Promise((resolve, reject)=>{
        if(!id){
            reject('Id invalid');
            return false;
        }

        store.removeMessage(id)
            .then(()=>{
                resolve();
            })
            .catch((error)=>{
                reject(error);
            })
    });
}

//exportamos un objeto
module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage,
}