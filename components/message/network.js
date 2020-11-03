/**
 * La capa de red es la encargada de recibir la peticion http
 * 1. Procesar la información
 * 2. Enviarla al controlador
 */

const express = require('express');
const router = express.Router();

 //especificamos que solo responsa a peticiones GET
router.get('/messages', function(req, res){
    console.info(req.headers);
    //modificamos el header de nuestro req
    res.header({
        "custom-header": "Nuestro valor personalizado",
    });
    //llamamos a nuestro modulo de response y ejecuta a funcion success
    response.success(req, res, 'retrieving messages list', 200);
});

//especificamos que tambien responda desde POST
router.post('/message', function(req, res){
    console.info(req.body);
    console.info(req.query);

    //simulamos un error
    if(req.query.error === 'ok'){
        response.error(req, res, 'Error inesperado', 500, 'Es solo una simulación de los errores');
    }
    else{
        response.success(req, res, `se anadió el mensaje ${req.body.text} desde el post`, 201);
    }

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