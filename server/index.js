const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

const configs = require('./config')

require('dotenv').config({path: 'variables.env'})

/*const db = require('./config/database');

db.authenticate()
    .then(() => {
        console.log('db conectado')
    })
    .catch(err => console.log(err))*/

const app = express();

//habilitar pug
app.set('view engine', 'pug');
//añadir las vistas
app.set('views', path.join(__dirname, './views'));
//cargar la carpeta estatica llamada public
app.use(express.static('public'))

//validar si estamos en desarrollo o en produciion
const config = configs[app.get('env')];

//creamos la variable para el sitio web
app.locals.titulo = config.nombresitio;

//muestra el año  y genera la ruta
app.use((req, res, next) => {
    const fecha = new Date()
    res.locals.fechaActual = fecha.getFullYear() //fecha
    res.locals.ruta = req.path; //ruta
    console.log(res.locals)
    return next()
})

//ejecutamos body-parser
app.use(bodyParser.urlencoded({extended: true}))

//cargar rutas
app.use('/', routes());

//Puerto y host para la app
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () =>{
    console.log('Cargado en puerto '+ port);
})