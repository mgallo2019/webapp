'use strict'

//mongoose trabaja con los modelos. que es lo que se insertara en la base luego
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//hay que definir todos los campos digamos que entra el documento
var projectSchema = Schema({   
    name: String,
    descripcion: String,
    categoria: String,
    //lenguajes: [String],
    lenguajes: String,
    year: Number,
    image: String
});

//projects -> guarda los documentos
//Project -> le hace un lowercase y lo pluraliza para que quede como se llama en la coleccion
module.exports = mongoose.model('Project',projectSchema);