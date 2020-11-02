const express = require('express');
//ruter de express nos permiten poder separar nuestras peticiones
const router = express.Router();
//body-parser para trabajar con el body de las peticiones. Express ya trae el bodyparser
//const bodyParser = require('body-parser');

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
router.get('/messages', function(request, response){
    console.info(request.headers);
    //modificamos el header de nuestro request
    response.header({
        "custom-header": "Nuestro valor personalizado",
    });
    response.send('Lista de mensajes');
});

//especificamos que tambien responda desde POST
router.post('/message', function(request, response){
    console.info(request.body);
    console.info(request.query);
    //enviamos el body al cliente
    response.send(`se añadió el mensaje ${request.body.text} desde post`);
});

router.put('/', (request,response) => {
    res.send('Mensaje editado (Hola desde put)');
});

router.patch('/', (request,response) => {
    res.send('Mensaje editado (Hola desde patch)');
});

router.delete('/', (request,response) => {
    res.send('Mensaje borrado (Hola desde delete)');
});

// Para ver que funciona le  pido que me devuelva para cualquier ruta:
/* app.use('/', function(req,res){ // --->Para cualquier ruta, cre una función, tiene dos parámentros, cualquier funcion http tiene req y res.
        res.send("Estoy aprendiendo!!!"); // Estaes la respuesta que tengo.
}); */

//Para que lo anterior viva temos que decirle donde va a escuchar, eligimos un puerto, como el 3000 quees muy usado en las apps de Node.
app.listen(3000);
console.log('Estoy escuchando por http://localhost:3000 que es el puerto por el que escucho.');

//Con esto está listo el servidor de Node para que viva:
//---> node server

