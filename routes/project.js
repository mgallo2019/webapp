//un fichero de ruta por cada controlador
'use strict'

var express = require('express');//para las rutas!
//cargo los metodos del controlador
var ProjectController = require('../controllers/project')
//contendra las diferentes rutas de mi api
var router = express.Router();


//usamos un middleware para que se ejecute algo antes de llamar al controlador
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads'});//esto hara que las imagenes se guarden local en el server


router.get('/', ProjectController.home);
router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
//el ? es opcional 

router.get('/projects', ProjectController.getProjects);

router.put('/project/:id', ProjectController.updateProject);

router.delete('/project/:id', ProjectController.deleteProject);

//para que se ejecute antes de la accion se pone como param en la routa
router.post('/uploadImage/:id', multipartMiddleware, ProjectController.uploadImage);

router.get('/image/:image', ProjectController.getImage);

module.exports = router;