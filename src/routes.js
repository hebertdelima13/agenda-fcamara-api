const express = require('express');
const router = express.Router();

const Auth = require('./middlewares/Auth');

const AuthValidator = require('./validators/AuthValidator');

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');

router.get('/ping', (req, res) => {
    res.json({pong: true});
});

// Processo autenticação usuário

router.post('/user/signin', AuthValidator.signin, AuthController.signin);
router.post('/user/signup', AuthValidator.signup, AuthController.signup);

// Informações do usuário

router.get ('/user/me', Auth.private, UserController.info);
router.put ('/user/me', Auth.private, UserController.editAction);

module.exports = router;