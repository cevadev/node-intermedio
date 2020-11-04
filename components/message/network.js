/**
 * La capa de red es la encargada de recibir la peticion http
 * 1. Procesar la información
 * 2. Enviarla al controlador
 */

const express = require('express');
const router = express.Router();
const response = require('../../network/response.js');
const controller = require('./controller.js');

 //especificamos que solo responsa a peticiones GET
router.get('/', function(req, res){
    controller.getMessages()
        .then((messagesList)=>{
            response.success(req, res, messagesList, 200);
        })
        .catch((error)=>{
            response.error(req, res, 'Unexpected error', 500, error);
        })
});

//especificamos que tambien responda desde POST
router.post('/', function(req, res){
    /**
     * el objeto user y message pueden venir en el body de la peticion
     */
    controller.addMessage(req.body.user, req.body.message)
        //recibimos el objeto fullMessage de la promesa
        .then((fullMessage)=>{
            response.success(req, res, `el usuario ${fullMessage.user} anadió el mensaje ${fullMessage.message} ${fullMessage.date}`, 201);
        })
        .catch(error =>{
            response.error(req, res, 'Informacion inválida', 400, 'Error en el controlador');
        })

    //enviamos el body al cliente
    //res.send(`se añadió el mensaje ${req.body.text} desde post`);
});

router.put('/', (req,res) => {
    response.success(req, res, 'Mensaje editado (Hola desde put)');
});

router.patch('/', (req,res) => {
    response.success(req, res, 'Mensaje editado (Hola desde patch)');
});

router.delete('/', (req,res) => {
    response.success(req, res, 'Mensaje borrado (Hola desde delete)');
});

module.exports = router;