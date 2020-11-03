const express = require('express');
//ruter de express nos permiten poder separar nuestras peticiones
const router = express.Router();
//body-parser para trabajar con el body de las peticiones. Express ya trae el bodyparser
//const bodyParser = require('body-parser');

const response = require('./network/response.js');

//1. inicializamos express
var app = express();
//2. añadimos el body-parser para trabajar con el cuerpo de la peticion
// en este caso se realizará bodyparser a todos los ficheros json
app.use(express.json()); 
//habilitamos el body como formulario para que lo convierta en objeto js
app.use(express.urlencoded({extended: true}));
//3. añadimos a nuestra app el router de express
app.use(router);

//especificamos que solo responsa a peticiones GET
router.get('/messages', function(req, res){
    console.info(req.headers);
    //modificamos el header de nuestro req
    res.header({
        "custom-header": "Nuestro valor personalizado",
    });
    //llamamos a nuestro modulo de response y ejecuta a funcion success
    response.success(req, res, 'retrieving messages list', 200);
    //res.send('Lista de mensajes');
    //enviamos una respuesta vacia, en ese caso se recomienda enviar un estado
    //res.send();
    //res.status(201).send();
    //enviamos un respuesta con datos estructurados
    //res.send({error: '', body: 'Listado de mensaje obtenido exitósamente'});
    //datos estructurados en array como respuesta
    //res.send([{error: '', body: 'Listado generado exitósamente'}]);
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

// Para ver que funciona le  pido que me devuelva para cualquier ruta:
/* app.use('/', function(req,res){ // --->Para cualquier ruta, cre una función, tiene dos parámentros, cualquier funcion http tiene req y res.
        res.send("Estoy aprendiendo!!!"); // Estaes la respuesta que tengo.
}); */

//indicamos donde estarán nuestros archivos static (html, css, js) de nuestra app
app.use('/app', express.static('public'));

//Para que lo anterior viva temos que decirle donde va a escuchar, eligimos un puerto, como el 3000 quees muy usado en las apps de Node.
app.listen(3000);
console.log('Estoy escuchando por http://localhost:3000 que es el puerto por el que escucho.');

//Con esto está listo el servidor de Node para que viva:
//---> node server

