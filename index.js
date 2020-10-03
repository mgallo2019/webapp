'use strict'


// var mongoose = require('mongoose');

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://panoramix:27017/portafolio')

//     .then( () => {

//         console.log("CONEXION A LA BASE DE DATOS ESTABLECIDA");

//         }

//     )
//     .catch(err =>  console.log(err)
//     );


const mongoose = require("mongoose");

var app = require('./app');// pido a app.js su objeto
var port = 3700;


//Pon estas dos instrucciones antes de llamar al método connect de mongoose:
//para evitar avisos! de deprecation
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;


//mongoose.connect('mongodb://username:password@host:port/database');
//mongoose.connect("mongodb://prueba:garlopa@panoramix:27017/portafolio",{
mongoose.connect("mongodb://panoramix:27017/portafolio",{
    user: "prueba",
    pass: "garlopa",    
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {

        console.log("CONEXION A LA BASE DE DATOS ESTABLECIDA");
        
        //CREACION DE SERVIDOR!
        app.listen(port, () => {
            console.log("CONEXION AL SERVIDOR ESTABLECIDA EN LA URL: LOCALHOST:3700");
        });
    })
    .catch(err => console.log(err));