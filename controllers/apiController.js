const {Product} = require('../models/productos')
const {User} = require('../models/user')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const generadorJWT = require('../helpers/generadorJWT')

module.exports = {
    saludo (req, res) {
        res.status(200).send('ke onda api')
    },
    usuario (req,res) {
        res.status(200).send('ke onda slashh user')
    },
    async list (req,res) {
        const items = await Product.find()    //trae lo que hay en product
        res.json({items})
    },
    async listOnly (req,res) {
        const item = await Product.findById(req.params.id)    //busca el id en product
        res.json({item})
    },
    async crear (req, res) {
        try {
            const err = validationResult(req)
            if (err.isEmpty()) {  //sino existe ningun error crea el producto, ERRORES DEL BODY
                const item = new Product(req.body); //guardo el body en el modelo
                await item.save();  //el save lo guarda en la db
                res.status(201).json(item)
            } else {
                res.status(501).json(err)
            }
        } catch (error) {
            res.status(401).json(error)   //cualquier cosa requerida que no envie me lo muestra en los errores ERRORES DE LA DB
        }
    },
    async editar (req, res) {
        try {
            const err = validationResult(req);
            if (err.isEmpty()) {
                await Product.findByIdAndUpdate(req.params.id, req.body) //le envio el id y el objeto para actualizar
                res.status(201).json({msg:"el producto se actualizo id - " + req.params.id})
            } else {
                res.json(err)
            }
        } catch (error) {
            res.json(error)
        }
    },
    async eliminar (req, res) {
        await Product.findByIdAndDelete(req.params.id)
        res.json({msg:"El producto se borro exitosamente"})
    },
    crearSession(req, res) {
        const persona = {
            nombre: 'juan',
            idioma: 'español'
        }
        console.log(req.session)
        req.session.persona = persona
        res.cookie('pruebaDeLaCookie', {detalle:'esto es una prueba'}, {maxAge: 120000})    //la cookie durara 2 minutos
        console.log(req.session)
        res.json(req.session.persona)
    },
    pruebaSession(req, res) {
        console.log(req.cookies.sessionDelUsuario)
        res.json(req.session.persona)
    },
    eliminarSession(req, res) {
        req.session.destroy();
        console.log(req.cookies.pruebaDeLaCookie)
        res.clearCookie('pruebaDeLaCookie')
        res.json({ msg: 'session closed'})
    },
    ejemploPass (req, res) {
        let salt = bcrypt.genSaltSync(15)   //los saltos son una configuracion que nosotros damos, por defecto son 10 rondas
        let pass = "123456789"
        let hash = bcrypt.hashSync(pass, salt)
        let comparacion1 = bcrypt.compareSync(pass, hash)   //compara el hash (de la db en un hipotetico caso) con el pass ingresado
        let comparacion2 = bcrypt.compareSync('987654321', hash)    //error forzado
        res.json({
            pass: pass,
            hash: hash,
            comparacion1: comparacion1,
            comparacion2: comparacion2
        })
    },
    async pruebaToken (req, res) {
        const token = await generadorJWT(req.body)
        res.json(token)
    },
    testToken (req, res) {
        res.send('paso el token')
    }
    ,
    async login (req, res) {
        try {
            const err = validationResult(req)
            if (err.isEmpty()) {
                const usuario = await User.findOne({email: req.body.email}) //me trae el usuario que haga match con el email
                if(usuario === null) {
                    res.json({msg: 'el email o la contraseña son incorrectos'})
                }
                if(!bcrypt.compareSync(req.body.password, usuario.password)) {
                    res.json({msg: 'Email o contraseña incorrectos'})
                }

                const user = {
                    _id: usuario._id,
                    name: usuario.name
                }
            
                req.session.persona = user;
                if (req.body.remember) {
                    res.cookie('sessionDelUsuario', req.session.persona,{masAge: 150000})
                }
                res.json({msg: 'usuario logueado'})
            
            } else {
                res.status(501).json(err)
            }
        } catch (error) {
            res.json(error)
        }
    },
    logout (req, res) {
        res.clearCookie('sessionDelUsuario')
        req.session.destroy()
        res.json({msg: 'usuario deslogueado'})

    },
    async loginToken (req, res) {
        try {
            const err = validationResult(req)
            if (err.isEmpty()) {
                const usuario = await User.findOne({email: req.body.email}) //me trae el usuario que haga match con el email
                if(usuario === null) {
                    res.json({msg: 'el email o la contraseña son incorrectos'})
                }
                if(!bcrypt.compareSync(req.body.password, usuario.password)) {
                    res.json({msg: 'Email o contraseña incorrectos'})
                }

                const token = await generadorJWT({id: usuario._id, email: usuario.email}) //representa el id y el email guardado en la base de datos
                console.log('usuario logueado, id: ' + usuario.id)
                res.json({msg: 'usuario logueado', token: token})
            } else {
                console.log(err)
                res.status(501).json(err)
            }
        } catch (error) {
            console.log(error)
            res.status(501).json(error)
        }
    },
    async register(req, res){
        try {
            const error = validationResult(req)
            if (error.isEmpty()) {
                let salt = bcrypt.genSaltSync(10)
                let hash = bcrypt.hashSync(req.body.password, salt)
                
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                })
                await newUser.save()
                res.json(newUser)

            } else {
                res.json(error)
            }
        } catch (error) {
            res.json(error)
        }
    }
}


/* 
//como objeto
const apiController = {
    saludo (req, res) {
        res.status(200).send('ke onda api')
    },
    usuario (req,res) {
        res.status(200).send('ke onda slashh user')
    }

}

module.exports = apiController; //sino usar conts e importar como antes
 */

/* 
//como clase y uso de herencia
class ApiController {
    saludo (req, res) {
        res.status(200).send('ke onda api')
    }

    usuario (req,res) {
        res.status(200).send('ke onda slashh user')
    }

}


module.exports = new ApiController; //sino usar conts e importar como antes
 */