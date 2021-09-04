const express = require('express');
const router = express.Router();

const Auth = require('./middlewares/Auth');

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');

router.get('/ping', (req, res) => {
    res.json({pong: true});
});

// Processo autenticação usuário

router.post('/user/signin', AuthController.signin);
router.post('/user/signup', AuthController.signup);

// Informações do usuário

router.get ('/user/me', Auth.private, UserController.info);
router.put ('/user/me', Auth.private, UserController.editAction);

module.exports = router;