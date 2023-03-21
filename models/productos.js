const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const products = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true    //no puede haber dos nombres iguales
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Boolean,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    }

})

const Product = mongoose.model('Product', products);  //en la coleccion el nombre aparece en minuscula y plural

module.exports = {Product};