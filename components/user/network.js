/**
 * La capa de red es la encargada de recibir la peticion http
 * 1. Procesar la información
 * 2. Enviarla al controlador
 */

const express = require('express');
const router = express.Router();
const response = require('../../network/response.js');
const controller = require('./controller.js');

//ruta para obtener la lista de usuarios
router.get('/', function(req, res){
    controller.getUsers()
        .then((userList)=>{
            response.success(req, res, userList, 200);
        })
        .catch((error)=>{
            response.error(req, res, 'Unexpected error', 500);
        })
});

//ruta para añadir un user
router.post('/', function(req, res){
    controller.addUser(req.body.name)
        //si todo va bien
        .then((data)=>{
            response.success(req, res, 'User registered', 201);
        })
        .catch((error)=>{
            response.error(req, res, 'Internal error', 500, error);
        })
});

module.exports = router;