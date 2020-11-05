const express = require('express');
//const router = require('./components/message/network.js');//roter de mensajes
const router = require('./network/routes.js');

const db = require('./db.js');

const connectionString = 'mongodb+srv://barcvilla:root@cluster0.nldop.mongodb.net/platzimessages_db?retryWrites=true&w=majority';

db(connectionString);
var app = express();
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

/**
 * 1. Le pasamos el servidor de express creado y configurado a nuestro router
 * 2. Routes se encarga de llamar a nuestro componente de network (message)
 * 3. Network procesa nuestra peticion
 */
router(app);
//app.use(router);


app.use('/app', express.static('public'));

app.listen(3000);
console.log('Estoy escuchando por http://localhost:3000 que es el puerto por el que escucho.');

//Con esto está listo el servidor de Node para que viva:
//---> node server

