const express = require('express');
const router = express.Router();

const Auth = require('./middlewares/Auth');

const AuthValidator = require('./validators/AuthValidator');
const UserValidator = require('./validators/UserValidator');

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');

const AddController = require('./controllers/AddController');


// Processo autenticação usuário

router.post('/user/signin', AuthValidator.signin, AuthController.signin);
router.post('/user/signup', AuthValidator.signup, AuthController.signup);

// Adicionar agendamento
router.post('/agendamento', AddController.insert);

// Informações do usuário

router.get ('/user/me', Auth.private, UserController.info);
router.put ('/user/me', UserValidator.editAction, Auth.private, UserController.editAction);

module.exports = router;