const express = require('express');
const router = express.Router();

const Auth = require('./middlewares/Auth');

const AuthValidator = require('./validators/AuthValidator');
const UserValidator = require('./validators/UserValidator');

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');

const UnitController = require('./controllers/UnitController');
const AppointController = require('./controllers/AppointController');

// Processo autenticação usuário

router.post('/user/signin', AuthValidator.signin, AuthController.signin);
router.post('/user/signup', AuthValidator.signup, AuthController.signup);

// Informações do usuário

router.get ('/user/me', UserController.info);
router.put ('/user/me', UserValidator.editAction, Auth.private, UserController.editAction);

//Processo de adicionar unidades
router.post('/unit', UnitController.create);
router.get('/unit', UnitController.read);
router.put('/unit/:unitId', UnitController.update);
router.delete('/unit/:unitId', UnitController.delete);

//Processo de agendamento
router.post('/appoint', AppointController.create);
router.get('/appoint', AppointController.read);
router.put('/appoint/:appointId', AppointController.update);
router.delete('/appoint/:appointId', AppointController.delete);






module.exports = router;