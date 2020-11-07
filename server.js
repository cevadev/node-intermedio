const express = require('express');
const app = express();
//cargamos nuestra configuracion
const config = require('./config.js');
const cors = require('cors');
/**
 * websocket
 */
//inicializamos express

//inicializamos un servidor de node con express
const server = require('http').Server(app);

//traemos nuestro socket
const socket = require('./socket.js');
//const router = require('./components/message/network.js');//roter de mensajes
const router = require('./network/routes.js');
const db = require('./db.js');
const connectionString = config.dbUrl;

db(connectionString);
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

//inicializamos nuestro socjet
socket.connect(server);
/**
 * 1. Le pasamos el servidor de express creado y configurado a nuestro router
 * 2. Routes se encarga de llamar a nuestro componente de network (message)
 * 3. Network procesa nuestra peticion
 */
router(app);
//app.use(router);


app.use(config.publicRoute, express.static('public'));

//websocket
server.listen(config.port, function(){
    console.log(`La aplicacion está escuchando en ${config.host}:${config.port}`);
});
//websocket

/* server.listen(3000);
console.log('Estoy escuchando por http://localhost:3000 que es el puerto por el que escucho.');
 */

//Con esto está listo el servidor de Node para que viva:
//---> node server

