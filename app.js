'use strict'

var express = require('express');//para trabajar con rutas

//lo que reciba lo devuelve en JSON
var bodyParser = require('body-parser');

//ejecuta 
var app = express();

var path = require('path');

// cargar archivos rutas
var project_routes = require('./routes/project');


//middlewares, se ejecuta antes de ejecutar la peticion 
app.use(bodyParser.urlencoded({extended:false}));//se define asi!
app.use(bodyParser.json());


//CORS
//https://victorroblesweb.es/2018/01/31/configurar-acceso-cors-en-nodejs/
// Configurar cabeceras y cors uso un middleware
//permite el acceso de un dominio a otro
//en el lugar del * es cuando se publique la api la URL y origines permitidos
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//RUTAS

app.use('/', express.static('client', {redirect: false}));
app.use('/api',project_routes);
///api es para sobreescribir las rutas sino se puede poner solo /

app.use('/module', express.static('module_admin', {redirect: false}));
app.get('/module', function (req, res, next){
    res.sendFile(path.resolve('module_admin/index.html'));/*carga este archivo estatico*/
});

//esto hace que angular active el refresco de sus paginas internas
//para cualquier pagina que no sea / o /api hara algo nuevo
app.get('*', function (req, res, next){
    res.sendFile(path.resolve('client/index.html'));/*carga este archivo estatico*/
});





//exportar este modulo, PORQUE SE USARA EN OTROS LADOS
module.exports = app;