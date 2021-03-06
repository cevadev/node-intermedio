/**
 * La capa de red es la encargada de recibir la peticion http
 * 1. Procesar la información
 * 2. Enviarla al controlador
 */

const express = require('express');
const multer = require('multer');
const path = require("path");
const router = express.Router();
const response = require('../../network/response.js');
const controller = require('./controller.js');

//creamos una instancia de multer
const storage = multer.diskStorage({
    //enviamos los archivos a la carpeta upload
    destination: 'public/files/',
    filename : function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + 
        path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });

 //ruta para obtener los mensajes. peticion get
router.get('/', function(req, res){
    //obtenemos el usuario del query, para que filtre los mensajes si no hay valor colocamos uno por defecto de null
    const filterMessages = req.query.chat || null;
    controller.getMessages(filterMessages)
        .then((messagesList)=>{
            response.success(req, res, messagesList, 200);
        })
        .catch((error)=>{
            response.error(req, res, 'Unexpected error', 500, error);
        })
});

//ruta para añadir un mensaje. peticion post
router.post('/', upload.single('file'), function(req, res){
    /**
     * el objeto user y message pueden venir en el body de la peticion
     */
    controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
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

//ruta para modificar mensajes. peticion patch para modificaciones parciales
router.patch('/:id', (req,res) => {
    console.info(req.params.id);

    controller.updateMessage(req.params.id, req.body.message)
        .then((data)=>{
            response.success(req, res, data, 200);
        })
        .catch((error)=>{
            response.error(req, res, 'Error interno', 500, error);
        })
        //res.send('Ok');
});

//ruta para eliminar un mensaje determinado
router.delete('/:id', (req,res) => {
    controller.deleteMessage(req.params.id)
        .then(()=>{
            response.success(req, res, `Menssage ${req.params.id} se eliminó correctamente`, 200);
        })
        .catch((error)=>{
            response.error(req, res, 'Error interno', 500, error);
        })
});

module.exports = router;