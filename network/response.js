/**modulo para responder a las peticiones de forma coherente 
 * Response maneja todas las respuestas de red
*/

/**Objeto con los codigo de respuesta */
const statusMessages = {
    '200': 'Done',
    '201': 'Created',
    '400': 'Invalid format',
    '500': 'Internal error'
}


/**
 * Funcion que prepara un response
 * @param {*} request objeto request
 * @param {*} response objeto response
 * @param {*} message objeto message que contiene el mensaje personalizado
 */
exports.success = function(request, response, message, status){
    //retornamos un objeto como respuestay el status. Si no viene un status enviamos un status 200
    let statusCode = status;
    let statusMessage = message;
    
    if (!status) {
        status = 200;
    }

    if (!message) {
        statusMessage = statusMessages[status];
    }

    res.status(statusCode).send({ 
        error: '',
        body: statusMessage
    });
}

/**
 * 
 * @param {*} request 
 * @param {*} response 
 * @param {*} message mensaje de error
 * @param {*} status codigo de estado
 * @param {*} details detalles del error
 */
exports.error = function(request, response, message, status, details){
    //imprimimos lo que ha sucedido
    let statusCode = status;
    let statusMessage = message;
    if(!status){
        status = 500;
    }
    if(!message){
        statusMessage = statusMessages[status];
    }
    res.status(statusCode).send({ 
        error: statusMessage,
        body: '',
    });
}