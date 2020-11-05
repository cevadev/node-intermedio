const store = require('./store.js');

function addUser(userName){
    //comprobamos propiedades y retornamos una Promise rejected
    if(!userName){
        //retornamos un reject por defecto de la clase Promise
        return Promise.reject('Invalid name');
    }

    const user = {
        name: userName
    }
    //retornamos una Promise
    return store.add(user);
}

function getUsers(){
    return new Promise((resolve, reject)=>{
        resolve(store.list());
    });
}

module.exports = {
    addUser,
    getUsers,
}