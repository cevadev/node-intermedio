/**
 * Socket.js se encaga de inicializar el servidor de socket.io, generar un instancia y compartirla
 */
const socketIO = require('socket.io');
//socket guardarmos la refrencia del objeto y asi cualquier cosa que cambie del objeto, nuestra variable socket estara updated
const socket = {}

function connect(server){
    socket.io = socketIO(server);
}

module.exports = {
    connect,
    socket,
}