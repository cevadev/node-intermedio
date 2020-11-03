/**modulo para responder a las peticiones de forma coherente */

/**
 * Funcion que prepara un response
 * @param {*} request objeto request
 * @param {*} response objeto response
 * @param {*} message objeto message que contiene el mensaje personalizado
 */
exports.success = function(request, response, message, status){
    //retornamos un objeto como respuestay el status. Si no viene un status enviamos un status 200
    response.status(status || 200).send({
        error: '',
        body: message
    })
    //response.send(message);
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
    console.error(`[response error: ] ${details}`);
    //retornamos un objeto como respuestay el status. Si no viene un status enviamos un status 200
    response.status(status || 500).send({
        error: message,
        body: ''
    })
    //response.send(message);
}