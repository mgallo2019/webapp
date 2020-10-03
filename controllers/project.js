'use strict'
//un controlador es una clase con metodos relacionados con la entidad de proyectos

//importar los modelos para trabajar con la base
var Project = require('../models/project');
var fs = require('fs'); //libreria nativa de node

var path = require('path');

//devolver objetos json con una "clase", recordar que usamos un JSON!
 var controller = {

    //nombres de los metodos
    home: function(req, res){
        return res.status(200).send({
            message: "soy la home"
        });
    },

    test: function(req, res){
        return res.status(200).send({
            message: "soy el metodo test del controlador"
        });

    },

    saveProject: function(req, res){
    
        var project = new Project();


        //recogo los parametros que se mandan en el BODY!
        var params = req.body;
        project.name =  params.name;
        project.descripcion = params.descripcion;
        project.categoria = params.categoria;
        project.lenguajes = params.lenguajes;
        project.year = params.year;
        project.image = null;

        //guardar en mongo
        project.save((err, projectStored) => {
            if (err) return res.status(500).send({ message: "error al guardar documento: " + err});

            if (!projectStored) return res.status(404).send({ message: "No se pudo guardar el proyecto"});

            return res.status(200).send({ project: projectStored });
            //si no le mando el projectStored me CREARIA una propiedad project directamente
        });
        
        // //se puede probar para debug mandar un msge
        // return res.status(200).send({
        //     project: project,//retorno el dato
        //     message: "Metodo saveProject"
        // });

    },

    getProject: function (req,res){
        var projectId = req.params.id;

        if (projectId == null) return res.status(404).send({ message: "El proyecto no existe"});
        

        Project.findById(projectId, (err, project) => {
            if (err) return res.status(500).send({ message: "error al buscar documento: " + err});

            if (!project) return res.status(404).send({ message: "El proyecto no existe"});

            return res.status(200).send({ project });
        });
    },


    getProjects: function (req,res){

        //find busca TODOS!
        // Project.find({
        //     year: 2019 //seria un where por ej!

        // });

        //find({}).sort('year') si pongo -year mayor a menor

        //devolvera una coleccion!
        Project.find({}).exec( (err, projects) => {
            if (err) return res.status(500).send({ message: "error al buscar documentos: " + err});
        
            if (!projects) return res.status(404).send({ message: "NO HAY proyectoS para mostrar"});
        
            return res.status(200).send({ projects });
        });



    },



    updateProject: function (req, res){

        var projectId = req.params.id;
        var update = req.body; //aca estan todos los datos a actualizar

        //el new true es para que muestre el objeto acutliazado
        Project.findByIdAndUpdate(projectId, update, {new:true},(err, projectUpdated) => {
            if (err) return res.status(500).send({ message: "error al actualizar documento: " + err});
        
            if (!projectUpdated) return res.status(404).send({ message: "No se pudo actualizar el projecto o no existe"});
        
            return res.status(200).send({ project: projectUpdated });


        });

    },



    deleteProject: function (req,res){
        var projectId = req.params.id;

        Project.findByIdAndRemove(projectId, (err, projectRemove) => {
            if (err) return res.status(500).send({ message: "error al borrar documento: " + err});
        
            if (!projectRemove) return res.status(404).send({ message: "No se pudo borrar el projecto o no existe"});
        
            return res.status(200).send({ project: projectRemove });
        });
    },



    uploadImage: function (req, res){
        var projectId = req.params.id;

        var fileName = 'Imagen no subida...';

        //req files.. es de la bilbioteca que usamos para subir archivos
        if (req.files){
     
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('/');
            var fileName = fileSplit[1];//quiero el NOMBRE de la foto para guardar luego en la base

            var extSplit = fileName.split('\.');
            var extension = extSplit[1];
            

            if (extension.toLowerCase()  == 'png' || extension.toLowerCase() == 'jpg' || extension.toLowerCase()  == 'jpeg' || extension.toLowerCase()  == 'gif')
            {
                Project.findByIdAndUpdate(projectId, {image: fileName}, {new:true} ,(err, projectUpdated) => {

                if (err) return res.status(500).send({ message: "error al subir imagen: " + err});
        
                if (!projectUpdated) return res.status(404).send({ message: "No se pudo subir la imagen o no existe"});
        
                return res.status(200).send({ project: projectUpdated });

                });
            }
            else{
                    //borro! del server
                    fs.unlink(filePath, (err) => {
                         return res.status(200).send({
                            message: "la extension no es valida"
                         });

                    });

            }

            // return res.status(200).send({
            //     files: req.files
            // });

        }
        else{
            return res.status(200).send({
                mesagge: fileName
            });
        }


    },


    getImage: function (req, res){
        var file = req.params.image;//recordar que este parametro es seteado por nosotros como se llamara! en este caso IMAGE
        var path_file = './uploads/'+file;
 
        fs.access(path_file, error => {
            if (!error) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(200).send({ message: "No existe el Archivo"});
            }
        });

    }


 };


 module.exports = controller;