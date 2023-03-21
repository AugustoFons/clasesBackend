const express = require('express');
const apiController = require('../controllers/apiController');
const router = express.Router()
const ApiController = require('../controllers/apiController')
const validarID = require('../middleware/validarID')
const {check} = require('express-validator')    //ver {body} en documentacion de express-validator
const auth = require('../middleware/auth')
const validarJWT = require('../middleware/validarToken')

/* router.get('/', apiController.list);    //como tienen metodos diferentes se reconocen como rutas diferentes
router.post('/', apiController.crear)
router.put('/', apiController.editar) */


router.get('/user', ApiController.usuario);
router.get('/', ApiController.saludo);
router.get('/ver', ApiController.list);
router.get('/ver/:id', validarID , ApiController.listOnly);
//metodo http - expresion - middleware - callback (todos los middleware van en el medio)
router.post('/crear',[
    check('name').not().isEmpty().withMessage('El campo name es obligatorio').isLength({min: 3, max: 24}).withMessage('Este campo debe tener entre 3 y 24 caracteres'),  //pregunta si el atributo viaja y si viaja vacio
    check('price').not().isEmpty().withMessage('El campo price es obligatorio'),
    check('stock').not().isEmpty().withMessage('El campo stock es obligatorio'),
    check('brand').not().isEmpty().withMessage('El campo brand es obligatorio').isLength({min: 3, max: 24}).withMessage('Este campo debe tener entre 3 y 24 caracteres'),
    check('category').not().isEmpty().withMessage('El campo category es obligatorio').isLength({min: 3, max: 24}).withMessage('Este campo debe tener entre 3 y 24 caracteres')
], ApiController.crear);    //post guarda

router.post('/register',[
    check('name').not().isEmpty().withMessage('El campo name es obligatorio').isLength({min: 3, max: 24}).withMessage('Este campo debe tener entre 3 y 24 caracteres'),  //pregunta si el atributo viaja y si viaja vacio
    check('email').not().isEmpty().withMessage('El campo es obligatorio'),
    check('password').not().isEmpty().withMessage('El campo es obligatorio'),
], ApiController.register);    //post guarda

router.put('/editar/:id', validarID,[
    check('name').not().isEmpty().withMessage('El campo name es obligatorio para edicion').isLength({min: 3, max: 24}).withMessage('Este campo debe tener entre 3 y 24 caracteres'),  //pregunta si el atributo viaja y si viaja vacio
    check('price').not().isEmpty().withMessage('El campo price es obligatorio para edicion'),
    check('stock').not().isEmpty().withMessage('El campo stock es obligatorio para edicion'),
    check('brand').not().isEmpty().withMessage('El campo brand es obligatorio para edicion').isLength({min: 3, max: 24}).withMessage('Este campo debe tener entre 3 y 24 caracteres'),
    check('category').not().isEmpty().withMessage('El campo category es obligatorio para edicion').isLength({min: 3, max: 24}).withMessage('Este campo debe tener entre 3 y 24 caracteres')
], ApiController.editar);   //put edita

router.delete('/borrar/:id', validarID, apiController.eliminar);

router.get('/session', apiController.crearSession)
router.get('/pruebasession', auth, apiController.pruebaSession)     //la session se activa solo cuando entro antes a /session
router.get('/cerrarsession', apiController.eliminarSession)
router.get('/pass', apiController.ejemploPass)

router.post('/probartoken', apiController.pruebaToken)
router.get('/testtoken', validarJWT, apiController.testToken)

router.post('/login',[
    check('email').not().isEmpty().withMessage('el campo email es obligatorio'),
    check('password').not().isEmpty().withMessage('el campo password es obligatorio')
],apiController.login)

router.post('/logintoken',[
    check('email').not().isEmpty().withMessage('el campo email es obligatorio'),
    check('password').not().isEmpty().withMessage('el campo password es obligatorio')
],apiController.loginToken)

router.delete('/logout', apiController.logout)

module.exports = router;