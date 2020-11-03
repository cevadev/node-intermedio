const express = require('express');
const response = require('./network/response.js');
const router = require('./components/message/network.js');//roter de mensajes

var app = express();
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.use(router);
app.use('/app', express.static('public'));

app.listen(3000);
console.log('Estoy escuchando por http://localhost:3000 que es el puerto por el que escucho.');

//Con esto está listo el servidor de Node para que viva:
//---> node server

