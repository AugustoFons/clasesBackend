const express = require('express');
const logger = require('morgan')
const cors = require('cors')
const session = require('express-session')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const indexRouter  = require('./routes/index')
const apiRouter  = require('./routes/api')

//connect
const {connect} = require('./db/db')

//express
const app = express(); //express siempre mas abajo

//usos con express
app.use(logger("dev"))  //ver dev en la doc de morgan
app.use(express.json()) //para aceptar objetos json que ingresen
app.use(cors())
app.use(cookieParser()) //cookie antes de session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

//routes
app.use('/', indexRouter);
app.use('/api', apiRouter);

//coneccion con la base
connect();

module.exports = app;