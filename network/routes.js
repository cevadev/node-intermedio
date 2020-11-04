/**Manejamos toda la informaciónde router y la gestion de las herramientas de red tanto de respuestas como las rutas*/
const express = require('express');
const message = require('../components/message/network.js');

/**
 * funcion que añade todas las rutas:
 * Necesitamos el servidor de exrpress para añadir todas las rutas
 * nuestras routes cada vez que llamen a message llamaremos a nuestro componente de message
 */
const routes = function(server){
    //todas las llamadas hacia message las gestiona message que llama al componente network
    server.use('/message', message);
}

module.exports = routes;