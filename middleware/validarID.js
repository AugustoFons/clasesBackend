const { Product } = require('../models/productos');

module.exports = validarID = async (req, res, next) => {    //next es un callback que trae express ; pasa del middleware al callback
try {
    const item = await Product.findById(req.params.id)
    if (item !== null) {
        next()
    } else {
        return res.status(501).json({msg:'El ID es invalido'})
    }
} catch (error) {
    res.status(501).json(error)
}
}