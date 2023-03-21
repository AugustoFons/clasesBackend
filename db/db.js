const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', false)  //para sacar error de consola

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT) //test es el nombre de la base
        console.log('base de datos conectada')
    } catch {
        console.log('problemas al conectar con la base de datos')
    }
}; 

module.exports = {connect}