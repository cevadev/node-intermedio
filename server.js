const express = require('express');

//inicializamos express
var app = express();

// Para ver que funciona le  pido que me devuelva para cualquier ruta:
app.use('/', function(req,res){ // --->Para cualquier ruta, cre una función, tiene dos parámentros, cualquier funcion http tiene req y res.
        res.send("Estoy aprendiendo!!!"); // Estaes la respuesta que tengo.
});

//Para que lo anterior viva temos que decirle donde va a escuchar, eligimos un puerto, como el 3000 quees muy usado en las apps de Node.
app.listen(3000);
console.log('Estoy escuchando por http://localhost:3000 que es el puerto por el que escucho.');

//Con esto está listo el servidor de Node para que viva:
//---> node server

